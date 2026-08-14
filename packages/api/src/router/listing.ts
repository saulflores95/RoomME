import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import type { SQL } from "@acme/db";
import type { db } from "@acme/db/client";
import type {
  BathroomType,
  City,
  Cleanliness,
  CreateListingInput,
  Furnished,
  HouseholdGender,
  ListingInclude,
  OvernightGuests,
  SmokingPolicy,
} from "@acme/validators";
import { canManageComplexes, hasRole, withRole } from "@acme/auth/roles";
import {
  and,
  arrayContains,
  asc,
  desc,
  eq,
  gte,
  inArray,
  isNull,
  lte,
  or,
} from "@acme/db";
import { Complex, ComplexImage, Room, RoomImage, user } from "@acme/db/schema";
import {
  CreateComplexSchema,
  CreateListingSchema,
  LISTING_INCLUDES,
  ListListingsSchema,
  MAX_AMENITY_LENGTH,
  UpdateComplexSchema,
  UpdateListingSchema,
} from "@acme/validators";

import type { GeocodeHit } from "../geocode";
import { deleteBlobUrls } from "../blob";
import { reverseGeocode, searchAddresses } from "../geocode";
import { agentProcedure, protectedProcedure, publicProcedure } from "../trpc";

export type { GeocodeHit };

export interface ListingHost {
  id: string;
  name: string;
  image: string | null;
}

export interface ListingComplexSummary {
  id: string | null;
  title: string | null;
  city: City;
  neighborhood: string;
  petFriendly: boolean;
  amenities: string[];
}

export interface ListingRoomAttributes {
  includes: string[];
  capacity: number;
  householdGender: HouseholdGender;
  preferredAgeMin: number;
  preferredAgeMax: number;
  hasPets: boolean;
  acceptsPets: boolean;
  bathroomType: BathroomType;
  furnished: Furnished;
  depositMonths: number;
  leaseMonths: number;
  couplesAllowed: boolean;
  smokingPolicy: SmokingPolicy;
  overnightGuests: OvernightGuests;
  wfhFriendly: boolean;
  quietHome: boolean;
  cleanliness: Cleanliness;
  availableFrom: Date | null;
}

export interface ListingSummary extends ListingRoomAttributes {
  id: string;
  title: string;
  description: string;
  rentPriceCents: number;
  currency: string;
  coverUrl: string | null;
  addressLine1: string | null;
  latitude: number | null;
  longitude: number | null;
  complex: ListingComplexSummary;
  host: ListingHost | null;
}

export interface ListingImage {
  id: string;
  url: string;
  alt: string | null;
}

export interface ListingDetailComplex {
  id: string;
  title: string;
  description: string;
  addressLine1: string;
  city: City;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
  petFriendly: boolean;
  amenities: string[];
  images: ListingImage[];
}

export interface ListingDetail extends ListingRoomAttributes {
  id: string;
  title: string;
  description: string;
  rentPriceCents: number;
  currency: string;
  addressLine1: string | null;
  city: City | null;
  neighborhood: string | null;
  latitude: number | null;
  longitude: number | null;
  coverUrl: string | null;
  images: ListingImage[];
  complex: ListingDetailComplex | null;
  host: ListingHost | null;
}

export interface ComplexOption {
  id: string;
  title: string;
  city: City;
  neighborhood: string;
  addressLine1: string;
  latitude: number | null;
  longitude: number | null;
  petFriendly: boolean;
  amenities: string[];
}

export interface CreateListingResult {
  complexId: string | null;
  roomId: string;
}

export interface CreateComplexResult {
  complexId: string;
}

export interface HostRoomSummary {
  id: string;
  title: string;
  neighborhood: string;
  city: City | null;
  coverUrl: string | null;
  status: string;
}

export interface HostComplexSummary {
  id: string;
  title: string;
  neighborhood: string;
  city: City;
  coverUrl: string | null;
}

