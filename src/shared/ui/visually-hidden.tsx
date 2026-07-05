import type { ReactNode } from "react";
import styles from "./visually-hidden.module.css";

export interface VisuallyHiddenProps {
  children: ReactNode;
  className?: string;
}

/**
 * Renders content that is visually hidden but available to screen readers.
 *
 * Use for providing additional context to assistive technology users
 * (e.g. instructions, expanded labels) without affecting the visual layout.
 *
 * Always renders as a <span> — if a different element is needed, wrap the
 * content and apply VisuallyHidden as a className manually.
 */
export function VisuallyHidden({ children, className }: VisuallyHiddenProps) {
  const composedClassName = [styles.visuallyHidden, className].filter(Boolean).join(" ");

  return <span className={composedClassName}>{children}</span>;
}
