import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

// English is served without a prefix: "/projects" is rewritten to "/en/projects" internally,
// and an explicit "/en/..." URL redirects to the unprefixed canonical one.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if ((locales as readonly string[]).includes(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the CMS, API routes, metadata routes and any file with an extension
  matcher: ["/((?!_next|api|keystatic|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)"],
};
