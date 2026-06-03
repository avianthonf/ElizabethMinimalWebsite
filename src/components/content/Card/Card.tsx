import type { ReactNode } from "react";
import styles from "./Card.module.css";

export type CardVariant = "default" | "value" | "icon" | "image";
export type CardPadding = "small" | "medium" | "large";

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  border?: boolean;
  className?: string;
  ariaLabel?: string;
}

const padClass: Record<CardPadding, string> = {
  small: styles.padSmall,
  medium: styles.padMedium,
  large: styles.padLarge,
};

export function Card({
  children,
  variant = "default",
  padding = "medium",
  border = true,
  className,
  ariaLabel,
}: CardProps): ReactNode {
  const composedClassName = [
    styles.card,
    styles[variant],
    padClass[padding],
    !border && styles.noBorder,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={composedClassName} aria-label={ariaLabel}>
      {children}
    </article>
  );
}
