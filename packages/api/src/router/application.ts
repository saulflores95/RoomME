import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import type { db } from "@acme/db/client";
import type { ListingType } from "@acme/validators";
import { and, avg, count, desc, eq, inArray } from "@acme/db";
import { Application, Room, RoommeRating, Stay } from "@acme/db/schema";
import { ApplyToListingSchema } from "@acme/validators";

import { leaseRange, stayStatusFor } from "../lib/availability";
import { findScopedConflicts, lockBookingScope } from "../lib/booking-scope";
import { ageFromBirthDate, roundRatingAverage } from "../lib/profile";
import { canManageListing } from "../lib/property-access";
import { dateKeyInTimeZone } from "../lib/tour-slots";
import { protectedProcedure } from "../trpc";

export type ApplicationStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "withdrawn";

export interface ApplicantProfileSummary {
  id: string;
  name: string;
  image: string | null;
  bio: string | null;
  age: number | null;
  ratingAverage: number | null;
  ratingCount: number;
}

export interface RoomApplication {
  id: string;
  roomId: string;
  status: ApplicationStatus;
  message: string | null;
  moveInDate: string | null;
  leaseMonths: number | null;
  createdAt: Date;
  applicant: ApplicantProfileSummary;
}

export interface MyApplication {
  id: string;
  roomId: string;
  roomTitle: string;
  listingType: ListingType;
  status: ApplicationStatus;
  moveInDate: string | null;
  leaseMonths: number | null;
  createdAt: Date;
}

class BookingConflictError extends TRPCError {
  constructor() {
    super({
      code: "CONFLICT",
      message: "Those dates overlap an existing booking.",
    });
  }
}

const applicantColumns = {
  id: true,
  name: true,
  image: true,
  bio: true,
  birthDate: true,
} as const;

const VISIBLE_TO_HOST: ApplicationStatus[] = [
  "pending",
  "accepted",
  "declined",
];

const toApplicantSummary = async (
  database: typeof db,
  applicant: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    birthDate: Date | null;
  },
): Promise<ApplicantProfileSummary> => {
  const [aggregate] = await database
    .select({
      average: avg(RoommeRating.score),
      count: count(),
    })
    .from(RoommeRating)
    .where(eq(RoommeRating.rateeId, applicant.id));

  const ratingCount = Number(aggregate?.count ?? 0);
  const averageRaw =
    aggregate?.average == null ? null : Number(aggregate.average);

  return {
    id: applicant.id,
    name: applicant.name,
    image: applicant.image ?? null,
    bio: applicant.bio ?? null,
    age: ageFromBirthDate(applicant.birthDate),
    ratingAverage: roundRatingAverage(averageRaw),
    ratingCount,
  };
};

const toRoomApplication = async (
  database: typeof db,
  application: {
    id: string;
    roomId: string;
    status: ApplicationStatus;
    message: string | null;
    moveInDate: string | null;
    leaseMonths: number | null;
    createdAt: Date;
    applicant: {
      id: string;
      name: string;
      image: string | null;
      bio: string | null;
      birthDate: Date | null;
    };
  },
): Promise<RoomApplication> => ({
  id: application.id,
  roomId: application.roomId,
  status: application.status,
  message: application.message,
  moveInDate: application.moveInDate,
  leaseMonths: application.leaseMonths,
  createdAt: application.createdAt,
  applicant: await toApplicantSummary(database, application.applicant),
});

/** Loads an application with its listing and checks the actor hosts it. */
const loadForHost = async (
  database: typeof db,
  actor: { id: string; role?: string | null },
  applicationId: string,
): Promise<{
  application: typeof Application.$inferSelect;
  room: typeof Room.$inferSelect;
}> => {
  const application = await database.query.Application.findFirst({
    where: eq(Application.id, applicationId),
    with: { room: true },
  });
  if (!application) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }
  if (!canManageListing(actor, application.room)) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  const { room, ...rest } = application;
  return { application: rest, room };
};

