import type { Locale } from "@acme/i18n";

export interface SheetStat {
  value: string;
  label: string;
}

export interface SheetFact {
  label: string;
  value: string;
}

export interface SheetHost {
  name: string;
  phone: string | null;
  email: string | null;
}

export interface SheetLabels {
  gallery: string;
  description: string;
  features: string;
  amenities: string;
  includes: string;
  location: string;
  scanToView: string;
  generatedOn: string;
  disclaimer: string;
  poweredBy: string;
  page: string;
}

/** Image already converted to a data URL react-pdf can embed. */
export type SheetImage = string;

export interface TechnicalSheetData {
  locale: Locale;
  host: SheetHost | null;
  badge: string;
  location: string;
  reference: string;
  title: string;
  price: string;
  priceSuffix: string | null;
  stats: SheetStat[];
  facts: SheetFact[];
  description: string;
  amenities: string[];
  includes: string[];
  address: string;
  listingUrl: string;
  qrCode: string | null;
  hero: SheetImage | null;
  gallery: SheetImage[];
  labels: SheetLabels;
}
