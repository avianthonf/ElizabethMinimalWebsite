"use client";

import dynamic from "next/dynamic";

interface CampusThenNowLazyProps {
  beforeImage: { filename: string; alt: string; label: string };
  afterImage: { filename: string; alt: string; label: string };
}

/**
 * Lazy-loaded CampusThenNow — react-compare-slider renders browser-specific
 * CSS custom properties (--rcs-*) and calls CSS.registerProperty() which
 * doesn't exist during SSR. Disabling SSR prevents the hydration mismatch.
 */
const CampusThenNow = dynamic(
  () => import("./campus-then-now").then((mod) => ({ default: mod.CampusThenNow })),
  {
    ssr: false,
    loading: () => (
      <section
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)",
          background: "var(--bg-surface-alt, #f4f1ed)",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(32px, 4vw, 48px)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 700,
                color: "var(--p-color-navy-dark, #0f1d35)",
                margin: "0 0 12px",
              }}
            >
              Our Campus — Then &amp; Now
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.0625rem",
                color: "var(--s-color-text-muted, #6b7280)",
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              See how St. Elizabeth&apos;s has grown and evolved over seven decades of educational
              excellence in Pomburpa.
            </p>
          </div>
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              background: "var(--s-color-border-subtle, #e5e7eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--s-color-text-muted, #9ca3af)",
                fontSize: "0.875rem",
              }}
            >
              Loading comparison&hellip;
            </span>
          </div>
        </div>
      </section>
    ),
  },
);

export function CampusThenNowLazy(props: CampusThenNowLazyProps) {
  return <CampusThenNow {...props} />;
}
