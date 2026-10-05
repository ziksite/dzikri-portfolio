import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticle() {
  return (
    <>
      <Link href="/admin-cms/articles" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black mb-4">
        <ArrowLeft size={14} /> Semua artikel
      </Link>
      <ArticleForm />
    </>
  );
}
