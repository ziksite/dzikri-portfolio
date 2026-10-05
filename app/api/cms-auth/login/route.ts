import { pbkdf2Sync, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { CMS_HOME, createSessionToken, safeCmsPath, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/cms-auth";

export const runtime = "nodejs";

// CMS_ADMIN_PASSWORD_HASH format: "pbkdf2:<iterations>:<salt hex>:<hash hex>" (see scripts/cms-password-hash.mjs)
function verifyPassword(password: string, stored: string | undefined) {
  const [scheme, iterations, salt, hash] = (stored ?? "").split(":");
  if (scheme !== "pbkdf2" || !iterations || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = pbkdf2Sync(password, Buffer.from(salt, "hex"), Number(iterations), expected.length, "sha256");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const next = safeCmsPath(form.get("next"));

  const { CMS_ADMIN_EMAIL, CMS_ADMIN_PASSWORD_HASH, CMS_SESSION_SECRET } = process.env;
  const configured = !!(CMS_ADMIN_EMAIL && CMS_ADMIN_PASSWORD_HASH && CMS_SESSION_SECRET);

  // Check the password even when the email is wrong, so both cases take the same time
  const passwordOk = verifyPassword(password, CMS_ADMIN_PASSWORD_HASH);
  const emailOk = configured && email === CMS_ADMIN_EMAIL!.trim().toLowerCase();

  if (!configured || !emailOk || !passwordOk) {
    // Small fixed delay slows down password guessing
    await new Promise((r) => setTimeout(r, 800));
    const url = new URL("/admin-cms", request.url);
    url.searchParams.set("error", configured ? "invalid" : "not-configured");
    if (next !== CMS_HOME) url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set(SESSION_COOKIE, await createSessionToken(CMS_SESSION_SECRET!), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
