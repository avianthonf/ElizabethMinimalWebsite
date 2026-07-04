import { NextResponse } from "next/server";

/**
 * Middleware that applies Content-Security-Policy headers.
 *
 * This is a fully static site (no user-generated content, no Server Actions
 * that return HTML).  We use `script-src 'self'` — no nonce, no
 * `'strict-dynamic'` — because every script tag points at a same-origin
 * `/_next/static/…` bundle.  A nonce would require dynamic rendering and
 * a `NEXT_PUBLIC_`-prefixed nonce would be shipped in the client bundle,
 * completely nullifying its value.
 *
 * JSON-LD structured data (`<script type="application/ld+json">`) is
 * NOT subject to `script-src` — it is a data block, not executable
 * JavaScript — so it passes without any nonce or hash.
 */
export function middleware() {
  const response = NextResponse.next();

  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    "frame-src https://www.google.com https://maps.google.com https://www.google.com/maps",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
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
