"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import type { ListingFormValues, OperationType } from "@acme/validators";
import { cn } from "@acme/ui";
import { FieldError, FieldGroup } from "@acme/ui/field";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";
import { OPERATION_TYPES } from "@acme/validators";

import { ListingSectionCard } from "./section-card";

const isOperationType = (value: string): value is OperationType =>
  OPERATION_TYPES.some((type) => type === value);

/** Rent or sale. Stays editable so hosts can switch an existing listing. */
export function OperationTypeFields({ step }: { step: number }): JSX.Element {
  const t = useTranslations("list");
  const { control } = useFormContext<ListingFormValues>();

  return (
    <ListingSectionCard
      step={step}
      title={t("operationStep")}
      description={t("operationHint")}
    >
      <FieldGroup>
        <Controller
          control={control}
          name="operationType"
          render={({ field, fieldState }) => (
            <>
              <RadioGroup
                value={field.value}
                className="grid gap-3 sm:grid-cols-2"
                onValueChange={(value) => {
                  if (isOperationType(value)) {
                    field.onChange(value);
                  }
                }}
              >
                {OPERATION_TYPES.map((type) => (
                  <label
                    key={type}
                    htmlFor={`operationType-${type}`}
                    className={cn(
                      "border-input flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                      field.value === type && "border-primary bg-primary/5",
                    )}
                  >
                    <RadioGroupItem
                      id={`operationType-${type}`}
                      value={type}
                      className="mt-1"
                    />
                    <span className="space-y-1">
                      <span className="block font-medium">
                        {t(`operationOption.${type}`)}
                      </span>
                      <span className="text-muted-foreground block text-sm">
                        {t(`operationOptionHint.${type}`)}
                      </span>
                    </span>
                  </label>
                ))}
              </RadioGroup>
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </>
          )}
        />
      </FieldGroup>
    </ListingSectionCard>
  );
}
