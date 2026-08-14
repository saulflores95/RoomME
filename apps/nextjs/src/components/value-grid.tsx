import { getTranslations } from "next-intl/server";

export async function ValueGrid() {
  const t = await getTranslations("value");

  const items = [
    { key: "local", icon: "⌂" },
    { key: "people", icon: "☺" },
    { key: "safe", icon: "▣" },
    { key: "pets", icon: "🐕" },
  ] as const;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-10 text-center text-3xl font-semibold">{t("title")}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.key}
            className="border-border rounded-2xl border p-8"
          >
            <p className="mb-4 text-2xl">{item.icon}</p>
            <h3 className="mb-2 text-xl font-semibold">
              {t(`${item.key}.title`)}
            </h3>
            <p className="text-muted-foreground">{t(`${item.key}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
