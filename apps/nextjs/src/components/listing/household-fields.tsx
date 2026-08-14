"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import type { ListingFormValues } from "@acme/validators";
import { FieldGroup } from "@acme/ui/field";

import {
  FormCheckboxField,
  FormNumberField,
  FormSelectField,
} from "./form-controls";

export function HouseholdFields(): JSX.Element {
  const t = useTranslations("list");
  const { control } = useFormContext<ListingFormValues>();

  return (
    <FieldGroup>
      <h2 className="text-xl font-semibold">{t("household")}</h2>
      <FormNumberField
        control={control}
        name="capacity"
        label={t("capacity")}
        min={1}
        max={12}
      />
      <FormSelectField
        control={control}
        name="householdGender"
        label={t("householdGender")}
        options={[
          { value: "male", label: t("genderMale") },
          { value: "female", label: t("genderFemale") },
          { value: "mixed", label: t("genderMixed") },
        ]}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormNumberField
          control={control}
          name="preferredAgeMin"
          label={t("ageMin")}
          min={18}
          max={99}
        />
        <FormNumberField
          control={control}
          name="preferredAgeMax"
          label={t("ageMax")}
          min={18}
          max={99}
        />
      </div>
      <FormCheckboxField
        control={control}
        name="hasPets"
        label={t("hasPets")}
      />
      <FormCheckboxField
        control={control}
        name="acceptsPets"
        label={t("acceptsPets")}
      />
    </FieldGroup>
  );
}
