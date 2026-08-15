"use client";

import type { JSX } from "react";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { toast } from "@acme/ui/toast";

import { TourCalendarView } from "~/components/tour-calendar-view";
import { EMPTY_TOUR_BOOKINGS } from "~/lib/tour-calendar-events";
import { useTRPC } from "~/trpc/react";

const SLOTS_HORIZON_DAYS = 60;

export function AgentCalendar(): JSX.Element {
  const t = useTranslations("tours");
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const range = useMemo(() => {
    const from = new Date();
    from.setMonth(from.getMonth() - 6);
    from.setHours(0, 0, 0, 0);
    const to = new Date();
    to.setMonth(to.getMonth() + 12);
    return { from, to };
  }, []);

  const slotsRange = useMemo(() => {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    const to = new Date(from);
    to.setDate(to.getDate() + SLOTS_HORIZON_DAYS);
    return { from, to };
  }, []);

  const calendarQuery = useQuery(trpc.tour.agentCalendar.queryOptions(range));
  const bookings = calendarQuery.data ?? EMPTY_TOUR_BOOKINGS;
  const agentId = bookings[0]?.agentId ?? "";

  const slotsQuery = useQuery({
    ...trpc.tour.availableSlots.queryOptions({
      agentId,
      from: slotsRange.from,
      to: slotsRange.to,
    }),
    enabled: agentId.length > 0,
  });

  const cancelMutation = useMutation(
    trpc.tour.cancel.mutationOptions({
      onSuccess: async () => {
        toast.success(t("cancelled"));
        await queryClient.invalidateQueries(
          trpc.tour.agentCalendar.queryFilter(),
        );
      },
      onError: () => toast.error(t("actionFailed")),
    }),
  );

  const rescheduleMutation = useMutation(
    trpc.tour.reschedule.mutationOptions({
      onSuccess: async () => {
        toast.success(t("rescheduled"));
        await Promise.all([
          queryClient.invalidateQueries(trpc.tour.agentCalendar.queryFilter()),
          queryClient.invalidateQueries(trpc.tour.availableSlots.queryFilter()),
        ]);
      },
      onError: () => toast.error(t("actionFailed")),
    }),
  );

  return (
    <TourCalendarView
      title={t("calendarTitle")}
      hint={t("calendarHint")}
      emptyLabel={t("noBookings")}
      counterpart="seeker"
      bookings={bookings}
      loading={calendarQuery.isLoading}
      cancelPending={cancelMutation.isPending}
      onCancel={(id) => cancelMutation.mutate({ id })}
      onReschedule={(id, startsAt) =>
        rescheduleMutation.mutate({ id, startsAt })
      }
      reschedulePending={rescheduleMutation.isPending}
      rescheduleSlots={slotsQuery.data ?? []}
      rescheduleSlotsLoading={slotsQuery.isLoading}
      rescheduleSlotsError={slotsQuery.isError}
    />
  );
}
