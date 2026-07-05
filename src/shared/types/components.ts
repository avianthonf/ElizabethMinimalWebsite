import type { ReactNode } from "react";

/** Base props applied to every component that accepts className and children. */
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

/** Accessibility-related props shared across components. */
export interface AriaProps {
  ariaLabel?: string;
  ariaHidden?: boolean;
  role?: string;
}

/** Background colour variants available on section-level containers. */
export type BackgroundColor = "paper" | "soft" | "primary" | "ink" | "blue";

/** Text colour variants used by typographic primitives. */
export type TextColor = "ink" | "muted" | "primary" | "paper";

/** Standardised spacing scale. */
export type SpacingScale = "small" | "medium" | "large" | "xlarge";
