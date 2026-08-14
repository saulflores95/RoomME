import { getTranslations } from "next-intl/server";

import { HydrateClient, prefetch, trpc } from "~/trpc/server";
import { FeaturedRoomsList } from "./featured-rooms-list";

export async function FeaturedRooms() {
  const t = await getTranslations("featured");
  prefetch(trpc.listing.list.queryOptions({ limit: 4 }));

  return (
    <HydrateClient>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-semibold">{t("title")}</h2>
        <FeaturedRoomsList />
      </section>
    </HydrateClient>
  );
}
