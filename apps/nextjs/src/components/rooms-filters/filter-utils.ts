import type { ListingType, ListListingsInput } from "@acme/validators";

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
