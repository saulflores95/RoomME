import { defineConfig } from "eslint/config";

import { baseConfig } from "@acme/eslint-config/base";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
  {
    files: ["src/**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
    },
  },
);
