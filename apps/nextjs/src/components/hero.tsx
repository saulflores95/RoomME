import { getTranslations } from "next-intl/server";

import { LocationSearch } from "./location-search";

export async function Hero() {
  const t = await getTranslations("hero");
  const phone = await getTranslations("phone");

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        <LocationSearch placeholder={t("searchPlaceholder")} />
      </div>

      <article className="border-border bg-card overflow-hidden rounded-3xl border shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"
          alt={phone("listingTitle")}
          className="h-56 w-full object-cover"
        />
        <div className="space-y-1 p-5">
          <p className="text-sm font-medium">{phone("host")}</p>
          <p className="text-muted-foreground text-xs">{phone("location")}</p>
          <p className="text-base">{phone("listingTitle")}</p>
          <p className="font-semibold">{phone("price")}</p>
        </div>
      </article>
    </section>
  );
}
