"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useLocale, useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Calendar, calendarLocales } from "@acme/ui/calendar";

import { AddToCalendarMenu } from "~/components/add-to-calendar-menu";
import { TourBookingDialog } from "~/components/tour-booking-dialog";
import { TourScheduleGrid } from "~/components/tour-schedule-grid";
import {
  EMPTY_TOUR_BOOKINGS,
  focusedTourDateKey,
  scheduledCalendarEvents,
} from "~/lib/tour-calendar-events";
import {
  addCalendarDays,
  dateKeyInTourZone,
  firstWeekdayForLocale,
  formatCalendarDateKey,
  formatCalendarDateRange,
  parseCalendarDateKey,
  TOUR_TIMEZONE,
  weekDateKeys,
} from "~/lib/tour-time";

type TourBooking = RouterOutputs["tour"]["myBookings"][number];
type TourStatus = TourBooking["status"];
type CalendarView = "week" | "day";

const STATUS_FILTERS: TourStatus[] = ["scheduled", "cancelled", "completed"];

export interface TourCalendarViewProps {
  title: string;
  hint: string;
  emptyLabel: string;
  counterpart: "agent" | "seeker";
  bookings: TourBooking[];
  loading: boolean;
  cancelPending: boolean;
  onCancel: (id: string) => void;
  onReschedule?: (id: string, startsAt: Date) => void;
  reschedulePending?: boolean;
  rescheduleSlots?: { startsAt: Date | string }[];
  rescheduleSlotsLoading?: boolean;
  rescheduleSlotsError?: boolean;
}

