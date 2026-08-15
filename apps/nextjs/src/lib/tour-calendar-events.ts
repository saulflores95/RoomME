import type { RouterOutputs } from "@acme/api";

import type { CalendarEventInput } from "~/lib/calendar-export";
import { toTourCalendarEvent } from "~/lib/calendar-export";
import { dateKeyInTourZone, weekDateKeys } from "~/lib/tour-time";

type TourBooking = RouterOutputs["tour"]["myBookings"][number];

export const EMPTY_TOUR_BOOKINGS: TourBooking[] = [];

export const focusedTourDateKey = (
  bookings: TourBooking[],
  firstWeekday: number,
  now: Date = new Date(),
): string => {
  const todayKey = dateKeyInTourZone(now);
  const thisWeek = weekDateKeys(todayKey, firstWeekday);
  const weekStart = thisWeek[0] ?? todayKey;
  const weekEnd = thisWeek[thisWeek.length - 1] ?? todayKey;
  const hasTourThisWeek = bookings.some((booking) => {
    if (booking.status !== "scheduled") return false;
    const key = dateKeyInTourZone(new Date(booking.startsAt));
    return key >= weekStart && key <= weekEnd;
  });
  if (hasTourThisWeek) {
    return todayKey;
  }

  const upcoming = bookings
    .filter(
      (booking) =>
        booking.status === "scheduled" &&
        new Date(booking.startsAt).getTime() >= now.getTime(),
    )
    .sort(
      (left, right) =>
        new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime(),
    )[0];

  return upcoming ? dateKeyInTourZone(new Date(upcoming.startsAt)) : todayKey;
};

export const scheduledCalendarEvents = (
  bookings: TourBooking[],
  copy: (booking: TourBooking) => { title: string; description: string },
): CalendarEventInput[] =>
  bookings
    .filter((booking) => booking.status === "scheduled")
    .slice()
    .sort(
      (left, right) =>
        new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime(),
    )
    .map((booking) => toTourCalendarEvent(booking, copy(booking)));
