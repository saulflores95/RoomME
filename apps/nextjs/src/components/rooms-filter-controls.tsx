import type { ReactNode } from "react";

import { NativeSelect } from "~/components/listing/native-select";

export const parseOptionalBoolean = (value: string): boolean | undefined => {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return undefined;
};

export const parseOptionalNumber = (value: string): number | undefined => {
  if (value.trim().length === 0) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export function FilterField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="space-y-1 text-sm">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function OptionalBooleanSelect({
  value,
  onChange,
  anyLabel,
  yesLabel,
  noLabel,
}: {
  value: boolean | undefined;
  onChange: (next: boolean | undefined) => void;
  anyLabel: string;
  yesLabel: string;
  noLabel: string;
}) {
  return (
    <NativeSelect
      value={value === undefined ? "" : value ? "true" : "false"}
      onChange={(event) => {
        onChange(parseOptionalBoolean(event.target.value));
      }}
    >
      <option value="">{anyLabel}</option>
      <option value="true">{yesLabel}</option>
      <option value="false">{noLabel}</option>
    </NativeSelect>
  );
}

export function OptionalEnumSelect<T extends string>({
  value,
  onChange,
  anyLabel,
  options,
}: {
  value: T | undefined;
  onChange: (next: T | undefined) => void;
  anyLabel: string;
  options: { value: T; label: string }[];
}) {
  return (
    <NativeSelect
      value={value ?? ""}
      onChange={(event) => {
        const next = event.target.value;
        onChange(next.length > 0 ? (next as T) : undefined);
      }}
    >
      <option value="">{anyLabel}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </NativeSelect>
  );
}
