import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getSession } from "~/auth/server";
import { ListingForm } from "~/components/listing-form";
import { Link } from "~/i18n/navigation";

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
  const session = await getSession();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground mb-10">{t("subtitle")}</p>
      {session?.user ? (
        <ListingForm />
      ) : (
        <p className="text-muted-foreground">
          {t("needAuth")}{" "}
          <Link href="/sign-up" className="underline">
            {t("title")}
          </Link>
        </p>
      )}
    </main>
  );
}
