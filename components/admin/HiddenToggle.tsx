"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { setProjectHidden } from "@/app/admin-cms/actions";

// Quick show/hide from the projects list
export function HiddenToggle({ id, hidden }: { id: string; hidden: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result = await setProjectHidden(id, !hidden);
          if (!result.ok) alert(result.error);
          router.refresh();
        })
      }
      aria-label={hidden ? "Tampilkan di website" : "Sembunyikan dari website"}
      title={hidden ? "Tersembunyi — klik untuk menampilkan" : "Tampil — klik untuk menyembunyikan"}
      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
    >
      {pending ? <Loader2 size={16} className="animate-spin" /> : hidden ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );
}
