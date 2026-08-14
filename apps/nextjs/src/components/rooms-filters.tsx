"use client";

import { useTranslations } from "next-intl";

import type {
  BathroomType,
  Cleanliness,
  Furnished,
  HouseholdGender,
  ListingInclude,
  ListListingsInput,
  OvernightGuests,
  SmokingPolicy,
} from "@acme/validators";
import { LISTING_INCLUDES } from "@acme/validators";

import {
  FilterField,
  OptionalBooleanSelect,
  OptionalEnumSelect,
  parseOptionalNumber,
} from "~/components/rooms-filter-controls";

const emptyFilters: ListListingsInput = {};

export function RoomsFilters({
  value,
  onChange,
}: {
  value: ListListingsInput;
  onChange: (next: ListListingsInput) => void;
}) {
  const t = useTranslations("rooms");

  const setField = <K extends keyof ListListingsInput>(
    key: K,
    nextValue: ListListingsInput[K] | undefined,
  ): void => {
    onChange({
      ...value,
      [key]: nextValue,
    });
  };

  const selectedIncludes = value.includes ?? [];
  const inputClassName =
    "border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm";

  return (
    <section className="border-border space-y-4 rounded-2xl border p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold">{t("filters")}</h2>
        <button
          type="button"
          className="text-muted-foreground text-sm underline"
          onClick={() => {
            onChange(emptyFilters);
          }}
        >
          {t("clear")}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <FilterField label={t("gender")}>
          <OptionalEnumSelect<HouseholdGender>
            value={value.householdGender}
            onChange={(next) => {
              setField("householdGender", next);
            }}
            anyLabel={t("any")}
            options={[
              { value: "male", label: t("genderMale") },
              { value: "female", label: t("genderFemale") },
              { value: "mixed", label: t("genderMixed") },
            ]}
          />
        </FilterField>

        <FilterField label={t("age")}>
          <input
            type="number"
            min={18}
            max={99}
            className={inputClassName}
            value={value.seekerAge ?? ""}
            onChange={(event) => {
              setField("seekerAge", parseOptionalNumber(event.target.value));
            }}
          />
        </FilterField>

        <FilterField label={t("hasPets")}>
          <OptionalBooleanSelect
            value={value.hasPets}
            onChange={(next) => {
              setField("hasPets", next);
            }}
            anyLabel={t("any")}
            yesLabel={t("yes")}
            noLabel={t("no")}
          />
        </FilterField>

        <FilterField label={t("acceptsPets")}>
          <OptionalBooleanSelect
            value={value.acceptsPets}
            onChange={(next) => {
              setField("acceptsPets", next);
            }}
            anyLabel={t("any")}
            yesLabel={t("yes")}
            noLabel={t("no")}
          />
        </FilterField>

        <FilterField label={t("bathroom")}>
          <OptionalEnumSelect<BathroomType>
            value={value.bathroomType}
            onChange={(next) => {
              setField("bathroomType", next);
            }}
            anyLabel={t("any")}
            options={[
              { value: "private", label: t("bathroomPrivate") },
              { value: "shared", label: t("bathroomShared") },
            ]}
          />
        </FilterField>

        <FilterField label={t("furnished")}>
          <OptionalEnumSelect<Furnished>
            value={value.furnished}
            onChange={(next) => {
              setField("furnished", next);
            }}
            anyLabel={t("any")}
            options={[
              { value: "furnished", label: t("furnishedYes") },
              { value: "semi", label: t("furnishedSemi") },
              { value: "unfurnished", label: t("furnishedNo") },
            ]}
          />
        </FilterField>

        <FilterField label={t("availableBy")}>
          <input
            type="date"
            className={inputClassName}
            value={
              value.availableBy
                ? value.availableBy.toISOString().slice(0, 10)
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
        </FilterField>

        <FilterField label={t("couples")}>
          <OptionalBooleanSelect
            value={value.couplesAllowed}
            onChange={(next) => {
              setField("couplesAllowed", next);
            }}
            anyLabel={t("any")}
            yesLabel={t("yes")}
            noLabel={t("no")}
          />
        </FilterField>

        <FilterField label={t("smoking")}>
          <OptionalEnumSelect<SmokingPolicy>
            value={value.smokingPolicy}
            onChange={(next) => {
              setField("smokingPolicy", next);
            }}
            anyLabel={t("any")}
            options={[
              { value: "no", label: t("smokingNo") },
              { value: "outdoor", label: t("smokingOutdoor") },
              { value: "yes", label: t("smokingYes") },
            ]}
          />
        </FilterField>

        <FilterField label={t("guests")}>
          <OptionalEnumSelect<OvernightGuests>
            value={value.overnightGuests}
            onChange={(next) => {
              setField("overnightGuests", next);
            }}
            anyLabel={t("any")}
            options={[
              { value: "no", label: t("guestsNo") },
              { value: "ask", label: t("guestsAsk") },
              { value: "yes", label: t("guestsYes") },
            ]}
          />
        </FilterField>

        <FilterField label={t("wfh")}>
          <OptionalBooleanSelect
            value={value.wfhFriendly}
            onChange={(next) => {
              setField("wfhFriendly", next);
            }}
            anyLabel={t("any")}
            yesLabel={t("yes")}
            noLabel={t("no")}
          />
        </FilterField>

        <FilterField label={t("quiet")}>
          <OptionalBooleanSelect
            value={value.quietHome}
            onChange={(next) => {
              setField("quietHome", next);
            }}
            anyLabel={t("any")}
            yesLabel={t("yes")}
            noLabel={t("no")}
          />
        </FilterField>

        <FilterField label={t("cleanliness")}>
          <OptionalEnumSelect<Cleanliness>
            value={value.cleanliness}
            onChange={(next) => {
              setField("cleanliness", next);
            }}
            anyLabel={t("any")}
            options={[
              { value: "relaxed", label: t("cleanlinessRelaxed") },
              { value: "average", label: t("cleanlinessAverage") },
              { value: "tidy", label: t("cleanlinessTidy") },
            ]}
          />
        </FilterField>

        <FilterField label={t("rentMin")}>
          <input
            type="number"
            min={0}
            className={inputClassName}
            value={value.minRentMxn ?? ""}
            onChange={(event) => {
              setField("minRentMxn", parseOptionalNumber(event.target.value));
            }}
          />
        </FilterField>

        <FilterField label={t("rentMax")}>
          <input
            type="number"
            min={1}
            className={inputClassName}
            value={value.maxRentMxn ?? ""}
            onChange={(event) => {
              setField("maxRentMxn", parseOptionalNumber(event.target.value));
            }}
          />
        </FilterField>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">{t("includes")}</legend>
        <div className="flex flex-wrap gap-3">
          {LISTING_INCLUDES.map((item) => {
            const checked = selectedIncludes.includes(item);
            return (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => {
                    const nextIncludes: ListingInclude[] = event.target.checked
                      ? [...selectedIncludes, item]
                      : selectedIncludes.filter((include) => include !== item);
                    setField(
                      "includes",
                      nextIncludes.length > 0 ? nextIncludes : undefined,
                    );
                  }}
                />
                {t(`include.${item}`)}
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
