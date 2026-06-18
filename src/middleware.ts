import { NextResponse } from "next/server";

/**
 * Middleware that generates a per-request CSP nonce and attaches it
 * as a request header so that the layout can read it and include it
 * in the Content-Security-Policy header.
 *
 * Nonces are base64-encoded random strings generated fresh for each
 * request, making them unpredictable to attackers.
 */
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

export function middleware() {
  const nonce = generateNonce();
  const response = NextResponse.next();

  // Pass nonce to the layout via request headers
  response.headers.set("x-nonce", nonce);

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
