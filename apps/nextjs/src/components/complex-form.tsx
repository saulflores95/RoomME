"use client";

import type { JSX } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";

import type { ComplexAmenity, ComplexFormValues } from "@acme/validators";
import { Button } from "@acme/ui/button";
import { Checkbox } from "@acme/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@acme/ui/field";
import { toast } from "@acme/ui/toast";
import { COMPLEX_AMENITIES, ComplexFormSchema } from "@acme/validators";

import { AddressPicker } from "~/components/address-picker";
import {
  FormCheckboxField,
  FormSelectField,
  FormTextareaField,
  FormTextField,
} from "~/components/listing/form-controls";
import { complexFormDefaults } from "~/components/listing/form-values";
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
        className="mx-auto max-w-xl space-y-8"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <h2 className="text-xl font-semibold">{t("complex")}</h2>
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
          <FormCheckboxField
            control={form.control}
            name="petFriendly"
            label={t("petFriendly")}
          />
          <Controller
            control={form.control}
            name="amenities"
            render={({ field, fieldState }) => (
              <FieldSet>
                <FieldLegend variant="label">{t("amenities")}</FieldLegend>
                <FieldGroup data-slot="checkbox-group">
                  {COMPLEX_AMENITIES.map((item) => (
                    <Field
                      key={item}
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Checkbox
                        id={`amenity-${item}`}
                        checked={field.value.includes(item)}
                        aria-invalid={fieldState.invalid}
                        onCheckedChange={(checked) => {
                          const next: ComplexAmenity[] =
                            checked === true
                              ? [...field.value, item]
                              : field.value.filter((value) => value !== item);
                          field.onChange(next);
                        }}
                      />
                      <FieldLabel
                        htmlFor={`amenity-${item}`}
                        className="font-normal"
                      >
                        {t(`amenity.${item}`)}
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
          <FormTextField
            control={form.control}
            name="imageUrl"
            label={t("complexImage")}
            type="url"
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

        <Button type="submit" disabled={create.isPending || update.isPending}>
          {isEdit ? t("save") : t("complexSubmit")}
        </Button>
      </form>
    </FormProvider>
  );
}
