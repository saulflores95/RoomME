import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import type { SQL } from "@acme/db";
import type {
  City,
  CreateListingInput,
  ListingType,
  PropertyType,
} from "@acme/validators";
import { isAgentOrAdmin, withRole } from "@acme/auth/roles";
import {
  and,
  arrayContains,
  asc,
  count,
  desc,
  eq,
  gte,
  inArray,
  isNull,
  lte,
  ne,
  or,
  sql,
} from "@acme/db";
import {
  Property,
  PropertyImage,
  Room,
  RoomImage,
  TourBooking,
  user,
} from "@acme/db/schema";
import {
  CreateListingSchema,
  CreatePropertySchema,
  ListListingsSchema,
  UpdateListingSchema,
  UpdatePropertySchema,
} from "@acme/validators";

import type { GeocodeHit } from "../geocode";
import type {
  ListingDetail,
  ListingRoomAttributes,
  ListingSummary,
} from "../lib/listing-mappers";
import type { DbExecutor, PropertyLocation } from "../lib/listing-write";
import { deleteBlobUrls } from "../blob";
import { reverseGeocode, searchAddresses } from "../geocode";
import {
  toListingDetail,
  toListingIncludes,
  toListingSummary,
  toPropertyAmenities,
  toRoomAttributes,
} from "../lib/listing-mappers";
import {
  insertPropertyImages,
  insertRoomImages,
  propertyLayoutFromListing,
  propertyValuesFromForm,
  propertyValuesFromListing,
  roomWriteValues,
} from "../lib/listing-write";
import {
  canAttachListing,
  canManageListing,
  canManageProperty,
  isSharedBuilding,
} from "../lib/property-access";
import { protectedProcedure, publicProcedure } from "../trpc";

export type { GeocodeHit };
export type {
  ListingDetail,
  ListingHost,
  ListingImage,
  ListingPropertySummary,
  ListingSummary,
} from "../lib/listing-mappers";

export interface PropertyOption {
  id: string;
  title: string;
  propertyType: PropertyType;
  isSharedBuilding: boolean;
  isOwned: boolean;
  bedroomCount: number | null;
  bathroomCount: number | null;
  city: City;
  neighborhood: string;
  addressLine1: string;
  latitude: number | null;
  longitude: number | null;
  petFriendly: boolean;
  amenities: string[];
}

export interface CreateListingResult {
  propertyId: string;
  roomId: string;
}

export interface CreatePropertyResult {
  propertyId: string;
}

export interface HostRoomSummary {
  id: string;
  listingType: ListingType;
  propertyId: string | null;
  title: string;
  neighborhood: string;
  city: City | null;
  coverUrl: string | null;
  status: string;
}

export interface HostPropertySummary {
  id: string;
  title: string;
  propertyType: PropertyType;
  isSharedBuilding: boolean;
  neighborhood: string;
  city: City;
  coverUrl: string | null;
  listingCount: number;
}

export interface RoomForEdit extends ListingRoomAttributes {
  id: string;
  listingType: ListingType;
  propertyId: string | null;
  propertyType: PropertyType;
  propertyIsShared: boolean;
  bedroomCount: number | null;
  bathroomCount: number | null;
  title: string;
  description: string;
  addressLine1: string;
  city: City;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
  rentPriceMxn: number;
  images: string[];
}

export interface PropertyForEdit {
  id: string;
  propertyType: PropertyType;
  isSharedBuilding: boolean;
  title: string;
  description: string;
  addressLine1: string;
  city: City;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
  bedroomCount: number | null;
  bathroomCount: number | null;
  petFriendly: boolean;
  amenities: string[];
  images: string[];
}

interface Actor {
  id: string;
  role?: string | null;
}

const listingRelations = {
  images: true,
  host: true,
  property: {
    with: {
      images: true,
    },
  },
} as const;

const toPropertyLocation = (property: {
  id: string;
  addressLine1: string;
  city: City;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
}): PropertyLocation => ({
  id: property.id,
  addressLine1: property.addressLine1,
  city: property.city,
  neighborhood: property.neighborhood,
  latitude: property.latitude,
  longitude: property.longitude,
});

