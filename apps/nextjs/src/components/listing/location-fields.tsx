"use client";

import type { JSX } from "react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import type { ListingFormValues } from "@acme/validators";
import { FieldError, FieldGroup } from "@acme/ui/field";
import { NONE_COMPLEX_ID } from "@acme/validators";

import { AddressPicker } from "~/components/address-picker";
import { Link } from "~/i18n/navigation";
import {
  FormCheckboxField,
  FormSelectField,
  FormTextField,
} from "./form-controls";

interface ComplexOption {
  id: string;
  title: string;
  city: ListingFormValues["city"];
  neighborhood: string;
  addressLine1: string;
  latitude: number | null;
  longitude: number | null;
}

export function LocationFields({
  complexes,
}: {
  complexes: ComplexOption[];
}): JSX.Element {
  const t = useTranslations("list");
  const { control, setValue, formState } = useFormContext<ListingFormValues>();
  const isComplex = useWatch({ control, name: "isComplex" });
  const complexId = useWatch({ control, name: "complexId" });
  const city = useWatch({ control, name: "city" });
  const latitude = useWatch({ control, name: "latitude" });
  const longitude = useWatch({ control, name: "longitude" });

  const selectedComplex =
    isComplex && complexId !== NONE_COMPLEX_ID
      ? (complexes.find((complex) => complex.id === complexId) ?? null)
      : null;
  const mapLocked = selectedComplex !== null;
  const pin =
    latitude !== undefined && longitude !== undefined
      ? { latitude, longitude }
      : null;

  useEffect(() => {
    if (!isComplex) {
      if (complexId !== NONE_COMPLEX_ID) {
        setValue("complexId", NONE_COMPLEX_ID);
      }
      return;
    }

    if (!selectedComplex) {
      return;
    }

    setValue("addressLine1", selectedComplex.addressLine1);
    setValue("city", selectedComplex.city);
    setValue("neighborhood", selectedComplex.neighborhood);
    if (
      selectedComplex.latitude !== null &&
      selectedComplex.longitude !== null
    ) {
      setValue("latitude", selectedComplex.latitude);
      setValue("longitude", selectedComplex.longitude);
    }
  }, [complexId, isComplex, selectedComplex, setValue]);

  return (
    <FieldGroup>
      <h2 className="text-xl font-semibold">{t("complex")}</h2>
      <FormCheckboxField
        control={control}
        name="isComplex"
        label={t("isComplex")}
      />
      {isComplex ? (
        <>
          <FormSelectField
            control={control}
            name="complexId"
            label={t("selectComplex")}
            options={[
              { value: NONE_COMPLEX_ID, label: t("complexNone") },
              ...complexes.map((complex) => ({
                value: complex.id,
                label: `${complex.title} · ${complex.neighborhood}`,
              })),
            ]}
          />
          {complexes.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t("noComplexes")}{" "}
              <Link href="/list-a-complex" className="underline">
                {t("createComplexLink")}
              </Link>
            </p>
          ) : null}
        </>
      ) : null}
      {selectedComplex ? null : (
        <>
          <FormTextField
            control={control}
            name="addressLine1"
            label={t("address")}
          />
          <FormSelectField
            control={control}
            name="city"
            label={t("city")}
            options={[
              { value: "cdmx", label: "CDMX" },
              { value: "queretaro", label: "Querétaro" },
            ]}
          />
          <FormTextField
            control={control}
            name="neighborhood"
            label={t("neighborhood")}
          />
        </>
      )}
      <AddressPicker
        city={selectedComplex?.city ?? city}
        pin={
          selectedComplex &&
          selectedComplex.latitude !== null &&
          selectedComplex.longitude !== null
            ? {
                latitude: selectedComplex.latitude,
                longitude: selectedComplex.longitude,
              }
            : pin
        }
        locked={mapLocked}
        searchPlaceholder={t("searchAddress")}
        clickHint={t("mapHint")}
        lockedHint={t("mapLocked")}
        noResults={t("noAddressResults")}
        onLocationChange={(hit) => {
          setValue(
            "addressLine1",
            hit.addressLine1.length > 0
              ? hit.addressLine1
              : (selectedComplex?.addressLine1 ?? ""),
            { shouldDirty: true, shouldValidate: true },
          );
          setValue("city", hit.city, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue(
            "neighborhood",
            hit.neighborhood.length > 0
              ? hit.neighborhood
              : (selectedComplex?.neighborhood ?? ""),
            { shouldDirty: true, shouldValidate: true },
          );
          setValue("latitude", hit.latitude, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue("longitude", hit.longitude, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
      />
      {formState.errors.latitude ? (
        <FieldError errors={[formState.errors.latitude]} />
      ) : null}
    </FieldGroup>
  );
}
