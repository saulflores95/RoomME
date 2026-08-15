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
  "User-Agent": "RooMe/1.0 (https://roome.mx)",
} as const;

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

export const inferCity = (
  _address: NominatimAddress | undefined,
  _latitude: number,
  _longitude: number,
): City => "queretaro";

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
    q: `${query}, Querétaro, Mexico`,
    format: "jsonv2",
    addressdetails: "1",
    countrycodes: "mx",
    limit: "6",
    viewbox: `${QUERETARO_CENTER.longitude - 0.45},${QUERETARO_CENTER.latitude + 0.35},${QUERETARO_CENTER.longitude + 0.45},${QUERETARO_CENTER.latitude - 0.35}`,
    bounded: "1",
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
