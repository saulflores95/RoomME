import type { MetadataRoute } from "next";

import { env } from "~/env";
import { routing } from "~/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    env.VERCEL_PROJECT_PRODUCTION_URL != null
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000";

  const paths = [
    "",
    "/rooms",
    "/list-a-room",
    "/list-a-complex",
    "/rooms-for-rent-cdmx",
    "/rooms-for-rent-queretaro",
  ];

  return routing.locales.flatMap((locale) =>
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
}
