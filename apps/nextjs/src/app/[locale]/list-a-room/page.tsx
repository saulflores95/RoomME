import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ListingForm } from "~/components/listing-form";
import { ListingInquiryCard } from "~/components/listing-inquiry-card";
import { getListingAccess } from "~/lib/listing-access";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("list");
  return { title: t("title") };
}

export default async function ListARoomPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("list");
  const access = await getListingAccess();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground mb-10">
        {access.canCreateListing ? t("subtitle") : t("inquirySubtitle")}
      </p>
      {access.canCreateListing ? <ListingForm /> : <ListingInquiryCard />}
    </main>
  );
}
