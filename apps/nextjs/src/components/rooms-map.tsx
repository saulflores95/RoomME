"use client";

import type { JSX } from "react";
import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import type { City } from "@acme/validators";

import type { RoomsMapCluster } from "~/components/rooms-map-utils";
import { CITY_CENTER } from "~/components/address-map";

import "leaflet/dist/leaflet.css";

export type {
  RoomsMapCluster,
  RoomsMapListing,
} from "~/components/rooms-map-utils";
export { clusterListings } from "~/components/rooms-map-utils";

const createPinIcon = (number: number, active: boolean): L.DivIcon => {
  const size = active ? 36 : 32;
  const background = active ? "#047857" : "#059669";

  return L.divIcon({
    className: "roomme-results-pin",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div style="display:flex;width:${String(size)}px;height:${String(size)}px;align-items:center;justify-content:center;border-radius:9999px;border:2px solid #fff;background:${background};color:#fff;font-size:13px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.25)">${String(number)}</div>`,
  });
};

function FitBounds({
  clusters,
  city,
}: {
  clusters: RoomsMapCluster[];
  city?: City;
}): null {
  const map = useMap();

  useEffect(() => {
    if (clusters.length === 0) {
      const center = city ? CITY_CENTER[city] : CITY_CENTER.queretaro;
      map.setView(center, 12);
      return;
    }

    if (clusters.length === 1) {
      const [cluster] = clusters;
      if (cluster) {
        map.setView([cluster.latitude, cluster.longitude], 15);
      }
      return;
    }

    const bounds = L.latLngBounds(
      clusters.map((cluster) => [cluster.latitude, cluster.longitude]),
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [city, clusters, map]);

  return null;
}

export function RoomsMap({
  city,
  clusters,
  activeClusterKey,
  onClusterSelect,
}: {
  city?: City;
  clusters: RoomsMapCluster[];
  activeClusterKey: string | null;
  onClusterSelect: (cluster: RoomsMapCluster) => void;
}): JSX.Element {
  const center = useMemo((): [number, number] => {
    if (city) {
      return CITY_CENTER[city];
    }
    const [first] = clusters;
    if (first) {
      return [first.latitude, first.longitude];
    }
    return CITY_CENTER.queretaro;
  }, [city, clusters]);

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="z-0 h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds clusters={clusters} city={city} />
      {clusters.map((cluster) => {
        const active = activeClusterKey === cluster.key;
        return (
          <Marker
            key={`${cluster.key}-${active ? "on" : "off"}`}
            position={[cluster.latitude, cluster.longitude]}
            icon={createPinIcon(cluster.number, active)}
            eventHandlers={{
              click: () => {
                onClusterSelect(cluster);
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
}
