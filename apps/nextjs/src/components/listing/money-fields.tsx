"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import type { ListingFormValues, ListingInclude } from "@acme/validators";
import { Checkbox } from "@acme/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@acme/ui/field";
import { LEASE_MONTHS, LISTING_INCLUDES } from "@acme/validators";

import {
  checkboxRowClassName,
  FormNumberField,
  FormSelectField,
} from "./form-controls";
import { ListingSectionCard } from "./section-card";

export function MoneyFields(): JSX.Element {
  const t = useTranslations("list");
  const { control } = useFormContext<ListingFormValues>();

  return (
    <ListingSectionCard
      step={2}
      title={t("money")}
      description={t("moneyHint")}
    >
      <FieldGroup>
        <FormNumberField
          control={control}
          name="rentPriceMxn"
          label={t("rent")}
          min={1}
        />
        <FormNumberField
          control={control}
          name="depositMonths"
          label={t("depositMonths")}
          min={0}
          max={3}
        />
        <FormSelectField
          control={control}
          name="leaseMonths"
          label={t("leaseMonths")}
          numeric
          options={LEASE_MONTHS.map((months) => ({
            value: String(months),
            label: t("leaseMonthsValue", { count: months }),
          }))}
        />
        <Controller
          control={control}
          name="includes"
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLegend variant="label">{t("includes")}</FieldLegend>
              <FieldGroup data-slot="checkbox-group">
                {LISTING_INCLUDES.map((item) => (
                  <Field
                    key={item}
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                    className={checkboxRowClassName}
                  >
                    <Checkbox
                      id={`include-${item}`}
                      checked={field.value.includes(item)}
                      aria-invalid={fieldState.invalid}
                      onCheckedChange={(checked) => {
                        const next: ListingInclude[] =
                          checked === true
                            ? [...field.value, item]
                            : field.value.filter((value) => value !== item);
                        field.onChange(next);
                      }}
                    />
                    <FieldLabel
                      htmlFor={`include-${item}`}
                      className="font-normal"
                    >
                      {t(`include.${item}`)}
                    </FieldLabel>
                  </Field>
                ))}
              </FieldGroup>
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </FieldSet>
          )}
        />
      </FieldGroup>
    </ListingSectionCard>
  );
}
