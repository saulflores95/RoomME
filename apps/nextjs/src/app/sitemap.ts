import type { MetadataRoute } from "next";

import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import { Room } from "@acme/db/schema";

import { routing } from "~/i18n/routing";
import { getSiteUrl } from "~/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const paths = [
    "",
    "/rooms",
    "/list-a-room",
    "/list-a-complex",
    "/rooms-for-rent-queretaro",
  ];

  const staticEntries = routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [item, `${base}/${item}${path}`]),
        ),
      },
    })),
  );

  const listedRooms = await db
    .select({
      id: Room.id,
      updatedAt: Room.updatedAt,
      createdAt: Room.createdAt,
    })
    .from(Room)
    .where(eq(Room.status, "listed"));

  const roomEntries = routing.locales.flatMap((locale) =>
    listedRooms.map((room) => {
      const path = `/rooms/${room.id}`;
      return {
        url: `${base}/${locale}${path}`,
        lastModified: room.updatedAt ?? room.createdAt,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((item) => [item, `${base}/${item}${path}`]),
          ),
        },
      };
    }),
  );

  return [...staticEntries, ...roomEntries];
}
