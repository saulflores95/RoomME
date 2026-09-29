"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import type { ListingFormValues } from "@acme/validators";
import { FieldGroup } from "@acme/ui/field";
import { MAX_BATHROOMS, MAX_BEDROOMS } from "@acme/validators";

import { FormCheckboxField, FormNumberField } from "./form-controls";
import { ListingSectionCard } from "./section-card";

/** Entire-property layout: replaces the room-only household step. */
export function LayoutFields({ step }: { step: number }): JSX.Element {
  const t = useTranslations("list");
  const { control } = useFormContext<ListingFormValues>();

  return (
    <ListingSectionCard
      step={step}
      title={t("layout")}
      description={t("layoutHint")}
    >
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormNumberField
            control={control}
            name="bedroomCount"
            label={t("bedroomCount")}
            min={1}
            max={MAX_BEDROOMS}
          />
          <FormNumberField
            control={control}
            name="bathroomCount"
            label={t("bathroomCount")}
            min={0.5}
            max={MAX_BATHROOMS}
            stepValue={0.5}
          />
        </div>
        <FormNumberField
          control={control}
          name="capacity"
          label={t("maxOccupants")}
          min={1}
          max={12}
        />
        <FormCheckboxField
          control={control}
          name="acceptsPets"
          label={t("petsAllowed")}
        />
      </FieldGroup>
    </ListingSectionCard>
  );
}
