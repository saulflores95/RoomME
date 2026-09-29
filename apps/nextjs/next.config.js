import { createJiti } from "jiti";
import createNextIntlPlugin from "next-intl/plugin";

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./src/env");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import("next").NextConfig} */
const config = {
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@acme/api",
    "@acme/auth",
    "@acme/db",
    "@acme/i18n",
    "@acme/ui",
    "@acme/validators",
    "leaflet",
    "react-leaflet",
  ],
  serverExternalPackages: ["@react-pdf/renderer", "sharp"],
  outputFileTracingIncludes: {
    // Keys are picomatch globs, so a literal `[id]` would be read as a character class.
    "/api/listings/*/technical-sheet": [
      "./src/assets/fonts/**",
      // sharp dlopens libvips from a sibling pnpm package, which file tracing can't see.
      "../../node_modules/.pnpm/@img+sharp-libvips-*/node_modules/@img/sharp-libvips-*/lib/**",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale/rooms-for-rent-cdmx",
        destination: "/:locale/rooms-for-rent-queretaro",
        permanent: true,
      },
      {
        source: "/rooms-for-rent-cdmx",
        destination: "/rooms-for-rent-queretaro",
        permanent: true,
      },
    ];
  },

  /** We already do linting and typechecking as separate tasks in CI */
  typescript: { ignoreBuildErrors: true },
};

export default withNextIntl(config);
