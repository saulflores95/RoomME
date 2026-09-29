import type { Metadata } from "next";
import type { JSX } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { ListingType } from "@acme/validators";
import { LISTING_TYPES } from "@acme/validators";

import { ListingForm } from "~/components/listing-form";
import { Link } from "~/i18n/navigation";
import { getListingAccess } from "~/lib/listing-access";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("list");
  return { title: t("title") };
}

const toListingType = (value: string | string[] | undefined): ListingType =>
  LISTING_TYPES.find((type) => type === value) ?? "room";

export default async function ListYourPlacePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string | string[] }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  const { type } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("list");
  const access = await getListingAccess();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground mb-10">{t("subtitle")}</p>
      {access.isSignedIn ? (
        <ListingForm initialListingType={toListingType(type)} />
      ) : (
        <p className="text-muted-foreground">
          {t("needAuth")}{" "}
          <Link href="/sign-in" className="underline">
            {t("signIn")}
          </Link>
        </p>
      )}
    </main>
  );
}
