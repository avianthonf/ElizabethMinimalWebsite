import { NextResponse } from "next/server";

/**
 * Content-Security-Policy proxy.
 *
 * Dynamically adds Supabase's project domain to connect-src and img-src
 * when NEXT_PUBLIC_SUPABASE_URL is configured. When not set, the policy
 * is self-only — no user action required.
 *
 * Renamed from middleware.ts → proxy.ts per Next.js 16 conventions.
 */
export function proxy() {
  const response = NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseDomain = supabaseUrl ? new URL(supabaseUrl).hostname : null;

  const connectSrc = supabaseDomain ? `'self' https://${supabaseDomain}` : "'self'";

  const imgSrc = supabaseDomain
    ? `'self' https://lh3.googleusercontent.com https://maps.googleapis.com https://${supabaseDomain}`
    : "'self' https://lh3.googleusercontent.com https://maps.googleapis.com";

  // ── Content-Security-Policy ───────────────────────────────────────
  //
  // Next.js 16 injects inline scripts for hydration, chunk loading, and
  // next-view-transitions.  A strict script-src 'self' blocks these and
  // causes blank pages in production.  The 'unsafe-inline' + hash pattern
  // below allows framework-sourced inline scripts while blocking injected
  // third-party inline scripts.  When Next.js stabilises nonce support for
  // all framework-injected scripts, move to 'nonce-{RANDOM}' 'strict-dynamic'.
  //
  // style-src 'unsafe-inline' is intentionally retained — CSS Modules inject
  // inline <style> blocks during HMR/dev.  In production, extraction removes
  // most of these, but next-view-transitions still injects animation styles.
  //
  // Analytics scripts (GA4 / Vercel Analytics / Speed Insights) are loaded
  // via @next/third-parties and <Script> components, which use next/script
  // proxy injection and are exempt from CSP because they are same-origin
  // before the framework proxies them.  If you add a third-party analytics
  // tag directly, add its CDN host to script-src.
  // ───────────────────────────────────────────────────────────────────

  // Vercel Analytics & Speed Insights use these endpoints for data ingestion
  const vercelAnalyticsDomain = "https://vitals.vercel-insights.com";
  const googleAnalyticsDomains =
    "https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com";

  const cspDirectives = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src ${imgSrc} data: blob:`,
    `media-src 'self'`,
    `font-src 'self' data:`,
    `frame-src https://www.google.com https://maps.google.com https://www.google.com/maps`,
    `connect-src ${connectSrc} ${vercelAnalyticsDomain} ${googleAnalyticsDomains}`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `manifest-src 'self'`,
    `upgrade-insecure-requests`,
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
