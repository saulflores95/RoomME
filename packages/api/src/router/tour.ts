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

import type { Database } from "../lib/listing-write";
import { ageFromBirthDate } from "../lib/profile";
import {
  addCalendarDays,
  calendarDateKey,
  computeAvailableSlots,
  dateKeyInTimeZone,
  startOfZonedDayUtc,
} from "../lib/tour-slots";
import { hostProcedure, protectedProcedure, publicProcedure } from "../trpc";

const SLOT_MINUTES = 60;

const CalendarDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD");

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

export interface TourHostSummary extends TourAgentSummary {
  /** False when the host has no weekly tour hours configured. */
  hasAvailability: boolean;
}

export interface TourBookingItem {
  id: string;
  roomId: string;
  roomTitle: string;
  roomNeighborhood: string | null;
  roomCity: string | null;
  roomAddressLine1: string | null;
  agentId: string;
  agentName: string;
  seekerId: string;
  seekerName: string;
  startsAt: Date;
  endsAt: Date;
  status: "scheduled" | "cancelled" | "completed";
}

const toTourBookingItem = (row: {
  id: string;
  roomId: string;
  agentId: string;
  seekerId: string;
  startsAt: Date;
  endsAt: Date;
  status: "scheduled" | "cancelled" | "completed";
  room: {
    title: string;
    neighborhood: string | null;
    city: string | null;
    addressLine1: string | null;
  };
  agent: { name: string };
  seeker: { name: string };
}): TourBookingItem => ({
  id: row.id,
  roomId: row.roomId,
  roomTitle: row.room.title,
  roomNeighborhood: row.room.neighborhood,
  roomCity: row.room.city,
  roomAddressLine1: row.room.addressLine1,
  agentId: row.agentId,
  agentName: row.agent.name,
  seekerId: row.seekerId,
  seekerName: row.seeker.name,
  startsAt: row.startsAt,
  endsAt: row.endsAt,
  status: row.status,
});

const isAdmin = (role: string | null | undefined): boolean =>
  hasRole(role, "admin");

type HostRow = typeof user.$inferSelect;

interface ListingHost {
  room: typeof Room.$inferSelect;
  host: HostRow;
}

/** Tours are always hosted by the person who created the listing. */
const resolveListingHost = async (
  db: Database,
  roomId: string,
): Promise<ListingHost> => {
  const room = await db.query.Room.findFirst({
    where: and(eq(Room.id, roomId), eq(Room.status, "listed")),
    with: { host: true },
  });
  if (!room?.host) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
  }
  const { host, ...rest } = room;
  return { room: rest, host };
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

const blockedKeysFromRows = (rows: { date: Date }[]): string[] =>
  rows.map((row) => calendarDateKey(row.date));

const zonedDayBounds = (
  instant: Date,
): { dayStart: Date; dayEnd: Date; dayKey: string } => {
  const dayKey = dateKeyInTimeZone(instant);
  const dayStart = startOfZonedDayUtc(dayKey);
  const dayEnd = startOfZonedDayUtc(addCalendarDays(dayKey, 1));
  return { dayStart, dayEnd, dayKey };
};

const calendarDateToDbDate = (dateKey: string): Date =>
  new Date(`${dateKey}T00:00:00.000Z`);

export interface TourSlot {
  startsAt: Date;
}

const hostSlots = async (
  db: Database,
  host: Pick<HostRow, "id" | "role">,
  from: Date,
  to: Date,
): Promise<TourSlot[]> => {
  const hours = await db.query.AgentWeeklyHours.findMany({
    where: eq(AgentWeeklyHours.agentId, host.id),
  });
  const blocked = await db.query.AgentBlockedDate.findMany({
    where: eq(AgentBlockedDate.agentId, host.id),
  });
  const bookings = await db.query.TourBooking.findMany({
    where: and(
      eq(TourBooking.agentId, host.id),
      eq(TourBooking.status, "scheduled"),
      gte(TourBooking.startsAt, from),
      lte(TourBooking.startsAt, to),
    ),
  });

  return computeAvailableSlots({
    from,
    to,
    weeklyHours: resolveWeeklyHours(host.role, hours),
    blockedDateKeys: blockedKeysFromRows(blocked),
    existingStarts: bookings.map((row) => row.startsAt),
    slotMinutes: SLOT_MINUTES,
  }).map((startsAt) => ({ startsAt }));
};

