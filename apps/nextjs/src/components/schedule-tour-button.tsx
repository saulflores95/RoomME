"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

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

import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

type Step = "agent" | "slot" | "done";

export function ScheduleTourButton({
  roomId,
  city,
}: {
  roomId: string;
  city: "queretaro";
}): JSX.Element {
  const t = useTranslations("tours");
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("agent");
  const [agentId, setAgentId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const range = useMemo(() => {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    const to = new Date(from);
    to.setDate(to.getDate() + 14);
    return { from, to };
  }, []);

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
        await queryClient.invalidateQueries();
      },
      onError: () => toast.error(t("bookFailed")),
    }),
  );

  const selectedAgent = (agentsQuery.data ?? []).find(
    (agent) => agent.id === agentId,
  );

  const reset = (): void => {
    setStep("agent");
    setAgentId(null);
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
        <Button type="button" variant="secondary">
          {t("schedule")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("scheduleTitle")}</DialogTitle>
          <DialogDescription>{t("scheduleHint")}</DialogDescription>
        </DialogHeader>

        {step === "agent" ? (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">{t("whoIsAgent")}</h3>
            {(agentsQuery.data ?? []).length === 0 ? (
              <p className="text-muted-foreground text-sm">{t("noAgents")}</p>
            ) : (
              <ul className="space-y-2">
                {(agentsQuery.data ?? []).map((agent) => (
                  <li key={agent.id}>
                    <button
                      type="button"
                      className="border-border hover:bg-muted/50 flex w-full items-center gap-3 rounded-xl border p-3 text-left"
                      onClick={() => {
                        setAgentId(agent.id);
                        setStep("slot");
                      }}
                    >
                      {agent.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={agent.image}
                          alt=""
                          className="size-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="bg-muted flex size-12 items-center justify-center rounded-full text-lg font-semibold">
                          {agent.name.slice(0, 1)}
                        </span>
                      )}
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
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium">
                  {t("agentLabel")}: {selectedAgent.name}
                </p>
                <Link
                  href={`/profiles/${selectedAgent.id}`}
                  className="text-brand text-xs underline"
                >
                  {t("viewProfile")}
                </Link>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={reset}>
                {t("changeAgent")}
              </Button>
            </div>
            <div className="grid max-h-64 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
              {(slotsQuery.data ?? []).map((slot) => {
                const value = new Date(slot.startsAt);
                const selected = selectedSlot?.getTime() === value.getTime();
                return (
                  <button
                    key={value.toISOString()}
                    type="button"
                    className={`rounded-lg border px-3 py-2 text-left text-sm ${
                      selected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/40"
                    }`}
                    onClick={() => setSelectedSlot(value)}
                  >
                    {value.toLocaleString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </button>
                );
              })}
            </div>
            {(slotsQuery.data ?? []).length === 0 ? (
              <p className="text-muted-foreground text-sm">{t("noSlots")}</p>
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                disabled={!selectedSlot || bookMutation.isPending}
                onClick={() => {
                  if (!selectedSlot || !agentId) return;
                  bookMutation.mutate({
                    roomId,
                    agentId,
                    startsAt: selectedSlot,
                  });
                }}
              >
                {t("confirm")}
              </Button>
            </DialogFooter>
          </div>
        ) : null}

        {step === "done" ? (
          <p className="text-sm">{t("bookedDetail")}</p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
