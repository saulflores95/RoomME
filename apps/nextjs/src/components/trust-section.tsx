import { getTranslations } from "next-intl/server";

import { Link } from "~/i18n/navigation";

export async function TrustSection() {
  const t = await getTranslations("trust");
  const cta = await getTranslations("cta");

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
      <div>
        <h2 className="text-3xl font-semibold">{t("title")}</h2>
        <p className="text-muted-foreground mt-4">{t("subtitle")}</p>
        <ul className="mt-8 space-y-3 text-sm">
          <li>{t("manual")}</li>
          <li>{t("badges")}</li>
          <li>{t("messaging")}</li>
          <li>{t("leads")}</li>
        </ul>
      </div>
      <aside className="bg-muted rounded-2xl p-8">
        <h3 className="mb-6 text-lg font-semibold">{t("howTitle")}</h3>
        <ol className="space-y-4">
          <li>
            <strong>1. {t("step1Title")}</strong>
            <p className="text-muted-foreground text-sm">{t("step1Body")}</p>
          </li>
          <li>
            <strong>2. {t("step2Title")}</strong>
            <p className="text-muted-foreground text-sm">{t("step2Body")}</p>
          </li>
          <li>
            <strong>3. {t("step3Title")}</strong>
            <p className="text-muted-foreground text-sm">{t("step3Body")}</p>
          </li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/list-a-room"
            className="bg-foreground text-background rounded-md px-4 py-2 text-sm"
          >
            {cta("listRoom")}
          </Link>
          <Link
            href="/rooms"
            className="bg-foreground text-background rounded-md px-4 py-2 text-sm"
          >
            {cta("findRoom")}
          </Link>
        </div>
      </aside>
    </section>
  );
}
