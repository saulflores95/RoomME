import type { Metadata } from "next";
import type { JSX } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PropertyForm } from "~/components/property-form";
import { Link } from "~/i18n/navigation";
import { getListingAccess } from "~/lib/listing-access";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("list");
  return { title: t("createPropertyTitle") };
}

export default async function AddPropertyPage({
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
        {t("createPropertyTitle")}
      </h1>
      <p className="text-muted-foreground mb-10">
        {t("createPropertySubtitle")}
      </p>
      {access.isSignedIn ? (
        <PropertyForm />
      ) : (
        <p className="text-muted-foreground">
          {t("needAuthProperty")}{" "}
          <Link href="/sign-in" className="underline">
            {t("signIn")}
          </Link>
        </p>
      )}
    </main>
  );
}
