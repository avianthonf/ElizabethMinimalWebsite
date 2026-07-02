import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names conditionally using clsx.
 * Drop-in replacement for cn() from shadcn/ui projects.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Generate a tiny 1×1 SVG data URI for use as a next/image blur placeholder.
 *
 * Uses a solid background colour (default: our warm cream surface) so the
 * image slot shows a matching tint while the real image loads.
 *
 * @param bgColor - CSS colour string, e.g. "#f4f1ed"
 * @returns A base64-encoded data URI suitable for `blurDataURL`
 */
export function blurPlaceholderSvg(bgColor = "#f4f1ed"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="${bgColor}"/></svg>`;
  return `data:image/svg+xml;base64,${typeof btoa === "function" ? btoa(svg) : Buffer.from(svg).toString("base64")}`;
}
