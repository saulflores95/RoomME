"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Field, FieldDescription, FieldLabel } from "@acme/ui/field";
import { Input } from "@acme/ui/input";
import { MAX_PROFILE_TAG_LENGTH, MAX_PROFILE_TAGS } from "@acme/validators";

export const pillClassName = (selected: boolean): string =>
  cn(
    "inline-flex h-8 items-center gap-1 rounded-full border px-3 text-sm font-medium transition-colors",
    selected
      ? "border-primary bg-primary text-primary-foreground"
      : "border-input bg-muted/40 text-foreground hover:bg-muted",
  );

export function TagPills({
  label,
  hint,
  presets,
  value,
  onChange,
  namespace,
}: {
  label: string;
  hint: string;
  presets: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  namespace: "hobby" | "personality";
}): JSX.Element {
  const t = useTranslations("tags");
  const tSettings = useTranslations("settings");
  const [draft, setDraft] = useState("");
  const selected = new Set(value.map((item) => item.toLowerCase()));
  const customTags = value.filter(
    (item) => !presets.some((preset) => preset === item),
  );

  const tagLabel = (item: string): string =>
    presets.includes(item) ? t(`${namespace}.${item}`) : item;

  const matchingPreset = (input: string): string | null => {
    const normalized = input.trim().toLowerCase();
    if (normalized.length === 0) {
      return null;
    }

    for (const preset of presets) {
      if (preset === normalized) {
        return preset;
      }
      if (t(`${namespace}.${preset}`).toLowerCase() === normalized) {
        return preset;
      }
    }

    return null;
  };

  const toggle = (item: string): void => {
    const exists = value.some(
      (current) => current.toLowerCase() === item.toLowerCase(),
    );
    onChange(
      exists
        ? value.filter(
            (current) => current.toLowerCase() !== item.toLowerCase(),
          )
        : value.length >= MAX_PROFILE_TAGS
          ? value
          : [...value, item],
    );
  };

  const addCustom = (): void => {
    const trimmed = draft.trim();
    if (trimmed.length === 0 || value.length >= MAX_PROFILE_TAGS) {
      return;
    }

    const next =
      matchingPreset(trimmed) ?? trimmed.slice(0, MAX_PROFILE_TAG_LENGTH);
    if (selected.has(next.toLowerCase())) {
      setDraft("");
      return;
    }

    onChange([...value, next]);
    setDraft("");
  };

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {presets.map((item) => {
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
              {tagLabel(item)}
            </button>
          );
        })}
        {customTags.map((item) => (
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
          maxLength={MAX_PROFILE_TAG_LENGTH}
          placeholder={tSettings("tagCustomPlaceholder")}
          aria-label={tSettings("tagCustomPlaceholder")}
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
          disabled={
            draft.trim().length === 0 || value.length >= MAX_PROFILE_TAGS
          }
          onClick={addCustom}
        >
          {tSettings("tagAdd")}
        </Button>
      </div>
      <FieldDescription>{hint}</FieldDescription>
    </Field>
  );
}
