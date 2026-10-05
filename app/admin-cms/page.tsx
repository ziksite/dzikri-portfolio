import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { safeCmsPath, SESSION_COOKIE, verifySessionToken } from "@/lib/cms-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Login" };

const messages: Record<string, string> = {
  invalid: "Email atau password salah.",
  "not-configured": "Login CMS belum dikonfigurasi di server.",
};

export default async function AdminCmsLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; loggedOut?: string }>;
}) {
  const { error, next, loggedOut } = await searchParams;
  const target = safeCmsPath(next);

  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token, process.env.CMS_SESSION_SECRET)) redirect(target);

  const inputClass =
    "w-full bg-white border-[3px] border-black rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
            <Lock size={18} strokeWidth={2.5} />
          </span>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">Ziksite CMS</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">Admin login</p>
          </div>
        </div>

        <form
          method="post"
          action="/api/cms-auth/login"
          className="bg-white border-[3px] border-black rounded-[24px] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-5"
        >
          {error && messages[error] && (
            <p role="alert" className="text-sm font-bold text-red-700 bg-red-50 border-2 border-red-200 rounded-xl px-4 py-3">
              {messages[error]}
            </p>
          )}
          {loggedOut && !error && (
            <p role="status" className="text-sm font-bold text-gray-700 bg-gray-100 rounded-xl px-4 py-3">
              Anda sudah logout.
            </p>
          )}

          <input type="hidden" name="next" value={target} />

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-black text-white rounded-xl px-5 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}
