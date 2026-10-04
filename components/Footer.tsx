import type { Dictionary } from "@/i18n";
import { socialLinks } from "@/lib/site";
import { SocialIcon } from "@/components/SocialIcon";

export function Footer({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer className="py-10 border-t border-white/10 bg-dark text-secondary">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
        <div>
          <p className="text-base font-black tracking-wide">DZIKRI RAMADHAN</p>
          <p className="text-sm font-bold opacity-80 mt-1">{t.tagline}</p>
          <p className="text-sm font-medium opacity-60 mt-0.5">{t.sub}</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-5 opacity-70">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target={social.id === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity"
                aria-label={social.label}
              >
                <SocialIcon id={social.id} />
              </a>
            ))}
          </div>
          <p className="text-xs font-medium tracking-wide opacity-50">© {new Date().getFullYear()} Dzikri Ramadhan</p>
        </div>
      </div>
    </footer>
  );
}
