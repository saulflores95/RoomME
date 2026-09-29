"use client";

import type { TRPCClientErrorLike } from "@trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import type { AppRouter, RouterOutputs } from "@acme/api";
import type { LeaseMonths } from "@acme/validators";

import { useTRPC } from "~/trpc/react";

type MyApplication = RouterOutputs["application"]["mineForRoom"];
type UnavailableRanges = RouterOutputs["booking"]["unavailableRanges"];

export interface ApplyInput {
  moveInDate: string;
  leaseMonths: LeaseMonths;
  message: string;
}

export interface ApplyPanelState {
  application: MyApplication | undefined;
  unavailable: UnavailableRanges;
  isApplying: boolean;
  isWithdrawing: boolean;
  error: string | null;
  apply: (input: ApplyInput) => void;
  withdraw: (id: string) => void;
}

export const useApplyPanel = (
  listingId: string,
  enabled: boolean,
): ApplyPanelState => {
  const t = useTranslations("rooms");
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const applicationQuery = useQuery({
    ...trpc.application.mineForRoom.queryOptions({ roomId: listingId }),
    enabled,
  });
  const unavailableQuery = useQuery(
    trpc.booking.unavailableRanges.queryOptions({ listingId }),
  );

  const refresh = async (): Promise<void> => {
    await queryClient.invalidateQueries(
      trpc.application.mineForRoom.queryFilter({ roomId: listingId }),
    );
    await queryClient.invalidateQueries(trpc.application.mine.queryFilter());
  };

  const applyMutation = useMutation(
    trpc.application.apply.mutationOptions({ onSuccess: refresh }),
  );
  const withdrawMutation = useMutation(
    trpc.application.withdraw.mutationOptions({ onSuccess: refresh }),
  );

  const toMessage = (
    error: TRPCClientErrorLike<AppRouter> | null,
  ): string | null => {
    if (!error) {
      return null;
    }
    return error.data?.code === "CONFLICT"
      ? t("applyConflict")
      : t("applyFailed");
  };

  return {
    application: applicationQuery.data,
    unavailable: unavailableQuery.data ?? [],
    isApplying: applyMutation.isPending,
    isWithdrawing: withdrawMutation.isPending,
    error: toMessage(applyMutation.error ?? withdrawMutation.error),
    apply: ({ moveInDate, leaseMonths, message }) => {
      const trimmed = message.trim();
      applyMutation.mutate({
        roomId: listingId,
        moveInDate,
        leaseMonths,
        ...(trimmed.length > 0 ? { message: trimmed } : {}),
      });
    },
    withdraw: (id) => {
      withdrawMutation.mutate({ id });
    },
  };
};
