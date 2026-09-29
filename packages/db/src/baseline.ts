/**
 * Marks the baseline migration as applied on databases that were created with
 * `drizzle-kit push` before migrations existed. Safe to run more than once.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

interface JournalEntry {
  idx: number;
  when: number;
  tag: string;
}

interface Journal {
  entries: JournalEntry[];
}

const BASELINE_TAG = "0000_baseline";

const isJournal = (value: unknown): value is Journal =>
  typeof value === "object" &&
  value !== null &&
  Array.isArray((value as { entries?: unknown }).entries);

const main = async (): Promise<void> => {
  const connectionString = process.env.POSTGRES_URL?.replace(":6543", ":5432");
  if (!connectionString) {
    throw new Error("POSTGRES_URL is not set");
  }

  const migrationsDir = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "drizzle",
  );
  const journal: unknown = JSON.parse(
    readFileSync(join(migrationsDir, "meta", "_journal.json"), "utf8"),
  );
  if (!isJournal(journal)) {
    throw new Error("Invalid drizzle journal");
  }

  const entry = journal.entries.find((item) => item.tag === BASELINE_TAG);
  if (!entry) {
    throw new Error(`Missing ${BASELINE_TAG} in journal`);
  }

  const sqlText = readFileSync(join(migrationsDir, `${entry.tag}.sql`), "utf8");
  const hash = createHash("sha256").update(sqlText).digest("hex");

  const client = postgres(connectionString, {
    max: 1,
    onnotice: () => undefined,
  });
  try {
    await client`CREATE SCHEMA IF NOT EXISTS drizzle`;
    await client`
      CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
        id SERIAL PRIMARY KEY,
        hash text NOT NULL,
        created_at bigint
      )
    `;

    const [legacy] = await client<{ exists: boolean }[]>`
      SELECT to_regclass('public.room') IS NOT NULL AS exists
    `;
    if (!legacy?.exists) {
      console.log("No existing schema found; run `pnpm db:migrate` instead.");
      return;
    }

    const existing = await client`
      SELECT 1 FROM drizzle.__drizzle_migrations WHERE hash = ${hash}
    `;
    if (existing.length > 0) {
      console.log("Baseline already recorded.");
      return;
    }

    await client`
      INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
      VALUES (${hash}, ${entry.when})
    `;
    console.log("Baseline recorded. Run `pnpm db:migrate` next.");
  } finally {
    await client.end();
  }
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
