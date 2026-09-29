"use client";

import type { JSX } from "react";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import type { RouterOutputs } from "@acme/api";
import type { ListingFormValues } from "@acme/validators";
import { FieldError, FieldGroup } from "@acme/ui/field";
import { NONE_PROPERTY_ID } from "@acme/validators";

import { AddressPicker } from "~/components/address-picker";
import { Link } from "~/i18n/navigation";
import { FormSelectField, FormTextField } from "./form-controls";
import { ListingSectionCard } from "./section-card";

type PropertyOption = RouterOutputs["listing"]["properties"][number];

export function LocationFields({
  step,
  properties,
}: {
  step: number;
  properties: PropertyOption[];
}): JSX.Element {
  const t = useTranslations("list");
  const { control, setValue, formState } = useFormContext<ListingFormValues>();
  const listingType = useWatch({ control, name: "listingType" });
  const propertyId = useWatch({ control, name: "propertyId" });
  const city = useWatch({ control, name: "city" });
  const latitude = useWatch({ control, name: "latitude" });
  const longitude = useWatch({ control, name: "longitude" });

  // Entire-property listings must live in a property the host owns.
  const available = useMemo(
    () =>
      listingType === "entire_property"
        ? properties.filter((property) => property.isOwned)
        : properties,
    [listingType, properties],
  );
  const selected =
    propertyId === NONE_PROPERTY_ID
      ? null
      : (available.find((property) => property.id === propertyId) ?? null);
  const pin =
    latitude !== undefined && longitude !== undefined
      ? { latitude, longitude }
      : null;

  useEffect(() => {
    if (propertyId !== NONE_PROPERTY_ID && !selected) {
      setValue("propertyId", NONE_PROPERTY_ID);
      return;
    }
    if (!selected) {
      return;
    }

    setValue("addressLine1", selected.addressLine1);
    setValue("city", selected.city);
    setValue("neighborhood", selected.neighborhood);
    if (selected.latitude !== null && selected.longitude !== null) {
      setValue("latitude", selected.latitude);
      setValue("longitude", selected.longitude);
    }
    if (listingType === "entire_property") {
      setValue("propertyType", selected.propertyType);
      if (selected.bedroomCount !== null) {
        setValue("bedroomCount", selected.bedroomCount);
      }
      if (selected.bathroomCount !== null) {
        setValue("bathroomCount", selected.bathroomCount);
      }
    }
  }, [listingType, propertyId, selected, setValue]);

  const optionLabel = (property: PropertyOption): string =>
    property.isSharedBuilding
      ? `${property.title} · ${property.neighborhood} (${t("sharedBuilding")})`
      : `${property.title} · ${property.neighborhood}`;

  return (
    <ListingSectionCard
      step={step}
      title={t("propertyStep")}
      description={t("propertyStepHint")}
    >
      <FieldGroup>
        <FormSelectField
          control={control}
          name="propertyId"
          label={t("selectProperty")}
          options={[
            { value: NONE_PROPERTY_ID, label: t("propertyNew") },
            ...available.map((property) => ({
              value: property.id,
              label: optionLabel(property),
            })),
          ]}
        />
        <p className="text-muted-foreground text-sm">
          {t("addPropertyHint")}{" "}
          <Link href="/list-a-complex" className="underline">
            {t("createPropertyLink")}
          </Link>
        </p>
        {selected ? null : (
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
              options={[{ value: "queretaro", label: "Querétaro" }]}
            />
            <FormTextField
              control={control}
              name="neighborhood"
              label={t("neighborhood")}
            />
          </>
        )}
        <AddressPicker
          city={selected?.city ?? city}
          pin={
            selected?.latitude != null && selected.longitude != null
              ? { latitude: selected.latitude, longitude: selected.longitude }
              : pin
          }
          locked={selected !== null}
          searchPlaceholder={t("searchAddress")}
          clickHint={t("mapHint")}
          lockedHint={t("mapLockedProperty")}
          noResults={t("noAddressResults")}
          onLocationChange={(hit) => {
            const options = { shouldDirty: true, shouldValidate: true };
            setValue(
              "addressLine1",
              hit.addressLine1.length > 0
                ? hit.addressLine1
                : (selected?.addressLine1 ?? ""),
              options,
            );
            setValue("city", hit.city, options);
            setValue(
              "neighborhood",
              hit.neighborhood.length > 0
                ? hit.neighborhood
                : (selected?.neighborhood ?? ""),
              options,
            );
            setValue("latitude", hit.latitude, options);
            setValue("longitude", hit.longitude, options);
          }}
        />
        {formState.errors.latitude ? (
          <FieldError errors={[formState.errors.latitude]} />
        ) : null}
      </FieldGroup>
    </ListingSectionCard>
  );
}
