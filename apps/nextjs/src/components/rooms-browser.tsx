"use client";

import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import type { City, ListListingsInput } from "@acme/validators";

import { RoomCard } from "~/components/room-card";
import { RoomsFilters } from "~/components/rooms-filters";
import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

export function RoomsBrowser({ city }: { city?: City }) {
  const t = useTranslations("rooms");
  const trpc = useTRPC();
  const [filters, setFilters] = useState<ListListingsInput>({});
  const { data } = useSuspenseQuery(
    trpc.listing.list.queryOptions({
      ...filters,
      city,
      limit: 24,
    }),
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/rooms"
          className="border-border rounded-full border px-4 py-1 text-sm"
        >
          {t("allCities")}
        </Link>
        <Link
          href="/rooms-for-rent-cdmx"
          className="border-border rounded-full border px-4 py-1 text-sm"
        >
          {t("cdmx")}
        </Link>
        <Link
          href="/rooms-for-rent-queretaro"
          className="border-border rounded-full border px-4 py-1 text-sm"
        >
          {t("queretaro")}
        </Link>
      </div>
      <RoomsFilters value={filters} onChange={setFilters} />
      {data.length === 0 ? (
        <p className="text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((listing) => (
            <RoomCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
