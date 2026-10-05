import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { emptyProjectText, type ProjectRow } from "@/lib/cms-types";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { data } = await supabase().from("projects").select("*").eq("id", id).maybeSingle();
  const p = data as ProjectRow | null;
  if (!p) notFound();

  return (
    <>
      <Link href="/admin-cms/projects" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black mb-4">
        <ArrowLeft size={14} /> Semua project
      </Link>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-6">{p.content_en.title || "Edit project"}</h1>
      <ProjectForm
        id={p.id}
        initial={{
          slug: p.slug,
          sort_order: p.sort_order,
          hidden: p.hidden,
          kind: p.kind,
          status: p.status,
          client: p.client,
          year: p.year,
          image_url: p.image_url,
          image_contain: p.image_contain,
          link: p.link,
          tags: p.tags ?? [],
          metrics: p.metrics ?? [],
          gallery: p.gallery ?? [],
          content_en: { ...emptyProjectText(), ...p.content_en },
          content_id: { ...emptyProjectText(), ...p.content_id },
        }}
      />
    </>
  );
}
