"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

export function AgentCalendar(): JSX.Element {
  const t = useTranslations("tours");
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [newSlot, setNewSlot] = useState<Date | null>(null);

  const range = useMemo(() => {
    const from = new Date();
    from.setDate(1);
    from.setHours(0, 0, 0, 0);
    const to = new Date(from);
    to.setMonth(to.getMonth() + 2);
    return { from, to };
  }, []);

  const calendarQuery = useQuery(trpc.tour.agentCalendar.queryOptions(range));

  const activeBooking = (calendarQuery.data ?? []).find(
    (row) => row.id === rescheduleId,
  );

  const slotsQuery = useQuery({
    ...trpc.tour.availableSlots.queryOptions({
      agentId: activeBooking?.agentId ?? "",
      from: range.from,
      to: range.to,
    }),
    enabled: activeBooking != null,
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
        setRescheduleId(null);
        setNewSlot(null);
        await queryClient.invalidateQueries(
          trpc.tour.agentCalendar.queryFilter(),
        );
      },
      onError: () => toast.error(t("actionFailed")),
    }),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("calendarTitle")}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {t("calendarHint")}
        </p>
      </div>

      {(calendarQuery.data ?? []).length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("noBookings")}</p>
      ) : (
        <ul className="space-y-3">
          {(calendarQuery.data ?? []).map((booking) => (
            <li
              key={booking.id}
              className="border-border space-y-2 rounded-2xl border p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/rooms/${booking.roomId}`}
                    className="font-semibold underline-offset-4 hover:underline"
                  >
                    {booking.roomTitle}
                  </Link>
                  <p className="text-muted-foreground text-sm">
                    {booking.roomNeighborhood}
                    {booking.roomCity ? ` · ${booking.roomCity}` : ""}
                  </p>
                  <p className="mt-1 text-sm">
                    {t("withSeeker", { name: booking.seekerName })}
                  </p>
                  <p className="text-sm font-medium">
                    {new Date(booking.startsAt).toLocaleString(undefined, {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setRescheduleId(booking.id);
                      setNewSlot(null);
                    }}
                  >
                    {t("reschedule")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => cancelMutation.mutate({ id: booking.id })}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </div>

              {rescheduleId === booking.id ? (
                <div className="space-y-2 border-t pt-3">
                  <p className="text-sm font-medium">{t("pickNewSlot")}</p>
                  <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
                    {(slotsQuery.data ?? []).map((slot) => {
                      const value = new Date(slot.startsAt);
                      const selected = newSlot?.getTime() === value.getTime();
                      return (
                        <button
                          key={value.toISOString()}
                          type="button"
                          className={`rounded-lg border px-3 py-2 text-left text-sm ${
                            selected
                              ? "border-primary bg-primary/10"
                              : "border-border"
                          }`}
                          onClick={() => setNewSlot(value)}
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
                  <Button
                    type="button"
                    size="sm"
                    disabled={!newSlot || rescheduleMutation.isPending}
                    onClick={() => {
                      if (!newSlot) return;
                      rescheduleMutation.mutate({
                        id: booking.id,
                        startsAt: newSlot,
                      });
                    }}
                  >
                    {t("confirmReschedule")}
                  </Button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
