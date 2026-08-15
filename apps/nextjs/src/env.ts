import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";
import { z } from "zod/v4";

import { authEnv } from "@acme/auth/env";

const roommeBlobToken = process.env.ROOMME_BLOB_READ_WRITE_TOKEN;
if (
  (process.env.BLOB_READ_WRITE_TOKEN === undefined ||
    process.env.BLOB_READ_WRITE_TOKEN.length === 0) &&
  roommeBlobToken !== undefined &&
  roommeBlobToken.length > 0
) {
  process.env.BLOB_READ_WRITE_TOKEN = roommeBlobToken;
}

export const env = createEnv({
  extends: [authEnv(), vercel()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    POSTGRES_URL: z.url(),
    BLOB_READ_WRITE_TOKEN: z
      .string()
      .optional()
      .transform((value) =>
        value !== undefined && value.length > 0 ? value : undefined,
      ),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
