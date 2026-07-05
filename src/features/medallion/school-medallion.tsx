"use client";

import dynamic from "next/dynamic";

// R3F + full Three.js stack — ~180KB. Only loaded client-side on demand.
const MedallionCanvas = dynamic(
  () => import("./medallion-canvas").then((mod) => ({ default: mod.MedallionCanvas })),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          aspectRatio: "1/1",
          maxWidth: 400,
          margin: "0 auto",
          background: "var(--s-color-surface,#f8f8f8)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--p-color-gold,#D4AF37) 0%, var(--p-color-navy,#1B2A4A) 70%)",
            opacity: 0.6,
          }}
        />
      </div>
    ),
  },
);

interface SchoolMedallionProps {
  /** Container class — defaults to responsive square with max-width */
  className?: string;
  /** ARIA label for the medallion (3D content is decorative) */
  ariaLabel?: string;
}

/**
 * Lazy-loaded 3D school medallion.
 *
 * Renders a rotating geometric composition in school colors (navy + gold)
 * using React Three Fiber.  The canvas itself is a client-only component
 * with an SSR placeholder (gradient circle) to prevent layout shift.
 *
 * All 3D content is marked `aria-hidden` — it's decorative only.
 * Text alternatives should be provided via surrounding headings.
 */
export function SchoolMedallion({ className, ariaLabel = "School emblem" }: SchoolMedallionProps) {
  return (
    <div className={className} aria-label={ariaLabel}>
      <MedallionCanvas />
    </div>
  );
}
