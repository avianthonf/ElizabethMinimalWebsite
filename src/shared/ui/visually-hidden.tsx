import type { ElementType, ReactNode } from "react";
import styles from "./visually-hidden.module.css";

export interface VisuallyHiddenProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Renders content that is visually hidden but available to screen readers.
 *
 * Use for providing additional context to assistive technology users
 * (e.g. instructions, expanded labels) without affecting the visual layout.
 */
export function VisuallyHidden({
  children,
  as: Tag = "span",
  className,
}: VisuallyHiddenProps): ReactNode {
  const composedClassName = [styles.visuallyHidden, className].filter(Boolean).join(" ");

  return <Tag className={composedClassName}>{children}</Tag>;
}
