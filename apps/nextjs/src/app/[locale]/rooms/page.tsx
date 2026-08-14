import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { RoomsBrowser } from "~/components/rooms-browser";
import { HydrateClient, prefetch, trpc } from "~/trpc/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("rooms");
  return { title: t("title") };
}

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("rooms");
  prefetch(trpc.listing.list.queryOptions({ limit: 24 }));

  return (
    <HydrateClient>
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold">{t("title")}</h1>
        <Suspense>
          <RoomsBrowser />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
