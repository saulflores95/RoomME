"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import type { PropertyType } from "@acme/validators";

import type { ListingDetailData } from "./detail-types";

export interface ListingLabels {
  gender: string;
  bathroom: string;
  furnished: string;
  smoking: string;
  guests: string;
  cleanliness: string;
  yesNo: (value: boolean) => string;
  include: (key: string) => string;
  city: (city: string) => string;
  propertyType: (type: PropertyType) => string;
}

const INCLUDE_KEYS = new Set([
  "wifi",
  "water",
  "electricity",
  "gas",
  "cleaning",
]);

export const useListingLabels = (listing: ListingDetailData): ListingLabels => {
  const t = useTranslations("rooms");
  const tList = useTranslations("list");

  return useMemo((): ListingLabels => {
    const gender = {
      male: t("genderMale"),
      female: t("genderFemale"),
      mixed: t("genderMixed"),
    }[listing.householdGender];
    const furnished = {
      furnished: t("furnishedYes"),
      semi: t("furnishedSemi"),
      unfurnished: t("furnishedNo"),
    }[listing.furnished];
    const smoking = {
      no: t("smokingNo"),
      outdoor: t("smokingOutdoor"),
      yes: t("smokingYes"),
    }[listing.smokingPolicy];
    const guests = {
      no: t("guestsNo"),
      ask: t("guestsAsk"),
      yes: t("guestsYes"),
    }[listing.overnightGuests];
    const cleanliness = {
      relaxed: t("cleanlinessRelaxed"),
      average: t("cleanlinessAverage"),
      tidy: t("cleanlinessTidy"),
    }[listing.cleanliness];

    return {
      gender,
      bathroom:
        listing.bathroomType === "private"
          ? t("bathroomPrivate")
          : t("bathroomShared"),
      furnished,
      smoking,
      guests,
      cleanliness,
      yesNo: (value) => (value ? t("yes") : t("no")),
      include: (key) => (INCLUDE_KEYS.has(key) ? t(`include.${key}`) : key),
      city: (city) => (city === "queretaro" ? t("queretaro") : city),
      propertyType: (type) => tList(`propertyTypeOption.${type}`),
    };
  }, [listing, t, tList]);
};
