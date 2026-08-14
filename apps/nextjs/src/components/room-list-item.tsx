"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { cn } from "@acme/ui";

import { formatMxn } from "~/components/room-card";
import { Link } from "~/i18n/navigation";

type Listing = RouterOutputs["listing"]["list"][number];

export function RoomListItem({
  listing,
  pinNumber,
  active,
  onHover,
}: {
  listing: Listing;
  pinNumber: number | null;
  active: boolean;
  onHover: (listingId: string | null) => void;
}): JSX.Element {
  const t = useTranslations("rooms");
  const address =
    listing.addressLine1 && listing.addressLine1.length > 0
      ? `${listing.addressLine1}, ${listing.complex.neighborhood}`
      : listing.complex.neighborhood;

  return (
    <Link
      href={`/rooms/${listing.id}`}
      className={cn(
        "border-border hover:bg-muted/40 flex w-full gap-3 border-b px-4 py-3.5 text-left transition-colors",
        active && "bg-primary/5",
      )}
      onMouseEnter={() => {
        onHover(listing.id);
      }}
      onMouseLeave={() => {
        onHover(null);
      }}
      onFocus={() => {
        onHover(listing.id);
      }}
      onBlur={() => {
        onHover(null);
      }}
    >
      <div className="bg-muted relative size-18 shrink-0 overflow-hidden rounded-lg sm:size-24">
        {listing.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={listing.coverUrl}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
        ) : null}
        {pinNumber !== null ? (
          <span className="absolute top-1.5 left-1.5 flex size-6 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white shadow">
            {pinNumber}
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="truncate text-base font-semibold">{listing.title}</h3>
        <p className="text-muted-foreground truncate text-sm">{address}</p>
        <p className="text-muted-foreground text-xs">
          {t("roomies", { count: listing.capacity })}
          {listing.host ? ` · ${listing.host.name}` : ""}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between gap-2 self-stretch">
        <p className="text-brand text-base font-bold tabular-nums sm:text-lg">
          {formatMxn(listing.rentPriceCents)}
        </p>
        {listing.host?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={listing.host.image}
            alt={listing.host.name}
            className="size-8 rounded-full object-cover"
          />
        ) : listing.host ? (
          <span className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full text-xs font-medium">
            {listing.host.name.slice(0, 1).toUpperCase()}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
