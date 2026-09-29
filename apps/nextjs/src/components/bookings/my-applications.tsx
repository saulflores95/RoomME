"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";

import type { BookingActions } from "~/hooks/use-booking-actions";
import { formatDateKey } from "~/components/listing-detail/format";
import { Link } from "~/i18n/navigation";

type MyApplication = RouterOutputs["application"]["mine"][number];

export const MyApplications = ({
  applications,
  actions,
}: {
  applications: MyApplication[];
  actions: BookingActions;
}): JSX.Element => {
  const t = useTranslations("bookings");
  const tRooms = useTranslations("rooms");

  if (applications.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">{t("emptyApplications")}</p>
    );
  }

  return (
    <ul className="space-y-3">
      {applications.map((application) => (
        <li
          key={application.id}
          className="border-border flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3"
        >
          <div className="min-w-0 space-y-0.5">
            <Link
              href={`/rooms/${application.roomId}`}
              className="font-semibold underline-offset-4 hover:underline"
            >
              {application.roomTitle}
            </Link>
            {application.operationType === "sale" ? (
              <p className="text-muted-foreground text-sm">
                {tRooms("saleInquiry")}
              </p>
            ) : null}
            {application.moveInDate && application.leaseMonths ? (
              <p className="text-muted-foreground text-sm">
                {tRooms("applicationDates", {
                  date: formatDateKey(application.moveInDate),
                  count: application.leaseMonths,
                })}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <span className="border-border rounded-full border px-2 py-0.5 text-xs font-medium">
              {t(`applicationStatus.${application.status}`)}
            </span>
            {application.status === "pending" ? (
              <Button
                size="sm"
                variant="outline"
                disabled={actions.pendingId === application.id}
                onClick={() => {
                  actions.withdrawApplication(application.id);
                }}
              >
                {t("withdraw")}
              </Button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};
