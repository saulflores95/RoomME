"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import type { City } from "@acme/validators";

import "leaflet/dist/leaflet.css";

export interface MapPin {
  latitude: number;
  longitude: number;
}

export const CITY_CENTER: Record<City, [number, number]> = {
  queretaro: [20.5888, -100.3899],
};

const pinIcon = L.divIcon({
  className: "roomme-map-pin",
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  html: `<svg viewBox="0 0 28 40" width="28" height="40" aria-hidden="true">
    <path fill="#15803d" stroke="#fff" stroke-width="2" d="M14 1c7.2 0 13 5.8 13 13 0 9.5-13 25-13 25S1 23.5 1 14C1 6.8 6.8 1 14 1z"/>
    <circle cx="14" cy="14" r="5" fill="#fff"/>
  </svg>`,
});

function Recenter({
  latitude,
  longitude,
  zoom,
}: {
  latitude: number;
  longitude: number;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], zoom);
  }, [latitude, longitude, map, zoom]);

  return null;
}

function ClickToPin({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: (latitude: number, longitude: number) => void;
}) {
  useMapEvents({
    click: (event) => {
      if (!enabled) {
        return;
      }
      onClick(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

export function AddressMap({
  city,
  pin,
  locked,
  onPinClick,
}: {
  city: City;
  pin: MapPin | null;
  locked: boolean;
  onPinClick: (latitude: number, longitude: number) => void;
}) {
  const center = pin
    ? { latitude: pin.latitude, longitude: pin.longitude }
    : {
        latitude: CITY_CENTER[city][0],
        longitude: CITY_CENTER[city][1],
      };
  const zoom = pin ? 16 : 12;

  return (
    <MapContainer
      center={[center.latitude, center.longitude]}
      zoom={zoom}
      className="z-0 h-full w-full"
      scrollWheelZoom={!locked}
      doubleClickZoom={!locked}
      dragging={!locked}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter
        latitude={center.latitude}
        longitude={center.longitude}
        zoom={zoom}
      />
      <ClickToPin enabled={!locked} onClick={onPinClick} />
      {pin ? (
        <Marker position={[pin.latitude, pin.longitude]} icon={pinIcon} />
      ) : null}
    </MapContainer>
  );
}
