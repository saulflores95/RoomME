"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type {
  ListingType,
  OperationType,
  PropertyType,
} from "@acme/validators";
import { cn } from "@acme/ui";

export const useListingTypeLabel = (): ((
  listingType: ListingType,
  propertyType: PropertyType | null,
) => string) => {
  const t = useTranslations("rooms");
  const tList = useTranslations("list");
  return (listingType, propertyType) =>
    listingType === "entire_property"
      ? t("typeEntireBadge", {
          type: tList(`propertyTypeOption.${propertyType ?? "house"}`),
        })
      : t("typeRoomBadge");
};

export const ListingTypeBadge = ({
  listingType,
  propertyType,
  operationType = "rent",
  className,
}: {
  listingType: ListingType;
  propertyType: PropertyType | null;
  operationType?: OperationType;
  className?: string;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const label = useListingTypeLabel();
  const typeLabel = label(listingType, propertyType);
  return (
    <span
      className={cn(
        "rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white",
        className,
      )}
    >
      {operationType === "sale" ? `${typeLabel} · ${t("forSale")}` : typeLabel}
    </span>
  );
};

/** "/month" for rentals; sale prices have no suffix. */
export const usePriceSuffix = (): ((
  operationType: OperationType,
) => string) => {
  const t = useTranslations("rooms");
  return (operationType) => (operationType === "rent" ? t("perMonth") : "");
};
