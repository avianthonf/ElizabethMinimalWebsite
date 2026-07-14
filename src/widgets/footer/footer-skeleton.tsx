/**
 * FooterSkeleton — same approximate height as the real Footer
 * to prevent layout shift during streaming.
 */
export function FooterSkeleton() {
  return (
    <footer
      aria-label="Footer loading"
      style={{
        minHeight: "320px",
        background: "var(--p-color-navy, #1B2A4A)",
      }}
    />
  );
}
