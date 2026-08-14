"use client";

import type { JSX } from "react";
import type {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import { Checkbox } from "@acme/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@acme/ui/field";
import { Input } from "@acme/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";
import { Textarea } from "@acme/ui/textarea";

interface FormFieldBase<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export const checkboxRowClassName =
  "rounded-lg border border-input bg-muted/30 px-3 py-2.5";

export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  min,
  max,
}: FormFieldBase<T> & {
  type?: React.HTMLInputTypeAttribute;
  min?: number | string;
  max?: number | string;
}): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            id={field.name}
            type={type}
            min={min}
            max={max}
            value={typeof field.value === "string" ? field.value : ""}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
}

export function FormTextareaField<T extends FieldValues>({
  control,
  name,
  label,
}: FormFieldBase<T>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Textarea
            {...field}
            id={field.name}
            value={typeof field.value === "string" ? field.value : ""}
            aria-invalid={fieldState.invalid}
            className="min-h-24"
          />
          {fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
}

export function FormNumberField<T extends FieldValues>({
  control,
  name,
  label,
  min,
  max,
}: FormFieldBase<T> & {
  min?: number;
  max?: number;
}): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const numeric =
          typeof field.value === "number" ? field.value : Number.NaN;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              ref={field.ref}
              type="number"
              min={min}
              max={max}
              onBlur={field.onBlur}
              value={Number.isFinite(numeric) ? numeric : ""}
              aria-invalid={fieldState.invalid}
              onChange={(event) => {
                const next = event.target.value;
                field.onChange(next.length === 0 ? Number.NaN : Number(next));
              }}
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        );
      }}
    />
  );
}

export function FormSelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  numeric = false,
}: FormFieldBase<T> & {
  options: { value: string; label: string }[];
  numeric?: boolean;
}): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Select
            value={String(field.value)}
            onValueChange={(value) => {
              const next = numeric ? Number(value) : value;
              field.onChange(next as PathValue<T, FieldPath<T>>);
            }}
          >
            <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
}

export function FormCheckboxField<T extends FieldValues>({
  control,
  name,
  label,
}: FormFieldBase<T>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          data-invalid={fieldState.invalid}
          className={checkboxRowClassName}
        >
          <Checkbox
            id={field.name}
            name={field.name}
            checked={field.value === true}
            onCheckedChange={(checked) => {
              field.onChange(checked === true);
            }}
            aria-invalid={fieldState.invalid}
          />
          <FieldLabel htmlFor={field.name} className="font-normal">
            {label}
          </FieldLabel>
          {fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
}
