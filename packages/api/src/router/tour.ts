import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { sendTourBookingEmails } from "@acme/auth/email";
import { hasRole } from "@acme/auth/roles";
import { and, eq, gte, inArray, lte, ne } from "@acme/db";
import {
  AgentBlockedDate,
  AgentWeeklyHours,
  Room,
  TourBooking,
  user,
} from "@acme/db/schema";
import { CitySchema } from "@acme/validators";

import { ageFromBirthDate } from "../lib/profile";
import { computeAvailableSlots } from "../lib/tour-slots";
import { agentProcedure, protectedProcedure, publicProcedure } from "../trpc";

const SLOT_MINUTES = 60;

const DEFAULT_ADMIN_HOURS = [1, 2, 3, 4, 5].map((dayOfWeek) => ({
  dayOfWeek,
  startMinute: 10 * 60,
  endMinute: 18 * 60,
}));

export interface TourAgentSummary {
  id: string;
  name: string;
  image: string | null;
  bio: string | null;
  age: number | null;
  hobbies: string[];
  personalities: string[];
  hasPets: boolean;
}

export interface TourBookingItem {
  id: string;
  roomId: string;
  roomTitle: string;
  roomNeighborhood: string | null;
  roomCity: string | null;
  agentId: string;
  agentName: string;
  seekerId: string;
  seekerName: string;
  startsAt: Date;
  endsAt: Date;
  status: "scheduled" | "cancelled" | "completed";
}

const isAdmin = (role: string | null | undefined): boolean =>
  hasRole(role, "admin");

const isAgentBookable = (row: {
  role: string | null;
  documentUrl: string | null;
}): boolean => {
  if (isAdmin(row.role)) {
    return true;
  }
  if (!hasRole(row.role, "agent")) {
    return false;
  }
  return Boolean(row.documentUrl);
};

const operatesInCity = (
  row: {
    role: string | null;
    operatingCities: string[];
  },
  city: string,
): boolean => {
  if (isAdmin(row.role)) {
    return true;
  }
  return row.operatingCities.includes(city);
};

const resolveWeeklyHours = <
  T extends { dayOfWeek: number; startMinute: number; endMinute: number },
>(
  role: string | null | undefined,
  hours: T[],
): T[] | typeof DEFAULT_ADMIN_HOURS => {
  if (hours.length > 0) {
    return hours;
  }
  if (isAdmin(role)) {
    return DEFAULT_ADMIN_HOURS;
  }
  return hours;
};

