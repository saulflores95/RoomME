"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import { Input } from "@acme/ui/input";
import { Slider } from "@acme/ui/slider";

import type { FilterDraft } from "./use-filter-draft";
import {
  AGE_MAX,
  AGE_MIN,
  FilterSection,
  PRICE_BOUNDS,
} from "~/components/rooms-filter-controls";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const PriceSection = ({
  filters,
}: {
  filters: FilterDraft;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const { draft, setField, setDraft } = filters;
  const isSale = draft.operationType === "sale";
  const bounds = PRICE_BOUNDS[isSale ? "sale" : "rent"];
  const priceMin = draft.minPriceMxn ?? bounds.min;
  const priceMax = draft.maxPriceMxn ?? bounds.max;
  const range = {
    min: priceMin.toLocaleString(),
    max: priceMax.toLocaleString(),
  };

  return (
    <FilterSection
      title={isSale ? t("salePrice") : t("rent")}
      trailing={
        <span className="text-muted-foreground text-sm tabular-nums">
          {isSale ? t("salePriceRange", range) : t("rentRange", range)}
        </span>
      }
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Input
          type="number"
          min={bounds.min}
          max={bounds.max}
          step={bounds.step}
          value={priceMin}
          onChange={(event) => {
            const next = clamp(
              Number(event.target.value),
              bounds.min,
              priceMax,
            );
            setField("minPriceMxn", next === bounds.min ? undefined : next);
          }}
        />
        <span className="text-muted-foreground">–</span>
        <Input
          type="number"
          min={bounds.min}
          max={bounds.max}
          step={bounds.step}
          value={priceMax}
          onChange={(event) => {
            const next = clamp(
              Number(event.target.value),
              priceMin,
              bounds.max,
            );
            setField("maxPriceMxn", next === bounds.max ? undefined : next);
          }}
        />
      </div>
      <Slider
        min={bounds.min}
        max={bounds.max}
        step={bounds.step}
        value={[priceMin, priceMax]}
        onValueChange={(next) => {
          const [min = bounds.min, max = bounds.max] = next;
          setDraft((current) => ({
            ...current,
            minPriceMxn: min === bounds.min ? undefined : min,
            maxPriceMxn: max === bounds.max ? undefined : max,
          }));
        }}
      />
    </FilterSection>
  );
};

export const AgeSection = ({
  filters,
}: {
  filters: FilterDraft;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const { draft, setField } = filters;

  return (
    <FilterSection title={t("age")}>
      <div className="flex items-center justify-between gap-3">
        <Input
          type="number"
          min={AGE_MIN}
          max={AGE_MAX}
          className="max-w-24"
          value={draft.seekerAge ?? ""}
          placeholder={String(AGE_MIN)}
          onChange={(event) => {
            const raw = event.target.value;
            setField(
              "seekerAge",
              raw.length === 0
                ? undefined
                : clamp(Number(raw), AGE_MIN, AGE_MAX),
            );
          }}
        />
        <span className="text-muted-foreground text-sm">
          {draft.seekerAge !== undefined
            ? t("ageValue", { age: draft.seekerAge })
            : t("any")}
        </span>
      </div>
      <Slider
        min={AGE_MIN}
        max={AGE_MAX}
        step={1}
        value={[draft.seekerAge ?? AGE_MIN]}
        onValueChange={(next) => {
          const [age = AGE_MIN] = next;
          setField("seekerAge", age);
        }}
      />
    </FilterSection>
  );
};
