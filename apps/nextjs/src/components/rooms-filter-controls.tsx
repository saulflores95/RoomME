"use client";

import type { JSX, ReactNode } from "react";

import { cn } from "@acme/ui";
import { Label } from "@acme/ui/label";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";
import { Separator } from "@acme/ui/separator";

export const RENT_MIN = 0;
export const RENT_MAX = 50_000;
export const RENT_STEP = 500;
export const AGE_MIN = 18;
export const AGE_MAX = 99;

export const countActiveFilters = (value: Record<string, unknown>): number =>
  Object.values(value).filter((item) => {
    if (item === undefined || item === null) {
      return false;
    }
    if (Array.isArray(item)) {
      return item.length > 0;
    }
    return true;
  }).length;

export function FilterSection({
  title,
  trailing,
  children,
}: {
  title: string;
  trailing?: ReactNode;
  children: ReactNode;
}): JSX.Element {
  return (
    <section className="space-y-3 py-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold">{title}</h3>
        {trailing}
      </div>
      {children}
    </section>
  );
}

export function FilterDivider(): JSX.Element {
  return <Separator />;
}

export function FilterPill({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-10 items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-background text-foreground hover:bg-muted/60",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function FilterPillGrid({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{children}</div>
  );
}

export function FilterRadioOption({
  value,
  label,
  id,
}: {
  value: string;
  label: string;
  id: string;
}): JSX.Element {
  return (
    <Label
      htmlFor={id}
      className="border-input hover:bg-muted/40 flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 font-normal"
    >
      <RadioGroupItem value={value} id={id} />
      <span>{label}</span>
    </Label>
  );
}

export function FilterRadioGrid({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (next: string) => void;
  options: { value: string; label: string }[];
}): JSX.Element {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-2 gap-2"
    >
      {options.map((option) => (
        <FilterRadioOption
          key={option.value}
          id={`filter-radio-${option.value}`}
          value={option.value}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
}
