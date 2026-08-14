import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ResetPasswordForm } from "~/components/auth-forms";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");
  return { title: t("resetTitle") };
}

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="px-4 py-16">
      <ResetPasswordForm />
    </main>
  );
}
