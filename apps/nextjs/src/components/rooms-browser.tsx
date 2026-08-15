"use client";

import type { JSX } from "react";
import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ListBulletIcon, ViewGridIcon } from "@radix-ui/react-icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import type { City, ListListingsInput } from "@acme/validators";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";

import type { RoomsMapCluster } from "~/components/rooms-map-utils";
import { RoomCard } from "~/components/room-card";
import { RoomListItem } from "~/components/room-list-item";
import { RoomsFilters } from "~/components/rooms-filters";
import { clusterListings } from "~/components/rooms-map-utils";
import { Link } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

const RoomsMap = dynamic(
  async () => {
    const mod = await import("~/components/rooms-map");
    return mod.RoomsMap;
  },
  {
    ssr: false,
    loading: () => <div className="bg-muted h-full w-full animate-pulse" />,
  },
);

type ViewMode = "list" | "grid";

export function RoomsBrowser({ city }: { city?: City }): JSX.Element {
  const t = useTranslations("rooms");
  const trpc = useTRPC();
  const listRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<ListListingsInput>({});
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const [activeClusterKey, setActiveClusterKey] = useState<string | null>(null);

  const { data } = useSuspenseQuery(
    trpc.listing.list.queryOptions({
      ...filters,
      city,
      limit: 48,
    }),
  );

  const clusters = useMemo(
    () =>
      clusterListings(
        data.map((listing) => ({
          id: listing.id,
          latitude: listing.latitude,
          longitude: listing.longitude,
          complexId: listing.complex.id,
        })),
      ),
    [data],
  );

  const pinByListingId = useMemo(() => {
    const map = new Map<string, number>();
    for (const cluster of clusters) {
      for (const listingId of cluster.listingIds) {
        map.set(listingId, cluster.number);
      }
    }
    return map;
  }, [clusters]);

  const clusterByListingId = useMemo(() => {
    const map = new Map<string, RoomsMapCluster>();
    for (const cluster of clusters) {
      for (const listingId of cluster.listingIds) {
        map.set(listingId, cluster);
      }
    }
    return map;
  }, [clusters]);

  const highlightedClusterKey =
    activeClusterKey ??
    (hoveredListingId
      ? (clusterByListingId.get(hoveredListingId)?.key ?? null)
      : null);

  const cityLinkClass = (active: boolean): string =>
    cn(
      "inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-input bg-background text-foreground hover:bg-muted/60",
    );

  const viewButtonClass = (active: boolean): string =>
    cn(
      "inline-flex size-9 items-center justify-center rounded-md border transition-colors",
      active
        ? "border-foreground bg-foreground text-background"
        : "border-input bg-background text-foreground hover:bg-muted/60",
    );

  const scrollToListing = (listingId: string): void => {
    const root = listRef.current;
    if (!root) {
      return;
    }
    const target = root.querySelector(`[data-listing-id="${listingId}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const onClusterSelect = (cluster: RoomsMapCluster): void => {
    setActiveClusterKey(cluster.key);
    const [firstListingId] = cluster.listingIds;
    if (firstListingId) {
      scrollToListing(firstListingId);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-7rem)] flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className={viewButtonClass(viewMode === "list")}
              aria-label={t("viewList")}
              aria-pressed={viewMode === "list"}
              title={t("viewList")}
              onClick={() => {
                setViewMode("list");
              }}
            >
              <ListBulletIcon className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              className={viewButtonClass(viewMode === "grid")}
              aria-label={t("viewGrid")}
              aria-pressed={viewMode === "grid"}
              title={t("viewGrid")}
              onClick={() => {
                setViewMode("grid");
              }}
            >
              <ViewGridIcon className="size-4" aria-hidden />
            </button>
          </div>

          <div className="bg-border mx-1 hidden h-6 w-px sm:block" />

          <Link href="/rooms" className={cityLinkClass(city === undefined)}>
            {t("allCities")}
          </Link>
          <Link
            href="/rooms-for-rent-queretaro"
            className={cityLinkClass(city === "queretaro")}
          >
            {t("queretaro")}
          </Link>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <RoomsFilters value={filters} onChange={setFilters} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold">
            {t("resultsCount", { count: data.length })}
          </p>
          <Button asChild>
            <Link href="/list-a-room">{t("addListing")}</Link>
          </Button>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="border-border grid min-h-0 flex-1 overflow-hidden rounded-xl border lg:h-[calc(100dvh-14rem)] lg:grid-cols-[minmax(22rem,28rem)_minmax(0,1fr)] xl:grid-cols-[minmax(24rem,34rem)_minmax(0,1fr)]">
          <div
            ref={listRef}
            className={cn(
              "max-h-[min(52vh,560px)] overflow-y-auto lg:max-h-full",
              viewMode === "grid" && "bg-muted/20 p-3",
            )}
          >
            {viewMode === "list" ? (
              data.map((listing) => {
                const cluster = clusterByListingId.get(listing.id);
                const isActive =
                  highlightedClusterKey !== null &&
                  cluster?.key === highlightedClusterKey;

                return (
                  <div key={listing.id} data-listing-id={listing.id}>
                    <RoomListItem
                      listing={listing}
                      pinNumber={pinByListingId.get(listing.id) ?? null}
                      active={isActive}
                      onHover={setHoveredListingId}
                    />
                  </div>
                );
              })
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {data.map((listing) => {
                  const cluster = clusterByListingId.get(listing.id);
                  const isActive =
                    highlightedClusterKey !== null &&
                    cluster?.key === highlightedClusterKey;

                  return (
                    <div key={listing.id} data-listing-id={listing.id}>
                      <RoomCard
                        listing={listing}
                        pinNumber={pinByListingId.get(listing.id) ?? null}
                        active={isActive}
                        onHover={setHoveredListingId}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-border relative h-80 border-t lg:h-full lg:border-t-0 lg:border-l">
            <div className="absolute inset-0">
              <RoomsMap
                city={city}
                clusters={clusters}
                activeClusterKey={highlightedClusterKey}
                onClusterSelect={onClusterSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
