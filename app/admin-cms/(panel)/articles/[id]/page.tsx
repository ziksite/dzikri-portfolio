import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { ArticleRow } from "@/lib/cms-types";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { data } = await supabase().from("articles").select("*").eq("id", id).maybeSingle();
  const a = data as ArticleRow | null;
  if (!a) notFound();

  return (
    <>
      <Link href="/admin-cms/articles" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black mb-4">
        <ArrowLeft size={14} /> Semua artikel
      </Link>
      <ArticleForm
        id={a.id}
        initial={{
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          content_html: a.content_html,
          cover_image: a.cover_image,
          cover_credit: a.cover_credit,
          cover_credit_url: a.cover_credit_url,
          tags: a.tags ?? [],
          published_at: a.published_at,
          draft: a.draft,
        }}
      />
    </>
  );
}
