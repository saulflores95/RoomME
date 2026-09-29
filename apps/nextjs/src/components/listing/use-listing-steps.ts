import { useMemo } from "react";

import type { ListingType } from "@acme/validators";

export type ListingStepKey =
  | "type"
  | "operation"
  | "details"
  | "layout"
  | "money"
  | "household"
  | "rules"
  | "location";

const STEPS_BY_TYPE: Record<ListingType, readonly ListingStepKey[]> = {
  room: ["type", "details", "money", "household", "rules", "location"],
  entire_property: [
    "type",
    "operation",
    "details",
    "layout",
    "money",
    "rules",
    "location",
  ],
};

export interface ListingSteps {
  keys: readonly ListingStepKey[];
  stepOf: (key: ListingStepKey) => number;
}

/** Which form sections apply to a listing type, and their display order. */
export const useListingSteps = (listingType: ListingType): ListingSteps =>
  useMemo(() => {
    const keys = STEPS_BY_TYPE[listingType];
    return {
      keys,
      stepOf: (key: ListingStepKey): number => keys.indexOf(key) + 1,
    };
  }, [listingType]);
