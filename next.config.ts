import type { NextConfig } from "next";

/* ── Next.js 16 native bundle analysis ─────────────────
   Run: npx next experimental-analyze
   Opens Turbopack's built-in interactive treemap.
   The @next/bundle-analyzer plugin is no longer needed —
   Next.js 16.1+ ships a native analyzer for Turbopack.
*/

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "100kb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    qualities: [75, 85, 90, 95],
    remotePatterns: [
      { protocol: "https", hostname: "maps.google.com" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async headers() {
    return [
      // ── Security headers (all routes) ──────────────────────────────
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), clipboard-write=(), display-capture=(), payment=(), browsing-topics=(), accelerometer=(), gyroscope=()",
          },
        ],
      },

      // ── Caching: public content pages ──────────────────────────────
      // s-maxage=60: CDN caches for 1 minute (ISR handles stale invalidation)
      // stale-while-revalidate=86400: serve stale while refreshing for 24h
      // CDN-Cache-Control: Vercel edge-specific override for better SWR
      {
        source: "/((?!admin|api|_next).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, stale-while-revalidate=86400, must-revalidate",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=86400",
          },
        ],
      },

      // ── Caching: admin & API routes — never cache ──────────────────
      {
        source: "/admin/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },

      // ── Caching: static assets (immutable fingerprints) ────────────
      // Next.js sets this automatically for /_next/static, but only on
      // warm responses. Adding it explicitly ensures cold-start consistency.
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ── Caching: public assets (fonts, images, robots, sitemap) ────
      {
        source: "/public/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
