import Link from "next/link";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { ProjectRow } from "@/lib/cms-types";
import { HiddenToggle } from "@/components/admin/HiddenToggle";

export default async function AdminProjects() {
  const { data, error } = await supabase()
    .from("projects")
    .select("id, slug, sort_order, hidden, kind, status, year, image_url, content_en")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  const projects = (data ?? []) as Pick<ProjectRow, "id" | "slug" | "sort_order" | "hidden" | "kind" | "status" | "year" | "image_url" | "content_en">[];

  return (
    <>
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Urutan di website mengikuti kolom &ldquo;Urutan&rdquo; (angka kecil lebih dulu).</p>
        </div>
        <Link href="/admin-cms/projects/new" className="inline-flex items-center gap-2 bg-black text-white px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest">
          <Plus size={15} strokeWidth={3} /> Tambah
        </Link>
      </div>

      {error && <p role="alert" className="font-bold text-red-600 mb-4">Gagal memuat data: {error.message}</p>}

      <ul className="bg-white border-[3px] border-black rounded-[20px] divide-y-2 divide-black/5 overflow-hidden">
        {projects.map((p) => (
          <li key={p.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-gray-50">
            <span className="w-8 text-center text-xs font-black text-gray-400 tabular-nums">{p.sort_order}</span>
            {/* eslint-disable-next-line @next/next/no-img-element -- small admin thumbnail */}
            <img src={p.image_url} alt="" className="h-12 w-20 shrink-0 rounded-lg object-cover bg-[#0f0f0f]" />
            <Link href={`/admin-cms/projects/${p.id}`} className="flex-1 min-w-0">
              <span className={`block font-bold truncate ${p.hidden ? "text-gray-400 line-through" : ""}`}>{p.content_en.title}</span>
              <span className="block text-xs text-gray-500 truncate">
                {p.kind} · {p.status} · {p.year}
              </span>
            </Link>
            <HiddenToggle id={p.id} hidden={p.hidden} />
            <Link href={`/admin-cms/projects/${p.id}`} className="hidden sm:inline-flex px-3 py-2 rounded-lg border-2 border-black text-xs font-bold hover:bg-black hover:text-white">
              Edit
            </Link>
          </li>
        ))}
        {projects.length === 0 && !error && <li className="p-6 text-sm text-gray-500">Belum ada project.</li>}
      </ul>
    </>
  );
}