export const tourRouter = {
  hostForRoom: publicProcedure
    .input(z.object({ roomId: z.uuid() }))
    .query(async ({ ctx, input }): Promise<TourHostSummary> => {
      const { host } = await resolveListingHost(ctx.db, input.roomId);
      const hours = await ctx.db.query.AgentWeeklyHours.findMany({
        where: eq(AgentWeeklyHours.agentId, host.id),
        columns: {
          id: true,
          dayOfWeek: true,
          startMinute: true,
          endMinute: true,
        },
      });

      return {
        id: host.id,
        name: host.name,
        image: host.image ?? null,
        bio: host.bio ?? null,
        age: ageFromBirthDate(host.birthDate),
        hobbies: host.hobbies,
        personalities: host.personalities,
        hasPets: host.hasPets,
        hasAvailability: resolveWeeklyHours(host.role, hours).length > 0,
      };
    }),

  myWeeklyHours: hostProcedure.query(async ({ ctx }) => {
    return ctx.db.query.AgentWeeklyHours.findMany({
      where: eq(AgentWeeklyHours.agentId, ctx.session.user.id),
      orderBy: (table, { asc }) => [
        asc(table.dayOfWeek),
        asc(table.startMinute),
      ],
    });
  }),

  setWeeklyHours: hostProcedure
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

  myBlockedDates: hostProcedure.query(async ({ ctx }) => {
    return ctx.db.query.AgentBlockedDate.findMany({
      where: eq(AgentBlockedDate.agentId, ctx.session.user.id),
      orderBy: (table, { asc }) => [asc(table.date)],
    });
  }),

  addBlockedDate: hostProcedure
    .input(
      z.object({
        date: CalendarDateSchema,
        note: z.string().max(256).optional(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<{ id: string }> => {
      const date = calendarDateToDbDate(input.date);
      const existing = await ctx.db.query.AgentBlockedDate.findFirst({
        where: and(
          eq(AgentBlockedDate.agentId, ctx.session.user.id),
          eq(AgentBlockedDate.date, date),
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
          date,
          note: input.note,
        })
        .returning({ id: AgentBlockedDate.id });

      if (!row) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return { id: row.id };
    }),

  removeBlockedDate: hostProcedure
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
        roomId: z.uuid(),
        from: z.coerce.date(),
        to: z.coerce.date(),
      }),
    )
    .query(async ({ ctx, input }): Promise<TourSlot[]> => {
      const { host } = await resolveListingHost(ctx.db, input.roomId);
      return hostSlots(ctx.db, host, input.from, input.to);
    }),

  /** Open slots of the signed-in host, used when rescheduling. */
  mySlots: hostProcedure
    .input(
      z.object({
        from: z.coerce.date(),
        to: z.coerce.date(),
      }),
    )
    .query(async ({ ctx, input }): Promise<TourSlot[]> => {
      const host = await ctx.db.query.user.findFirst({
        where: eq(user.id, ctx.session.user.id),
        columns: { id: true, role: true },
      });
      if (!host) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return hostSlots(ctx.db, host, input.from, input.to);
    }),

  book: protectedProcedure
    .input(
      z.object({
        roomId: z.uuid(),
        startsAt: z.coerce.date(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<{ id: string }> => {
      const { room, host: agent } = await resolveListingHost(
        ctx.db,
        input.roomId,
      );
      if (agent.id === ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can't book a tour of your own listing",
        });
      }

      const { dayStart, dayEnd } = zonedDayBounds(input.startsAt);

      const slots = await ctx.db.query.AgentWeeklyHours.findMany({
        where: eq(AgentWeeklyHours.agentId, agent.id),
      });
      const blocked = await ctx.db.query.AgentBlockedDate.findMany({
        where: eq(AgentBlockedDate.agentId, agent.id),
      });
      const existing = await ctx.db.query.TourBooking.findMany({
        where: and(
          eq(TourBooking.agentId, agent.id),
          eq(TourBooking.status, "scheduled"),
          gte(TourBooking.startsAt, dayStart),
          lte(TourBooking.startsAt, dayEnd),
        ),
      });

      const available = computeAvailableSlots({
        from: dayStart,
        to: dayEnd,
        weeklyHours: resolveWeeklyHours(agent.role, slots),
        blockedDateKeys: blockedKeysFromRows(blocked),
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

      try {
        const [booking] = await ctx.db
          .insert(TourBooking)
          .values({
            roomId: input.roomId,
            agentId: agent.id,
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
      } catch (error) {
        if (
          error instanceof Error &&
          /tour_booking_agent_starts_scheduled_uidx|unique/i.test(error.message)
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Slot is no longer available",
          });
        }
        throw error;
      }
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

  reschedule: hostProcedure
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

      const { dayStart, dayEnd } = zonedDayBounds(input.startsAt);

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
        weeklyHours: resolveWeeklyHours(booking.agent.role, hours),
        blockedDateKeys: blockedKeysFromRows(blocked),
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

      try {
        await ctx.db
          .update(TourBooking)
          .set({
            startsAt: input.startsAt,
            endsAt,
            rescheduledFromId: booking.id,
          })
          .where(eq(TourBooking.id, input.id));
      } catch (error) {
        if (
          error instanceof Error &&
          /tour_booking_agent_starts_scheduled_uidx|unique/i.test(error.message)
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Slot is no longer available",
          });
        }
        throw error;
      }

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

      return rows.map(toTourBookingItem);
    },
  ),

  agentCalendar: hostProcedure
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
          inArray(TourBooking.status, ["scheduled", "cancelled", "completed"]),
        ),
        with: {
          room: true,
          agent: true,
          seeker: true,
        },
        orderBy: (table, { asc }) => [asc(table.startsAt)],
      });

      return rows.map(toTourBookingItem);
    }),
} satisfies TRPCRouterRecord;
