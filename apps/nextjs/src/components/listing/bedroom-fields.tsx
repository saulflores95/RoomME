"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import type { ListingFormValues } from "@acme/validators";
import { FieldGroup } from "@acme/ui/field";

import {
  FormSelectField,
  FormTextareaField,
  FormTextField,
} from "./form-controls";

export function BedroomFields(): JSX.Element {
  const t = useTranslations("list");
  const { control } = useFormContext<ListingFormValues>();

  return (
    <FieldGroup>
      <h2 className="text-xl font-semibold">{t("room")}</h2>
      <FormTextField
        control={control}
        name="roomTitle"
        label={t("roomTitle")}
      />
      <FormTextareaField
        control={control}
        name="roomDescription"
        label={t("roomDescription")}
      />
      <FormSelectField
        control={control}
        name="bathroomType"
        label={t("bathroomType")}
        options={[
          { value: "private", label: t("bathroomPrivate") },
          { value: "shared", label: t("bathroomShared") },
        ]}
      />
      <FormSelectField
        control={control}
        name="furnished"
        label={t("furnished")}
        options={[
          { value: "furnished", label: t("furnishedYes") },
          { value: "semi", label: t("furnishedSemi") },
          { value: "unfurnished", label: t("furnishedNo") },
        ]}
      />
      <FormTextField
        control={control}
        name="availableFrom"
        label={t("availableFrom")}
        type="date"
      />
      <FormTextField
        control={control}
        name="roomImageUrl"
        label={t("roomImage")}
        type="url"
      />
    </FieldGroup>
  );
}
