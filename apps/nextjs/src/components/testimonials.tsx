import { getTranslations } from "next-intl/server";

export async function Testimonials() {
  const t = await getTranslations("testimonials");
  const keys = ["room", "apartment", "roommate", "host"] as const;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-10 text-center text-3xl font-semibold">{t("title")}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {keys.map((key) => (
          <article key={key} className="border-border rounded-2xl border p-6">
            <p className="text-muted-foreground text-xs uppercase">
              {t(`${key}.label`)}
            </p>
            <p className="mt-3 font-medium">{t(`${key}.name`)}</p>
            <p className="text-muted-foreground text-sm">{t(`${key}.city`)}</p>
            <p className="mt-2 text-sm">★★★★★</p>
            <h3 className="mt-3 font-semibold">{t(`${key}.quoteTitle`)}</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              {t(`${key}.quote`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
