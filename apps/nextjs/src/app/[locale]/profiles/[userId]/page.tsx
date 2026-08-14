import type { Metadata } from "next";
import type { JSX } from "react";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { UserProfile } from "~/components/user-profile";
import { Link } from "~/i18n/navigation";
import { HydrateClient, prefetch, trpc } from "~/trpc/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; userId: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile" });
  return {
    title: t("title"),
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string; userId: string }>;
}): Promise<JSX.Element> {
  const { locale, userId } = await params;
  setRequestLocale(locale);
  prefetch(trpc.profile.byId.queryOptions({ userId }));
  const t = await getTranslations({ locale, namespace: "profile" });

  return (
    <HydrateClient>
      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
        <Link
          href="/rooms"
          className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm font-medium underline-offset-4 hover:underline"
        >
          {t("back")}
        </Link>
        <Suspense
          fallback={<div className="bg-muted h-72 animate-pulse rounded-2xl" />}
        >
          <UserProfile userId={userId} />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
