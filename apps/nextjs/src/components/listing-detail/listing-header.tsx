"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { ListingDetailData } from "./detail-types";
import type { ListingLabels } from "./use-listing-labels";
import { usePriceSuffix } from "~/components/listing-type-badge";
import { formatMxn } from "~/components/room-card";
import { Link } from "~/i18n/navigation";
import { formatAvailable } from "./format";

export const ListingHeader = ({
  listing,
  labels,
}: {
  listing: ListingDetailData;
  labels: ListingLabels;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const tProfile = useTranslations("profile");
  const priceSuffix = usePriceSuffix();
  const { property, host } = listing;
  const isEntire = listing.listingType === "entire_property";

  const locationLabel = [
    listing.addressLine1,
    listing.neighborhood,
    listing.city ? labels.city(listing.city) : null,
  ]
    .filter((part): part is string => Boolean(part && part.length > 0))
    .join(", ");

  return (
    <>
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          {isEntire
            ? t("typeEntireBadge", {
                type: labels.propertyType(property?.propertyType ?? "house"),
              })
            : t("typeRoomBadge")}
          {listing.operationType === "sale" ? ` · ${t("forSale")}` : null}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {listing.title}
        </h1>
        {locationLabel.length > 0 ? (
          <p className="text-muted-foreground text-base">{locationLabel}</p>
        ) : null}
        {property && !isEntire ? (
          <p className="text-sm">
            <span className="text-muted-foreground">
              {property.isSharedBuilding
                ? t("inComplex")
                : t("inProperty")}{" "}
            </span>
            <a
              href="#property"
              className="font-medium underline-offset-4 hover:underline"
            >
              {property.title}
            </a>
          </p>
        ) : null}
        <p className="text-brand text-2xl font-bold tabular-nums">
          {formatMxn(listing.priceCents)}
          <span className="text-muted-foreground text-base font-medium">
            {priceSuffix(listing.operationType)}
          </span>
        </p>
        <p className="text-muted-foreground text-sm">
          {t("availableDate", {
            date: formatAvailable(listing.availableFrom, t("availableNow")),
          })}
        </p>
      </div>

      {host ? (
        <Link
          href={`/profiles/${host.id}`}
          className="border-border hover:bg-muted/40 flex items-center gap-3 rounded-2xl border p-3 transition-colors"
        >
          {host.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={host.image}
              alt={host.name}
              className="size-12 rounded-full object-cover"
            />
          ) : (
            <span className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full text-lg font-medium">
              {host.name.slice(0, 1).toUpperCase()}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {t("host")}
            </p>
            <p className="font-semibold">{host.name}</p>
            <p className="text-muted-foreground text-xs">
              {tProfile("viewProfile")}
            </p>
          </div>
        </Link>
      ) : null}
    </>
  );
};
