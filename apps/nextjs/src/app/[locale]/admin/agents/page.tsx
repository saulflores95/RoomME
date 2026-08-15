import { setRequestLocale } from "next-intl/server";

import { redirect } from "~/i18n/navigation";

export default async function AdminAgentsRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<void> {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect({ href: "/admin", locale });
}