export interface RoomForEdit extends ListingRoomAttributes {
  id: string;
  complexId: string | null;
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

export interface ComplexForEdit {
  id: string;
  title: string;
  description: string;
  addressLine1: string;
  city: City;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
  petFriendly: boolean;
  amenities: string[];
  images: string[];
}

interface ListingRoomRow extends ListingRoomAttributes {
  id: string;
  title: string;
  description: string;
  rentPriceCents: number;
  currency: string;
  addressLine1: string | null;
  city: City | null;
  neighborhood: string | null;
  latitude: number | null;
  longitude: number | null;
  images: ListingImage[];
  host: ListingHost | null | undefined;
  complex: {
    id: string;
    title: string;
    description: string;
    city: City;
    neighborhood: string;
    petFriendly: boolean;
    amenities: string[];
    addressLine1: string;
    latitude: number | null;
    longitude: number | null;
    images: { id: string; url: string; alt: string | null }[];
  } | null;
}

const toListingHost = (
  host: { id: string; name: string; image: string | null } | null | undefined,
): ListingHost | null => {
  if (!host) {
    return null;
  }

  return {
    id: host.id,
    name: host.name,
    image: host.image,
  };
};

const toRoomAttributes = (
  room: ListingRoomAttributes,
): ListingRoomAttributes => ({
  includes: room.includes,
  capacity: room.capacity,
  householdGender: room.householdGender,
  preferredAgeMin: room.preferredAgeMin,
  preferredAgeMax: room.preferredAgeMax,
  hasPets: room.hasPets,
  acceptsPets: room.acceptsPets,
  bathroomType: room.bathroomType,
  furnished: room.furnished,
  depositMonths: room.depositMonths,
  leaseMonths: room.leaseMonths,
  couplesAllowed: room.couplesAllowed,
  smokingPolicy: room.smokingPolicy,
  overnightGuests: room.overnightGuests,
  wfhFriendly: room.wfhFriendly,
  quietHome: room.quietHome,
  cleanliness: room.cleanliness,
  availableFrom: room.availableFrom,
});

const toListingIncludes = (values: string[]): ListingInclude[] =>
  values.filter((item): item is ListingInclude =>
    (LISTING_INCLUDES as readonly string[]).includes(item),
  );

const toComplexAmenities = (values: string[]): string[] => {
  const seen = new Set<string>();
  const amenities: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_AMENITY_LENGTH) {
      continue;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    amenities.push(trimmed);
  }

  return amenities;
};

const assertCanManage = (
  actor: { id: string; role?: string | null },
  hostId: string | null,
): void => {
  if (hasRole(actor.role, "admin")) {
    return;
  }

  if (hostId !== null && hostId === actor.id) {
    return;
  }

  throw new TRPCError({ code: "FORBIDDEN" });
};

const insertRoomImages = async (
  database: typeof db,
  roomId: string,
  urls: readonly string[],
  alt: string,
): Promise<void> => {
  if (urls.length === 0) {
    return;
  }

  await database.insert(RoomImage).values(
    urls.map((url, index) => ({
      roomId,
      url,
      alt,
      kind: "room" as const,
      sortOrder: index,
    })),
  );
};

const insertComplexImages = async (
  database: typeof db,
  complexId: string,
  urls: readonly string[],
  alt: string,
): Promise<void> => {
  if (urls.length === 0) {
    return;
  }

  await database.insert(ComplexImage).values(
    urls.map((url, index) => ({
      complexId,
      url,
      alt,
      kind: "exterior" as const,
      sortOrder: index,
    })),
  );
};

interface RoomWriteValues {
  hostId: string;
  complexId: string | null;
  title: string;
  description: string;
  addressLine1: string;
  city: City;
  neighborhood: string;
  latitude: number | null;
  longitude: number | null;
  country: "MX";
  rentPriceCents: number;
  currency: "MXN";
  includes: CreateListingInput["includes"];
  capacity: number;
  householdGender: HouseholdGender;
  preferredAgeMin: number;
  preferredAgeMax: number;
  hasPets: boolean;
  acceptsPets: boolean;
  bathroomType: BathroomType;
  furnished: Furnished;
  depositMonths: number;
  leaseMonths: number;
  couplesAllowed: boolean;
  smokingPolicy: SmokingPolicy;
  overnightGuests: OvernightGuests;
  wfhFriendly: boolean;
  quietHome: boolean;
  cleanliness: Cleanliness;
  availableFrom: Date;
}

