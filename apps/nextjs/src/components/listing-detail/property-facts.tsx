"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { ListingDetailData } from "./detail-types";
import type { ListingLabels } from "./use-listing-labels";
import { Fact } from "./detail-primitives";

/** Facts for an entire-property listing, where the guest gets exclusive use. */
export const PropertyFacts = ({
  listing,
  labels,
}: {
  listing: ListingDetailData;
  labels: ListingLabels;
}): JSX.Element => {
  const t = useTranslations("rooms");
  const { property } = listing;
  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {property ? (
        <Fact
          label={t("propertyTypeLabel")}
          value={labels.propertyType(property.propertyType)}
        />
      ) : null}
      {property?.bedroomCount != null ? (
        <Fact
          label={t("bedrooms")}
          value={t("bedroomsCount", { count: property.bedroomCount })}
        />
      ) : null}
      {property?.bathroomCount != null ? (
        <Fact
          label={t("bathrooms")}
          value={t("bathroomsCount", { count: property.bathroomCount })}
        />
      ) : null}
      <Fact
        label={t("maxOccupants")}
        value={t("peopleCount", { count: listing.capacity })}
      />
      <Fact label={t("furnished")} value={labels.furnished} />
      {listing.operationType === "rent" ? (
        <>
          <Fact
            label={t("deposit")}
            value={t("monthsCount", { count: listing.depositMonths })}
          />
          <Fact
            label={t("lease")}
            value={t("monthsCount", { count: listing.leaseMonths })}
          />
        </>
      ) : null}
      <Fact label={t("couples")} value={labels.yesNo(listing.couplesAllowed)} />
      <Fact label={t("smoking")} value={labels.smoking} />
      <Fact
        label={t("petsAllowed")}
        value={labels.yesNo(listing.acceptsPets)}
      />
    </dl>
  );
};
