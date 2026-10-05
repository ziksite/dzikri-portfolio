"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, FileText, FolderKanban, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin-cms/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin-cms/articles", label: "Articles", icon: FileText },
];

export function AdminNav() {
  const pathname = usePathname() ?? "";
  return (
    <header className="sticky top-0 z-40 bg-white border-b-[3px] border-black">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        <Link href="/admin-cms/projects" className="font-black uppercase tracking-tighter text-lg mr-2 md:mr-6">
          Ziksite CMS
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors",
                pathname.startsWith(href) ? "bg-black text-white" : "hover:bg-gray-100"
              )}
            >
              <Icon size={15} strokeWidth={2.5} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold hover:bg-gray-100"
          >
            <ExternalLink size={15} />
            <span className="hidden sm:inline">Lihat website</span>
          </a>
          <form method="post" action="/api/cms-auth/logout">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold hover:bg-gray-100"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
