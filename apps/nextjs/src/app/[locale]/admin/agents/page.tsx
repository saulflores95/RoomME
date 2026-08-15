import type { Metadata } from "next";
import type { JSX } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdminAgents } from "~/components/admin-agents";
import { redirect } from "~/i18n/navigation";
import { getListingAccess } from "~/lib/listing-access";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  return { title: t("title") };
}

export default async function AdminAgentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const access = await getListingAccess();

  if (!access.isAdmin) {
    redirect({ href: "/", locale });
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground mb-10">{t("subtitle")}</p>
      <AdminAgents />
    </main>
  );
}
