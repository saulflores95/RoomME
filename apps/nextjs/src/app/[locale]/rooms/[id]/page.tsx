import type { Metadata } from "next";
import type { JSX } from "react";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { RouterOutputs } from "@acme/api";

import { RoomDetail } from "~/components/room-detail";
import { routing } from "~/i18n/routing";
import { formatMxn } from "~/lib/money";
import { getSiteUrl } from "~/lib/site-url";
import { fetchQuery, HydrateClient, prefetch, trpc } from "~/trpc/server";

type ListingDetail = RouterOutputs["listing"]["byId"];

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  es: "es_MX",
  ja: "ja_JP",
  ko: "ko_KR",
};

const truncate = (value: string, max: number): string => {
  const trimmed = value.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
};

const cityLabel = (
  city: string | null,
  t: Awaited<ReturnType<typeof getTranslations>>,
): string => {
  if (city === "queretaro") {
    return t("queretaro");
  }
  return "";
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "rooms" });
  const listing = await fetchQuery<ListingDetail>(
    trpc.listing.byId.queryOptions({ id }),
  );

  const path = `/rooms/${id}`;
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, `/${item}${path}`]),
  );

  if (!listing) {
    return {
      title: t("detailTitle"),
      alternates: {
        canonical: `/${locale}${path}`,
        languages: { ...languages, "x-default": `/es${path}` },
      },
    };
  }

  const location = [listing.neighborhood, cityLabel(listing.city, t)]
    .filter((part): part is string => Boolean(part && part.length > 0))
    .join(", ");
  const priceLabel = formatMxn(listing.rentPriceCents);
  const fallbackDescription = [priceLabel, location]
    .filter((part) => part.length > 0)
    .join(" · ");
  const description = truncate(
    listing.description.length > 0 ? listing.description : fallbackDescription,
    160,
  );
  const title = listing.title;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...languages, "x-default": `/es${path}` },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale] ?? "es_MX",
      url: `/${locale}${path}`,
      title,
      description,
      siteName: "RooMe",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<JSX.Element> {
  const { locale, id } = await params;
  setRequestLocale(locale);
  prefetch(trpc.listing.byId.queryOptions({ id }));

  const listing = await fetchQuery<ListingDetail>(
    trpc.listing.byId.queryOptions({ id }),
  );
  const base = getSiteUrl();
  const pageUrl = `${base}/${locale}/rooms/${id}`;

  const jsonLd =
    listing != null
      ? {
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: listing.title,
          description: listing.description,
          url: pageUrl,
          image: listing.coverUrl ? [listing.coverUrl] : undefined,
          offers: {
            "@type": "Offer",
            price: listing.rentPriceCents / 100,
            priceCurrency: listing.currency,
            availability: "https://schema.org/InStock",
            url: pageUrl,
          },
        }
      : null;

  return (
    <HydrateClient>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-10">
        <Suspense
          fallback={<div className="bg-muted h-96 animate-pulse rounded-2xl" />}
        >
          <RoomDetail id={id} />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
