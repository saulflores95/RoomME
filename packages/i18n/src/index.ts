export const locales = ["es", "en", "ko", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  en: "English",
  ko: "한국어",
  ja: "日本語",
};

export const currencies = ["MXN", "USD"] as const;
export type Currency = (typeof currencies)[number];
export const defaultCurrency: Currency = "MXN";
