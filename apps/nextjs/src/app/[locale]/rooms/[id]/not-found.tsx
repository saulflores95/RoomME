import type { JSX } from "react";
import { getTranslations } from "next-intl/server";

import { Link } from "~/i18n/navigation";

export default async function RoomNotFound(): Promise<JSX.Element> {
  const t = await getTranslations("rooms");

  return (
    <main className="mx-auto flex max-w-lg flex-col items-start gap-4 px-4 py-16">
      <h1 className="text-3xl font-bold">{t("detailTitle")}</h1>
      <p className="text-muted-foreground">{t("detailNotFound")}</p>
      <Link
        href="/rooms"
        className="text-foreground font-medium underline-offset-4 hover:underline"
      >
        {t("backToResults")}
      </Link>
    </main>
  );
}
