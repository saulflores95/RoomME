import { getTranslations } from "next-intl/server";

import { Link } from "~/i18n/navigation";

export async function CtaCards() {
  const t = await getTranslations("cta");

  return (
    <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 md:grid-cols-2">
      <Link
        href="/list-a-room"
        className="relative min-h-56 overflow-hidden rounded-3xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="bg-foreground/80 text-background absolute inset-0 m-auto h-12 w-fit rounded-md px-5 py-3 text-sm font-medium">
          {t("listRoom")}
        </span>
      </Link>
      <Link
        href="/rooms"
        className="relative min-h-56 overflow-hidden rounded-3xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="bg-foreground/80 text-background absolute inset-0 m-auto h-12 w-fit rounded-md px-5 py-3 text-sm font-medium">
          {t("findRoom")}
        </span>
      </Link>
    </section>
  );
}
