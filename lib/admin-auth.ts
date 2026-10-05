import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/cms-auth";

export async function isAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(token, process.env.CMS_SESSION_SECRET);
}

// Every admin page and server action calls this: server actions are reachable by direct POST,
// so the proxy gate alone is not enough.
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin-cms");
}
