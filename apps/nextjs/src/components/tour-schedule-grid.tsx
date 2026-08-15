"use client";

import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { cn } from "@acme/ui";

import {
  dateKeyInTourZone,
  formatCalendarDateKey,
  formatTourHourLabel,
  formatTourTimeShort,
  minutesOfDayInZone,
  TOUR_TIMEZONE,
  visibleHourRange,
} from "~/lib/tour-time";

export type TourBooking = RouterOutputs["tour"]["myBookings"][number];

const HOUR_PX = 64;
const GUTTER_PX = 64;

interface TourScheduleGridProps {
  dayKeys: string[];
  bookings: TourBooking[];
  onSelectBooking: (booking: TourBooking) => void;
  onSelectDay?: (dateKey: string) => void;
  counterpart?: "agent" | "seeker";
}

const bookingClasses = (status: TourBooking["status"]): string => {
  if (status === "cancelled") {
    return "border-muted-foreground/30 bg-muted/70 text-muted-foreground line-through";
  }
  if (status === "completed") {
    return "border-secondary-foreground/25 bg-secondary text-secondary-foreground";
  }
  return "border-primary bg-primary/12 text-primary hover:bg-primary/18";
};

const isWeekendKey = (dateKey: string): boolean => {
  const [yearStr, monthStr, dayStr] = dateKey.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day)
  ) {
    return false;
  }
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return weekday === 0 || weekday === 6;
};

export function TourScheduleGrid({
  dayKeys,
  bookings,
  onSelectBooking,
  onSelectDay,
  counterpart = "agent",
}: TourScheduleGridProps): JSX.Element {
  const t = useTranslations("tours");
  const locale = useLocale();
  const [now, setNow] = useState(() => new Date());
  const isDayView = dayKeys.length === 1;

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const todayKey = dateKeyInTourZone(now);
  const { startHour, endHour } = useMemo(
    () => visibleHourRange(bookings, TOUR_TIMEZONE),
    [bookings],
  );
  const hours = useMemo(
    () =>
      Array.from(
        { length: endHour - startHour },
        (_, index) => startHour + index,
      ),
    [endHour, startHour],
  );

  const bookingsByDay = useMemo(() => {
    const map = new Map<string, TourBooking[]>();
    for (const key of dayKeys) {
      map.set(key, []);
    }
    for (const booking of bookings) {
      const key = dateKeyInTourZone(new Date(booking.startsAt));
      map.get(key)?.push(booking);
    }
    return map;
  }, [bookings, dayKeys]);

  const nowMinutes = minutesOfDayInZone(now, TOUR_TIMEZONE);
  const nowTop = ((nowMinutes - startHour * 60) / 60) * HOUR_PX;
  const gridHeight = hours.length * HOUR_PX;

  return (
    <div className="bg-card flex min-h-0 min-w-0 flex-1 flex-col">
      <div
        className="border-border/70 grid shrink-0 border-b"
        style={{
          gridTemplateColumns: `${GUTTER_PX}px repeat(${dayKeys.length}, minmax(0, 1fr))`,
        }}
      >
        <div />
        {dayKeys.map((dayKey) => {
          const isToday = dayKey === todayKey;
          const weekday = formatCalendarDateKey(dayKey, locale, {
            weekday: "short",
          });
          const dayNumber = formatCalendarDateKey(dayKey, locale, {
            day: "numeric",
          });
          return (
            <button
              key={dayKey}
              type="button"
              disabled={!onSelectDay}
              onClick={() => onSelectDay?.(dayKey)}
              className={cn(
                "flex flex-col items-center gap-1 py-3",
                onSelectDay && "hover:bg-muted/50 transition-colors",
              )}
            >
              <span
                className={cn(
                  "text-[11px] font-medium tracking-[0.08em] uppercase",
                  isToday ? "text-primary" : "text-muted-foreground",
                )}
              >
                {weekday}
              </span>
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full text-lg font-semibold",
                  isToday && "bg-primary text-primary-foreground",
                )}
              >
                {dayNumber}
              </span>
            </button>
          );
        })}
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <div
          className="grid pt-3"
          style={{
            minWidth: `${GUTTER_PX + dayKeys.length * 112}px`,
            gridTemplateColumns: `${GUTTER_PX}px repeat(${dayKeys.length}, minmax(0, 1fr))`,
          }}
        >
          <div className="relative" style={{ height: gridHeight }}>
            {hours.map((hour) => (
              <div key={hour} className="relative" style={{ height: HOUR_PX }}>
                <span className="text-muted-foreground absolute -top-2 right-3 text-[11px] tabular-nums">
                  {formatTourHourLabel(hour, locale)}
                </span>
              </div>
            ))}
          </div>

          {dayKeys.map((dayKey) => {
            const dayBookings = bookingsByDay.get(dayKey) ?? [];
            const isToday = dayKey === todayKey;
            return (
              <div
                key={dayKey}
                className={cn(
                  "border-border/60 relative border-l",
                  isWeekendKey(dayKey) && "bg-muted/25",
                )}
                style={{ height: gridHeight }}
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="border-border/50 relative border-t"
                    style={{ height: HOUR_PX }}
                  >
                    <div className="border-border/30 absolute inset-x-0 top-1/2 border-t border-dashed" />
                  </div>
                ))}

                {isToday && nowTop >= 0 && nowTop <= gridHeight ? (
                  <div
                    className="pointer-events-none absolute inset-x-0 z-20"
                    style={{ top: nowTop }}
                  >
                    <div className="bg-destructive absolute top-1/2 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                    <div className="bg-destructive h-px w-full" />
                  </div>
                ) : null}

                {dayBookings.map((booking) => {
                  const start = new Date(booking.startsAt);
                  const end = new Date(booking.endsAt);
                  const startMinutes = minutesOfDayInZone(start, TOUR_TIMEZONE);
                  const endMinutes = minutesOfDayInZone(end, TOUR_TIMEZONE);
                  const top =
                    ((startMinutes - startHour * 60) / 60) * HOUR_PX + 2;
                  const height = Math.max(
                    ((endMinutes - startMinutes) / 60) * HOUR_PX - 4,
                    28,
                  );
                  return (
                    <button
                      key={booking.id}
                      type="button"
                      onClick={() => onSelectBooking(booking)}
                      className={cn(
                        "absolute inset-x-1 z-10 overflow-hidden rounded-md border-l-[3px] px-2 py-1 text-left shadow-xs transition-colors",
                        bookingClasses(booking.status),
                      )}
                      style={{ top, height }}
                      aria-label={`${booking.roomTitle}, ${formatTourTimeShort(start, locale)}`}
                    >
                      <p
                        className={cn(
                          "truncate leading-tight font-semibold",
                          isDayView ? "text-sm" : "text-xs",
                        )}
                      >
                        {booking.roomTitle}
                      </p>
                      <p className="truncate text-[11px] leading-tight opacity-80">
                        {formatTourTimeShort(start, locale)}
                        {isDayView || height >= 48
                          ? ` · ${t(
                              counterpart === "seeker"
                                ? "withSeeker"
                                : "withAgent",
                              {
                                name:
                                  counterpart === "seeker"
                                    ? booking.seekerName
                                    : booking.agentName,
                              },
                            )}`
                          : null}
                      </p>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
