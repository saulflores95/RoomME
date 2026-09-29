import type { Metadata } from "next";
import type { JSX } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getSession } from "~/auth/server";
import { EditPropertyForm } from "~/components/edit-property-form";
import { Link } from "~/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("list");
  return { title: t("editPropertyTitle") };
}

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<JSX.Element> {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("list");
  const session = await getSession();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold">{t("editPropertyTitle")}</h1>
      <p className="text-muted-foreground mb-10">
        {t("createPropertySubtitle")}
      </p>
      {session?.user ? (
        <EditPropertyForm propertyId={id} />
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
