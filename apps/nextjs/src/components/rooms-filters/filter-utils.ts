import type {
  ListingType,
  ListListingsInput,
  OperationType,
} from "@acme/validators";

import { propertyTypesFor } from "~/lib/property-types";

/** Filters that only describe a shared room, cleared when searching whole places. */
export const ROOM_ONLY_FILTERS = [
  "householdGender",
  "seekerAge",
  "hasPets",
  "bathroomType",
  "overnightGuests",
  "wfhFriendly",
  "quietHome",
  "cleanliness",
] as const satisfies readonly (keyof ListListingsInput)[];

/** Lease-related filters, cleared when searching sale listings. */
export const RENT_ONLY_FILTERS = [
  "includes",
  "availableBy",
] as const satisfies readonly (keyof ListListingsInput)[];

const PRICE_FILTERS = [
  "minPriceMxn",
  "maxPriceMxn",
] as const satisfies readonly (keyof ListListingsInput)[];

export const withoutKeys = (
  value: ListListingsInput,
  keys: readonly (keyof ListListingsInput)[],
): ListListingsInput => {
  const next = { ...value };
  for (const key of keys) {
    delete next[key];
  }
  return next;
};

export const applyListingType = (
  current: ListListingsInput,
  next: ListingType | undefined,
): ListListingsInput => {
  let updated = withoutKeys(current, ["listingType"]);
  if (next === "entire_property") {
    updated = withoutKeys(updated, ROOM_ONLY_FILTERS);
  }
  if (
    next !== undefined &&
    current.propertyType !== undefined &&
    !propertyTypesFor(next).includes(current.propertyType)
  ) {
    updated = withoutKeys(updated, ["propertyType"]);
  }
  return next === undefined ? updated : { ...updated, listingType: next };
};

/**
 * Switches between rent and sale. Price bounds differ per mode so they reset;
 * sale listings are always entire properties with no lease filters.
 */
export const applyOperationType = (
  current: ListListingsInput,
  next: OperationType,
): ListListingsInput => {
  if ((current.operationType ?? "rent") === next) {
    return current;
  }
  const base = withoutKeys(current, [...PRICE_FILTERS, "operationType"]);
  if (next === "rent") {
    return { ...applyListingType(base, undefined), operationType: next };
  }
  return {
    ...withoutKeys(
      applyListingType(base, "entire_property"),
      RENT_ONLY_FILTERS,
    ),
    operationType: next,
  };
};

/** Filters that count toward the "Filters" badge; rent/sale is a mode, not a filter. */
export const countableFilters = (value: ListListingsInput): ListListingsInput =>
  withoutKeys(value, ["operationType"]);
