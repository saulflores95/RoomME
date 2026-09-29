"use client";

import type { JSX } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";

import type { PropertyFormValues } from "@acme/validators";
import { isAgentOrAdmin } from "@acme/auth/roles";
import { Button } from "@acme/ui/button";
import { FieldError, FieldGroup } from "@acme/ui/field";
import { toast } from "@acme/ui/toast";
import {
  MAX_BATHROOMS,
  MAX_BEDROOMS,
  PROPERTY_TYPES,
  PropertyFormSchema,
} from "@acme/validators";

import { authClient } from "~/auth/client";
import { AddressPicker } from "~/components/address-picker";
import { AmenityPills } from "~/components/listing/amenity-pills";
import {
  FormCheckboxField,
  FormNumberField,
  FormSelectField,
  FormTextareaField,
  FormTextField,
} from "~/components/listing/form-controls";
import { propertyFormDefaults } from "~/components/listing/form-values";
import { ImageUploader } from "~/components/listing/image-uploader";
import { ListingSectionCard } from "~/components/listing/section-card";
import { useRouter } from "~/i18n/navigation";
import { useTRPC } from "~/trpc/react";

export function PropertyForm({
  propertyId,
  defaultValues,
}: {
  propertyId?: string;
  defaultValues?: PropertyFormValues;
}): JSX.Element {
  const t = useTranslations("list");
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = propertyId !== undefined;
  const { data: session } = authClient.useSession();
  const canCreateSharedBuilding = !isEdit && isAgentOrAdmin(session?.user.role);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: defaultValues ?? propertyFormDefaults(),
  });

  const city = useWatch({ control: form.control, name: "city" });
  const latitude = useWatch({ control: form.control, name: "latitude" });
  const longitude = useWatch({ control: form.control, name: "longitude" });
  const pin =
    latitude !== undefined && longitude !== undefined
      ? { latitude, longitude }
      : null;

  const create = useMutation(
    trpc.listing.createProperty.mutationOptions({
      onSuccess: async () => {
        toast.success(t("propertySuccess"));
        await queryClient.invalidateQueries(
          trpc.listing.properties.queryFilter(),
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
    trpc.listing.updateProperty.mutationOptions({
      onSuccess: async () => {
        toast.success(t("saved"));
        await queryClient.invalidateQueries(
          trpc.listing.properties.queryFilter(),
        );
        await queryClient.invalidateQueries(trpc.listing.list.queryFilter());
        await queryClient.invalidateQueries(trpc.listing.mine.queryFilter());
        router.push("/host");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const onSubmit = (values: PropertyFormValues): void => {
    if (isEdit) {
      update.mutate({ id: propertyId, ...values });
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
          title={t("propertyAbout")}
          description={t("propertyAboutHint")}
        >
          <FieldGroup>
            <FormSelectField
              control={form.control}
              name="propertyType"
              label={t("propertyType")}
              options={PROPERTY_TYPES.map((type) => ({
                value: type,
                label: t(`propertyTypeOption.${type}`),
              }))}
            />
            <FormTextField
              control={form.control}
              name="title"
              label={t("propertyTitle")}
            />
            <FormTextareaField
              control={form.control}
              name="description"
              label={t("propertyDescription")}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormNumberField
                control={form.control}
                name="bedroomCount"
                label={t("bedroomCount")}
                min={0}
                max={MAX_BEDROOMS}
                optional
              />
              <FormNumberField
                control={form.control}
                name="bathroomCount"
                label={t("bathroomCount")}
                min={0}
                max={MAX_BATHROOMS}
                stepValue={0.5}
                optional
              />
            </div>
            {canCreateSharedBuilding ? (
              <FormCheckboxField
                control={form.control}
                name="isSharedBuilding"
                label={t("isSharedBuilding")}
              />
            ) : null}
            <Controller
              control={form.control}
              name="images"
              render={({ field, fieldState }) => (
                <ImageUploader
                  label={t("propertyImage")}
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
              options={[{ value: "queretaro", label: "Querétaro" }]}
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
          {isEdit ? t("save") : t("propertySubmit")}
        </Button>
      </form>
    </FormProvider>
  );
}
