import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { eq } from "@acme/db";
import { RoommeRating } from "@acme/db/schema";

import { publicProcedure } from "../trpc";

export const ratingRouter = {
  byUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.RoommeRating.findMany({
        where: eq(RoommeRating.rateeId, input.userId),
      });
    }),
} satisfies TRPCRouterRecord;
