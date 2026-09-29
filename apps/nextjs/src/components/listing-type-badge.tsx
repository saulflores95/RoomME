"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { ListingType, PropertyType } from "@acme/validators";
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
  className,
}: {
  listingType: ListingType;
  propertyType: PropertyType | null;
  className?: string;
}): JSX.Element => {
  const label = useListingTypeLabel();
  return (
    <span
      className={cn(
        "rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white",
        className,
      )}
    >
      {label(listingType, propertyType)}
    </span>
  );
};
