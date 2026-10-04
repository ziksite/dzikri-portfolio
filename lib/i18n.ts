export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const SITE_URL = "https://dzikri.ziksite.my.id";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// English lives at the root ("/projects"); other locales are prefixed ("/id/projects").
export function localePath(lang: Locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

// Strip the locale prefix from a pathname: "/id/blog/x" -> "/blog/x"
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first) && first !== defaultLocale) return `/${rest.join("/")}`;
  return pathname || "/";
}

// Canonical URL + hreflang alternates for a path, for page metadata
export function languageAlternates(lang: Locale, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: Object.fromEntries([
      ...locales.map((l) => [l, localePath(l, path)]),
      ["x-default", localePath(defaultLocale, path)],
    ]),
  };
}

export const localeLabels: Record<Locale, string> = { en: "EN", id: "ID" };
export const dateLocales: Record<Locale, string> = { en: "en-US", id: "id-ID" };
