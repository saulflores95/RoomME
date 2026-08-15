"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@acme/ui/dialog";

import { AddToCalendarMenu } from "~/components/add-to-calendar-menu";
import { TourSlotPicker } from "~/components/tour-slot-picker";
import { Link } from "~/i18n/navigation";
import { toTourCalendarEvent } from "~/lib/calendar-export";
import { formatTourDateFull } from "~/lib/tour-time";

type TourBooking = RouterOutputs["tour"]["myBookings"][number];

export interface TourBookingDialogProps {
  booking: TourBooking | null;
  counterpart?: "agent" | "seeker";
  cancelPending: boolean;
  onClose: () => void;
  onCancel: (id: string) => void;
  onReschedule?: (id: string, startsAt: Date) => void;
  reschedulePending?: boolean;
  rescheduleSlots?: { startsAt: Date | string }[];
  rescheduleSlotsLoading?: boolean;
  rescheduleSlotsError?: boolean;
}

const statusLabelKey = (
  status: TourBooking["status"],
): "statusScheduled" | "statusCancelled" | "statusCompleted" => {
  if (status === "scheduled") return "statusScheduled";
  if (status === "cancelled") return "statusCancelled";
  return "statusCompleted";
};

export function TourBookingDialog({
  booking,
  counterpart = "agent",
  cancelPending,
  onClose,
  onCancel,
  onReschedule,
  reschedulePending = false,
  rescheduleSlots = [],
  rescheduleSlotsLoading = false,
  rescheduleSlotsError = false,
}: TourBookingDialogProps): JSX.Element {
  return (
    <Dialog
      open={booking != null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {booking ? (
        <TourBookingDialogBody
          key={booking.id}
          booking={booking}
          counterpart={counterpart}
          cancelPending={cancelPending}
          onCancel={onCancel}
          onReschedule={onReschedule}
          reschedulePending={reschedulePending}
          rescheduleSlots={rescheduleSlots}
          rescheduleSlotsLoading={rescheduleSlotsLoading}
          rescheduleSlotsError={rescheduleSlotsError}
        />
      ) : null}
    </Dialog>
  );
}

function TourBookingDialogBody({
  booking,
  counterpart,
  cancelPending,
  onCancel,
  onReschedule,
  reschedulePending,
  rescheduleSlots,
  rescheduleSlotsLoading,
  rescheduleSlotsError,
}: {
  booking: TourBooking;
  counterpart: "agent" | "seeker";
  cancelPending: boolean;
  onCancel: (id: string) => void;
  onReschedule?: (id: string, startsAt: Date) => void;
  reschedulePending: boolean;
  rescheduleSlots: { startsAt: Date | string }[];
  rescheduleSlotsLoading: boolean;
  rescheduleSlotsError: boolean;
}): JSX.Element {
  const t = useTranslations("tours");
  const locale = useLocale();
  const [rescheduling, setRescheduling] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [newSlot, setNewSlot] = useState<Date | null>(null);

  const personName =
    counterpart === "seeker" ? booking.seekerName : booking.agentName;
  const withKey = counterpart === "seeker" ? "withSeeker" : "withAgent";

  const event = toTourCalendarEvent(booking, {
    title: t("calendarEventTitle", { title: booking.roomTitle }),
    description: t("calendarEventDescription", { name: personName }),
  });

  const location = [
    booking.roomAddressLine1,
    booking.roomNeighborhood,
    booking.roomCity,
  ]
    .filter((part): part is string => Boolean(part))
    .join(" · ");

  const canReschedule =
    onReschedule != null && booking.status === "scheduled" && !rescheduling;

  return (
    <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden p-0 sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          {rescheduling ? t("pickNewSlot") : booking.roomTitle}
        </DialogTitle>
        <DialogDescription>
          {rescheduling ? t("selectDateAndTime") : t("tourDetails")}
        </DialogDescription>
      </DialogHeader>

      {rescheduling ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {rescheduleSlotsError ? (
            <p className="text-destructive text-sm">{t("slotsFailed")}</p>
          ) : (
            <TourSlotPicker
              slots={rescheduleSlots}
              loading={rescheduleSlotsLoading}
              selectedDate={rescheduleDate}
              selectedSlot={newSlot}
              onSelectDate={setRescheduleDate}
              onSelectSlot={setNewSlot}
            />
          )}
        </div>
      ) : (
        <div className="space-y-2 px-5 py-4">
          {location.length > 0 ? (
            <p className="text-muted-foreground text-sm">{location}</p>
          ) : null}
          <p className="text-sm">{t(withKey, { name: personName })}</p>
          <p className="text-sm font-medium">
            {formatTourDateFull(new Date(booking.startsAt), locale)}
          </p>
          <p className="text-muted-foreground text-xs">
            {t(statusLabelKey(booking.status))}
          </p>
          <Link
            href={`/rooms/${booking.roomId}`}
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            {t("viewListing")}
          </Link>
        </div>
      )}

      <DialogFooter className="justify-end">
        {rescheduling ? (
          <>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setRescheduling(false);
                setRescheduleDate("");
                setNewSlot(null);
              }}
            >
              {t("back")}
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={!newSlot || reschedulePending}
              onClick={() => {
                if (!newSlot) return;
                onReschedule?.(booking.id, newSlot);
              }}
            >
              {t("confirmReschedule")}
            </Button>
          </>
        ) : (
          <>
            <AddToCalendarMenu
              events={[event]}
              filename={`roomme-tour-${booking.id}.ics`}
              variant="outline"
            />
            {canReschedule ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setRescheduling(true)}
              >
                {t("reschedule")}
              </Button>
            ) : null}
            {booking.status === "scheduled" ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={cancelPending}
                onClick={() => onCancel(booking.id)}
              >
                {t("cancel")}
              </Button>
            ) : null}
          </>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
