"use client";

import type { JSX } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { toast } from "@acme/ui/toast";

import { TourCalendarView } from "~/components/tour-calendar-view";
import { EMPTY_TOUR_BOOKINGS } from "~/lib/tour-calendar-events";
import { useTRPC } from "~/trpc/react";

export function MyTours(): JSX.Element {
  const t = useTranslations("tours");
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const bookingsQuery = useQuery(trpc.tour.myBookings.queryOptions());

  const cancelMutation = useMutation(
    trpc.tour.cancel.mutationOptions({
      onSuccess: async () => {
        toast.success(t("cancelled"));
        await queryClient.invalidateQueries(trpc.tour.myBookings.queryFilter());
      },
      onError: () => toast.error(t("actionFailed")),
    }),
  );

  return (
    <TourCalendarView
      title={t("myToursTitle")}
      hint={t("myToursHint")}
      emptyLabel={t("noMyBookings")}
      counterpart="agent"
      bookings={bookingsQuery.data ?? EMPTY_TOUR_BOOKINGS}
      loading={bookingsQuery.isLoading}
      cancelPending={cancelMutation.isPending}
      onCancel={(id) => cancelMutation.mutate({ id })}
    />
  );
}
