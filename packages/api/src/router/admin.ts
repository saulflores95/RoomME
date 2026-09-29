import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import type { ListingType, PropertyType } from "@acme/validators";
import { hasRole, withoutRole, withRole } from "@acme/auth/roles";
import { desc, eq } from "@acme/db";
import { Property, Room, user } from "@acme/db/schema";

import { deleteBlobUrls } from "../blob";
import { adminProcedure } from "../trpc";

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: string | null;
  agentApproved: boolean;
  createdAt: Date;
}

export interface AdminRoomRow {
  id: string;
  title: string;
  neighborhood: string | null;
  city: string | null;
  status: "draft" | "listed" | "occupied" | "unlisted";
  listingType: ListingType;
  hostName: string | null;
  hostEmail: string | null;
  createdAt: Date;
}

export interface AdminPropertyRow {
  id: string;
  title: string;
  neighborhood: string;
  city: string;
  propertyType: PropertyType;
  ownerName: string | null;
  roomCount: number;
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

  rooms: adminProcedure.query(async ({ ctx }): Promise<AdminRoomRow[]> => {
    const rows = await ctx.db.query.Room.findMany({
      columns: {
        id: true,
        title: true,
        neighborhood: true,
        city: true,
        status: true,
        listingType: true,
        createdAt: true,
      },
      with: {
        host: { columns: { name: true, email: true } },
      },
      orderBy: [desc(Room.createdAt)],
    });

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      neighborhood: row.neighborhood,
      city: row.city,
      status: row.status,
      listingType: row.listingType,
      hostName: row.host?.name ?? null,
      hostEmail: row.host?.email ?? null,
      createdAt: row.createdAt,
    }));
  }),

  properties: adminProcedure.query(
    async ({ ctx }): Promise<AdminPropertyRow[]> => {
      const rows = await ctx.db.query.Property.findMany({
        columns: {
          id: true,
          title: true,
          neighborhood: true,
          city: true,
          propertyType: true,
          createdAt: true,
        },
        with: {
          rooms: { columns: { id: true } },
          owner: { columns: { name: true } },
        },
        orderBy: [desc(Property.createdAt)],
      });

      return rows.map((row) => ({
        id: row.id,
        title: row.title,
        neighborhood: row.neighborhood,
        city: row.city,
        propertyType: row.propertyType,
        ownerName: row.owner?.name ?? null,
        roomCount: row.rooms.length,
        createdAt: row.createdAt,
      }));
    },
  ),

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
          role: input.approved
            ? withRole(target.role, "agent")
            : withoutRole(target.role, "agent"),
          updatedAt: new Date(),
        })
        .where(eq(user.id, input.userId));

      return { ok: true };
    }),

  removeAgent: adminProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      if (input.userId === ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot remove your own agent access.",
        });
      }

      const target = await ctx.db.query.user.findFirst({
        where: eq(user.id, input.userId),
        columns: { id: true, role: true },
      });

      if (!target) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (hasRole(target.role, "admin")) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You cannot remove an admin.",
        });
      }

      await ctx.db
        .update(user)
        .set({
          agentApproved: false,
          role: withoutRole(target.role, "agent"),
          updatedAt: new Date(),
        })
        .where(eq(user.id, input.userId));

      return { ok: true };
    }),

  deleteRoom: adminProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const room = await ctx.db.query.Room.findFirst({
        where: eq(Room.id, input.id),
        with: { images: true },
      });

      if (!room) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const urls = room.images.map((image) => image.url);
      await ctx.db.delete(Room).where(eq(Room.id, input.id));
      await deleteBlobUrls(urls);
      return { ok: true };
    }),

  deleteProperty: adminProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const property = await ctx.db.query.Property.findFirst({
        where: eq(Property.id, input.id),
        with: {
          images: true,
          rooms: { with: { images: true } },
        },
      });

      if (!property) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const urls = [
        ...property.images.map((image) => image.url),
        ...property.rooms.flatMap((room) =>
          room.images.map((image) => image.url),
        ),
      ];

      await ctx.db.delete(Property).where(eq(Property.id, input.id));
      await deleteBlobUrls(urls);
      return { ok: true };
    }),
} satisfies TRPCRouterRecord;
