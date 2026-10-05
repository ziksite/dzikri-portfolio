import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/cms-auth";

function logout(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin-cms?loggedOut=1", request.url), 303);
  response.cookies.delete(SESSION_COOKIE);
  return response;
}

// POST only, so a link on another site can't log the admin out
export const POST = logout;
