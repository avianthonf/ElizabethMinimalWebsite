import { NextResponse } from "next/server";

/**
 * Middleware that sets Content-Security-Policy headers.
 *
 * The JSON-LD inline script in the root layout is allowed via a
 * pre-computed SHA-256 hash (the JSON-LD content is static and
 * never changes). This avoids `headers()` in the layout which
 * would force the entire route tree to be dynamically rendered.
 */

// SHA-256 hash of the static JSON-LD structured data in layout.tsx.
// Pre-computed so the CSP allows this inline script without a
// per-request nonce, keeping the layout statically generatable.
const JSON_LD_HASH = "'sha256-PtS4OwKofW45m8Wor4MzEGGOmcYrfYFVgRdUNXam2/Q='";

export function middleware() {
  const response = NextResponse.next();

  // Build CSP with hash for static JSON-LD script
  const cspDirectives = [
    `default-src 'self'`,
    `script-src 'self' ${JSON_LD_HASH}`,
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
