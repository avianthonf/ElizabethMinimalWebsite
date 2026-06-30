import { NextResponse } from "next/server";

/**
 * Middleware that applies Content-Security-Policy headers.
 *
 * Uses a static CSP nonce from NEXT_PUBLIC_CSP_NONCE environment variable.
 * The site is fully static (no user-generated content), so a static nonce
 * is acceptable and enables static generation for all routes.
 */
export function middleware() {
  const nonce = process.env.NEXT_PUBLIC_CSP_NONCE || "";
  const response = NextResponse.next();

  // Build CSP with nonce for scripts, strict policy for everything else
  const cspDirectives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https:`,
    `font-src 'self'`,
    `frame-src https://www.google.com https://maps.google.com https://www.google.com/maps`,
    `connect-src 'self'`,
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
