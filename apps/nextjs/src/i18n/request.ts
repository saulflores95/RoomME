import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

const loadMessages = {
  es: () => import("@acme/i18n/messages/es.json"),
  en: () => import("@acme/i18n/messages/en.json"),
  ko: () => import("@acme/i18n/messages/ko.json"),
  ja: () => import("@acme/i18n/messages/ja.json"),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = await loadMessages[locale]();

  return {
    locale,
    messages: messages.default,
  };
});
