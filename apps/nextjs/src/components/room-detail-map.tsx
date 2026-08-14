"use client";

import type { JSX } from "react";

import type { City } from "@acme/validators";

import { AddressMap } from "~/components/address-map";

export function RoomDetailMap({
  city,
  latitude,
  longitude,
}: {
  city: City;
  latitude: number;
  longitude: number;
}): JSX.Element {
  return (
    <AddressMap
      city={city}
      pin={{ latitude, longitude }}
      locked
      onPinClick={() => {
        // Read-only detail map.
      }}
    />
  );
}
