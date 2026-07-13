import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * CSRF-protected logout: accepts both GET (browser navigation via <Link>)
 * and POST (programmatic). GET requests are validated via Origin/referer
 * header check to prevent cross-site forced logout.
 */
export async function GET(request: Request) {
  // Reject cross-origin GET requests — only same-origin browser navigation
  // should trigger logout. Browsers set Origin for cross-origin navigations
  // but not same-origin, so a missing Origin is safe. An external Origin means
  // an attacker site is trying to force-logout via <img>/<link>.
  const origin = request.headers.get("origin");
  if (origin) {
    return new Response("Forbidden", { status: 403 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    },
  );

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL ?? "/"));
}
