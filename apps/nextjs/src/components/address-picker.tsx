"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { City } from "@acme/validators";
import { Input } from "@acme/ui/input";

import type { MapPin } from "./address-map";
import { useTRPC } from "~/trpc/react";

export type { MapPin };

export interface AddressHit {
  label: string;
  addressLine1: string;
  neighborhood: string;
  city: City;
  latitude: number;
  longitude: number;
}

const AddressMap = dynamic(
  async () => {
    const mod = await import("./address-map");
    return mod.AddressMap;
  },
  {
    ssr: false,
    loading: () => <div className="bg-muted h-72 w-full animate-pulse" />,
  },
);

export function AddressPicker({
  city,
  pin,
  locked,
  searchPlaceholder,
  clickHint,
  lockedHint,
  noResults,
  onLocationChange,
}: {
  city: City;
  pin: MapPin | null;
  locked: boolean;
  searchPlaceholder: string;
  clickHint: string;
  lockedHint: string;
  noResults: string;
  onLocationChange: (hit: AddressHit) => void;
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounced(query.trim());
    }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  const resultsQuery = useQuery({
    ...trpc.listing.searchAddress.queryOptions({ query: debounced }),
    enabled: !locked && debounced.length >= 2,
  });

  const results = resultsQuery.data ?? [];

  const applyPin = async (
    latitude: number,
    longitude: number,
  ): Promise<void> => {
    if (locked) {
      return;
    }

    const hit = await queryClient.fetchQuery(
      trpc.listing.reverseGeocode.queryOptions({ latitude, longitude }),
    );

    onLocationChange(
      hit ?? {
        label: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
        addressLine1: "",
        neighborhood: "",
        city,
        latitude,
        longitude,
      },
    );
  };

  return (
    <div className="space-y-2">
      {locked ? null : (
        <div className="relative">
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setDebounced(query.trim());
              }
            }}
            placeholder={searchPlaceholder}
            autoComplete="off"
          />
          {!locked && debounced.length >= 2 && results.length > 0 ? (
            <ul className="border-border bg-background absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-md border text-sm shadow-md">
              {results.map((hit) => (
                <li key={`${hit.latitude}:${hit.longitude}:${hit.label}`}>
                  <button
                    type="button"
                    className="hover:bg-muted w-full px-3 py-2 text-left"
                    onClick={() => {
                      onLocationChange(hit);
                      setQuery(hit.addressLine1);
                    }}
                  >
                    {hit.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {!locked &&
          debounced.length >= 2 &&
          !resultsQuery.isFetching &&
          results.length === 0 ? (
            <p className="text-muted-foreground pt-1 text-sm">{noResults}</p>
          ) : null}
        </div>
      )}
      <div className="border-border h-72 overflow-hidden rounded-xl border">
        <AddressMap
          city={city}
          pin={pin}
          locked={locked}
          onPinClick={(latitude, longitude) => {
            void applyPin(latitude, longitude);
          }}
        />
      </div>
      <p className="text-muted-foreground text-sm">
        {locked ? lockedHint : clickHint}
      </p>
    </div>
  );
}
