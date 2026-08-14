"use client";

import type { JSX, KeyboardEvent, MouseEvent } from "react";
import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";
import { cn } from "@acme/ui";

import { Link, useRouter } from "~/i18n/navigation";
import { formatMxn } from "~/lib/money";

export { formatMxn };

type Listing = RouterOutputs["listing"]["list"][number];

const formatAvailable = (
  value: Date | string | null,
  immediately: string,
): string => {
  if (!value) {
    return immediately;
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return immediately;
  }
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export function RoomCard({
  listing,
  pinNumber = null,
  active = false,
  onHover,
}: {
  listing: Listing;
  pinNumber?: number | null;
  active?: boolean;
  onHover?: (listingId: string | null) => void;
}): JSX.Element {
  const t = useTranslations("rooms");
  const router = useRouter();
  const address =
    listing.addressLine1 && listing.addressLine1.length > 0
      ? `${listing.addressLine1}, ${listing.complex.neighborhood}`
      : listing.complex.neighborhood;
  const description =
    listing.description.length > 110
      ? `${listing.description.slice(0, 110).trimEnd()}…`
      : listing.description;

  const openHostProfile = (event: MouseEvent | KeyboardEvent): void => {
    if (!listing.host) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    router.push(`/profiles/${listing.host.id}`);
  };

  return (
    <Link
      href={`/rooms/${listing.id}`}
      className={cn(
        "border-border bg-card block overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md",
        active && "ring-primary ring-2",
      )}
      onMouseEnter={() => {
        onHover?.(listing.id);
      }}
      onMouseLeave={() => {
        onHover?.(null);
      }}
    >
      <article>
        <div className="bg-muted relative aspect-4/3 overflow-hidden">
          {listing.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={listing.coverUrl}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full" />
          )}
          {pinNumber !== null ? (
            <span className="absolute top-2 left-2 flex size-7 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white shadow">
              {pinNumber}
            </span>
          ) : null}
          {listing.host?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={listing.host.image}
              alt={listing.host.name}
              className="border-background absolute right-2 bottom-2 size-9 rounded-full border-2 object-cover"
              onClick={openHostProfile}
            />
          ) : null}
        </div>
        <div className="space-y-2 p-4">
          {listing.host ? (
            <p className="text-muted-foreground text-sm">
              <span
                role="link"
                tabIndex={0}
                className="hover:text-foreground underline-offset-4 hover:underline"
                onClick={openHostProfile}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    openHostProfile(event);
                  }
                }}
              >
                {listing.host.name}
              </span>
            </p>
          ) : null}
          <h3 className="line-clamp-2 text-base font-semibold">
            {listing.title}
          </h3>
          <p className="text-muted-foreground truncate text-sm">{address}</p>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>
          <p className="text-muted-foreground text-xs">
            {t("availableDate", {
              date: formatAvailable(listing.availableFrom, t("availableNow")),
            })}
          </p>
          <p className="text-brand text-lg font-bold tabular-nums">
            {formatMxn(listing.rentPriceCents)}
            <span className="text-muted-foreground text-sm font-medium">
              {t("perMonth")}
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}
