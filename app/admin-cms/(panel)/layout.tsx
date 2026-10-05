import { requireAdmin } from "@/lib/admin-auth";
import { AdminNav } from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <AdminNav />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">{children}</main>
    </div>
  );
}
