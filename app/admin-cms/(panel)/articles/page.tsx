import Link from "next/link";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { ArticleRow } from "@/lib/cms-types";

export default async function AdminArticles() {
  const { data, error } = await supabase()
    .from("articles")
    .select("id, slug, title, published_at, draft, cover_image")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });
  const articles = (data ?? []) as Pick<ArticleRow, "id" | "slug" | "title" | "published_at" | "draft" | "cover_image">[];

  return (
    <>
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Articles</h1>
          <p className="text-sm text-gray-500 mt-1">Artikel ditulis dalam Bahasa Indonesia dan tampil di /id/blog.</p>
        </div>
        <Link href="/admin-cms/articles/new" className="inline-flex items-center gap-2 bg-black text-white px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest">
          <Plus size={15} strokeWidth={3} /> Tulis
        </Link>
      </div>

      {error && <p role="alert" className="font-bold text-red-600 mb-4">Gagal memuat data: {error.message}</p>}

      <ul className="bg-white border-[3px] border-black rounded-[20px] divide-y-2 divide-black/5 overflow-hidden">
        {articles.map((a) => (
          <li key={a.id}>
            <Link href={`/admin-cms/articles/${a.id}`} className="flex items-center gap-4 p-3 md:p-4 hover:bg-gray-50">
              {a.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element -- small admin thumbnail
                <img src={a.cover_image} alt="" className="h-12 w-20 shrink-0 rounded-lg object-cover bg-gray-100" />
              ) : (
                <span className="h-12 w-20 shrink-0 rounded-lg bg-gray-100" />
              )}
              <span className="flex-1 min-w-0">
                <span className="block font-bold truncate">{a.title}</span>
                <span className="block text-xs text-gray-500">{a.published_at}</span>
              </span>
              {a.draft && <span className="px-2 py-1 rounded-md border-2 border-black text-[10px] font-black uppercase tracking-widest">Draft</span>}
            </Link>
          </li>
        ))}
        {articles.length === 0 && !error && <li className="p-6 text-sm text-gray-500">Belum ada artikel.</li>}
      </ul>
    </>
  );
}
