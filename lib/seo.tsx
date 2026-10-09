import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { localePath, SITE_URL, type Locale } from "@/lib/i18n";
import { EMAIL, socialLinks } from "@/lib/site";

export const OG_IMAGE = { url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Dzikri Ramadhan" };

// A page's openGraph replaces the layout's entirely, so every page builds the full set here
// (otherwise og:url, site name and locale fall back to the homepage's values)
export function pageOpenGraph(
  lang: Locale,
  path: string,
  og: { title: string; description: string; image?: string; type?: "website" | "article"; publishedTime?: string }
): NonNullable<Metadata["openGraph"]> {
  const t = getDictionary(lang).meta;
  return {
    title: og.title,
    description: og.description,
    url: localePath(lang, path),
    siteName: t.siteName,
    locale: t.ogLocale,
    type: og.type ?? "website",
    ...(og.publishedTime ? { publishedTime: og.publishedTime } : {}),
    images: [og.image ? { url: og.image, alt: og.title } : OG_IMAGE],
  };
}

const PERSON_ID = `${SITE_URL}/#person`;

// Structured data for the homepage: who the site is about, and the site itself
export function homeJsonLd(lang: Locale) {
  const t = getDictionary(lang).meta;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Dzikri Ramadhan",
        jobTitle: "Technology & Innovation Leader",
        description: t.description,
        url: SITE_URL,
        image: `${SITE_URL}/images/profile.jpeg`,
        email: `mailto:${EMAIL}`,
        address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
        knowsAbout: ["Digital Transformation", "Product Development", "Business Automation", "Artificial Intelligence", "Web Development"],
        sameAs: socialLinks.filter((s) => s.id !== "email").map((s) => s.url),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: t.siteName,
        inLanguage: ["en", "id"],
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

export function articleJsonLd(article: { slug: string; title: string; excerpt: string; publishedAt: string; coverImage: string | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    inLanguage: "id",
    url: `${SITE_URL}${localePath("id", `/blog/${article.slug}`)}`,
    image: article.coverImage ? new URL(article.coverImage, SITE_URL).toString() : `${SITE_URL}${OG_IMAGE.url}`,
    author: { "@type": "Person", "@id": PERSON_ID, name: "Dzikri Ramadhan", url: SITE_URL },
  };
}

// "<" is escaped so CMS text can't close the script tag
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}
