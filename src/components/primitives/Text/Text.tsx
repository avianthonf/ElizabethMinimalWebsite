import type { ReactNode } from "react";
import styles from "./Text.module.css";

export type TextVariant = "body" | "eyebrow" | "caption" | "muted";
export type TextSize = "small" | "medium" | "large";

export interface TextProps {
  variant?: TextVariant;
  size?: TextSize;
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}

const sizeClass: Record<TextSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

export function Text({
  variant = "body",
  size = "medium",
  children,
  className,
  as: Tag = "p",
}: TextProps): ReactNode {
  const composedClassName = [styles.text, styles[variant], sizeClass[size], className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={composedClassName}>{children}</Tag>;
}
