import type { ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeVariant = "number" | "status" | "label";
export type BadgeColor = "primary" | "ink" | "muted";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  className?: string;
}

export function Badge({
  children,
  variant = "number",
  color = "primary",
  className,
}: BadgeProps): ReactNode {
  const composedClassName = [styles.badge, styles[variant], styles[color], className]
    .filter(Boolean)
    .join(" ");

  return <span className={composedClassName}>{children}</span>;
}
