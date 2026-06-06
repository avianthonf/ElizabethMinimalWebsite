import type { ReactNode } from "react";

/**
 * Minimal mock replacement for `<HorizontalPage>` used in panel tests.
 *
 * Real panels embed their content inside a `HorizontalPage` wrapper that
 * provides `data-header-theme`, an aria-label, and a fixed-width page
 * container.  This mock replaces all of that with a plain `<div>` so
 * panel tests don't need to pull in the full HorizontalScroll
 * machinery (IntersectionObserver, requestAnimationFrame, sticky
 * positioning, etc.).
 */
export interface MockHorizontalPageProps {
  children: ReactNode;
  screen?: boolean;
  width?: string;
  tabletWidth?: string;
  mobileWidth?: string;
  smallMobileWidth?: string;
  landscapeWidth?: string;
  headerTheme?: "light" | "dark";
  className?: string;
  ariaLabel?: string;
}

export function MockHorizontalPage({
  children,
  headerTheme,
  className,
  ariaLabel,
}: MockHorizontalPageProps) {
  return (
    <div
      data-header-theme={headerTheme}
      className={className}
      aria-label={ariaLabel}
      data-testid="mock-horizontal-page"
    >
      {children}
    </div>
  );
}
