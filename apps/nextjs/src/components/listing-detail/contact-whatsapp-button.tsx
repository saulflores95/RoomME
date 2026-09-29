"use client";

import type { JSX } from "react";
import { useSyncExternalStore } from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@acme/ui/button";

import { hostWhatsAppUrl } from "~/lib/listing-contact";

const subscribeNoop = (): (() => void) => () => undefined;
const clientOrigin = (): string => window.location.origin;
const serverOrigin = (): string => "";

export function ContactWhatsAppButton({
  listingId,
  title,
  phone,
}: {
  listingId: string;
  title: string;
  phone: string;
}): JSX.Element {
  const t = useTranslations("rooms");
  const locale = useLocale();

  const origin = useSyncExternalStore(
    subscribeNoop,
    clientOrigin,
    serverOrigin,
  );
  const url = `${origin}/${locale}/rooms/${listingId}`;
  const href = hostWhatsAppUrl(phone, t("whatsAppMessage", { title, url }));

  return (
    <Button asChild variant="outline">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <ChatBubbleIcon />
        {t("contactWhatsApp")}
      </a>
    </Button>
  );
}
