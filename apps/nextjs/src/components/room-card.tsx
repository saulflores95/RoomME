"use client";

import { useTranslations } from "next-intl";

import type { RouterOutputs } from "@acme/api";

import { Link } from "~/i18n/navigation";

type Listing = RouterOutputs["listing"]["list"][number];

export function formatMxn(cents: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function RoomCard({ listing }: { listing: Listing }) {
  const t = useTranslations("rooms");
  const chips = [
    t(
      listing.householdGender === "male"
        ? "genderMale"
        : listing.householdGender === "female"
          ? "genderFemale"
          : "genderMixed",
    ),
    listing.bathroomType === "private"
      ? t("bathroomPrivate")
      : t("bathroomShared"),
    listing.hasPets ? t("hasPets") : null,
    listing.acceptsPets ? t("acceptsPets") : null,
  ].filter((chip): chip is string => chip !== null);

  return (
    <article className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      <div className="bg-muted aspect-4/3 overflow-hidden">
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
      </div>
      <div className="space-y-2 p-4">
        <p className="text-muted-foreground text-sm">
          {listing.complex.neighborhood}
        </p>
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-foreground text-base font-medium">
          {formatMxn(listing.rentPriceCents)}
          {t("perMonth")}
        </p>
        <p className="text-muted-foreground text-sm">
          {t("roomies", { count: listing.capacity })}
        </p>
        <div className="flex flex-wrap gap-1">
          {chips.map((chip) => (
            <span
              key={chip}
              className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-xs"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function RoomCardLink({ listing }: { listing: Listing }) {
  return (
    <Link href={`/rooms`}>
      <RoomCard listing={listing} />
    </Link>
  );
}
