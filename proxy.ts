import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/cms-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin gate: everything under /admin-cms/ (except the login page itself) and the admin API
  // require a valid login session. Pages and server actions re-check it (lib/admin-auth.ts).
  if (pathname.startsWith("/admin-cms/") || pathname.startsWith("/api/admin/")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (await verifySessionToken(token, process.env.CMS_SESSION_SECRET)) return NextResponse.next();
    if (pathname.startsWith("/api/")) return new NextResponse("Unauthorized", { status: 401 });
    const login = new URL("/admin-cms", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  // English is served without a prefix: "/projects" is rewritten to "/en/projects" internally,
  // and an explicit "/en/..." URL redirects to the unprefixed canonical one.
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
  matcher: [
    // Site pages: skip Next internals, APIs, the admin panel, metadata routes and files with an extension
    "/((?!_next|api|admin-cms|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)",
    // Admin routes, for the login gate
    "/admin-cms/:path+",
    "/api/admin/:path*",
  ],
};
