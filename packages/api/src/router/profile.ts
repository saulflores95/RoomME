import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { hasRole } from "@acme/auth/roles";
import { avg, count, desc, eq } from "@acme/db";
import { RoommeRating, user } from "@acme/db/schema";
import { CitySchema } from "@acme/validators";

import { ageFromBirthDate, roundRatingAverage } from "../lib/profile";
import { protectedProcedure, publicProcedure } from "../trpc";

export interface PublicProfile {
  id: string;
  name: string;
  image: string | null;
  bio: string | null;
  age: number | null;
  hobbies: string[];
  personalities: string[];
  hasPets: boolean;
  operatingCities: string[];
  role: string | null;
  isHost: boolean;
  isAgent: boolean;
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

export interface MyProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  bio: string | null;
  birthDate: Date | null;
  hobbies: string[];
  personalities: string[];
  hasPets: boolean;
  documentUrl: string | null;
  operatingCities: string[];
  role: string | null;
  isAgent: boolean;
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
          hobbies: true,
          personalities: true,
          hasPets: true,
          operatingCities: true,
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
        hobbies: profile.hobbies,
        personalities: profile.personalities,
        hasPets: profile.hasPets,
        operatingCities: profile.operatingCities,
        role,
        isHost: hasRole(role, "host"),
        isAgent: hasRole(role, "agent") || hasRole(role, "admin"),
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

  me: protectedProcedure.query(async ({ ctx }): Promise<MyProfile> => {
    const profile = await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session.user.id),
    });
    if (!profile) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    const role = profile.role ?? null;
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      image: profile.image ?? null,
      bio: profile.bio ?? null,
      birthDate: profile.birthDate ?? null,
      hobbies: profile.hobbies,
      personalities: profile.personalities,
      hasPets: profile.hasPets,
      documentUrl: profile.documentUrl ?? null,
      operatingCities: profile.operatingCities,
      role,
      isAgent: hasRole(role, "agent") || hasRole(role, "admin"),
    };
  }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(120).optional(),
        bio: z.string().max(2000).nullable().optional(),
        birthDate: z.coerce.date().nullable().optional(),
        image: z.string().url().nullable().optional(),
        hobbies: z.array(z.string().min(1).max(64)).max(20).optional(),
        personalities: z.array(z.string().min(1).max(64)).max(20).optional(),
        hasPets: z.boolean().optional(),
        documentUrl: z.string().url().nullable().optional(),
        operatingCities: z.array(CitySchema).optional(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      await ctx.db
        .update(user)
        .set({
          ...(input.name !== undefined ? { name: input.name } : {}),
          ...(input.bio !== undefined ? { bio: input.bio } : {}),
          ...(input.birthDate !== undefined
            ? { birthDate: input.birthDate }
            : {}),
          ...(input.image !== undefined ? { image: input.image } : {}),
          ...(input.hobbies !== undefined ? { hobbies: input.hobbies } : {}),
          ...(input.personalities !== undefined
            ? { personalities: input.personalities }
            : {}),
          ...(input.hasPets !== undefined ? { hasPets: input.hasPets } : {}),
          ...(input.documentUrl !== undefined
            ? { documentUrl: input.documentUrl }
            : {}),
          ...(input.operatingCities !== undefined
            ? { operatingCities: input.operatingCities }
            : {}),
          updatedAt: new Date(),
        })
        .where(eq(user.id, ctx.session.user.id));

      return { ok: true };
    }),
} satisfies TRPCRouterRecord;
