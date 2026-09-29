"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import type { ListingFormValues } from "@acme/validators";
import { FieldGroup } from "@acme/ui/field";

import {
  FormSelectField,
  FormTextareaField,
  FormTextField,
} from "./form-controls";
import { ImageUploader } from "./image-uploader";
import { ListingSectionCard } from "./section-card";

export function DetailsFields({ step }: { step: number }): JSX.Element {
  const t = useTranslations("list");
  const { control } = useFormContext<ListingFormValues>();
  const listingType = useWatch({ control, name: "listingType" });
  const isRoom = listingType === "room";

  return (
    <ListingSectionCard
      step={step}
      title={isRoom ? t("room") : t("details")}
      description={isRoom ? t("roomHint") : t("detailsHint")}
    >
      <FieldGroup>
        <FormTextField
          control={control}
          name="title"
          label={isRoom ? t("roomTitle") : t("listingTitle")}
        />
        <FormTextareaField
          control={control}
          name="description"
          label={isRoom ? t("roomDescription") : t("listingDescription")}
        />
        {isRoom ? (
          <FormSelectField
            control={control}
            name="bathroomType"
            label={t("bathroomType")}
            options={[
              { value: "private", label: t("bathroomPrivate") },
              { value: "shared", label: t("bathroomShared") },
            ]}
          />
        ) : null}
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
              label={isRoom ? t("roomImage") : t("listingImage")}
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
