import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only client with the secret key. The database has RLS on and no public policies,
// so every read and write goes through the server; the key must never reach the browser.
let client: SupabaseClient | null = null;

export function supabase() {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set");
  client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}

export const MEDIA_BUCKET = "media";
