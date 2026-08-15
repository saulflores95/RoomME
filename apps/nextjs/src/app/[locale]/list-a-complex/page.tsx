import type { Metadata } from "next";
import type { JSX } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ComplexForm } from "~/components/complex-form";
import { ListingInquiryCard } from "~/components/listing-inquiry-card";
import { getListingAccess } from "~/lib/listing-access";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("list");
  return { title: t("createComplexTitle") };
}

export default async function ListAComplexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("list");
  const access = await getListingAccess();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        {t("createComplexTitle")}
      </h1>
      <p className="text-muted-foreground mb-10">
        {access.canCreateListing
          ? t("createComplexSubtitle")
          : t("inquirySubtitle")}
      </p>
      {access.canCreateListing ? <ComplexForm /> : <ListingInquiryCard />}
    </main>
  );
}