export const applicationRouter = {
  apply: protectedProcedure
    .input(ApplyToListingSchema)
    .mutation(async ({ ctx, input }): Promise<{ id: string }> => {
      const room = await ctx.db.query.Room.findFirst({
        where: eq(Room.id, input.roomId),
        columns: {
          id: true,
          hostId: true,
          status: true,
          propertyId: true,
          listingType: true,
        },
      });

      if (room?.status !== "listed") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Listing is not available",
        });
      }

      if (room.hostId === ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot apply to your own listing",
        });
      }

      if (input.moveInDate < dateKeyInTimeZone(new Date())) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Move-in date must be today or later",
        });
      }

      const conflicts = await findScopedConflicts(
        ctx.db,
        room,
        leaseRange(input.moveInDate, input.leaseMonths),
      );
      if (conflicts.length > 0) {
        throw new BookingConflictError();
      }

      const existing = await ctx.db.query.Application.findFirst({
        where: and(
          eq(Application.roomId, input.roomId),
          eq(Application.applicantId, ctx.session.user.id),
        ),
      });

      if (existing && existing.status !== "withdrawn") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You already applied to this listing",
        });
      }

      const values = {
        message: input.message?.trim() ?? null,
        moveInDate: input.moveInDate,
        leaseMonths: input.leaseMonths,
        status: "pending" as const,
      };

      if (existing) {
        const [updated] = await ctx.db
          .update(Application)
          .set({ ...values, updatedAt: new Date() })
          .where(eq(Application.id, existing.id))
          .returning({ id: Application.id });

        if (!updated) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }

        return { id: updated.id };
      }

      const [created] = await ctx.db
        .insert(Application)
        .values({
          ...values,
          roomId: input.roomId,
          applicantId: ctx.session.user.id,
        })
        .returning({ id: Application.id });

      if (!created) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return { id: created.id };
    }),

  mineForRoom: protectedProcedure.input(z.object({ roomId: z.uuid() })).query(
    async ({
      ctx,
      input,
    }): Promise<{
      id: string;
      status: ApplicationStatus;
      moveInDate: string | null;
      leaseMonths: number | null;
    } | null> => {
      const application = await ctx.db.query.Application.findFirst({
        where: and(
          eq(Application.roomId, input.roomId),
          eq(Application.applicantId, ctx.session.user.id),
        ),
        columns: {
          id: true,
          status: true,
          moveInDate: true,
          leaseMonths: true,
        },
      });

      return application ?? null;
    },
  ),

  mine: protectedProcedure.query(async ({ ctx }): Promise<MyApplication[]> => {
    const rows = await ctx.db.query.Application.findMany({
      where: eq(Application.applicantId, ctx.session.user.id),
      with: { room: { columns: { title: true, listingType: true } } },
      orderBy: [desc(Application.createdAt)],
    });

    return rows.map((row) => ({
      id: row.id,
      roomId: row.roomId,
      roomTitle: row.room.title,
      listingType: row.room.listingType,
      status: row.status,
      moveInDate: row.moveInDate,
      leaseMonths: row.leaseMonths,
      createdAt: row.createdAt,
    }));
  }),

  listForRoom: protectedProcedure
    .input(z.object({ roomId: z.uuid() }))
    .query(async ({ ctx, input }): Promise<RoomApplication[]> => {
      const room = await ctx.db.query.Room.findFirst({
        where: eq(Room.id, input.roomId),
        columns: { id: true, hostId: true },
      });

      if (!room) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (!canManageListing(ctx.session.user, room)) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const applications = await ctx.db.query.Application.findMany({
        where: and(
          eq(Application.roomId, input.roomId),
          inArray(Application.status, VISIBLE_TO_HOST),
        ),
        with: { applicant: { columns: applicantColumns } },
        orderBy: [desc(Application.createdAt)],
      });

      const results: RoomApplication[] = [];
      for (const application of applications) {
        results.push(await toRoomApplication(ctx.db, application));
      }

      return results;
    }),

  listForHost: protectedProcedure.query(
    async ({
      ctx,
    }): Promise<
      {
        roomId: string;
        roomTitle: string;
        listingType: ListingType;
        applications: RoomApplication[];
      }[]
    > => {
      const rooms = await ctx.db.query.Room.findMany({
        where: eq(Room.hostId, ctx.session.user.id),
        columns: { id: true, title: true, listingType: true },
        orderBy: [desc(Room.createdAt)],
      });

      if (rooms.length === 0) {
        return [];
      }

      const roomIds = rooms.map((room) => room.id);
      const applications = await ctx.db.query.Application.findMany({
        where: and(
          inArray(Application.roomId, roomIds),
          inArray(Application.status, VISIBLE_TO_HOST),
        ),
        with: { applicant: { columns: applicantColumns } },
        orderBy: [desc(Application.createdAt)],
      });

      const byRoom = new Map<string, RoomApplication[]>();
      for (const application of applications) {
        const list = byRoom.get(application.roomId) ?? [];
        list.push(await toRoomApplication(ctx.db, application));
        byRoom.set(application.roomId, list);
      }

      return rooms
        .map((room) => ({
          roomId: room.id,
          roomTitle: room.title,
          listingType: room.listingType,
          applications: byRoom.get(room.id) ?? [],
        }))
        .filter((entry) => entry.applications.length > 0);
    },
  ),

  /**
   * Host accepts an application, creating a booked stay. Runs under a lock on
   * the listing's conflict scope so two overlapping accepts cannot both win.
   */
  accept: protectedProcedure
    .input(z.object({ id: z.uuid() }))
    .mutation(async ({ ctx, input }): Promise<{ stayId: string }> => {
      const { application, room } = await loadForHost(
        ctx.db,
        ctx.session.user,
        input.id,
      );

      if (application.status !== "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only pending applications can be accepted",
        });
      }

      const moveInDate =
        application.moveInDate ?? dateKeyInTimeZone(new Date());
      const leaseMonths = application.leaseMonths ?? room.leaseMonths;
      const range = leaseRange(moveInDate, leaseMonths);

      const stayId = await ctx.db.transaction(async (tx) => {
        await lockBookingScope(tx, room);

        const conflicts = await findScopedConflicts(tx, room, range);
        if (conflicts.length > 0) {
          throw new BookingConflictError();
        }

        const [stay] = await tx
          .insert(Stay)
          .values({
            roomId: room.id,
            userId: application.applicantId,
            applicationId: application.id,
            startedAt: range.start,
            endedAt: range.end,
            status: stayStatusFor(range),
          })
          .returning({ id: Stay.id });

        if (!stay) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }

        await tx
          .update(Application)
          .set({
            status: "accepted",
            moveInDate,
            leaseMonths,
            updatedAt: new Date(),
          })
          .where(eq(Application.id, application.id));

        return stay.id;
      });

      return { stayId };
    }),

  decline: protectedProcedure
    .input(z.object({ id: z.uuid() }))
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const { application } = await loadForHost(
        ctx.db,
        ctx.session.user,
        input.id,
      );

      if (application.status !== "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only pending applications can be declined",
        });
      }

      await ctx.db
        .update(Application)
        .set({ status: "declined", updatedAt: new Date() })
        .where(eq(Application.id, application.id));

      return { ok: true };
    }),

  withdraw: protectedProcedure
    .input(z.object({ id: z.uuid() }))
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const application = await ctx.db.query.Application.findFirst({
        where: and(
          eq(Application.id, input.id),
          eq(Application.applicantId, ctx.session.user.id),
        ),
        columns: { id: true, status: true },
      });

      if (!application) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (application.status !== "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only pending applications can be withdrawn",
        });
      }

      await ctx.db
        .update(Application)
        .set({ status: "withdrawn", updatedAt: new Date() })
        .where(eq(Application.id, application.id));

      return { ok: true };
    }),
} satisfies TRPCRouterRecord;
