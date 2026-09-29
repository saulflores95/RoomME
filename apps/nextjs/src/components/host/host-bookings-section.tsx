"use client";

import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { BookingRow } from "~/components/bookings/booking-row";
import { useBookingActions } from "~/hooks/use-booking-actions";
import { useTRPC } from "~/trpc/react";

export const HostBookingsSection = (): JSX.Element => {
  const t = useTranslations("host");
  const trpc = useTRPC();
  const actions = useBookingActions();
  const bookingsQuery = useQuery(trpc.booking.forHost.queryOptions());
  const bookings = bookingsQuery.data ?? [];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{t("bookings")}</h2>
        <p className="text-muted-foreground text-sm">{t("bookingsHint")}</p>
      </div>
      {bookingsQuery.isPending ? (
        <p className="text-muted-foreground text-sm">{t("loading")}</p>
      ) : bookings.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("emptyBookings")}</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              perspective="host"
              actions={actions}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
