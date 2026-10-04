import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCmsEnabled } from "@/keystatic.config";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Ziksite CMS",
  robots: { index: false, follow: false },
};

// The CMS is its own root layout (the site's root layout lives under app/[lang])
export default function KeystaticLayout() {
  if (!isCmsEnabled) notFound();
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
