import type { Metadata } from "next";
import type { JSX } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { MyBookings } from "~/components/bookings/my-bookings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bookings" });
  return { title: t("title") };
}

export default async function MyBookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-10">
      <MyBookings />
    </main>
  );
}
