"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { ListingType, PropertyType } from "@acme/validators";
import { LISTING_TYPES, PROPERTY_TYPES } from "@acme/validators";

import type { FilterDraft } from "./use-filter-draft";
import {
  FilterPill,
  FilterPillGrid,
  FilterRadioGrid,
  FilterSection,
} from "~/components/rooms-filter-controls";
import { propertyTypesFor } from "~/lib/property-types";

const isListingType = (value: string): value is ListingType =>
  LISTING_TYPES.some((type) => type === value);

export const ListingTypeSection = ({
  filters,
}: {
  filters: FilterDraft;
}): JSX.Element => {
  const t = useTranslations("rooms");
  return (
    <FilterSection title={t("filterListingType")}>
      <FilterRadioGrid
        value={filters.draft.listingType ?? "any"}
        onChange={(next) => {
          filters.setListingType(isListingType(next) ? next : undefined);
        }}
        options={[
          { value: "any", label: t("listingTypeAny") },
          { value: "room", label: t("listingTypeRoom") },
          { value: "entire_property", label: t("listingTypeEntire") },
        ]}
      />
    </FilterSection>
  );
};

export const PropertyTypeSection = ({
  filters,
}: {
  filters: FilterDraft;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const tList = useTranslations("list");
  const { listingType } = filters.draft;
  const options: readonly PropertyType[] = listingType
    ? propertyTypesFor(listingType)
    : PROPERTY_TYPES;

  return (
    <FilterSection title={t("filterPropertyType")}>
      <FilterPillGrid>
        {options.map((type) => (
          <FilterPill
            key={type}
            selected={filters.draft.propertyType === type}
            onClick={() => {
              filters.toggleExact("propertyType", type);
            }}
          >
            {tList(`propertyTypeOption.${type}`)}
          </FilterPill>
        ))}
      </FilterPillGrid>
    </FilterSection>
  );
};
