"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { toast } from "@acme/ui/toast";

import { useTRPC } from "~/trpc/react";

export interface ApplicationActions {
  accept: (id: string) => void;
  decline: (id: string) => void;
  pendingId: string | null;
}

/** Host-side accept and decline, refreshing every view that shows bookings. */
export const useApplicationActions = (): ApplicationActions => {
  const t = useTranslations("host");
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const refresh = async (): Promise<void> => {
    await Promise.all([
      queryClient.invalidateQueries(trpc.application.listForRoom.queryFilter()),
      queryClient.invalidateQueries(trpc.application.listForHost.queryFilter()),
      queryClient.invalidateQueries(trpc.booking.forHost.queryFilter()),
      queryClient.invalidateQueries(
        trpc.booking.unavailableRanges.queryFilter(),
      ),
    ]);
  };

  const accept = useMutation(
    trpc.application.accept.mutationOptions({
      onSuccess: async () => {
        toast.success(t("accepted"));
        await refresh();
      },
      onError: (error) => {
        toast.error(
          error.data?.code === "CONFLICT"
            ? t("acceptConflict")
            : t("actionFailed"),
        );
      },
    }),
  );
  const decline = useMutation(
    trpc.application.decline.mutationOptions({
      onSuccess: async () => {
        toast.success(t("declined"));
        await refresh();
      },
      onError: () => {
        toast.error(t("actionFailed"));
      },
    }),
  );

  const pendingId = accept.isPending
    ? accept.variables.id
    : decline.isPending
      ? decline.variables.id
      : null;

  return {
    accept: (id) => {
      accept.mutate({ id });
    },
    decline: (id) => {
      decline.mutate({ id });
    },
    pendingId,
  };
};