const roomWriteValues = (
  input: CreateListingInput,
  hostId: string,
  selectedComplex: {
    id: string;
    addressLine1: string;
    city: City;
    neighborhood: string;
    latitude: number | null;
    longitude: number | null;
  } | null,
): RoomWriteValues => ({
  hostId,
  complexId: selectedComplex?.id ?? null,
  title: input.roomTitle,
  description: input.roomDescription,
  addressLine1: selectedComplex?.addressLine1 ?? input.addressLine1,
  city: selectedComplex?.city ?? input.city,
  neighborhood: selectedComplex?.neighborhood ?? input.neighborhood,
  latitude: selectedComplex?.latitude ?? input.latitude ?? null,
  longitude: selectedComplex?.longitude ?? input.longitude ?? null,
  country: "MX" as const,
  rentPriceCents: Math.round(input.rentPriceMxn * 100),
  currency: "MXN" as const,
  includes: input.includes,
  capacity: input.capacity,
  householdGender: input.householdGender,
  preferredAgeMin: input.preferredAgeMin,
  preferredAgeMax: input.preferredAgeMax,
  hasPets: input.hasPets,
  acceptsPets: input.acceptsPets,
  bathroomType: input.bathroomType,
  furnished: input.furnished,
  depositMonths: input.depositMonths,
  leaseMonths: input.leaseMonths,
  couplesAllowed: input.couplesAllowed,
  smokingPolicy: input.smokingPolicy,
  overnightGuests: input.overnightGuests,
  wfhFriendly: input.wfhFriendly,
  quietHome: input.quietHome,
  cleanliness: input.cleanliness,
  availableFrom: input.availableFrom,
});

const toListingSummary = (room: ListingRoomRow): ListingSummary | null => {
  const city = room.city ?? room.complex?.city;
  const neighborhood = room.neighborhood ?? room.complex?.neighborhood ?? "";

  if (!city) {
    return null;
  }

  return {
    id: room.id,
    title: room.title,
    description: room.description,
    rentPriceCents: room.rentPriceCents,
    currency: room.currency,
    coverUrl: room.images[0]?.url ?? room.complex?.images[0]?.url ?? null,
    addressLine1: room.addressLine1 ?? room.complex?.addressLine1 ?? null,
    latitude: room.latitude ?? room.complex?.latitude ?? null,
    longitude: room.longitude ?? room.complex?.longitude ?? null,
    complex: {
      id: room.complex?.id ?? null,
      title: room.complex?.title ?? null,
      city,
      neighborhood,
      petFriendly: room.complex?.petFriendly ?? room.acceptsPets,
      amenities: room.complex?.amenities ?? [],
    },
    host: toListingHost(room.host),
    ...toRoomAttributes(room),
  };
};

const listingRelations = {
  images: true,
  host: true,
  complex: {
    with: {
      images: true,
    },
  },
} as const;

