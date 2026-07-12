import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware that applies Content-Security-Policy headers.
 *
 * CSP allows `connect-src` and `img-src` to the Supabase project domain
 * when configured — this enables the admin CMS and dynamic content fetching.
 * When the Supabase URL env var is not set, the default CSP (self-only)
 * remains in effect with no change in behavior.
 *
 * Admin routes (/admin/*) are protected by server-side auth checks in
 * the admin layout group — this middleware only handles CSP, not auth.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(_request: NextRequest) {
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
