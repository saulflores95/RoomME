import type { Config } from "drizzle-kit";

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}

const nonPoolingUrl = process.env.POSTGRES_URL.replace(":6543", ":5432");

export default {
  schema: ["./src/auth-schema.ts", "./src/listing-schema.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  casing: "snake_case",
  migrations: {
    table: "__drizzle_migrations",
    schema: "drizzle",
  },
} satisfies Config;
