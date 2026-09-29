"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import type {
  ListingInclude,
  ListingType,
  ListListingsInput,
} from "@acme/validators";

import { applyListingType, withoutKeys } from "./filter-utils";

export interface FilterDraft {
  draft: ListListingsInput;
  setDraft: Dispatch<SetStateAction<ListListingsInput>>;
  setField: <K extends keyof ListListingsInput>(
    key: K,
    nextValue: ListListingsInput[K] | undefined,
  ) => void;
  toggleExact: <K extends keyof ListListingsInput>(
    key: K,
    nextValue: NonNullable<ListListingsInput[K]>,
  ) => void;
  toggleInclude: (item: ListingInclude) => void;
  setListingType: (next: ListingType | undefined) => void;
}

export const useFilterDraft = (initial: ListListingsInput): FilterDraft => {
  const [draft, setDraft] = useState<ListListingsInput>(initial);

  const setField = <K extends keyof ListListingsInput>(
    key: K,
    nextValue: ListListingsInput[K] | undefined,
  ): void => {
    setDraft((current) => {
      if (nextValue === undefined) {
        return withoutKeys(current, [key]);
      }
      return { ...current, [key]: nextValue };
    });
  };

  const toggleExact = <K extends keyof ListListingsInput>(
    key: K,
    nextValue: NonNullable<ListListingsInput[K]>,
  ): void => {
    setField(key, draft[key] === nextValue ? undefined : nextValue);
  };

  const toggleInclude = (item: ListingInclude): void => {
    const selected = draft.includes ?? [];
    const next = selected.includes(item)
      ? selected.filter((include) => include !== item)
      : [...selected, item];
    setField("includes", next.length > 0 ? next : undefined);
  };

  const setListingType = (next: ListingType | undefined): void => {
    setDraft((current) => applyListingType(current, next));
  };

  return {
    draft,
    setDraft,
    setField,
    toggleExact,
    toggleInclude,
    setListingType,
  };
};
