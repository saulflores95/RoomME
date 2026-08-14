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
  prefetch(trpc.listing.list.queryOptions({ limit: 48 }));

  return (
    <HydrateClient>
      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:py-8">
        <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl">
          {t("title")}
        </h1>
        <Suspense>
          <RoomsBrowser />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
