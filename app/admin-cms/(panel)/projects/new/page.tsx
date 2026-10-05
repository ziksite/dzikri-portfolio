import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProject() {
  return (
    <>
      <Link href="/admin-cms/projects" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black mb-4">
        <ArrowLeft size={14} /> Semua project
      </Link>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-6">Project baru</h1>
      <ProjectForm />
    </>
  );
}
