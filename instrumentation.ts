import type { Instrumentation } from "next";

// Next.js control-flow signals that surface as errors but aren't failures
const IGNORED_DIGESTS = /^(NEXT_NOT_FOUND|NEXT_REDIRECT|NEXT_HTTP_ERROR_FALLBACK|DYNAMIC_SERVER_USAGE)/;

// Reports server errors on the live site to Telegram (throttled per route and message)
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.VERCEL_ENV !== "production") return;
  const err = error as { message?: string; digest?: string };
  if (err.digest && IGNORED_DIGESTS.test(err.digest)) return;

  const message = (err.message ?? String(error)).slice(0, 300);
  try {
    const { alertOnce } = await import("@/lib/alerts");
    await alertOnce(`${context.routePath}|${message.slice(0, 100)}`, [
      "🚨 <b>Error di website</b>",
      `Halaman: ${request.method} ${request.path}`,
      `Route: ${context.routePath} (${context.routeType})`,
      `Pesan: ${message}`,
      ...(err.digest ? [`Digest: ${err.digest}`] : []),
    ]);
  } catch (alertError) {
    console.error("Error alert failed", alertError);
  }
};
