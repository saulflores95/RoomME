"use client";

import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";

import { authClient } from "~/auth/client";
import { BookingRow } from "~/components/bookings/booking-row";
import { MyApplications } from "~/components/bookings/my-applications";
import { useBookingActions } from "~/hooks/use-booking-actions";
import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

export const MyBookings = (): JSX.Element => {
  const t = useTranslations("bookings");
  const trpc = useTRPC();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const isSignedIn = session?.user != null;
  const actions = useBookingActions();
  const bookingsQuery = useQuery({
    ...trpc.booking.mine.queryOptions(),
    enabled: isSignedIn,
  });
  const applicationsQuery = useQuery({
    ...trpc.application.mine.queryOptions(),
    enabled: isSignedIn,
  });

  if (sessionPending) {
    return <div className="bg-muted h-64 animate-pulse rounded-2xl" />;
  }

  if (!isSignedIn) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("needAuth")}</p>
        <Button asChild>
          <Link href="/sign-in">{t("signIn")}</Link>
        </Button>
      </div>
    );
  }

  const bookings = bookingsQuery.data ?? [];

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("stays")}</h2>
        {bookingsQuery.isPending ? (
          <p className="text-muted-foreground text-sm">{t("loading")}</p>
        ) : bookings.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            {t("emptyStays")}{" "}
            <Link href="/rooms" className="underline">
              {t("browse")}
            </Link>
          </p>
        ) : (
          <ul className="space-y-3">
            {bookings.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                perspective="guest"
                actions={actions}
              />
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("applications")}</h2>
        {applicationsQuery.isPending ? (
          <p className="text-muted-foreground text-sm">{t("loading")}</p>
        ) : (
          <MyApplications
            applications={applicationsQuery.data ?? []}
            actions={actions}
          />
        )}
      </section>
    </div>
  );
};
