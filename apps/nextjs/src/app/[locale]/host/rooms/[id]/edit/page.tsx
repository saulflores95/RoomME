import type { Metadata } from "next";
import type { JSX } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getSession } from "~/auth/server";
import { EditListingForm } from "~/components/edit-listing-form";
import { Link } from "~/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("list");
  return { title: t("editRoomTitle") };
}

export default async function EditRoomPage({
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
      <h1 className="mb-2 text-4xl font-bold">{t("editRoomTitle")}</h1>
      <p className="text-muted-foreground mb-10">{t("subtitle")}</p>
      {session?.user ? (
        <EditListingForm roomId={id} />
      ) : (
        <p className="text-muted-foreground">
          {t("needAuth")}{" "}
          <Link href="/sign-in" className="underline">
            {t("editRoomTitle")}
          </Link>
        </p>
      )}
    </main>
  );
}
