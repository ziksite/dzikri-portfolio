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

// What the person can be hired for, as schema.org offers on the Person
const SERVICES = [
  { name: "Website Design & Development", description: "Company profiles, landing pages, online stores and custom websites." },
  { name: "Business Apps & Internal Systems", description: "POS, inventory, booking, customer data and reporting systems." },
  { name: "WhatsApp Chatbot & AI Automation", description: "24/7 WhatsApp replies, automated follow-ups and order logging." },
  { name: "Website & Digital Consulting", description: "Website and digital audits with clear, prioritized fixes." },
];

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
        jobTitle: "Web Developer & AI Automation Specialist",
        description: t.description,
        url: SITE_URL,
        image: `${SITE_URL}/images/profile.jpeg`,
        email: `mailto:${EMAIL}`,
        address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
        knowsAbout: [
          "Web Development",
          "Web Application Development",
          "Next.js",
          "AI Automation",
          "Business Process Automation",
          "Artificial Intelligence",
          "Product Development",
          "Digital Transformation",
        ],
        areaServed: "Worldwide",
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", ...s, provider: { "@id": PERSON_ID } },
        })),
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
