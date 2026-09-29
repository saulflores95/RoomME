"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { HouseholdGender, ListListingsInput } from "@acme/validators";
import { Input } from "@acme/ui/input";
import { HouseholdGenderSchema, LISTING_INCLUDES } from "@acme/validators";

import type { FilterDraft } from "./use-filter-draft";
import {
  FilterDivider,
  FilterPill,
  FilterPillGrid,
  FilterRadioGrid,
  FilterSection,
} from "~/components/rooms-filter-controls";

type ChoiceKey =
  | "bathroomType"
  | "furnished"
  | "smokingPolicy"
  | "overnightGuests"
  | "cleanliness";

type FlagKey =
  | "hasPets"
  | "acceptsPets"
  | "couplesAllowed"
  | "wfhFriendly"
  | "quietHome";

const ChoiceSection = <K extends ChoiceKey>({
  filters,
  field,
  title,
  options,
}: {
  filters: FilterDraft;
  field: K;
  title: string;
  options: readonly (readonly [NonNullable<ListListingsInput[K]>, string])[];
}): JSX.Element => (
  <FilterSection title={title}>
    <FilterPillGrid>
      {options.map(([item, label]) => (
        <FilterPill
          key={item}
          selected={filters.draft[field] === item}
          onClick={() => {
            filters.toggleExact(field, item);
          }}
        >
          {label}
        </FilterPill>
      ))}
    </FilterPillGrid>
  </FilterSection>
);

const FlagPills = ({
  filters,
  flags,
}: {
  filters: FilterDraft;
  flags: readonly (readonly [FlagKey, string])[];
}): JSX.Element => (
  <FilterPillGrid>
    {flags.map(([field, label]) => (
      <FilterPill
        key={field}
        selected={filters.draft[field] === true}
        onClick={() => {
          filters.toggleExact(field, true);
        }}
      >
        {label}
      </FilterPill>
    ))}
  </FilterPillGrid>
);

const isHouseholdGender = (value: string): value is HouseholdGender =>
  HouseholdGenderSchema.options.some((gender) => gender === value);

/** Household filters that only make sense when sharing a home. */
export const RoomOnlySections = ({
  filters,
}: {
  filters: FilterDraft;
}): JSX.Element => {
  const t = useTranslations("rooms");
  return (
    <>
      <FilterSection title={t("gender")}>
        <FilterRadioGrid
          value={filters.draft.householdGender ?? "any"}
          onChange={(next) => {
            filters.setField(
              "householdGender",
              isHouseholdGender(next) ? next : undefined,
            );
          }}
          options={[
            { value: "any", label: t("genderEveryone") },
            { value: "female", label: t("genderFemale") },
            { value: "male", label: t("genderMale") },
            { value: "mixed", label: t("genderMixed") },
          ]}
        />
      </FilterSection>
      <FilterDivider />
      <ChoiceSection
        filters={filters}
        field="bathroomType"
        title={t("bathroom")}
        options={[
          ["private", t("bathroomPrivate")],
          ["shared", t("bathroomShared")],
        ]}
      />
      <FilterDivider />
      <FilterSection title={t("filterHousehold")}>
        <FlagPills
          filters={filters}
          flags={[
            ["hasPets", t("hasPets")],
            ["wfhFriendly", t("wfh")],
            ["quietHome", t("quiet")],
          ]}
        />
      </FilterSection>
      <FilterDivider />
      <ChoiceSection
        filters={filters}
        field="overnightGuests"
        title={t("guests")}
        options={[
          ["no", t("guestsNo")],
          ["ask", t("guestsAsk")],
          ["yes", t("guestsYes")],
        ]}
      />
      <FilterDivider />
      <ChoiceSection
        filters={filters}
        field="cleanliness"
        title={t("cleanliness")}
        options={[
          ["relaxed", t("cleanlinessRelaxed")],
          ["average", t("cleanlinessAverage")],
          ["tidy", t("cleanlinessTidy")],
        ]}
      />
    </>
  );
};

/** Filters that apply to every listing type. */
export const SharedSections = ({
  filters,
  showRentFilters = true,
}: {
  filters: FilterDraft;
  showRentFilters?: boolean;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const { draft, setField } = filters;
  const selectedIncludes = draft.includes ?? [];

  return (
    <>
      <ChoiceSection
        filters={filters}
        field="furnished"
        title={t("furnished")}
        options={[
          ["furnished", t("furnishedYes")],
          ["semi", t("furnishedSemi")],
          ["unfurnished", t("furnishedNo")],
        ]}
      />
      <FilterDivider />
      <FilterSection title={t("filterLifestyle")}>
        <FlagPills
          filters={filters}
          flags={[
            ["acceptsPets", t("acceptsPets")],
            ["couplesAllowed", t("couples")],
          ]}
        />
      </FilterSection>
      <FilterDivider />
      <ChoiceSection
        filters={filters}
        field="smokingPolicy"
        title={t("smoking")}
        options={[
          ["no", t("smokingNo")],
          ["outdoor", t("smokingOutdoor")],
          ["yes", t("smokingYes")],
        ]}
      />
      {showRentFilters ? (
        <>
          <FilterDivider />
          <FilterSection title={t("includes")}>
            <FilterPillGrid>
              {LISTING_INCLUDES.map((item) => (
                <FilterPill
                  key={item}
                  selected={selectedIncludes.includes(item)}
                  onClick={() => {
                    filters.toggleInclude(item);
                  }}
                >
                  {t(`include.${item}`)}
                </FilterPill>
              ))}
            </FilterPillGrid>
          </FilterSection>
          <FilterDivider />
          <FilterSection title={t("availableBy")}>
            <Input
              type="date"
              value={
                draft.availableBy
                  ? draft.availableBy.toISOString().slice(0, 10)
                  : ""
              }
              onChange={(event) => {
                setField(
                  "availableBy",
                  event.target.value.length > 0
                    ? new Date(event.target.value)
                    : undefined,
                );
              }}
            />
          </FilterSection>
        </>
      ) : null}
    </>
  );
};
