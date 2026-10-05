import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Ziksite CMS", template: "%s - Ziksite CMS" },
  robots: { index: false, follow: false },
};

// Own root layout: the site's root layout lives under app/[lang]
export default function AdminCmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
