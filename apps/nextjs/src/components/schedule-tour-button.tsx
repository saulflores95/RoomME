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

import { AgentAvatar, TourAgentCard } from "~/components/tour-agent-card";
import { TourSlotPicker } from "~/components/tour-slot-picker";
import { Link } from "~/i18n/navigation";
import { dateKeyInTourZone, formatTourDateTime } from "~/lib/tour-time";
import { useTRPC } from "~/trpc/react";

type Step = "agent" | "slot" | "done";

const BOOKING_HORIZON_DAYS = 30;

export function ScheduleTourButton({
  roomId,
  city,
}: {
  roomId: string;
  city: "queretaro";
}): JSX.Element {
  const t = useTranslations("tours");
  const locale = useLocale();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("agent");
  const [agentId, setAgentId] = useState<string | null>(null);
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

  const agentsQuery = useQuery({
    ...trpc.tour.listAgentsForCity.queryOptions({ city }),
    enabled: open,
  });

  const slotsQuery = useQuery({
    ...trpc.tour.availableSlots.queryOptions({
      agentId: agentId ?? "",
      from: range.from,
      to: range.to,
    }),
    enabled: open && step === "slot" && agentId != null,
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

  const selectedAgent = (agentsQuery.data ?? []).find(
    (agent) => agent.id === agentId,
  );

  const reset = (): void => {
    setStep("agent");
    setAgentId(null);
    setSelectedDate("");
    setSelectedSlot(null);
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
          {step === "agent" ? (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">{t("whoIsAgent")}</h3>
              {agentsQuery.isLoading ? (
                <p className="text-muted-foreground text-sm">
                  {t("loadingAgents")}
                </p>
              ) : agentsQuery.isError ? (
                <p className="text-destructive text-sm">{t("agentsFailed")}</p>
              ) : (agentsQuery.data ?? []).length === 0 ? (
                <p className="text-muted-foreground text-sm">{t("noAgents")}</p>
              ) : (
                <ul className="space-y-2">
                  {(agentsQuery.data ?? []).map((agent) => (
                    <li key={agent.id}>
                      <button
                        type="button"
                        className="border-border hover:bg-muted/50 flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors"
                        onClick={() => {
                          setAgentId(agent.id);
                          setSelectedDate("");
                          setSelectedSlot(null);
                          setStep("slot");
                        }}
                      >
                        <AgentAvatar name={agent.name} image={agent.image} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">
                            {agent.name}
                            {agent.age != null ? `, ${agent.age}` : ""}
                          </p>
                          <p className="text-muted-foreground line-clamp-2 text-xs">
                            {agent.bio ?? t("noBio")}
                          </p>
                          <Link
                            href={`/profiles/${agent.id}`}
                            className="text-brand text-xs underline"
                            onClick={(event) => event.stopPropagation()}
                          >
                            {t("viewProfile")}
                          </Link>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}

          {step === "slot" && selectedAgent ? (
            <div className="space-y-4">
              <TourAgentCard
                id={selectedAgent.id}
                name={selectedAgent.name}
                image={selectedAgent.image}
                bio={selectedAgent.bio}
                age={selectedAgent.age}
                onChange={reset}
              />

              {slotsQuery.isError ? (
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
          ) : null}

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

        {step === "slot" ? (
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
                if (!selectedSlot || !agentId) return;
                bookMutation.mutate({
                  roomId,
                  agentId,
                  startsAt: selectedSlot,
                });
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
