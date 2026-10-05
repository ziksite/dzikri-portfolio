// Applies supabase/migrations/*.sql in order, once each. Usage: node scripts/db-migrate.mjs
import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import { loadEnv, requireEnv } from "./env.mjs";

loadEnv();
const client = new pg.Client({ connectionString: requireEnv("SUPABASE_DB_URL"), ssl: { rejectUnauthorized: false } });

const dir = "supabase/migrations";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();

await client.connect();
try {
  await client.query("create table if not exists public._migrations (name text primary key, applied_at timestamptz not null default now())");
  await client.query("alter table public._migrations enable row level security");
  const { rows } = await client.query("select name from public._migrations");
  const applied = new Set(rows.map((r) => r.name));

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`skip    ${file}`);
      continue;
    }
    await client.query("begin");
    try {
      await client.query(fs.readFileSync(path.join(dir, file), "utf8"));
      await client.query("insert into public._migrations (name) values ($1)", [file]);
      await client.query("commit");
      console.log(`applied ${file}`);
    } catch (err) {
      await client.query("rollback");
      throw new Error(`${file}: ${err.message}`);
    }
  }
} finally {
  await client.end();
}