export function TourCalendarView({
  title,
  hint,
  emptyLabel,
  counterpart,
  bookings,
  loading,
  cancelPending,
  onCancel,
  onReschedule,
  reschedulePending = false,
  rescheduleSlots = [],
  rescheduleSlotsLoading = false,
  rescheduleSlotsError = false,
}: TourCalendarViewProps): JSX.Element {
  const t = useTranslations("tours");
  const locale = useLocale();
  const firstWeekday = firstWeekdayForLocale(locale);

  const [view, setView] = useState<CalendarView>("week");
  const [userAnchorKey, setUserAnchorKey] = useState<string | null>(null);
  const [visibleStatuses, setVisibleStatuses] = useState<TourStatus[]>([
    "scheduled",
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const list = bookings.length > 0 ? bookings : EMPTY_TOUR_BOOKINGS;
  const derivedAnchorKey = useMemo(
    () => focusedTourDateKey(list, firstWeekday),
    [firstWeekday, list],
  );
  const anchorKey = userAnchorKey ?? derivedAnchorKey;

  const dayKeys = useMemo(
    () =>
      view === "week" ? weekDateKeys(anchorKey, firstWeekday) : [anchorKey],
    [anchorKey, firstWeekday, view],
  );
  const rangeStart = dayKeys[0] ?? anchorKey;
  const rangeEnd = dayKeys[dayKeys.length - 1] ?? anchorKey;

  const filteredBookings = useMemo(
    () => list.filter((booking) => visibleStatuses.includes(booking.status)),
    [list, visibleStatuses],
  );

  const visibleBookings = useMemo(() => {
    const start = rangeStart;
    const end = rangeEnd;
    return filteredBookings.filter((booking) => {
      const key = dateKeyInTourZone(new Date(booking.startsAt));
      return key >= start && key <= end;
    });
  }, [filteredBookings, rangeEnd, rangeStart]);

  const daysWithBookings = useMemo(() => {
    const keys = new Set<string>();
    for (const booking of filteredBookings) {
      keys.add(dateKeyInTourZone(new Date(booking.startsAt)));
    }
    return keys;
  }, [filteredBookings]);

  const selectedBooking =
    list.find((booking) => booking.id === selectedId) ?? null;

  const calendarEvents = useMemo(
    () =>
      scheduledCalendarEvents(list, (booking) => ({
        title: t("calendarEventTitle", { title: booking.roomTitle }),
        description: t("calendarEventDescription", {
          name:
            counterpart === "seeker" ? booking.seekerName : booking.agentName,
        }),
      })),
    [counterpart, list, t],
  );

  const statusLabel = (status: TourStatus): string => {
    if (status === "scheduled") return t("statusScheduled");
    if (status === "cancelled") return t("statusCancelled");
    return t("statusCompleted");
  };

  const toggleStatus = (status: TourStatus): void => {
    setVisibleStatuses((current) =>
      current.includes(status)
        ? current.filter((value) => value !== status)
        : [...current, status],
    );
  };

  const shiftRange = (direction: -1 | 1): void => {
    const days = view === "week" ? 7 : 1;
    setUserAnchorKey(addCalendarDays(anchorKey, days * direction));
  };

  const calendarSelected = parseCalendarDateKey(anchorKey);

  const rangeLabel =
    view === "week"
      ? formatCalendarDateRange(rangeStart, rangeEnd, locale)
      : formatCalendarDateKey(anchorKey, locale, {
          weekday: "long",
          month: "long",
          day: "numeric",
        });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{hint}</p>
        </div>
        <AddToCalendarMenu events={calendarEvents} />
      </div>

      <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-xs">
        <div className="border-border/70 flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setUserAnchorKey(dateKeyInTourZone(new Date()))}
            >
              {t("today")}
            </Button>
            <div className="flex items-center">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => shiftRange(-1)}
                aria-label={t("previousRange")}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => shiftRange(1)}
                aria-label={t("nextRange")}
              >
                <ChevronRightIcon />
              </Button>
            </div>
            <p className="text-sm font-semibold tracking-tight">{rangeLabel}</p>
          </div>

          <div className="bg-muted inline-flex w-fit rounded-full p-0.5">
            {(["week", "day"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setView(option)}
                className={cn(
                  "rounded-full px-3.5 py-1 text-sm font-medium transition-colors",
                  view === option
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option === "week" ? t("viewWeek") : t("viewDay")}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-144 flex-col lg:flex-row">
          <aside className="border-border/70 hidden w-72 shrink-0 flex-col gap-5 border-r px-4 py-4 lg:flex">
            <Calendar
              mode="single"
              selected={calendarSelected}
              onSelect={(date) => {
                if (!date) return;
                setUserAnchorKey(dateKeyInTourZone(date));
              }}
              modifiers={{
                hasBooking: (date) =>
                  daysWithBookings.has(dateKeyInTourZone(date)),
              }}
              modifiersClassNames={{
                hasBooking:
                  "after:bg-primary after:absolute after:bottom-0.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full",
              }}
              locale={
                locale in calendarLocales
                  ? calendarLocales[locale as keyof typeof calendarLocales]
                  : calendarLocales.en
              }
              timeZone={TOUR_TIMEZONE}
              className="w-full p-0"
            />

            <div className="space-y-2">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {t("filterStatus")}
              </p>
              <div className="flex flex-col gap-1">
                {STATUS_FILTERS.map((status) => {
                  const active = visibleStatuses.includes(status);
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => toggleStatus(status)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          status === "scheduled" && "bg-primary",
                          status === "cancelled" && "bg-muted-foreground/50",
                          status === "completed" &&
                            "bg-secondary-foreground/50",
                        )}
                      />
                      {statusLabel(status)}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex min-h-128 min-w-0 flex-1 flex-col">
            {loading ? (
              <p className="text-muted-foreground px-4 py-3 text-sm">
                {t("loadingSlots")}
              </p>
            ) : list.length === 0 ? (
              <p className="text-muted-foreground px-4 py-3 text-sm">
                {emptyLabel}
              </p>
            ) : null}

            <TourScheduleGrid
              dayKeys={dayKeys}
              bookings={visibleBookings}
              counterpart={counterpart}
              onSelectBooking={(booking) => setSelectedId(booking.id)}
              onSelectDay={
                view === "week"
                  ? (dateKey) => {
                      setUserAnchorKey(dateKey);
                      setView("day");
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>

      <TourBookingDialog
        booking={selectedBooking}
        counterpart={counterpart}
        cancelPending={cancelPending}
        onClose={() => setSelectedId(null)}
        onCancel={(id) => {
          onCancel(id);
          setSelectedId(null);
        }}
        onReschedule={
          onReschedule
            ? (id, startsAt) => {
                onReschedule(id, startsAt);
                setSelectedId(null);
              }
            : undefined
        }
        reschedulePending={reschedulePending}
        rescheduleSlots={rescheduleSlots}
        rescheduleSlotsLoading={rescheduleSlotsLoading}
        rescheduleSlotsError={rescheduleSlotsError}
      />
    </div>
  );
}
