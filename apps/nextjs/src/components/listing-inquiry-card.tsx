import type { JSX } from "react";
import { getTranslations } from "next-intl/server";

import { Button } from "@acme/ui/button";

import {
  LISTING_CONTACT_PHONE_DISPLAY,
  LISTING_CONTACT_TEL_URL,
  listingWhatsAppUrl,
} from "~/lib/listing-contact";

export async function ListingInquiryCard(): Promise<JSX.Element> {
  const t = await getTranslations("list");
  const whatsappHref = listingWhatsAppUrl(t("inquiryMessage"));
  const reasons = [
    t("inquiryReasonSafety"),
    t("inquiryReasonIntegrity"),
    t("inquiryReasonFresh"),
  ];

  return (
    <section className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      <div className="bg-brand px-5 py-4 sm:px-6">
        <p className="text-sm font-medium text-white/80">
          {t("inquiryKicker")}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {t("inquiryTitle")}
        </h2>
      </div>
      <div className="space-y-5 p-5 sm:p-6">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t("inquiryBody")}
        </p>
        <ul className="space-y-3">
          {reasons.map((reason) => (
            <li key={reason} className="flex gap-3 text-sm leading-relaxed">
              <span
                aria-hidden
                className="bg-brand mt-1.5 size-1.5 shrink-0 rounded-full"
              />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
        <div className="border-border space-y-3 border-t pt-5">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t("inquiryCta")}
          </p>
          <p className="text-lg font-semibold tracking-tight">
            {LISTING_CONTACT_PHONE_DISPLAY}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {t("inquiryWhatsapp")}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={LISTING_CONTACT_TEL_URL}>{t("inquiryCall")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
