import type { RouterOutputs } from "@acme/api";
import type { Locale } from "@acme/i18n";

import type { SheetImages } from "./load-images";
import type {
  SheetFact,
  SheetLabels,
  SheetStat,
  TechnicalSheetData,
} from "./types";
import { formatMxn } from "~/lib/money";

export type TechnicalSheetListing = RouterOutputs["listing"]["technicalSheet"];

export type Translate = (
  key: string,
  values?: Record<string, string | number | Date>,
) => string;

export interface SheetTranslators {
  rooms: Translate;
  list: Translate;
  sheet: Translate;
}

export interface BuildSheetInput {
  listing: TechnicalSheetListing;
  locale: Locale;
  t: SheetTranslators;
  images: SheetImages;
  qrCode: string | null;
  listingUrl: string;
  generatedAt: Date;
}

const INCLUDE_KEYS = new Set([
  "wifi",
  "water",
  "electricity",
  "gas",
  "cleaning",
]);

const REFERENCE_LENGTH = 8;

export const referenceCode = (id: string): string =>
  id.replace(/-/g, "").slice(0, REFERENCE_LENGTH).toUpperCase();

const joinParts = (parts: readonly (string | null | undefined)[]): string =>
  parts
    .filter((part): part is string => part != null && part.trim().length > 0)
    .join(", ");

const formatNumber = (value: number, locale: Locale): string =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);

const formatDay = (
  value: Date | string,
  locale: Locale,
  timeZone?: string,
): string => {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone }).format(
        date,
      );
};

const cityLabel = (city: string | null, t: SheetTranslators): string | null =>
  city === "queretaro" ? t.rooms("queretaro") : city;

const furnishedLabel = (
  listing: TechnicalSheetListing,
  t: SheetTranslators,
): string =>
  ({
    furnished: t.rooms("furnishedYes"),
    semi: t.rooms("furnishedSemi"),
    unfurnished: t.rooms("furnishedNo"),
  })[listing.furnished];

const smokingLabel = (
  listing: TechnicalSheetListing,
  t: SheetTranslators,
): string =>
  ({
    no: t.rooms("smokingNo"),
    outdoor: t.rooms("smokingOutdoor"),
    yes: t.rooms("smokingYes"),
  })[listing.smokingPolicy];

const yesNo = (value: boolean, t: SheetTranslators): string =>
  value ? t.rooms("yes") : t.rooms("no");

const buildBadge = (
  listing: TechnicalSheetListing,
  t: SheetTranslators,
): string => {
  if (listing.operationType === "sale") {
    return t.sheet("badgeSale");
  }
  return listing.listingType === "room"
    ? t.sheet("badgeRoomRent")
    : t.sheet("badgeRent");
};

const buildStats = (
  listing: TechnicalSheetListing,
  locale: Locale,
  t: SheetTranslators,
): SheetStat[] => {
  const { property } = listing;
  const stats: SheetStat[] = [];

  if (listing.listingType === "entire_property") {
    if (property?.bedroomCount != null) {
      stats.push({
        value: formatNumber(property.bedroomCount, locale),
        label: t.rooms("bedrooms"),
      });
    }
    if (property?.bathroomCount != null) {
      stats.push({
        value: formatNumber(property.bathroomCount, locale),
        label: t.rooms("bathrooms"),
      });
    }
    stats.push({
      value: formatNumber(listing.capacity, locale),
      label: t.rooms("maxOccupants"),
    });
    if (property) {
      stats.push({
        value: t.list(`propertyTypeOption.${property.propertyType}`),
        label: t.rooms("propertyTypeLabel"),
      });
    }
    return stats;
  }

  return [
    {
      value: formatNumber(listing.capacity, locale),
      label: t.rooms("capacity"),
    },
    {
      value:
        listing.bathroomType === "private"
          ? t.rooms("bathroomPrivate")
          : t.rooms("bathroomShared"),
      label: t.rooms("bathroom"),
    },
    { value: furnishedLabel(listing, t), label: t.rooms("furnished") },
  ];
};

const buildFacts = (
  listing: TechnicalSheetListing,
  locale: Locale,
  t: SheetTranslators,
): SheetFact[] => {
  const isRent = listing.operationType === "rent";
  const isRoom = listing.listingType === "room";
  const facts: SheetFact[] = [];

  if (!isRoom) {
    facts.push({
      label: t.rooms("furnished"),
      value: furnishedLabel(listing, t),
    });
  }
  if (isRent) {
    facts.push(
      {
        label: t.rooms("deposit"),
        value: t.rooms("monthsCount", { count: listing.depositMonths }),
      },
      {
        label: t.rooms("lease"),
        value: t.rooms("monthsCount", { count: listing.leaseMonths }),
      },
      {
        label: t.sheet("availableFrom"),
        value: listing.availableFrom
          ? formatDay(listing.availableFrom, locale, "UTC")
          : t.sheet("availableNow"),
      },
    );
  }
  if (isRoom) {
    facts.push(
      {
        label: t.rooms("preferredAge"),
        value: t.rooms("ageRange", {
          min: listing.preferredAgeMin,
          max: listing.preferredAgeMax,
        }),
      },
      { label: t.rooms("wfh"), value: yesNo(listing.wfhFriendly, t) },
      { label: t.rooms("quiet"), value: yesNo(listing.quietHome, t) },
    );
  }
  facts.push(
    { label: t.rooms("couples"), value: yesNo(listing.couplesAllowed, t) },
    { label: t.rooms("smoking"), value: smokingLabel(listing, t) },
    { label: t.rooms("petsAllowed"), value: yesNo(listing.acceptsPets, t) },
  );

  return facts;
};

const buildLabels = (
  generatedAt: Date,
  locale: Locale,
  t: SheetTranslators,
): SheetLabels => ({
  gallery: t.sheet("gallery"),
  description: t.sheet("description"),
  features: t.sheet("features"),
  amenities: t.sheet("amenities"),
  includes: t.sheet("includes"),
  location: t.sheet("location"),
  scanToView: t.sheet("scanToView"),
  generatedOn: t.sheet("generatedOn", { date: formatDay(generatedAt, locale) }),
  disclaimer: t.sheet("disclaimer"),
  poweredBy: t.sheet("poweredBy"),
  page: t.sheet("page"),
});

export const buildTechnicalSheetData = ({
  listing,
  locale,
  t,
  images,
  qrCode,
  listingUrl,
  generatedAt,
}: BuildSheetInput): TechnicalSheetData => {
  const city = cityLabel(listing.city, t);
  const includes = listing.includes.map((item) =>
    INCLUDE_KEYS.has(item) ? t.rooms(`include.${item}`) : item,
  );
  const perMonth =
    listing.operationType === "rent" ? t.rooms("perMonth") : null;

  return {
    locale,
    host: listing.host
      ? {
          name: listing.host.name,
          phone: listing.host.phone,
          email: listing.hostEmail,
        }
      : null,
    badge: buildBadge(listing, t),
    location: joinParts([listing.neighborhood, city]),
    reference: t.sheet("reference", { code: referenceCode(listing.id) }),
    title: listing.title,
    price: formatMxn(listing.priceCents),
    priceSuffix: perMonth
      ? `${listing.currency} ${perMonth}`
      : listing.currency,
    stats: buildStats(listing, locale, t),
    facts: buildFacts(listing, locale, t),
    description: listing.description,
    amenities: listing.property?.amenities ?? [],
    includes,
    address: joinParts([listing.addressLine1, listing.neighborhood, city]),
    listingUrl,
    qrCode,
    hero: images.hero,
    gallery: images.gallery,
    labels: buildLabels(generatedAt, locale, t),
  };
};
