import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/lib/i18n";

// Navbar + footer + floating WhatsApp shared by every page
export function SiteShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const t = getDictionary(lang);
  return (
    <>
      <Navbar lang={lang} t={t.nav} />
      {children}
      <Footer t={t.footer} />
      <FloatingWhatsApp t={t.whatsapp} />
    </>
  );
}