/** Room-only filters never exclude entire-property listings. */
const roomOnly = (condition: SQL | undefined): SQL | undefined =>
  or(ne(Room.listingType, "room"), condition);

/**
 * Mirrors `conflictScope` in lib/availability: a listing is unavailable on
 * `date` if any active stay in its scope covers that date.
 */
const noStayCovering = (date: Date): SQL => {
  const at = sql`${date.toISOString()}::timestamptz`;
  return sql`not exists (
  select 1 from stay s
  join room r2 on r2.id = s.room_id
  where s.status <> 'cancelled'
    and s.started_at <= ${at}
    and (s.ended_at is null or s.ended_at > ${at})
    and (
      r2.id = ${Room.id}
      or (
        ${Room.propertyId} is not null
        and r2.property_id = ${Room.propertyId}
        and (${Room.listingType} = 'entire_property' or r2.listing_type = 'entire_property')
      )
    )
)`;
};

/** Attaches to an existing property, or creates/updates the actor's own. */
const resolveListingProperty = async (
  tx: DbExecutor,
  actor: Actor,
  input: CreateListingInput,
  currentPropertyId: string | null,
): Promise<PropertyLocation> => {
  if (input.propertyId) {
    const property = await tx.query.Property.findFirst({
      where: eq(Property.id, input.propertyId),
    });
    if (!property) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Property not found" });
    }
    if (!canAttachListing(actor, property)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You can only list in your own properties.",
      });
    }
    if (input.listingType === "entire_property" && isSharedBuilding(property)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An entire-property listing needs a property you own.",
      });
    }
    if (
      input.listingType === "entire_property" &&
      canManageProperty(actor, property)
    ) {
      await tx
        .update(Property)
        .set(propertyLayoutFromListing(input))
        .where(eq(Property.id, property.id));
    }
    return toPropertyLocation(property);
  }

  if (currentPropertyId) {
    const current = await tx.query.Property.findFirst({
      where: eq(Property.id, currentPropertyId),
    });
    if (current && current.ownerId === actor.id) {
      const [updated] = await tx
        .update(Property)
        .set(propertyValuesFromListing(input))
        .where(eq(Property.id, current.id))
        .returning();
      if (updated) {
        return toPropertyLocation(updated);
      }
    }
  }

  const [created] = await tx
    .insert(Property)
    .values({ ...propertyValuesFromListing(input), ownerId: actor.id })
    .returning();
  if (!created) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create property",
    });
  }
  return toPropertyLocation(created);
};

