"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

import type { LeaseMonths } from "@acme/validators";
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { Textarea } from "@acme/ui/textarea";
import { LEASE_MONTHS } from "@acme/validators";

import type { ListingDetailData } from "./detail-types";
import { todayInputValue } from "~/components/listing/form-values";
import { Link } from "~/i18n/navigation";
import { formatDateKey, formatRange } from "./format";
import { useApplyPanel } from "./use-apply-panel";

const toDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const defaultMoveIn = (availableFrom: Date | null): string => {
  const today = todayInputValue();
  if (!availableFrom) {
    return today;
  }
  const available = toDateKey(new Date(availableFrom));
  return available > today ? available : today;
};

const isLeaseMonths = (value: number): value is LeaseMonths =>
  LEASE_MONTHS.some((months) => months === value);

export const ApplyPanel = ({
  listing,
  isSignedIn,
}: {
  listing: ListingDetailData;
  isSignedIn: boolean;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const state = useApplyPanel(listing.id, isSignedIn);
  const [moveInDate, setMoveInDate] = useState(() =>
    defaultMoveIn(listing.availableFrom),
  );
  const [leaseMonths, setLeaseMonths] = useState<LeaseMonths>(
    isLeaseMonths(listing.leaseMonths) ? listing.leaseMonths : 12,
  );
  const [message, setMessage] = useState("");
  const { application } = state;
  const hasActiveApplication =
    application != null &&
    (application.status === "pending" || application.status === "accepted");

  return (
    <section className="border-border space-y-4 rounded-2xl border p-4">
      <div>
        <h2 className="text-lg font-semibold">{t("applyTitle")}</h2>
        <p className="text-muted-foreground text-sm">
          {listing.listingType === "entire_property"
            ? t("applyHintEntire")
            : t("applyHintRoom")}
        </p>
      </div>

      {state.unavailable.length > 0 ? (
        <div className="space-y-1">
          <p className="text-sm font-medium">{t("bookedDates")}</p>
          <ul className="text-muted-foreground space-y-0.5 text-sm">
            {state.unavailable.map((range) => (
              <li key={`${String(range.start)}-${String(range.end)}`}>
                {formatRange(range.start, range.end, t("openEnded"))}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!isSignedIn ? (
        <Button asChild className="w-full">
          <Link href="/sign-in">{t("applySignIn")}</Link>
        </Button>
      ) : hasActiveApplication ? (
        <div className="space-y-3">
          <p className="text-sm">
            {application.status === "accepted"
              ? t("applicationAccepted")
              : t("applicationPending")}
          </p>
          {application.moveInDate && application.leaseMonths ? (
            <p className="text-muted-foreground text-sm">
              {t("applicationDates", {
                date: formatDateKey(application.moveInDate),
                count: application.leaseMonths,
              })}
            </p>
          ) : null}
          {application.status === "pending" ? (
            <Button
              variant="outline"
              disabled={state.isWithdrawing}
              onClick={() => {
                state.withdraw(application.id);
              }}
            >
              {t("withdraw")}
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/bookings">{t("viewBookings")}</Link>
            </Button>
          )}
        </div>
      ) : (
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            state.apply({ moveInDate, leaseMonths, message });
          }}
        >
          {application?.status === "declined" ? (
            <p className="text-muted-foreground text-sm">
              {t("applicationDeclined")}
            </p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="move-in-date">{t("moveInDate")}</Label>
              <Input
                id="move-in-date"
                type="date"
                required
                min={todayInputValue()}
                value={moveInDate}
                onChange={(event) => {
                  setMoveInDate(event.target.value);
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lease-months">{t("leaseLength")}</Label>
              <Select
                value={String(leaseMonths)}
                onValueChange={(value) => {
                  const months = Number(value);
                  if (isLeaseMonths(months)) {
                    setLeaseMonths(months);
                  }
                }}
              >
                <SelectTrigger id="lease-months" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEASE_MONTHS.map((months) => (
                    <SelectItem key={months} value={String(months)}>
                      {t("monthsCount", { count: months })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="apply-message">{t("applyMessage")}</Label>
            <Textarea
              id="apply-message"
              maxLength={1000}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
          <Button type="submit" className="w-full" disabled={state.isApplying}>
            {state.isApplying ? t("applying") : t("apply")}
          </Button>
        </form>
      )}

      {state.error ? (
        <p className="text-destructive text-sm">{state.error}</p>
      ) : null}
    </section>
  );
};
