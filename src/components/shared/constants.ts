/** Pixel-width breakpoints used by media queries across components. */
export const BREAKPOINTS = {
  smallMobile: 420,
  mobile: 760,
  tablet: 1100,
  landscape: { maxHeight: 520, orientation: "landscape" as const },
} as const;

/**
 * Fluid spacing scale.
 * Each token uses clamp() so values grow with the viewport while staying
 * within the min/max bounds defined in the design system.
 */
export const SPACING = {
  small: "clamp(0.5rem, 2vw, 1rem)",
  medium: "clamp(1rem, 3vw, 2rem)",
  large: "clamp(2rem, 5vw, 4rem)",
  xlarge: "clamp(3rem, 7vw, 6rem)",
} as const;

/** Fluid typography scale matching the existing homepage design. */
export const FONT_SIZE = {
  /** Hero heading: 62.72–156.8px */
  h1: "clamp(3.92rem, 11.9vw, 9.8rem)",
  /** Section heading: 34.4–120px */
  h2: "clamp(2.15rem, 7vw, 7.5rem)",
  /** Card / sub-section heading: 16–21.6px */
  h3: "clamp(1rem, 1.4vw, 1.35rem)",
  /** Body text: 15.04–21.6px */
  body: "clamp(0.94rem, 1.6vw, 1.35rem)",
  /** Eyebrow label: fixed 12.48px */
  eyebrow: "0.78rem",
  /** Caption / small text: 11.2–16.24px */
  caption: "clamp(0.7rem, 1.015vw, 1.015rem)",
} as const;

/** Convenience media-query template strings. */
export const MEDIA = {
  tablet: `@media (max-width: ${BREAKPOINTS.tablet}px)`,
  mobile: `@media (max-width: ${BREAKPOINTS.mobile}px)`,
  smallMobile: `@media (max-width: ${BREAKPOINTS.smallMobile}px)`,
  landscape: `@media (max-height: ${BREAKPOINTS.landscape.maxHeight}px) and (orientation: ${BREAKPOINTS.landscape.orientation})`,
} as const;
