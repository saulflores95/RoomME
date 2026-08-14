import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { CtaCards } from "~/components/cta-cards";
import { FeaturedRooms } from "~/components/featured-rooms";
import { GreenBanner } from "~/components/green-banner";
import { Hero } from "~/components/hero";
import { Testimonials } from "~/components/testimonials";
import { TrustSection } from "~/components/trust-section";
import { ValueGrid } from "~/components/value-grid";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <CtaCards />
      <ValueGrid />
      <TrustSection />
      <Testimonials />
      <GreenBanner />
      <Suspense>
        <FeaturedRooms />
      </Suspense>
    </main>
  );
}
