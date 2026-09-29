"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import { toast } from "@acme/ui/toast";

import { TourAgentCard } from "~/components/tour-agent-card";
import { TourSlotPicker } from "~/components/tour-slot-picker";
import { dateKeyInTourZone, formatTourDateTime } from "~/lib/tour-time";
import { useTRPC } from "~/trpc/react";

type Step = "slot" | "done";

const BOOKING_HORIZON_DAYS = 30;

export function ScheduleTourButton({
  roomId,
}: {
  roomId: string;
}): JSX.Element {
  const t = useTranslations("tours");
  const locale = useLocale();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("slot");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const range = useMemo(() => {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    const to = new Date(from);
    to.setDate(to.getDate() + BOOKING_HORIZON_DAYS);
    return { from, to };
  }, []);

  const minDate = dateKeyInTourZone(range.from);
  const maxDate = dateKeyInTourZone(
    new Date(range.to.getTime() - 24 * 60 * 60 * 1000),
  );

  const hostQuery = useQuery({
    ...trpc.tour.hostForRoom.queryOptions({ roomId }),
    enabled: open,
  });
  const host = hostQuery.data;

  const slotsQuery = useQuery({
    ...trpc.tour.availableSlots.queryOptions({
      roomId,
      from: range.from,
      to: range.to,
    }),
    enabled: open && step === "slot" && host?.hasAvailability === true,
  });

  const bookMutation = useMutation(
    trpc.tour.book.mutationOptions({
      onSuccess: async () => {
        setStep("done");
        toast.success(t("booked"));
        await Promise.all([
          queryClient.invalidateQueries(trpc.tour.availableSlots.queryFilter()),
          queryClient.invalidateQueries(trpc.tour.myBookings.queryFilter()),
          queryClient.invalidateQueries(trpc.tour.agentCalendar.queryFilter()),
        ]);
      },
      onError: () => toast.error(t("bookFailed")),
    }),
  );

  const canConfirm = selectedSlot != null && !bookMutation.isPending;

  const reset = (): void => {
    setStep("slot");
    setSelectedDate("");
    setSelectedSlot(null);
  };

  const renderSlotStep = (): JSX.Element => {
    if (hostQuery.isLoading) {
      return (
        <p className="text-muted-foreground text-sm">{t("loadingHost")}</p>
      );
    }
    if (hostQuery.isError || !host) {
      return <p className="text-destructive text-sm">{t("hostFailed")}</p>;
    }

    return (
      <div className="space-y-4">
        <TourAgentCard
          id={host.id}
          name={host.name}
          image={host.image}
          bio={host.bio}
          age={host.age}
          label={t("hostLabel")}
        />

        {!host.hasAvailability ? (
          <p className="text-muted-foreground text-sm">
            {t("hostNoAvailability")}
          </p>
        ) : slotsQuery.isError ? (
          <p className="text-destructive text-sm">{t("slotsFailed")}</p>
        ) : (
          <TourSlotPicker
            slots={slotsQuery.data ?? []}
            loading={slotsQuery.isLoading}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSelectDate={setSelectedDate}
            onSelectSlot={setSelectedSlot}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">{t("schedule")}</Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("scheduleTitle")}</DialogTitle>
          <DialogDescription>{t("scheduleHint")}</DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {step === "slot" ? renderSlotStep() : null}

          {step === "done" ? (
            <div className="space-y-2 py-4">
              <p className="text-sm font-medium">{t("bookedDetail")}</p>
              {selectedSlot ? (
                <p className="text-muted-foreground text-sm">
                  {formatTourDateTime(selectedSlot, locale)}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {step === "slot" && host?.hasAvailability ? (
          <DialogFooter className="sm:justify-between">
            <p className="text-muted-foreground text-sm">
              {selectedSlot
                ? formatTourDateTime(selectedSlot, locale)
                : t("selectDateAndTime")}
            </p>
            <Button
              type="button"
              variant={canConfirm ? "default" : "outline"}
              disabled={!canConfirm}
              onClick={() => {
                if (!selectedSlot) return;
                bookMutation.mutate({ roomId, startsAt: selectedSlot });
              }}
            >
              {bookMutation.isPending ? t("booking") : t("confirm")}
            </Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
