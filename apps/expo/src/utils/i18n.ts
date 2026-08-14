import * as Localization from "expo-localization";

import type { Locale } from "@acme/i18n";
import { defaultLocale, locales } from "@acme/i18n";
import en from "@acme/i18n/messages/en.json";
import es from "@acme/i18n/messages/es.json";
import ja from "@acme/i18n/messages/ja.json";
import ko from "@acme/i18n/messages/ko.json";

const catalogs = { en, es, ko, ja } as const;

const getByPath = (source: unknown, path: string): string | undefined => {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (typeof current === "object" && current !== null && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);

  return typeof value === "string" ? value : undefined;
};

export const getDeviceLocale = (): Locale => {
  const languageCode = Localization.getLocales()[0]?.languageCode;
  if (languageCode && locales.includes(languageCode as Locale)) {
    return languageCode as Locale;
  }
  return defaultLocale;
};

export const t = (
  key: string,
  vars?: Record<string, string | number>,
): string => {
  const locale = getDeviceLocale();
  let message =
    getByPath(catalogs[locale], key) ?? getByPath(catalogs.es, key) ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      message = message.replaceAll(`{${name}}`, String(value));
    }
  }
  return message;
};
