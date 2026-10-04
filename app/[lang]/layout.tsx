import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, locales, SITE_URL } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    alternates: languageAlternates(lang, "/"),
    openGraph: {
      title: t.title,
      description: t.description,
      url: SITE_URL,
      siteName: t.siteName,
      images: [{ url: "/images/logo.png", width: 512, height: 512, alt: t.siteName }],
      locale: t.ogLocale,
      type: "website",
    },
    icons: {
      icon: "/images/logo.png",
      shortcut: "/images/logo.png",
      apple: "/images/logo.png",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang}>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZNHQRGP1LJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZNHQRGP1LJ');
          `}
        </Script>
      </body>
    </html>
  );
}
