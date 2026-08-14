import type { City } from "@acme/validators";

export interface GeocodeHit {
  label: string;
  addressLine1: string;
  neighborhood: string;
  city: City;
  latitude: number;
  longitude: number;
}

interface NominatimAddress {
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  quarter?: string;
  city_district?: string;
  city?: string;
  town?: string;
  village?: string;
  county?: string;
  state?: string;
  postcode?: string;
}

interface NominatimPlace {
  display_name: string;
  lat: string;
  lon: string;
  address?: NominatimAddress;
}

const NOMINATIM_HEADERS = {
  Accept: "application/json",
  "Accept-Language": "es",
  "User-Agent": "RoomMe/1.0 (https://roomme.app)",
} as const;

const CDMX_CENTER = { latitude: 19.4326, longitude: -99.1332 };
const QUERETARO_CENTER = { latitude: 20.5888, longitude: -100.3899 };

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  return value as Record<string, unknown>;
};

const optionalString = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const parseAddress = (value: unknown): NominatimAddress | undefined => {
  const record = asRecord(value);
  if (!record) {
    return undefined;
  }

  return {
    house_number: optionalString(record.house_number),
    road: optionalString(record.road),
    neighbourhood: optionalString(record.neighbourhood),
    suburb: optionalString(record.suburb),
    quarter: optionalString(record.quarter),
    city_district: optionalString(record.city_district),
    city: optionalString(record.city),
    town: optionalString(record.town),
    village: optionalString(record.village),
    county: optionalString(record.county),
    state: optionalString(record.state),
    postcode: optionalString(record.postcode),
  };
};

const parsePlace = (value: unknown): NominatimPlace | null => {
  const record = asRecord(value);
  if (!record) {
    return null;
  }

  const displayName = optionalString(record.display_name);
  const lat = optionalString(record.lat);
  const lon = optionalString(record.lon);

  if (!displayName || !lat || !lon) {
    return null;
  }

  return {
    display_name: displayName,
    lat,
    lon,
    address: parseAddress(record.address),
  };
};

const fold = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const distanceSq = (
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number },
): number => {
  const dLat = a.latitude - b.latitude;
  const dLng = a.longitude - b.longitude;
  return dLat * dLat + dLng * dLng;
};

export const inferCity = (
  address: NominatimAddress | undefined,
  latitude: number,
  longitude: number,
): City => {
  const blob = fold(
    [
      address?.city,
      address?.town,
      address?.village,
      address?.county,
      address?.state,
    ]
      .filter((part): part is string => typeof part === "string")
      .join(" "),
  );

  if (blob.includes("queretaro")) {
    return "queretaro";
  }

  if (
    blob.includes("ciudad de mexico") ||
    blob.includes("mexico city") ||
    blob.includes("cdmx") ||
    blob.includes("distrito federal")
  ) {
    return "cdmx";
  }

  return distanceSq({ latitude, longitude }, QUERETARO_CENTER) <
    distanceSq({ latitude, longitude }, CDMX_CENTER)
    ? "queretaro"
    : "cdmx";
};

const toHit = (place: NominatimPlace): GeocodeHit | null => {
  const latitude = Number(place.lat);
  const longitude = Number(place.lon);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  const street = [place.address?.house_number, place.address?.road]
    .filter((part): part is string => typeof part === "string")
    .join(" ")
    .trim();

  return {
    label: place.display_name,
    addressLine1:
      street.length > 0
        ? street
        : (place.display_name.split(",")[0] ?? place.display_name),
    neighborhood:
      place.address?.neighbourhood ??
      place.address?.suburb ??
      place.address?.quarter ??
      place.address?.city_district ??
      "",
    city: inferCity(place.address, latitude, longitude),
    latitude,
    longitude,
  };
};

const nominatimGet = async (path: string): Promise<unknown> => {
  const response = await fetch(`https://nominatim.openstreetmap.org/${path}`, {
    headers: NOMINATIM_HEADERS,
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error("Address lookup failed");
  }

  return response.json();
};

export const searchAddresses = async (query: string): Promise<GeocodeHit[]> => {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    addressdetails: "1",
    countrycodes: "mx",
    limit: "6",
  });

  const payload = await nominatimGet(`search?${params.toString()}`);
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .map((item) => {
      const place = parsePlace(item);
      return place ? toHit(place) : null;
    })
    .filter((hit): hit is GeocodeHit => hit !== null);
};

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<GeocodeHit | null> => {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: "jsonv2",
    addressdetails: "1",
    zoom: "18",
  });

  const place = parsePlace(await nominatimGet(`reverse?${params.toString()}`));
  return place ? toHit(place) : null;
};
