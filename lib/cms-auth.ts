// Session cookie for the CMS login gate. Uses Web Crypto so it runs in the proxy and in route handlers.
// Token format: "v1.<expiresAtMs>.<base64url HMAC-SHA256 of 'v1.<expiresAtMs>'>"

export const SESSION_COOKIE = "cms_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

const encoder = new TextEncoder();

function base64url(buffer: ArrayBuffer) {
  let binary = "";
  for (const byte of new Uint8Array(buffer)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(secret: string, data: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(data)));
}

// Length-independent comparison so a wrong signature doesn't leak how many characters matched
function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export async function createSessionToken(secret: string) {
  const payload = `v1.${Date.now() + SESSION_MAX_AGE * 1000}`;
  return `${payload}.${await sign(secret, payload)}`;
}

export async function verifySessionToken(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false;
  const [version, expires, signature] = token.split(".");
  if (version !== "v1" || !expires || !signature) return false;
  if (!(Number(expires) > Date.now())) return false;
  return safeEqual(signature, await sign(secret, `${version}.${expires}`));
}

export const CMS_HOME = "/admin-cms/projects";

// Only allow redirecting back into the admin panel, never to another site
export function safeCmsPath(next: unknown) {
  return typeof next === "string" && /^\/admin-cms\/[a-z0-9/_-]+$/i.test(next) ? next : CMS_HOME;
}
