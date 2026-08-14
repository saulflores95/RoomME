"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import type { ListingFormValues } from "@acme/validators";
import { FieldGroup } from "@acme/ui/field";

import { FormCheckboxField, FormSelectField } from "./form-controls";

export function RulesFields(): JSX.Element {
  const t = useTranslations("list");
  const { control } = useFormContext<ListingFormValues>();

  return (
    <FieldGroup>
      <h2 className="text-xl font-semibold">{t("rules")}</h2>
      <FormCheckboxField
        control={control}
        name="couplesAllowed"
        label={t("couplesAllowed")}
      />
      <FormSelectField
        control={control}
        name="smokingPolicy"
        label={t("smokingPolicy")}
        options={[
          { value: "no", label: t("smokingNo") },
          { value: "outdoor", label: t("smokingOutdoor") },
          { value: "yes", label: t("smokingYes") },
        ]}
      />
      <FormSelectField
        control={control}
        name="overnightGuests"
        label={t("overnightGuests")}
        options={[
          { value: "no", label: t("guestsNo") },
          { value: "ask", label: t("guestsAsk") },
          { value: "yes", label: t("guestsYes") },
        ]}
      />
      <FormCheckboxField
        control={control}
        name="wfhFriendly"
        label={t("wfhFriendly")}
      />
      <FormCheckboxField
        control={control}
        name="quietHome"
        label={t("quietHome")}
      />
      <FormSelectField
        control={control}
        name="cleanliness"
        label={t("cleanliness")}
        options={[
          { value: "relaxed", label: t("cleanlinessRelaxed") },
          { value: "average", label: t("cleanlinessAverage") },
          { value: "tidy", label: t("cleanlinessTidy") },
        ]}
      />
    </FieldGroup>
  );
}
