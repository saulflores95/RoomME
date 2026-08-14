"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

import type { ComplexAmenity, PresetAmenity } from "@acme/validators";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { FieldError, FieldLegend, FieldSet } from "@acme/ui/field";
import { Input } from "@acme/ui/input";
import {
  COMPLEX_AMENITIES,
  isPresetAmenity,
  MAX_AMENITIES,
  MAX_AMENITY_LENGTH,
} from "@acme/validators";

const pillClassName = (selected: boolean): string =>
  cn(
    "inline-flex h-8 items-center gap-1 rounded-full border px-3 text-sm font-medium transition-colors",
    selected
      ? "border-primary bg-primary text-primary-foreground"
      : "border-input bg-muted/40 text-foreground hover:bg-muted",
  );

export function AmenityPills({
  value,
  onChange,
  invalid = false,
  error,
}: {
  value: ComplexAmenity[];
  onChange: (next: ComplexAmenity[]) => void;
  invalid?: boolean;
  error?: { message?: string };
}): JSX.Element {
  const t = useTranslations("list");
  const [draft, setDraft] = useState("");
  const selected = new Set(value.map((item) => item.toLowerCase()));
  const customAmenities = value.filter((item) => !isPresetAmenity(item));

  const amenityLabel = (item: string): string =>
    isPresetAmenity(item) ? t(`amenity.${item}`) : item;

  const matchingPreset = (input: string): PresetAmenity | null => {
    const normalized = input.trim().toLowerCase();
    if (normalized.length === 0) {
      return null;
    }

    for (const preset of COMPLEX_AMENITIES) {
      if (preset === normalized) {
        return preset;
      }
      if (t(`amenity.${preset}`).toLowerCase() === normalized) {
        return preset;
      }
    }

    return null;
  };

  const toggle = (item: ComplexAmenity): void => {
    const exists = value.some(
      (current) => current.toLowerCase() === item.toLowerCase(),
    );
    onChange(
      exists
        ? value.filter(
            (current) => current.toLowerCase() !== item.toLowerCase(),
          )
        : [...value, item],
    );
  };

  const addCustom = (): void => {
    const trimmed = draft.trim();
    if (trimmed.length === 0 || value.length >= MAX_AMENITIES) {
      return;
    }

    const preset = matchingPreset(trimmed);
    const next = preset ?? trimmed.slice(0, MAX_AMENITY_LENGTH);
    if (selected.has(next.toLowerCase())) {
      setDraft("");
      return;
    }

    onChange([...value, next]);
    setDraft("");
  };

  return (
    <FieldSet>
      <FieldLegend variant="label">{t("amenities")}</FieldLegend>
      <div className="flex flex-wrap gap-2">
        {COMPLEX_AMENITIES.map((item) => {
          const isSelected = selected.has(item);
          return (
            <button
              key={item}
              type="button"
              aria-pressed={isSelected}
              className={pillClassName(isSelected)}
              onClick={() => {
                toggle(item);
              }}
            >
              {amenityLabel(item)}
            </button>
          );
        })}
        {customAmenities.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed
            className={pillClassName(true)}
            onClick={() => {
              toggle(item);
            }}
          >
            {item}
            <span aria-hidden className="text-xs">
              ×
            </span>
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={draft}
          maxLength={MAX_AMENITY_LENGTH}
          placeholder={t("amenityCustomPlaceholder")}
          aria-label={t("amenityCustomPlaceholder")}
          onChange={(event) => {
            setDraft(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addCustom();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={draft.trim().length === 0 || value.length >= MAX_AMENITIES}
          onClick={addCustom}
        >
          {t("amenityAdd")}
        </Button>
      </div>
      <p className="text-muted-foreground text-sm">{t("amenityCustomHint")}</p>
      {invalid ? <FieldError errors={[error]} /> : null}
    </FieldSet>
  );
}
