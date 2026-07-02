"use client";

import { forwardRef } from "react";
import styles from "./Separator.module.css";

interface SeparatorProps {
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Visual style */
  variant?: "solid" | "dashed" | "dotted";
  /** Spacing */
  spacing?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Separator — styled divider line.
 *
 * Usage:
 *   <Separator />
 *   <Separator orientation="vertical" />
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = "horizontal", variant = "solid", spacing = "md", className },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`${styles.separator} ${styles[orientation]} ${styles[variant]} ${styles[spacing]} ${className ?? ""}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
});
