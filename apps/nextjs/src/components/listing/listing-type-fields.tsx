"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import type { ListingFormValues, ListingType } from "@acme/validators";
import { cn } from "@acme/ui";
import { FieldGroup } from "@acme/ui/field";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";
import { LISTING_TYPES } from "@acme/validators";

import { isPropertyTypeAllowed, propertyTypesFor } from "~/lib/property-types";
import { FormSelectField } from "./form-controls";
import { ListingSectionCard } from "./section-card";

const isListingType = (value: string): value is ListingType =>
  LISTING_TYPES.some((type) => type === value);

export function ListingTypeFields({
  step,
  locked = false,
}: {
  step: number;
  locked?: boolean;
}): JSX.Element {
  const t = useTranslations("list");
  const { control, getValues, setValue } = useFormContext<ListingFormValues>();
  const listingType = useWatch({ control, name: "listingType" });

  const onListingTypeChange = (next: ListingType): void => {
    if (next === "room") {
      setValue("operationType", "rent");
    }
    if (next === "entire_property") {
      if (getValues("bedroomCount") < 1) {
        setValue("bedroomCount", 1);
      }
      if (getValues("bathroomCount") < 0.5) {
        setValue("bathroomCount", 1);
      }
    }
    if (!isPropertyTypeAllowed(next, getValues("propertyType"))) {
      setValue("propertyType", "apartment");
    }
  };

  return (
    <ListingSectionCard
      step={step}
      title={t("listingTypeStep")}
      description={t("listingTypeHint")}
    >
      <FieldGroup>
        <Controller
          control={control}
          name="listingType"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              disabled={locked}
              className="grid gap-3 sm:grid-cols-2"
              onValueChange={(value) => {
                if (!isListingType(value)) {
                  return;
                }
                field.onChange(value);
                onListingTypeChange(value);
              }}
            >
              {LISTING_TYPES.map((type) => (
                <label
                  key={type}
                  htmlFor={`listingType-${type}`}
                  className={cn(
                    "border-input flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                    field.value === type && "border-primary bg-primary/5",
                    locked && "cursor-not-allowed opacity-70",
                  )}
                >
                  <RadioGroupItem
                    id={`listingType-${type}`}
                    value={type}
                    className="mt-1"
                  />
                  <span className="space-y-1">
                    <span className="block font-medium">
                      {t(`listingTypeOption.${type}`)}
                    </span>
                    <span className="text-muted-foreground block text-sm">
                      {t(`listingTypeOptionHint.${type}`)}
                    </span>
                  </span>
                </label>
              ))}
            </RadioGroup>
          )}
        />
        <FormSelectField
          control={control}
          name="propertyType"
          label={t("propertyType")}
          options={propertyTypesFor(listingType).map((type) => ({
            value: type,
            label: t(`propertyTypeOption.${type}`),
          }))}
        />
      </FieldGroup>
    </ListingSectionCard>
  );
}
