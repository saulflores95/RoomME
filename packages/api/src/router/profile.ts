import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { avg, count, desc, eq } from "@acme/db";
import { RoommeRating, user } from "@acme/db/schema";

import { ageFromBirthDate, roundRatingAverage } from "../lib/profile";
import { publicProcedure } from "../trpc";

export interface PublicProfile {
  id: string;
  name: string;
  image: string | null;
  bio: string | null;
  age: number | null;
  role: string | null;
  isHost: boolean;
  ratingAverage: number | null;
  ratingCount: number;
  ratings: {
    id: string;
    score: number;
    comment: string | null;
    createdAt: Date;
    rater: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
}

export const profileRouter = {
  byId: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ ctx, input }): Promise<PublicProfile> => {
      const profile = await ctx.db.query.user.findFirst({
        where: eq(user.id, input.userId),
        columns: {
          id: true,
          name: true,
          image: true,
          bio: true,
          birthDate: true,
          role: true,
        },
      });

      if (!profile) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [aggregate] = await ctx.db
        .select({
          average: avg(RoommeRating.score),
          count: count(),
        })
        .from(RoommeRating)
        .where(eq(RoommeRating.rateeId, input.userId));

      const ratings = await ctx.db.query.RoommeRating.findMany({
        where: eq(RoommeRating.rateeId, input.userId),
        columns: {
          id: true,
          score: true,
          comment: true,
          createdAt: true,
        },
        with: {
          rater: {
            columns: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: [desc(RoommeRating.createdAt)],
        limit: 20,
      });

      const role = profile.role ?? null;
      const ratingCount = Number(aggregate?.count ?? 0);
      const averageRaw =
        aggregate?.average == null ? null : Number(aggregate.average);

      return {
        id: profile.id,
        name: profile.name,
        image: profile.image ?? null,
        bio: profile.bio ?? null,
        age: ageFromBirthDate(profile.birthDate),
        role,
        isHost: role?.split(",").includes("host") ?? false,
        ratingAverage: roundRatingAverage(averageRaw),
        ratingCount,
        ratings: ratings.map((rating) => ({
          id: rating.id,
          score: rating.score,
          comment: rating.comment,
          createdAt: rating.createdAt,
          rater: {
            id: rating.rater.id,
            name: rating.rater.name,
            image: rating.rater.image ?? null,
          },
        })),
      };
    }),
} satisfies TRPCRouterRecord;
