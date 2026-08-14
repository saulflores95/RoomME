import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { and, avg, count, desc, eq, inArray } from "@acme/db";
import { Application, Room, RoommeRating } from "@acme/db/schema";

import { ageFromBirthDate, roundRatingAverage } from "../lib/profile";
import { protectedProcedure } from "../trpc";

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
  status: "pending" | "accepted" | "declined" | "withdrawn";
  message: string | null;
  createdAt: Date;
  applicant: ApplicantProfileSummary;
}

const toApplicantSummary = async (
  database: typeof import("@acme/db/client").db,
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

export const applicationRouter = {
  apply: protectedProcedure
    .input(
      z.object({
        roomId: z.uuid(),
        message: z.string().max(2000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<{ id: string }> => {
      const room = await ctx.db.query.Room.findFirst({
        where: eq(Room.id, input.roomId),
        columns: { id: true, hostId: true, status: true },
      });

      if (room?.status !== "listed") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Room is not available",
        });
      }

      if (room.hostId === ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot apply to your own room",
        });
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
          message: "You already applied to this room",
        });
      }

      if (existing?.status === "withdrawn") {
        const [updated] = await ctx.db
          .update(Application)
          .set({
            status: "pending",
            message: input.message?.trim() ?? null,
            updatedAt: new Date(),
          })
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
          roomId: input.roomId,
          applicantId: ctx.session.user.id,
          message: input.message?.trim() ?? null,
          status: "pending",
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
      status: RoomApplication["status"];
    } | null> => {
      const application = await ctx.db.query.Application.findFirst({
        where: and(
          eq(Application.roomId, input.roomId),
          eq(Application.applicantId, ctx.session.user.id),
        ),
        columns: { id: true, status: true },
      });

      return application ?? null;
    },
  ),

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

      if (room.hostId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const applications = await ctx.db.query.Application.findMany({
        where: and(
          eq(Application.roomId, input.roomId),
          inArray(Application.status, ["pending", "accepted", "declined"]),
        ),
        with: {
          applicant: {
            columns: {
              id: true,
              name: true,
              image: true,
              bio: true,
              birthDate: true,
            },
          },
        },
        orderBy: [desc(Application.createdAt)],
      });

      const results: RoomApplication[] = [];
      for (const application of applications) {
        results.push({
          id: application.id,
          roomId: application.roomId,
          status: application.status,
          message: application.message,
          createdAt: application.createdAt,
          applicant: await toApplicantSummary(ctx.db, application.applicant),
        });
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
        applications: RoomApplication[];
      }[]
    > => {
      const rooms = await ctx.db.query.Room.findMany({
        where: eq(Room.hostId, ctx.session.user.id),
        columns: { id: true, title: true },
        orderBy: [desc(Room.createdAt)],
      });

      if (rooms.length === 0) {
        return [];
      }

      const roomIds = rooms.map((room) => room.id);
      const applications = await ctx.db.query.Application.findMany({
        where: and(
          inArray(Application.roomId, roomIds),
          inArray(Application.status, ["pending", "accepted", "declined"]),
        ),
        with: {
          applicant: {
            columns: {
              id: true,
              name: true,
              image: true,
              bio: true,
              birthDate: true,
            },
          },
        },
        orderBy: [desc(Application.createdAt)],
      });

      const byRoom = new Map<string, RoomApplication[]>();
      for (const application of applications) {
        const list = byRoom.get(application.roomId) ?? [];
        list.push({
          id: application.id,
          roomId: application.roomId,
          status: application.status,
          message: application.message,
          createdAt: application.createdAt,
          applicant: await toApplicantSummary(ctx.db, application.applicant),
        });
        byRoom.set(application.roomId, list);
      }

      return rooms
        .map((room) => ({
          roomId: room.id,
          roomTitle: room.title,
          applications: byRoom.get(room.id) ?? [],
        }))
        .filter((entry) => entry.applications.length > 0);
    },
  ),
} satisfies TRPCRouterRecord;
