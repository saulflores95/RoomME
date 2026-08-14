"use client";

import type { JSX } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";

import type { ComplexFormValues } from "@acme/validators";
import { Button } from "@acme/ui/button";
import { FieldError, FieldGroup } from "@acme/ui/field";
import { toast } from "@acme/ui/toast";
import { ComplexFormSchema } from "@acme/validators";

import { AddressPicker } from "~/components/address-picker";
import { AmenityPills } from "~/components/listing/amenity-pills";
import {
  FormCheckboxField,
  FormSelectField,
  FormTextareaField,
  FormTextField,
} from "~/components/listing/form-controls";
import { complexFormDefaults } from "~/components/listing/form-values";
import { ImageUploader } from "~/components/listing/image-uploader";
import { ListingSectionCard } from "~/components/listing/section-card";
import { useRouter } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

export function ComplexForm({
  complexId,
  defaultValues,
}: {
  complexId?: string;
  defaultValues?: ComplexFormValues;
}): JSX.Element {
  const t = useTranslations("list");
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = complexId !== undefined;

  const form = useForm<ComplexFormValues>({
    resolver: zodResolver(ComplexFormSchema),
    defaultValues: defaultValues ?? complexFormDefaults(),
  });

  const city = useWatch({ control: form.control, name: "city" });
  const latitude = useWatch({ control: form.control, name: "latitude" });
  const longitude = useWatch({ control: form.control, name: "longitude" });
  const pin =
    latitude !== undefined && longitude !== undefined
      ? { latitude, longitude }
      : null;

  const create = useMutation(
    trpc.listing.createComplex.mutationOptions({
      onSuccess: async () => {
        toast.success(t("complexSuccess"));
        await queryClient.invalidateQueries(
          trpc.listing.complexes.queryFilter(),
        );
        await queryClient.invalidateQueries(trpc.listing.mine.queryFilter());
        router.push("/host");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const update = useMutation(
    trpc.listing.updateComplex.mutationOptions({
      onSuccess: async () => {
        toast.success(t("saved"));
        await queryClient.invalidateQueries(
          trpc.listing.complexes.queryFilter(),
        );
        await queryClient.invalidateQueries(trpc.listing.mine.queryFilter());
        router.push("/host");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const onSubmit = (values: ComplexFormValues): void => {
    if (isEdit) {
      update.mutate({ id: complexId, ...values });
      return;
    }
    create.mutate(values);
  };

  return (
    <FormProvider {...form}>
      <form
        className="mx-auto max-w-2xl space-y-6"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ListingSectionCard
          step={1}
          title={t("complex")}
          description={t("complexAboutHint")}
        >
          <FieldGroup>
            <FormTextField
              control={form.control}
              name="title"
              label={t("complexTitle")}
            />
            <FormTextareaField
              control={form.control}
              name="description"
              label={t("complexDescription")}
            />
            <Controller
              control={form.control}
              name="images"
              render={({ field, fieldState }) => (
                <ImageUploader
                  label={t("complexImage")}
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

        <ListingSectionCard
          step={2}
          title={t("location")}
          description={t("locationHint")}
        >
          <FieldGroup>
            <FormTextField
              control={form.control}
              name="addressLine1"
              label={t("address")}
            />
            <FormSelectField
              control={form.control}
              name="city"
              label={t("city")}
              options={[
                { value: "cdmx", label: "CDMX" },
                { value: "queretaro", label: "Querétaro" },
              ]}
            />
            <FormTextField
              control={form.control}
              name="neighborhood"
              label={t("neighborhood")}
            />
            <AddressPicker
              city={city}
              pin={pin}
              locked={false}
              searchPlaceholder={t("searchAddress")}
              clickHint={t("mapHint")}
              lockedHint={t("mapLocked")}
              noResults={t("noAddressResults")}
              onLocationChange={(hit) => {
                form.setValue(
                  "addressLine1",
                  hit.addressLine1.length > 0
                    ? hit.addressLine1
                    : form.getValues("addressLine1"),
                  { shouldDirty: true, shouldValidate: true },
                );
                form.setValue("city", hit.city, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                form.setValue(
                  "neighborhood",
                  hit.neighborhood.length > 0
                    ? hit.neighborhood
                    : form.getValues("neighborhood"),
                  { shouldDirty: true, shouldValidate: true },
                );
                form.setValue("latitude", hit.latitude, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                form.setValue("longitude", hit.longitude, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
            {form.formState.errors.latitude ? (
              <FieldError errors={[form.formState.errors.latitude]} />
            ) : null}
          </FieldGroup>
        </ListingSectionCard>

        <ListingSectionCard
          step={3}
          title={t("amenities")}
          description={t("amenitiesHint")}
        >
          <FieldGroup>
            <FormCheckboxField
              control={form.control}
              name="petFriendly"
              label={t("petFriendly")}
            />
            <Controller
              control={form.control}
              name="amenities"
              render={({ field, fieldState }) => (
                <AmenityPills
                  value={field.value}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                  error={fieldState.error}
                />
              )}
            />
          </FieldGroup>
        </ListingSectionCard>

        <Button type="submit" disabled={create.isPending || update.isPending}>
          {isEdit ? t("save") : t("complexSubmit")}
        </Button>
      </form>
    </FormProvider>
  );
}