export const listingRouter = {
  list: publicProcedure
    .input(ListListingsSchema.optional())
    .query(async ({ ctx, input }): Promise<ListingSummary[]> => {
      const limit = input?.limit ?? 12;
      const conditions: (SQL | undefined)[] = [eq(Room.status, "listed")];

      if (input?.city) {
        // Effective city matches listing cards: room.city ?? property.city
        conditions.push(
          or(
            eq(Room.city, input.city),
            and(
              isNull(Room.city),
              inArray(
                Room.propertyId,
                ctx.db
                  .select({ id: Property.id })
                  .from(Property)
                  .where(eq(Property.city, input.city)),
              ),
            ),
          ),
        );
      }
      if (input?.listingType) {
        conditions.push(eq(Room.listingType, input.listingType));
      }
      if (input?.propertyType) {
        conditions.push(
          inArray(
            Room.propertyId,
            ctx.db
              .select({ id: Property.id })
              .from(Property)
              .where(eq(Property.propertyType, input.propertyType)),
          ),
        );
      }
      if (input?.minRentMxn !== undefined) {
        conditions.push(
          gte(Room.rentPriceCents, Math.round(input.minRentMxn * 100)),
        );
      }
      if (input?.maxRentMxn !== undefined) {
        conditions.push(
          lte(Room.rentPriceCents, Math.round(input.maxRentMxn * 100)),
        );
      }
      if (input?.householdGender) {
        conditions.push(
          roomOnly(eq(Room.householdGender, input.householdGender)),
        );
      }
      if (input?.seekerAge !== undefined) {
        conditions.push(
          roomOnly(
            and(
              lte(Room.preferredAgeMin, input.seekerAge),
              gte(Room.preferredAgeMax, input.seekerAge),
            ),
          ),
        );
      }
      if (input?.hasPets !== undefined) {
        conditions.push(roomOnly(eq(Room.hasPets, input.hasPets)));
      }
      if (input?.acceptsPets !== undefined) {
        conditions.push(eq(Room.acceptsPets, input.acceptsPets));
      }
      if (input?.bathroomType) {
        conditions.push(roomOnly(eq(Room.bathroomType, input.bathroomType)));
      }
      if (input?.furnished) {
        conditions.push(eq(Room.furnished, input.furnished));
      }
      if (input?.couplesAllowed !== undefined) {
        conditions.push(eq(Room.couplesAllowed, input.couplesAllowed));
      }
      if (input?.smokingPolicy) {
        conditions.push(eq(Room.smokingPolicy, input.smokingPolicy));
      }
      if (input?.overnightGuests) {
        conditions.push(
          roomOnly(eq(Room.overnightGuests, input.overnightGuests)),
        );
      }
      if (input?.wfhFriendly !== undefined) {
        conditions.push(roomOnly(eq(Room.wfhFriendly, input.wfhFriendly)));
      }
      if (input?.quietHome !== undefined) {
        conditions.push(roomOnly(eq(Room.quietHome, input.quietHome)));
      }
      if (input?.cleanliness) {
        conditions.push(roomOnly(eq(Room.cleanliness, input.cleanliness)));
      }
      if (input?.includes && input.includes.length > 0) {
        conditions.push(arrayContains(Room.includes, [...input.includes]));
      }
      if (input?.availableBy) {
        conditions.push(
          or(
            isNull(Room.availableFrom),
            lte(Room.availableFrom, input.availableBy),
          ),
        );
        conditions.push(noStayCovering(input.availableBy));
      }

      const rooms = await ctx.db.query.Room.findMany({
        where: and(...conditions),
        with: listingRelations,
        limit,
        orderBy: [asc(Room.rentPriceCents)],
      });

      const roomIds = rooms.map((room) => room.id);
      const tourCounts =
        roomIds.length === 0
          ? []
          : await ctx.db
              .select({
                roomId: TourBooking.roomId,
                count: count(),
              })
              .from(TourBooking)
              .where(
                and(
                  inArray(TourBooking.roomId, roomIds),
                  inArray(TourBooking.status, ["scheduled", "completed"]),
                ),
              )
              .groupBy(TourBooking.roomId);

      const tourCountByRoom = new Map(
        tourCounts.map((row) => [row.roomId, Number(row.count)]),
      );

      return rooms.flatMap((room) => {
        const listing = toListingSummary(
          room,
          tourCountByRoom.get(room.id) ?? 0,
        );
        return listing ? [listing] : [];
      });
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }): Promise<ListingDetail | null> => {
      const room = await ctx.db.query.Room.findFirst({
        where: and(eq(Room.id, input.id), eq(Room.status, "listed")),
        with: listingRelations,
      });

      return room ? toListingDetail(room) : null;
    }),

  /** Properties the actor can attach a listing to. */
  properties: protectedProcedure.query(
    async ({ ctx }): Promise<PropertyOption[]> => {
      const actorId = ctx.session.user.id;
      const rows = await ctx.db.query.Property.findMany({
        where: or(eq(Property.ownerId, actorId), isNull(Property.ownerId)),
        orderBy: [asc(Property.title)],
      });

      return rows.map((row) => ({
        id: row.id,
        title: row.title,
        propertyType: row.propertyType,
        isSharedBuilding: row.ownerId === null,
        isOwned: row.ownerId === actorId,
        bedroomCount: row.bedroomCount,
        bathroomCount: row.bathroomCount,
        city: row.city,
        neighborhood: row.neighborhood,
        addressLine1: row.addressLine1,
        latitude: row.latitude,
        longitude: row.longitude,
        petFriendly: row.petFriendly,
        amenities: row.amenities,
      }));
    },
  ),

  mine: protectedProcedure.query(
    async ({
      ctx,
    }): Promise<{
      rooms: HostRoomSummary[];
      properties: HostPropertySummary[];
      canManageSharedBuildings: boolean;
    }> => {
      const actorId = ctx.session.user.id;
      const actor = await ctx.db.query.user.findFirst({
        where: eq(user.id, actorId),
        columns: { role: true },
      });
      const canManageShared = isAgentOrAdmin(
        actor?.role ?? ctx.session.user.role,
      );

      const rooms = await ctx.db.query.Room.findMany({
        where: eq(Room.hostId, actorId),
        with: {
          images: true,
          property: {
            with: { images: true },
          },
        },
        orderBy: [desc(Room.createdAt)],
      });

      const properties = await ctx.db.query.Property.findMany({
        where: canManageShared
          ? or(eq(Property.ownerId, actorId), isNull(Property.ownerId))
          : eq(Property.ownerId, actorId),
        with: { images: true, rooms: { columns: { id: true } } },
        orderBy: [desc(Property.createdAt)],
      });

      return {
        rooms: rooms.map((room) => ({
          id: room.id,
          listingType: room.listingType,
          propertyId: room.propertyId,
          title: room.title,
          neighborhood: room.neighborhood ?? room.property?.neighborhood ?? "",
          city: room.city ?? room.property?.city ?? null,
          coverUrl:
            room.images[0]?.url ?? room.property?.images[0]?.url ?? null,
          status: room.status,
        })),
        properties: properties.map((property) => ({
          id: property.id,
          title: property.title,
          propertyType: property.propertyType,
          isSharedBuilding: property.ownerId === null,
          neighborhood: property.neighborhood,
          city: property.city,
          coverUrl: property.images[0]?.url ?? null,
          listingCount: property.rooms.length,
        })),
        canManageSharedBuildings: canManageShared,
      };
    },
  ),

  roomForEdit: protectedProcedure
    .input(z.object({ id: z.uuid() }))
    .query(async ({ ctx, input }): Promise<RoomForEdit> => {
      const room = await ctx.db.query.Room.findFirst({
        where: eq(Room.id, input.id),
        with: {
          images: true,
          property: true,
        },
      });

      if (!room) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (!canManageListing(ctx.session.user, room)) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const city = room.city ?? room.property?.city;
      const neighborhood =
        room.neighborhood ?? room.property?.neighborhood ?? "";
      const addressLine1 =
        room.addressLine1 ?? room.property?.addressLine1 ?? "";

      if (!city || neighborhood.length === 0 || addressLine1.length === 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Listing is missing location details",
        });
      }

      return {
        id: room.id,
        listingType: room.listingType,
        propertyId: room.propertyId,
        propertyType: room.property?.propertyType ?? "house",
        propertyIsShared: room.property
          ? room.property.ownerId === null
          : false,
        bedroomCount: room.property?.bedroomCount ?? null,
        bathroomCount: room.property?.bathroomCount ?? null,
        title: room.title,
        description: room.description,
        addressLine1,
        city,
        neighborhood,
        latitude: room.latitude ?? room.property?.latitude ?? null,
        longitude: room.longitude ?? room.property?.longitude ?? null,
        rentPriceMxn: room.rentPriceCents / 100,
        images: [...room.images]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((image) => image.url),
        ...toRoomAttributes({
          ...room,
          includes: toListingIncludes(room.includes),
        }),
      };
    }),

  propertyForEdit: protectedProcedure
    .input(z.object({ id: z.uuid() }))
    .query(async ({ ctx, input }): Promise<PropertyForEdit> => {
      const property = await ctx.db.query.Property.findFirst({
        where: eq(Property.id, input.id),
        with: { images: true },
      });

      if (!property) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (!canManageProperty(ctx.session.user, property)) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return {
        id: property.id,
        propertyType: property.propertyType,
        isSharedBuilding: property.ownerId === null,
        title: property.title,
        description: property.description,
        addressLine1: property.addressLine1,
        city: property.city,
        neighborhood: property.neighborhood,
        latitude: property.latitude,
        longitude: property.longitude,
        bedroomCount: property.bedroomCount,
        bathroomCount: property.bathroomCount,
        petFriendly: property.petFriendly,
        amenities: toPropertyAmenities(property.amenities),
        images: [...property.images]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((image) => image.url),
      };
    }),

  create: protectedProcedure
    .input(CreateListingSchema)
    .mutation(async ({ ctx, input }): Promise<CreateListingResult> => {
      const actor = ctx.session.user;

      const room = await ctx.db.transaction(async (tx) => {
        const property = await resolveListingProperty(tx, actor, input, null);
        const [created] = await tx
          .insert(Room)
          .values({
            ...roomWriteValues(input, actor.id, property),
            status: "listed",
          })
          .returning();

        if (!created) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create listing",
          });
        }

        await insertRoomImages(tx, created.id, input.images, input.title);
        await tx
          .update(user)
          .set({ role: withRole(actor.role, "host") })
          .where(eq(user.id, actor.id));

        return { ...created, propertyId: property.id };
      });

      return { propertyId: room.propertyId, roomId: room.id };
    }),

  update: protectedProcedure
    .input(UpdateListingSchema)
    .mutation(async ({ ctx, input }): Promise<CreateListingResult> => {
      const actor = ctx.session.user;
      const existing = await ctx.db.query.Room.findFirst({
        where: eq(Room.id, input.id),
        with: { images: true },
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (!canManageListing(actor, existing)) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const hostId = existing.hostId ?? actor.id;
      const result = await ctx.db.transaction(async (tx) => {
        const property = await resolveListingProperty(
          tx,
          { id: hostId, role: actor.role },
          input,
          existing.propertyId,
        );
        const [room] = await tx
          .update(Room)
          .set(roomWriteValues(input, hostId, property))
          .where(eq(Room.id, input.id))
          .returning();

        if (!room) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update listing",
          });
        }

        await tx.delete(RoomImage).where(eq(RoomImage.roomId, room.id));
        await insertRoomImages(tx, room.id, input.images, input.title);

        return { propertyId: property.id, roomId: room.id };
      });

      const nextUrls = new Set(input.images);
      await deleteBlobUrls(
        existing.images
          .map((image) => image.url)
          .filter((url) => !nextUrls.has(url)),
      );

      return result;
    }),

  createProperty: protectedProcedure
    .input(CreatePropertySchema)
    .mutation(async ({ ctx, input }): Promise<CreatePropertyResult> => {
      const actor = ctx.session.user;
      if (input.isSharedBuilding && !isAgentOrAdmin(actor.role)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only agents can create shared buildings.",
        });
      }

      const property = await ctx.db.transaction(async (tx) => {
        const [created] = await tx
          .insert(Property)
          .values({
            ...propertyValuesFromForm(input),
            ownerId: input.isSharedBuilding ? null : actor.id,
          })
          .returning();

        if (!created) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create property",
          });
        }

        await insertPropertyImages(tx, created.id, input.images, input.title);
        return created;
      });

      return { propertyId: property.id };
    }),

  updateProperty: protectedProcedure
    .input(UpdatePropertySchema)
    .mutation(async ({ ctx, input }): Promise<CreatePropertyResult> => {
      const existing = await ctx.db.query.Property.findFirst({
        where: eq(Property.id, input.id),
        with: { images: true },
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (!canManageProperty(ctx.session.user, existing)) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.transaction(async (tx) => {
        const values = propertyValuesFromForm(input);
        await tx.update(Property).set(values).where(eq(Property.id, input.id));
        await tx
          .update(Room)
          .set({
            addressLine1: values.addressLine1,
            city: values.city,
            neighborhood: values.neighborhood,
            latitude: values.latitude,
            longitude: values.longitude,
          })
          .where(eq(Room.propertyId, input.id));
        await tx
          .delete(PropertyImage)
          .where(eq(PropertyImage.propertyId, input.id));
        await insertPropertyImages(tx, input.id, input.images, input.title);
      });

      const nextUrls = new Set(input.images);
      await deleteBlobUrls(
        existing.images
          .map((image) => image.url)
          .filter((url) => !nextUrls.has(url)),
      );

      return { propertyId: input.id };
    }),

  searchAddress: protectedProcedure
    .input(z.object({ query: z.string().trim().min(2).max(200) }))
    .query(async ({ input }): Promise<GeocodeHit[]> => {
      return searchAddresses(input.query);
    }),

  reverseGeocode: protectedProcedure
    .input(
      z.object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
      }),
    )
    .query(async ({ input }): Promise<GeocodeHit | null> => {
      return reverseGeocode(input.latitude, input.longitude);
    }),
} satisfies TRPCRouterRecord;
