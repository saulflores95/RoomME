"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import type { ListingDetailData } from "./detail-types";
import type { ListingLabels } from "./use-listing-labels";
import { Fact } from "./detail-primitives";

export const RoomFacts = ({
  listing,
  labels,
}: {
  listing: ListingDetailData;
  labels: ListingLabels;
}): JSX.Element => {
  const t = useTranslations("rooms");
  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      <Fact
        label={t("capacity")}
        value={t("roomies", { count: listing.capacity })}
      />
      <Fact label={t("gender")} value={labels.gender} />
      <Fact label={t("bathroom")} value={labels.bathroom} />
      <Fact label={t("furnished")} value={labels.furnished} />
      <Fact
        label={t("deposit")}
        value={t("monthsCount", { count: listing.depositMonths })}
      />
      <Fact
        label={t("lease")}
        value={t("monthsCount", { count: listing.leaseMonths })}
      />
      <Fact
        label={t("preferredAge")}
        value={t("ageRange", {
          min: listing.preferredAgeMin,
          max: listing.preferredAgeMax,
        })}
      />
      <Fact label={t("couples")} value={labels.yesNo(listing.couplesAllowed)} />
      <Fact label={t("smoking")} value={labels.smoking} />
      <Fact label={t("guests")} value={labels.guests} />
      <Fact label={t("wfh")} value={labels.yesNo(listing.wfhFriendly)} />
      <Fact label={t("quiet")} value={labels.yesNo(listing.quietHome)} />
      <Fact label={t("cleanliness")} value={labels.cleanliness} />
      <Fact label={t("hasPets")} value={labels.yesNo(listing.hasPets)} />
      <Fact
        label={t("acceptsPets")}
        value={labels.yesNo(listing.acceptsPets)}
      />
    </dl>
  );
};
