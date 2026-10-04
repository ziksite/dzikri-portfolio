import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dzikri.ziksite.my.id"),
  title: "Dzikri Ramadhan - Website Developer",
  description: "High-end modern developer portfolio of a website developer and tech innovator.",
  openGraph: {
    title: "Dzikri Ramadhan - Website Developer",
    description: "High-end modern developer portfolio of a website developer and tech innovator.",
    url: "https://dzikri.ziksite.my.id",
    siteName: "Dzikri Ramadhan Portfolio",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Dzikri Ramadhan Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
