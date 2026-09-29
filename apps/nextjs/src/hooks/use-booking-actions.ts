"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { toast } from "@acme/ui/toast";

import { useTRPC } from "~/trpc/react";

export interface BookingActions {
  cancelBooking: (id: string) => void;
  withdrawApplication: (id: string) => void;
  pendingId: string | null;
}

export const useBookingActions = (): BookingActions => {
  const t = useTranslations("bookings");
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const refresh = async (): Promise<void> => {
    await Promise.all([
      queryClient.invalidateQueries(trpc.booking.mine.queryFilter()),
      queryClient.invalidateQueries(trpc.booking.forHost.queryFilter()),
      queryClient.invalidateQueries(
        trpc.booking.unavailableRanges.queryFilter(),
      ),
      queryClient.invalidateQueries(trpc.application.mine.queryFilter()),
      queryClient.invalidateQueries(trpc.application.mineForRoom.queryFilter()),
      queryClient.invalidateQueries(trpc.application.listForHost.queryFilter()),
    ]);
  };

  const cancel = useMutation(
    trpc.booking.cancel.mutationOptions({
      onSuccess: async () => {
        toast.success(t("cancelled"));
        await refresh();
      },
      onError: () => {
        toast.error(t("actionFailed"));
      },
    }),
  );
  const withdraw = useMutation(
    trpc.application.withdraw.mutationOptions({
      onSuccess: async () => {
        toast.success(t("withdrawn"));
        await refresh();
      },
      onError: () => {
        toast.error(t("actionFailed"));
      },
    }),
  );

  const pendingId = cancel.isPending
    ? cancel.variables.id
    : withdraw.isPending
      ? withdraw.variables.id
      : null;

  return {
    cancelBooking: (id) => {
      cancel.mutate({ id });
    },
    withdrawApplication: (id) => {
      withdraw.mutate({ id });
    },
    pendingId,
  };
};
