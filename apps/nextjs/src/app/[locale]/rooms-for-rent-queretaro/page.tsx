import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { RoomsBrowser } from "~/components/rooms-browser";
import { routing } from "~/i18n/routing";
import { HydrateClient, prefetch, trpc } from "~/trpc/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, `/${item}/rooms-for-rent-queretaro`]),
  );

  return {
    title: t("queretaroTitle"),
    description: t("queretaroDescription"),
    alternates: {
      canonical: `/${locale}/rooms-for-rent-queretaro`,
      languages: {
        ...languages,
        "x-default": "/es/rooms-for-rent-queretaro",
      },
    },
  };
}

export default async function QueretaroRoomsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta");
  prefetch(trpc.listing.list.queryOptions({ city: "queretaro", limit: 24 }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("queretaroTitle"),
    description: t("queretaroDescription"),
  };

  return (
    <HydrateClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold">{t("queretaroTitle")}</h1>
        <Suspense>
          <RoomsBrowser city="queretaro" />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
