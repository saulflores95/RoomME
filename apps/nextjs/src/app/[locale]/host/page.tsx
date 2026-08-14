import type { Metadata } from "next";
import type { JSX } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getSession } from "~/auth/server";
import { HostListings } from "~/components/host-listings";
import { Link } from "~/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("host");
  return { title: t("title") };
}

export default async function HostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("host");
  const session = await getSession();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground mb-10">{t("subtitle")}</p>
      {session?.user ? (
        <HostListings />
      ) : (
        <p className="text-muted-foreground">
          {t("needAuth")}{" "}
          <Link href="/sign-in" className="underline">
            {t("title")}
          </Link>
        </p>
      )}
    </main>
  );
}
