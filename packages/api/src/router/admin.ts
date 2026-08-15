import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { withRole } from "@acme/auth/roles";
import { desc, eq } from "@acme/db";
import { user } from "@acme/db/schema";

import { adminProcedure } from "../trpc";

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: string | null;
  agentApproved: boolean;
  createdAt: Date;
}

export const adminRouter = {
  users: adminProcedure.query(async ({ ctx }): Promise<AdminUserRow[]> => {
    const rows = await ctx.db.query.user.findMany({
      columns: {
        id: true,
        name: true,
        email: true,
        role: true,
        agentApproved: true,
        createdAt: true,
      },
      orderBy: [desc(user.createdAt)],
    });

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role ?? null,
      agentApproved: row.agentApproved,
      createdAt: row.createdAt,
    }));
  }),

  setAgentApproval: adminProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        approved: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      if (input.userId === ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot change your own agent approval.",
        });
      }

      const target = await ctx.db.query.user.findFirst({
        where: eq(user.id, input.userId),
        columns: { id: true, role: true },
      });

      if (!target) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await ctx.db
        .update(user)
        .set({
          agentApproved: input.approved,
          role: input.approved ? withRole(target.role, "agent") : target.role,
          updatedAt: new Date(),
        })
        .where(eq(user.id, input.userId));

      return { ok: true };
    }),
} satisfies TRPCRouterRecord;