export const tourRouter = {
  listAgentsForCity: publicProcedure
    .input(z.object({ city: CitySchema }))
    .query(async ({ ctx, input }): Promise<TourAgentSummary[]> => {
      const agents = await ctx.db
        .select({
          id: user.id,
          name: user.name,
          image: user.image,
          bio: user.bio,
          birthDate: user.birthDate,
          hobbies: user.hobbies,
          personalities: user.personalities,
          hasPets: user.hasPets,
          role: user.role,
          documentUrl: user.documentUrl,
          operatingCities: user.operatingCities,
        })
        .from(user);

      const withHours = await ctx.db
        .selectDistinct({ agentId: AgentWeeklyHours.agentId })
        .from(AgentWeeklyHours);

      const hourSet = new Set(withHours.map((row) => row.agentId));

      return agents
        .filter((agent) => {
          if (!isAgentBookable(agent)) {
            return false;
          }
          if (isAdmin(agent.role)) {
            return true;
          }
          return operatesInCity(agent, input.city) && hourSet.has(agent.id);
        })
        .map((agent) => ({
          id: agent.id,
          name: agent.name,
          image: agent.image ?? null,
          bio: agent.bio ?? null,
          age: ageFromBirthDate(agent.birthDate),
          hobbies: agent.hobbies,
          personalities: agent.personalities,
          hasPets: agent.hasPets,
        }));
    }),

  myWeeklyHours: agentProcedure.query(async ({ ctx }) => {
    return ctx.db.query.AgentWeeklyHours.findMany({
      where: eq(AgentWeeklyHours.agentId, ctx.session.user.id),
      orderBy: (table, { asc }) => [
        asc(table.dayOfWeek),
        asc(table.startMinute),
      ],
    });
  }),

  setWeeklyHours: agentProcedure
    .input(
      z.object({
        hours: z.array(
          z.object({
            dayOfWeek: z.number().int().min(0).max(6),
            startMinute: z.number().int().min(0).max(1439),
            endMinute: z.number().int().min(1).max(1440),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      for (const hour of input.hours) {
        if (hour.endMinute <= hour.startMinute) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "endMinute must be after startMinute",
          });
        }
      }

      await ctx.db
        .delete(AgentWeeklyHours)
        .where(eq(AgentWeeklyHours.agentId, ctx.session.user.id));

      if (input.hours.length > 0) {
        await ctx.db.insert(AgentWeeklyHours).values(
          input.hours.map((hour) => ({
            agentId: ctx.session.user.id,
            dayOfWeek: hour.dayOfWeek,
            startMinute: hour.startMinute,
            endMinute: hour.endMinute,
          })),
        );
      }

      return { ok: true };
    }),

  myBlockedDates: agentProcedure.query(async ({ ctx }) => {
    return ctx.db.query.AgentBlockedDate.findMany({
      where: eq(AgentBlockedDate.agentId, ctx.session.user.id),
      orderBy: (table, { asc }) => [asc(table.date)],
    });
  }),

  addBlockedDate: agentProcedure
    .input(
      z.object({
        date: z.coerce.date(),
        note: z.string().max(256).optional(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<{ id: string }> => {
      const existing = await ctx.db.query.AgentBlockedDate.findFirst({
        where: and(
          eq(AgentBlockedDate.agentId, ctx.session.user.id),
          eq(AgentBlockedDate.date, input.date),
        ),
      });
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Date already blocked",
        });
      }

      const [row] = await ctx.db
        .insert(AgentBlockedDate)
        .values({
          agentId: ctx.session.user.id,
          date: input.date,
          note: input.note,
        })
        .returning({ id: AgentBlockedDate.id });

      if (!row) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return { id: row.id };
    }),

  removeBlockedDate: agentProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      await ctx.db
        .delete(AgentBlockedDate)
        .where(
          and(
            eq(AgentBlockedDate.id, input.id),
            eq(AgentBlockedDate.agentId, ctx.session.user.id),
          ),
        );
      return { ok: true };
    }),

  availableSlots: publicProcedure
    .input(
      z.object({
        agentId: z.string().min(1),
        from: z.coerce.date(),
        to: z.coerce.date(),
      }),
    )
    .query(async ({ ctx, input }): Promise<{ startsAt: Date }[]> => {
      const agentRow = await ctx.db.query.user.findFirst({
        where: eq(user.id, input.agentId),
        columns: { role: true, documentUrl: true },
      });
      if (!agentRow || !isAgentBookable(agentRow)) {
        return [];
      }

      const hours = await ctx.db.query.AgentWeeklyHours.findMany({
        where: eq(AgentWeeklyHours.agentId, input.agentId),
      });
      const blocked = await ctx.db.query.AgentBlockedDate.findMany({
        where: eq(AgentBlockedDate.agentId, input.agentId),
      });
      const bookings = await ctx.db.query.TourBooking.findMany({
        where: and(
          eq(TourBooking.agentId, input.agentId),
          eq(TourBooking.status, "scheduled"),
          gte(TourBooking.startsAt, input.from),
          lte(TourBooking.startsAt, input.to),
        ),
      });

      return computeAvailableSlots({
        from: input.from,
        to: input.to,
        weeklyHours: resolveWeeklyHours(agentRow.role, hours),
        blockedDates: blocked.map((row) => row.date),
        existingStarts: bookings.map((row) => row.startsAt),
        slotMinutes: SLOT_MINUTES,
      }).map((startsAt) => ({ startsAt }));
    }),

  book: protectedProcedure
    .input(
      z.object({
        roomId: z.string().uuid(),
        agentId: z.string().min(1),
        startsAt: z.coerce.date(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<{ id: string }> => {
      const room = await ctx.db.query.Room.findFirst({
        where: and(eq(Room.id, input.roomId), eq(Room.status, "listed")),
        with: { complex: true },
      });
      if (!room) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
      }

      const city = room.city ?? room.complex?.city ?? null;
      if (!city) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Room has no city",
        });
      }

      const agent = await ctx.db.query.user.findFirst({
        where: eq(user.id, input.agentId),
      });
      if (!agent || !isAgentBookable(agent)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Agent not available",
        });
      }
      if (!operatesInCity(agent, city)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Agent does not operate in this city",
        });
      }

      const dayStart = new Date(input.startsAt);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const slots = await ctx.db.query.AgentWeeklyHours.findMany({
        where: eq(AgentWeeklyHours.agentId, input.agentId),
      });
      const blocked = await ctx.db.query.AgentBlockedDate.findMany({
        where: eq(AgentBlockedDate.agentId, input.agentId),
      });
      const existing = await ctx.db.query.TourBooking.findMany({
        where: and(
          eq(TourBooking.agentId, input.agentId),
          eq(TourBooking.status, "scheduled"),
          gte(TourBooking.startsAt, dayStart),
          lte(TourBooking.startsAt, dayEnd),
        ),
      });

      const available = computeAvailableSlots({
        from: dayStart,
        to: dayEnd,
        weeklyHours: resolveWeeklyHours(agent.role, slots),
        blockedDates: blocked.map((row) => row.date),
        existingStarts: existing.map((row) => row.startsAt),
        slotMinutes: SLOT_MINUTES,
      });

      const match = available.some(
        (slot) => slot.getTime() === input.startsAt.getTime(),
      );
      if (!match) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Slot is no longer available",
        });
      }

      const endsAt = new Date(input.startsAt.getTime() + SLOT_MINUTES * 60_000);
      const [booking] = await ctx.db
        .insert(TourBooking)
        .values({
          roomId: input.roomId,
          agentId: input.agentId,
          seekerId: ctx.session.user.id,
          startsAt: input.startsAt,
          endsAt,
          status: "scheduled",
        })
        .returning({ id: TourBooking.id });

      if (!booking) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      const seeker = await ctx.db.query.user.findFirst({
        where: eq(user.id, ctx.session.user.id),
      });

      if (agent.email && seeker?.email) {
        await sendTourBookingEmails({
          agentEmail: agent.email,
          agentName: agent.name,
          seekerEmail: seeker.email,
          seekerName: seeker.name,
          roomTitle: room.title,
          startsAt: input.startsAt,
          kind: "booked",
        });
      }

      return { id: booking.id };
    }),

  cancel: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const booking = await ctx.db.query.TourBooking.findFirst({
        where: eq(TourBooking.id, input.id),
        with: {
          room: true,
          agent: true,
          seeker: true,
        },
      });
      if (booking?.status !== "scheduled") {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const uid = ctx.session.user.id;
      if (booking.seekerId !== uid && booking.agentId !== uid) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db
        .update(TourBooking)
        .set({ status: "cancelled" })
        .where(eq(TourBooking.id, input.id));

      await sendTourBookingEmails({
        agentEmail: booking.agent.email,
        agentName: booking.agent.name,
        seekerEmail: booking.seeker.email,
        seekerName: booking.seeker.name,
        roomTitle: booking.room.title,
        startsAt: booking.startsAt,
        kind: "cancelled",
      });

      return { ok: true };
    }),

  reschedule: agentProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        startsAt: z.coerce.date(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<{ ok: true }> => {
      const booking = await ctx.db.query.TourBooking.findFirst({
        where: and(
          eq(TourBooking.id, input.id),
          eq(TourBooking.agentId, ctx.session.user.id),
          eq(TourBooking.status, "scheduled"),
        ),
        with: {
          room: true,
          agent: true,
          seeker: true,
        },
      });
      if (!booking) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const dayStart = new Date(input.startsAt);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const hours = await ctx.db.query.AgentWeeklyHours.findMany({
        where: eq(AgentWeeklyHours.agentId, ctx.session.user.id),
      });
      const blocked = await ctx.db.query.AgentBlockedDate.findMany({
        where: eq(AgentBlockedDate.agentId, ctx.session.user.id),
      });
      const existing = await ctx.db.query.TourBooking.findMany({
        where: and(
          eq(TourBooking.agentId, ctx.session.user.id),
          eq(TourBooking.status, "scheduled"),
          ne(TourBooking.id, input.id),
          gte(TourBooking.startsAt, dayStart),
          lte(TourBooking.startsAt, dayEnd),
        ),
      });

      const available = computeAvailableSlots({
        from: dayStart,
        to: dayEnd,
        weeklyHours: hours,
        blockedDates: blocked.map((row) => row.date),
        existingStarts: existing.map((row) => row.startsAt),
        slotMinutes: SLOT_MINUTES,
      });

      if (
        !available.some((slot) => slot.getTime() === input.startsAt.getTime())
      ) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Slot is no longer available",
        });
      }

      const endsAt = new Date(input.startsAt.getTime() + SLOT_MINUTES * 60_000);
      await ctx.db
        .update(TourBooking)
        .set({
          startsAt: input.startsAt,
          endsAt,
          rescheduledFromId: booking.id,
        })
        .where(eq(TourBooking.id, input.id));

      await sendTourBookingEmails({
        agentEmail: booking.agent.email,
        agentName: booking.agent.name,
        seekerEmail: booking.seeker.email,
        seekerName: booking.seeker.name,
        roomTitle: booking.room.title,
        startsAt: input.startsAt,
        kind: "rescheduled",
      });

      return { ok: true };
    }),

  myBookings: protectedProcedure.query(
    async ({ ctx }): Promise<TourBookingItem[]> => {
      const rows = await ctx.db.query.TourBooking.findMany({
        where: eq(TourBooking.seekerId, ctx.session.user.id),
        with: {
          room: true,
          agent: true,
          seeker: true,
        },
        orderBy: (table, { desc }) => [desc(table.startsAt)],
      });

      return rows.map((row) => ({
        id: row.id,
        roomId: row.roomId,
        roomTitle: row.room.title,
        roomNeighborhood: row.room.neighborhood,
        roomCity: row.room.city,
        agentId: row.agentId,
        agentName: row.agent.name,
        seekerId: row.seekerId,
        seekerName: row.seeker.name,
        startsAt: row.startsAt,
        endsAt: row.endsAt,
        status: row.status,
      }));
    },
  ),

  agentCalendar: agentProcedure
    .input(
      z.object({
        from: z.coerce.date(),
        to: z.coerce.date(),
      }),
    )
    .query(async ({ ctx, input }): Promise<TourBookingItem[]> => {
      const rows = await ctx.db.query.TourBooking.findMany({
        where: and(
          eq(TourBooking.agentId, ctx.session.user.id),
          gte(TourBooking.startsAt, input.from),
          lte(TourBooking.startsAt, input.to),
          inArray(TourBooking.status, ["scheduled", "completed"]),
        ),
        with: {
          room: true,
          agent: true,
          seeker: true,
        },
        orderBy: (table, { asc }) => [asc(table.startsAt)],
      });

      return rows.map((row) => ({
        id: row.id,
        roomId: row.roomId,
        roomTitle: row.room.title,
        roomNeighborhood: row.room.neighborhood,
        roomCity: row.room.city,
        agentId: row.agentId,
        agentName: row.agent.name,
        seekerId: row.seekerId,
        seekerName: row.seeker.name,
        startsAt: row.startsAt,
        endsAt: row.endsAt,
        status: row.status,
      }));
    }),
} satisfies TRPCRouterRecord;
