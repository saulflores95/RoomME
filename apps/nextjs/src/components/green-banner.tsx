import { getTranslations } from "next-intl/server";

import { Link } from "~/i18n/navigation";

export async function GreenBanner() {
  const t = await getTranslations("banner");
  const cta = await getTranslations("cta");

  return (
    <section className="bg-brand mx-auto my-12 max-w-6xl overflow-hidden rounded-3xl px-4 py-12 text-white md:px-12">
      <div className="max-w-xl space-y-4">
        <h2 className="text-3xl font-semibold">{t("title")}</h2>
        <p className="text-white/80">{t("subtitle")}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/list-a-room"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white"
          >
            {cta("listRoom")}
          </Link>
          <Link
            href="/rooms"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white"
          >
            {cta("findRoom")}
          </Link>
        </div>
      </div>
    </section>
  );
}
