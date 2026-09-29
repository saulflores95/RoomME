"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";

import type { BookingActions } from "~/hooks/use-booking-actions";
import { formatRange } from "~/components/listing-detail/format";
import { Link } from "~/i18n/navigation";

type BookingItem = RouterOutputs["booking"]["mine"][number];

const CANCELLABLE = new Set<BookingItem["status"]>(["upcoming", "current"]);

export const BookingRow = ({
  booking,
  perspective,
  actions,
}: {
  booking: BookingItem;
  perspective: "guest" | "host";
  actions: BookingActions;
}): JSX.Element => {
  const t = useTranslations("bookings");
  const tRooms = useTranslations("rooms");
  const counterpart =
    perspective === "host" ? booking.guest.name : booking.host?.name;

  return (
    <li className="border-border flex flex-wrap items-center gap-4 rounded-2xl border p-3">
      <div className="bg-muted size-16 shrink-0 overflow-hidden rounded-lg">
        {booking.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={booking.coverUrl}
            alt={booking.listingTitle}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <Link
          href={`/rooms/${booking.listingId}`}
          className="font-semibold underline-offset-4 hover:underline"
        >
          {booking.listingTitle}
        </Link>
        <p className="text-muted-foreground text-sm">
          {tRooms(
            booking.listingType === "entire_property"
              ? "listingTypeEntire"
              : "listingTypeRoom",
          )}
          {booking.neighborhood ? ` · ${booking.neighborhood}` : ""}
        </p>
        <p className="text-sm">
          {formatRange(booking.start, booking.end, t("openEnded"))}
        </p>
        {counterpart ? (
          <p className="text-muted-foreground text-xs">
            {perspective === "host"
              ? t("guest", { name: counterpart })
              : t("host", { name: counterpart })}
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <span className="border-border rounded-full border px-2 py-0.5 text-xs font-medium">
          {t(`status.${booking.status}`)}
        </span>
        {CANCELLABLE.has(booking.status) ? (
          <Button
            size="sm"
            variant="outline"
            disabled={actions.pendingId === booking.id}
            onClick={() => {
              actions.cancelBooking(booking.id);
            }}
          >
            {t("cancel")}
          </Button>
        ) : null}
      </div>
    </li>
  );
};
