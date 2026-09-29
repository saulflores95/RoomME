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
  RENT_MAX,
  RENT_MIN,
  RENT_STEP,
} from "~/components/rooms-filter-controls";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const RentSection = ({
  filters,
}: {
  filters: FilterDraft;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const { draft, setField, setDraft } = filters;
  const rentMin = draft.minRentMxn ?? RENT_MIN;
  const rentMax = draft.maxRentMxn ?? RENT_MAX;

  return (
    <FilterSection
      title={t("rent")}
      trailing={
        <span className="text-muted-foreground text-sm tabular-nums">
          {t("rentRange", {
            min: rentMin.toLocaleString(),
            max: rentMax.toLocaleString(),
          })}
        </span>
      }
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Input
          type="number"
          min={RENT_MIN}
          max={RENT_MAX}
          step={RENT_STEP}
          value={rentMin}
          onChange={(event) => {
            const next = clamp(Number(event.target.value), RENT_MIN, rentMax);
            setField("minRentMxn", next === RENT_MIN ? undefined : next);
          }}
        />
        <span className="text-muted-foreground">–</span>
        <Input
          type="number"
          min={RENT_MIN}
          max={RENT_MAX}
          step={RENT_STEP}
          value={rentMax}
          onChange={(event) => {
            const next = clamp(Number(event.target.value), rentMin, RENT_MAX);
            setField("maxRentMxn", next === RENT_MAX ? undefined : next);
          }}
        />
      </div>
      <Slider
        min={RENT_MIN}
        max={RENT_MAX}
        step={RENT_STEP}
        value={[rentMin, rentMax]}
        onValueChange={(next) => {
          const [min = RENT_MIN, max = RENT_MAX] = next;
          setDraft((current) => ({
            ...current,
            minRentMxn: min === RENT_MIN ? undefined : min,
            maxRentMxn: max === RENT_MAX ? undefined : max,
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
