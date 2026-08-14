"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import type { ListingFormValues } from "@acme/validators";
import { FieldGroup } from "@acme/ui/field";

import {
  FormSelectField,
  FormTextareaField,
  FormTextField,
} from "./form-controls";
import { ImageUploader } from "./image-uploader";
import { ListingSectionCard } from "./section-card";

export function BedroomFields(): JSX.Element {
  const t = useTranslations("list");
  const { control } = useFormContext<ListingFormValues>();

  return (
    <ListingSectionCard step={1} title={t("room")} description={t("roomHint")}>
      <FieldGroup>
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
        <Controller
          control={control}
          name="images"
          render={({ field, fieldState }) => (
            <ImageUploader
              label={t("roomImage")}
              hint={t("imagesHint")}
              value={field.value}
              onChange={field.onChange}
              invalid={fieldState.invalid}
              error={fieldState.error}
              dropLabel={t("imagesDrop")}
              browseLabel={t("imagesBrowse")}
              removeLabel={t("imagesRemove")}
              uploadingLabel={t("imagesUploading")}
              maxReachedLabel={t("imagesMax")}
              uploadFailedLabel={t("imagesFailed")}
            />
          )}
        />
      </FieldGroup>
    </ListingSectionCard>
  );
}
