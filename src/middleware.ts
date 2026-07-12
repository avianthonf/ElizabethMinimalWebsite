import { NextResponse } from "next/server";

/**
 * Content-Security-Policy middleware.
 *
 * Dynamically adds Supabase's project domain to connect-src and img-src
 * when NEXT_PUBLIC_SUPABASE_URL is configured. When not set, the policy
 * is self-only — no user action required.
 */
export function middleware() {
  const response = NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseDomain = supabaseUrl ? new URL(supabaseUrl).hostname : null;

  const connectSrc = supabaseDomain ? `'self' https://${supabaseDomain}` : "'self'";

  const imgSrc = supabaseDomain
    ? `'self' https://lh3.googleusercontent.com https://maps.googleapis.com https://${supabaseDomain}`
    : "'self' https://lh3.googleusercontent.com https://maps.googleapis.com";

  const cspDirectives = [
    `default-src 'self'`,
    `script-src 'self'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src ${imgSrc}`,
    `media-src 'self'`,
    `font-src 'self'`,
    `frame-src https://www.google.com https://maps.google.com https://www.google.com/maps`,
    `connect-src ${connectSrc}`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspDirectives);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (browser icon)
     * - public files (images, videos, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/|logo.png).*)",
  ],
};
