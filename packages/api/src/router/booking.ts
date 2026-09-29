import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import type { City, ListingType } from "@acme/validators";
import { desc, eq, inArray } from "@acme/db";
import { Application, Room, Stay } from "@acme/db/schema";

import type { StayStatus } from "../lib/availability";
import { isActiveStay, stayStatusFor } from "../lib/availability";
import { loadScopedStays } from "../lib/booking-scope";
import { canManageListing } from "../lib/property-access";
import { protectedProcedure, publicProcedure } from "../trpc";

export interface UnavailableRange {
  start: Date;
  end: Date | null;
}

export interface BookingItem {
  id: string;
  listingId: string;
  listingTitle: string;
  listingType: ListingType;
  neighborhood: string | null;
  city: City | null;
  coverUrl: string | null;
  start: Date;
  end: Date | null;
  status: StayStatus;
  guest: { id: string; name: string; image: string | null };
  host: { id: string; name: string } | null;
}

const bookingRelations = {
  roomie: { columns: { id: true, name: true, image: true } },
  room: {
    with: {
      images: true,
      host: { columns: { id: true, name: true } },
      property: { columns: { city: true, neighborhood: true } },
    },
  },
} as const;

/** Stored status is a snapshot; derive the live one from the dates. */
const effectiveStatus = (stay: {
  status: StayStatus;
  startedAt: Date;
  endedAt: Date | null;
}): StayStatus =>
  stay.status === "cancelled"
    ? "cancelled"
    : stayStatusFor({ start: stay.startedAt, end: stay.endedAt });

interface BookingRow {
  id: string;
  roomId: string;
  startedAt: Date;
  endedAt: Date | null;
  status: StayStatus;
  roomie: { id: string; name: string; image: string | null };
  room: {
    title: string;
    listingType: ListingType;
    neighborhood: string | null;
    city: City | null;
    images: { url: string; sortOrder: number }[];
    host: { id: string; name: string } | null;
    property: { city: City; neighborhood: string } | null;
  };
}

const toBookingItem = (row: BookingRow): BookingItem => ({
  id: row.id,
  listingId: row.roomId,
  listingTitle: row.room.title,
  listingType: row.room.listingType,
  neighborhood:
    row.room.neighborhood ?? row.room.property?.neighborhood ?? null,
  city: row.room.city ?? row.room.property?.city ?? null,
  coverUrl:
    [...row.room.images].sort((a, b) => a.sortOrder - b.sortOrder)[0]?.url ??
    null,
  start: row.startedAt,
  end: row.endedAt,
  status: effectiveStatus(row),
  guest: row.roomie,
  host: row.room.host,
});

export const bookingRouter = {
  /** Booked ranges that block new leases on this listing (for date pickers). */
  unavailableRanges: publicProcedure
    .input(z.object({ listingId: z.uuid() }))
    .query(async ({ ctx, input }): Promise<UnavailableRange[]> => {
      const room = await ctx.db.query.Room.findFirst({
        where: eq(Room.id, input.listingId),
        columns: { id: true, propertyId: true, listingType: true },
      });
      if (!room) {
        return [];
      }

      const now = new Date();
      const { stays } = await loadScopedStays(ctx.db, room);
      return stays
        .filter((stay) => isActiveStay(stay))
        .filter((stay) => stay.end === null || stay.end > now)
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .map((stay) => ({ start: stay.start, end: stay.end }));
    }),

  mine: protectedProcedure.query(async ({ ctx }): Promise<BookingItem[]> => {
    const rows = await ctx.db.query.Stay.findMany({
      where: eq(Stay.userId, ctx.session.user.id),
      with: bookingRelations,
      orderBy: [desc(Stay.startedAt)],
    });
    return rows.map(toBookingItem);
  }),

  forHost: protectedProcedure.query(async ({ ctx }): Promise<BookingItem[]> => {
    const hostedIds = ctx.db
      .select({ id: Room.id })
      .from(Room)
      .where(eq(Room.hostId, ctx.session.user.id));
    const rows = await ctx.db.query.Stay.findMany({
      where: inArray(Stay.roomId, hostedIds),
      with: bookingRelations,
      orderBy: [desc(Stay.startedAt)],
    });
    return rows.map(toBookingItem);
  }),

  /** Guest or host cancels a booking that has not ended yet. */
  cancel: protectedProcedure
    .input(z.object({ id: z.uuid() }))
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const stay = await ctx.db.query.Stay.findFirst({
        where: eq(Stay.id, input.id),
        with: { room: { columns: { hostId: true } } },
      });
      if (!stay) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const actor = ctx.session.user;
      const isGuest = stay.userId === actor.id;
      if (!isGuest && !canManageListing(actor, stay.room)) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const status = effectiveStatus(stay);
      if (status === "cancelled" || status === "past") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This booking can no longer be cancelled",
        });
      }

      await ctx.db.transaction(async (tx) => {
        await tx
          .update(Stay)
          .set({ status: "cancelled" })
          .where(eq(Stay.id, stay.id));
        if (stay.applicationId) {
          await tx
            .update(Application)
            .set({
              status: isGuest ? "withdrawn" : "declined",
              updatedAt: new Date(),
            })
            .where(eq(Application.id, stay.applicationId));
        }
      });

      return { ok: true };
    }),
} satisfies TRPCRouterRecord;