export const listingRouter = {
  list: publicProcedure
    .input(ListListingsSchema.optional())
    .query(async ({ ctx, input }): Promise<ListingSummary[]> => {
      const limit = input?.limit ?? 12;
      const conditions: (SQL | undefined)[] = [eq(Room.status, "listed")];

      if (input?.city) {
        // Effective city matches listing cards: room.city ?? complex.city
        conditions.push(
          or(
            eq(Room.city, input.city),
            and(
              isNull(Room.city),
              inArray(
                Room.complexId,
                ctx.db
                  .select({ id: Complex.id })
                  .from(Complex)
                  .where(eq(Complex.city, input.city)),
              ),
            ),
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
        conditions.push(eq(Room.householdGender, input.householdGender));
      }
      if (input?.seekerAge !== undefined) {
        conditions.push(lte(Room.preferredAgeMin, input.seekerAge));
        conditions.push(gte(Room.preferredAgeMax, input.seekerAge));
      }
      if (input?.hasPets !== undefined) {
        conditions.push(eq(Room.hasPets, input.hasPets));
      }
      if (input?.acceptsPets !== undefined) {
        conditions.push(eq(Room.acceptsPets, input.acceptsPets));
      }
      if (input?.bathroomType) {
        conditions.push(eq(Room.bathroomType, input.bathroomType));
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
        conditions.push(eq(Room.overnightGuests, input.overnightGuests));
      }
      if (input?.wfhFriendly !== undefined) {
        conditions.push(eq(Room.wfhFriendly, input.wfhFriendly));
      }
      if (input?.quietHome !== undefined) {
        conditions.push(eq(Room.quietHome, input.quietHome));
      }
      if (input?.cleanliness) {
        conditions.push(eq(Room.cleanliness, input.cleanliness));
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
      }

      const rooms = await ctx.db.query.Room.findMany({
        where: and(...conditions),
        with: listingRelations,
        limit,
        orderBy: [asc(Room.rentPriceCents)],
      });

      return rooms.flatMap((room) => {
        const listing = toListingSummary(room);
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

      if (!room) {
        return null;
      }

      const city = room.city ?? room.complex?.city ?? null;
      const neighborhood =
        room.neighborhood ?? room.complex?.neighborhood ?? null;
      const roomImages = [...room.images]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((image) => ({
          id: image.id,
          url: image.url,
          alt: image.alt,
        }));
      const complexImages = [...(room.complex?.images ?? [])]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((image) => ({
          id: image.id,
          url: image.url,
          alt: image.alt,
        }));
      const images = roomImages.length > 0 ? roomImages : complexImages;
      const cover = images[0]?.url ?? null;

      return {
        id: room.id,
        title: room.title,
        description: room.description,
        rentPriceCents: room.rentPriceCents,
        currency: room.currency,
        addressLine1: room.addressLine1 ?? room.complex?.addressLine1 ?? null,
        city,
        neighborhood,
        latitude: room.latitude ?? room.complex?.latitude ?? null,
        longitude: room.longitude ?? room.complex?.longitude ?? null,
        coverUrl: cover,
        images,
        complex: room.complex
          ? {
              id: room.complex.id,
              title: room.complex.title,
              description: room.complex.description,
              addressLine1: room.complex.addressLine1,
              city: room.complex.city,
              neighborhood: room.complex.neighborhood,
              latitude: room.complex.latitude,
              longitude: room.complex.longitude,
              petFriendly: room.complex.petFriendly,
              amenities: room.complex.amenities,
              images: complexImages,
            }
          : null,
        host: toListingHost(room.host),
        ...toRoomAttributes(room),
      };
    }),

  complexes: protectedProcedure.query(
    async ({ ctx }): Promise<ComplexOption[]> => {
      return ctx.db
        .select({
          id: Complex.id,
          title: Complex.title,
          city: Complex.city,
          neighborhood: Complex.neighborhood,
          addressLine1: Complex.addressLine1,
          latitude: Complex.latitude,
          longitude: Complex.longitude,
          petFriendly: Complex.petFriendly,
          amenities: Complex.amenities,
        })
        .from(Complex)
        .orderBy(asc(Complex.title));
    },
  ),

  mine: protectedProcedure.query(
    async ({
      ctx,
    }): Promise<{
      rooms: HostRoomSummary[];
      complexes: HostComplexSummary[];
      canManageComplexes: boolean;
    }> => {
      const hostId = ctx.session.user.id;
      const canManage = canManageComplexes(ctx.session.user.role);

      const rooms = await ctx.db.query.Room.findMany({
        where: eq(Room.hostId, hostId),
        with: {
          images: true,
          complex: {
            with: { images: true },
          },
        },
        orderBy: [desc(Room.createdAt)],
      });

      const complexes = canManage
        ? await ctx.db.query.Complex.findMany({
            with: { images: true },
            orderBy: [desc(Complex.createdAt)],
          })
        : [];

      return {
        rooms: rooms.map((room) => ({
          id: room.id,
          title: room.title,
          neighborhood: room.neighborhood ?? room.complex?.neighborhood ?? "",
          city: room.city ?? room.complex?.city ?? null,
          coverUrl: room.images[0]?.url ?? room.complex?.images[0]?.url ?? null,
          status: room.status,
        })),
        complexes: complexes.map((complex) => ({
          id: complex.id,
          title: complex.title,
          neighborhood: complex.neighborhood,
          city: complex.city,
          coverUrl: complex.images[0]?.url ?? null,
        })),
        canManageComplexes: canManage,
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
          complex: true,
        },
      });

      if (!room) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      assertCanManage(ctx.session.user, room.hostId);

      const city = room.city ?? room.complex?.city;
      const neighborhood =
        room.neighborhood ?? room.complex?.neighborhood ?? "";
      const addressLine1 =
        room.addressLine1 ?? room.complex?.addressLine1 ?? "";

      if (!city || neighborhood.length === 0 || addressLine1.length === 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Room is missing location details",
        });
      }

      return {
        id: room.id,
        complexId: room.complexId,
        title: room.title,
        description: room.description,
        addressLine1,
        city,
        neighborhood,
        latitude: room.latitude ?? room.complex?.latitude ?? null,
        longitude: room.longitude ?? room.complex?.longitude ?? null,
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

  complexForEdit: agentProcedure
    .input(z.object({ id: z.uuid() }))
    .query(async ({ ctx, input }): Promise<ComplexForEdit> => {
      const complex = await ctx.db.query.Complex.findFirst({
        where: eq(Complex.id, input.id),
        with: { images: true },
      });

      if (!complex) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return {
        id: complex.id,
        title: complex.title,
        description: complex.description,
        addressLine1: complex.addressLine1,
        city: complex.city,
        neighborhood: complex.neighborhood,
        latitude: complex.latitude,
        longitude: complex.longitude,
        petFriendly: complex.petFriendly,
        amenities: toComplexAmenities(complex.amenities),
        images: [...complex.images]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((image) => image.url),
      };
    }),

  create: protectedProcedure
    .input(CreateListingSchema)
    .mutation(async ({ ctx, input }): Promise<CreateListingResult> => {
      const hostId = ctx.session.user.id;
      const selectedComplex =
        input.isComplex && input.complexId
          ? await ctx.db.query.Complex.findFirst({
              where: eq(Complex.id, input.complexId),
            })
          : null;

      const [room] = await ctx.db
        .insert(Room)
        .values({
          ...roomWriteValues(input, hostId, selectedComplex ?? null),
          status: "listed",
        })
        .returning();

      if (!room) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create room",
        });
      }

      await insertRoomImages(ctx.db, room.id, input.images, input.roomTitle);

      await ctx.db
        .update(user)
        .set({
          role: withRole(ctx.session.user.role, "host"),
        })
        .where(eq(user.id, hostId));

      return { complexId: room.complexId, roomId: room.id };
    }),

  update: protectedProcedure
    .input(UpdateListingSchema)
    .mutation(async ({ ctx, input }): Promise<CreateListingResult> => {
      const existing = await ctx.db.query.Room.findFirst({
        where: eq(Room.id, input.id),
        with: { images: true },
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      assertCanManage(ctx.session.user, existing.hostId);

      const selectedComplex =
        input.isComplex && input.complexId
          ? await ctx.db.query.Complex.findFirst({
              where: eq(Complex.id, input.complexId),
            })
          : null;

      const [room] = await ctx.db
        .update(Room)
        .set(
          roomWriteValues(
            input,
            existing.hostId ?? ctx.session.user.id,
            selectedComplex ?? null,
          ),
        )
        .where(eq(Room.id, input.id))
        .returning();

      if (!room) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update room",
        });
      }

      const previousUrls = existing.images.map((image) => image.url);
      const nextUrls = new Set(input.images);
      const removedUrls = previousUrls.filter((url) => !nextUrls.has(url));

      await ctx.db.delete(RoomImage).where(eq(RoomImage.roomId, room.id));
      await insertRoomImages(ctx.db, room.id, input.images, input.roomTitle);
      await deleteBlobUrls(removedUrls);

      return { complexId: room.complexId, roomId: room.id };
    }),

  createComplex: agentProcedure
    .input(CreateComplexSchema)
    .mutation(async ({ ctx, input }): Promise<CreateComplexResult> => {
      const [complex] = await ctx.db
        .insert(Complex)
        .values({
          title: input.title,
          description: input.description,
          addressLine1: input.addressLine1,
          city: input.city,
          neighborhood: input.neighborhood,
          country: "MX",
          latitude: input.latitude ?? null,
          longitude: input.longitude ?? null,
          amenities: toComplexAmenities(input.amenities),
          petFriendly: input.petFriendly,
        })
        .returning();

      if (!complex) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create complex",
        });
      }

      await insertComplexImages(ctx.db, complex.id, input.images, input.title);

      return { complexId: complex.id };
    }),

  updateComplex: agentProcedure
    .input(UpdateComplexSchema)
    .mutation(async ({ ctx, input }): Promise<CreateComplexResult> => {
      const existing = await ctx.db.query.Complex.findFirst({
        where: eq(Complex.id, input.id),
        with: { images: true },
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [complex] = await ctx.db
        .update(Complex)
        .set({
          title: input.title,
          description: input.description,
          addressLine1: input.addressLine1,
          city: input.city,
          neighborhood: input.neighborhood,
          latitude: input.latitude ?? null,
          longitude: input.longitude ?? null,
          amenities: toComplexAmenities(input.amenities),
          petFriendly: input.petFriendly,
        })
        .where(eq(Complex.id, input.id))
        .returning();

      if (!complex) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update complex",
        });
      }

      const previousUrls = existing.images.map((image) => image.url);
      const nextUrls = new Set(input.images);
      const removedUrls = previousUrls.filter((url) => !nextUrls.has(url));

      await ctx.db
        .delete(ComplexImage)
        .where(eq(ComplexImage.complexId, complex.id));
      await insertComplexImages(ctx.db, complex.id, input.images, input.title);
      await deleteBlobUrls(removedUrls);

      return { complexId: complex.id };
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
