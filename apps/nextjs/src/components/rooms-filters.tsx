"use client";

import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import type {
  HouseholdGender,
  ListingInclude,
  ListListingsInput,
} from "@acme/validators";
import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import { Input } from "@acme/ui/input";
import { Slider } from "@acme/ui/slider";
import { LISTING_INCLUDES } from "@acme/validators";

import {
  AGE_MAX,
  AGE_MIN,
  countActiveFilters,
  FilterDivider,
  FilterPill,
  FilterPillGrid,
  FilterRadioGrid,
  FilterSection,
  RENT_MAX,
  RENT_MIN,
  RENT_STEP,
} from "~/components/rooms-filter-controls";

const emptyFilters: ListListingsInput = {};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export function RoomsFilters({
  value,
  onChange,
}: {
  value: ListListingsInput;
  onChange: (next: ListListingsInput) => void;
}): JSX.Element {
  const t = useTranslations("rooms");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ListListingsInput>(value);

  useEffect(() => {
    if (open) {
      setDraft(value);
    }
  }, [open, value]);

  const setField = <K extends keyof ListListingsInput>(
    key: K,
    nextValue: ListListingsInput[K] | undefined,
  ): void => {
    setDraft((current) => {
      const next = { ...current };
      if (nextValue === undefined) {
        delete next[key];
      } else {
        next[key] = nextValue;
      }
      return next;
    });
  };

  const rentMin = draft.minRentMxn ?? RENT_MIN;
  const rentMax = draft.maxRentMxn ?? RENT_MAX;
  const ageValue = draft.seekerAge ?? AGE_MIN;
  const selectedIncludes = draft.includes ?? [];
  const activeCount = useMemo(() => countActiveFilters(value), [value]);

  const toggleInclude = (item: ListingInclude): void => {
    const selected = selectedIncludes.includes(item);
    const nextIncludes = selected
      ? selectedIncludes.filter((include) => include !== item)
      : [...selectedIncludes, item];
    setField("includes", nextIncludes.length > 0 ? nextIncludes : undefined);
  };

  const toggleExact = <K extends keyof ListListingsInput>(
    key: K,
    nextValue: NonNullable<ListListingsInput[K]>,
  ): void => {
    setField(key, draft[key] === nextValue ? undefined : nextValue);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="gap-2">
          {t("filters")}
          {activeCount > 0 ? (
            <span className="bg-primary text-primary-foreground inline-flex size-5 items-center justify-center rounded-full text-xs font-semibold">
              {activeCount}
            </span>
          ) : null}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="flex max-h-[min(90vh,720px)] flex-col gap-0 p-0 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>{t("filters")}</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto px-5">
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
                  const next = clamp(
                    Number(event.target.value),
                    RENT_MIN,
                    rentMax,
                  );
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
                  const next = clamp(
                    Number(event.target.value),
                    rentMin,
                    RENT_MAX,
                  );
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

          <FilterDivider />

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
                  if (raw.length === 0) {
                    setField("seekerAge", undefined);
                    return;
                  }
                  setField("seekerAge", clamp(Number(raw), AGE_MIN, AGE_MAX));
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
              value={[ageValue]}
              onValueChange={(next) => {
                const [age = AGE_MIN] = next;
                setField("seekerAge", age);
              }}
            />
          </FilterSection>

          <FilterDivider />

          <FilterSection title={t("gender")}>
            <FilterRadioGrid
              value={draft.householdGender ?? "any"}
              onChange={(next) => {
                setField(
                  "householdGender",
                  next === "any" ? undefined : (next as HouseholdGender),
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

          <FilterSection title={t("bathroom")}>
            <FilterPillGrid>
              {(
                [
                  ["private", t("bathroomPrivate")],
                  ["shared", t("bathroomShared")],
                ] as const
              ).map(([item, label]) => (
                <FilterPill
                  key={item}
                  selected={draft.bathroomType === item}
                  onClick={() => {
                    toggleExact("bathroomType", item);
                  }}
                >
                  {label}
                </FilterPill>
              ))}
            </FilterPillGrid>
          </FilterSection>

          <FilterDivider />

          <FilterSection title={t("furnished")}>
            <FilterPillGrid>
              {(
                [
                  ["furnished", t("furnishedYes")],
                  ["semi", t("furnishedSemi")],
                  ["unfurnished", t("furnishedNo")],
                ] as const
              ).map(([item, label]) => (
                <FilterPill
                  key={item}
                  selected={draft.furnished === item}
                  onClick={() => {
                    toggleExact("furnished", item);
                  }}
                >
                  {label}
                </FilterPill>
              ))}
            </FilterPillGrid>
          </FilterSection>

          <FilterDivider />

          <FilterSection title={t("filterLifestyle")}>
            <FilterPillGrid>
              <FilterPill
                selected={draft.hasPets === true}
                onClick={() => {
                  toggleExact("hasPets", true);
                }}
              >
                {t("hasPets")}
              </FilterPill>
              <FilterPill
                selected={draft.acceptsPets === true}
                onClick={() => {
                  toggleExact("acceptsPets", true);
                }}
              >
                {t("acceptsPets")}
              </FilterPill>
              <FilterPill
                selected={draft.couplesAllowed === true}
                onClick={() => {
                  toggleExact("couplesAllowed", true);
                }}
              >
                {t("couples")}
              </FilterPill>
              <FilterPill
                selected={draft.wfhFriendly === true}
                onClick={() => {
                  toggleExact("wfhFriendly", true);
                }}
              >
                {t("wfh")}
              </FilterPill>
              <FilterPill
                selected={draft.quietHome === true}
                onClick={() => {
                  toggleExact("quietHome", true);
                }}
              >
                {t("quiet")}
              </FilterPill>
            </FilterPillGrid>
          </FilterSection>

          <FilterDivider />

          <FilterSection title={t("smoking")}>
            <FilterPillGrid>
              {(
                [
                  ["no", t("smokingNo")],
                  ["outdoor", t("smokingOutdoor")],
                  ["yes", t("smokingYes")],
                ] as const
              ).map(([item, label]) => (
                <FilterPill
                  key={item}
                  selected={draft.smokingPolicy === item}
                  onClick={() => {
                    toggleExact("smokingPolicy", item);
                  }}
                >
                  {label}
                </FilterPill>
              ))}
            </FilterPillGrid>
          </FilterSection>

          <FilterDivider />

          <FilterSection title={t("guests")}>
            <FilterPillGrid>
              {(
                [
                  ["no", t("guestsNo")],
                  ["ask", t("guestsAsk")],
                  ["yes", t("guestsYes")],
                ] as const
              ).map(([item, label]) => (
                <FilterPill
                  key={item}
                  selected={draft.overnightGuests === item}
                  onClick={() => {
                    toggleExact("overnightGuests", item);
                  }}
                >
                  {label}
                </FilterPill>
              ))}
            </FilterPillGrid>
          </FilterSection>

          <FilterDivider />

          <FilterSection title={t("cleanliness")}>
            <FilterPillGrid>
              {(
                [
                  ["relaxed", t("cleanlinessRelaxed")],
                  ["average", t("cleanlinessAverage")],
                  ["tidy", t("cleanlinessTidy")],
                ] as const
              ).map(([item, label]) => (
                <FilterPill
                  key={item}
                  selected={draft.cleanliness === item}
                  onClick={() => {
                    toggleExact("cleanliness", item);
                  }}
                >
                  {label}
                </FilterPill>
              ))}
            </FilterPillGrid>
          </FilterSection>

          <FilterDivider />

          <FilterSection title={t("includes")}>
            <FilterPillGrid>
              {LISTING_INCLUDES.map((item) => (
                <FilterPill
                  key={item}
                  selected={selectedIncludes.includes(item)}
                  onClick={() => {
                    toggleInclude(item);
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
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setDraft(emptyFilters);
            }}
          >
            {t("clear")}
          </Button>
          <Button
            type="button"
            onClick={() => {
              onChange(draft);
              setOpen(false);
            }}
          >
            {t("showResults")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
