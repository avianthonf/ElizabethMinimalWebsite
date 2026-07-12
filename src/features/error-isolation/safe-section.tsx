"use client";

import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";

interface SectionErrorFallbackProps {
  resetErrorBoundary: () => void;
  label?: string;
}

function SectionErrorFallback({
  resetErrorBoundary,
  label = "section",
}: SectionErrorFallbackProps) {
  return (
    <div
      role="alert"
      style={{
        padding: "var(--space-medium, 24px)",
        margin: "var(--space-small, 12px) 0",
        background: "var(--color-surface-paper, #fff9f0)",
        border: "1px solid var(--color-accent-gold, #c9a96e)",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <p style={{ fontFamily: "var(--font-serif)", margin: "0 0 8px" }}>
        This {label} couldn&apos;t be loaded right now.
      </p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        style={{
          padding: "8px 16px",
          background: "var(--color-primary-navy, #1B2A4A)",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "0.875rem",
        }}
      >
        Retry
      </button>
    </div>
  );
}

interface SafeSectionProps {
  children: ReactNode;
  /** Accessible label for error messaging, e.g. "contact form" */
  label?: string;
}

/**
 * SafeSection — wraps any feature block in a react-error-boundary
 * so a failure in one section doesn't crash the entire page.
 *
 * Use for isolated feature components like forms, maps, calendars, etc.
 *
 * @example
 * <SafeSection label="contact form">
 *   <ContactForm />
 * </SafeSection>
 */
export function SafeSection({ children, label }: SafeSectionProps) {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        if (process.env.NODE_ENV === "development") {
          console.error(`SafeSection (${label || "unknown"}) error:`, error);
        }
        return <SectionErrorFallback resetErrorBoundary={resetErrorBoundary} label={label} />;
      }}
      onError={() => {}}
    >
      {children}
    </ErrorBoundary>
  );
}
