import type { ReactNode } from "react";
import styles from "./Icon.module.css";

export type IconSize = "small" | "medium" | "large" | "xlarge";

export interface IconProps {
  children: ReactNode;
  size?: IconSize;
  color?: string;
  className?: string;
  ariaLabel?: string;
  decorative?: boolean;
}

const sizeClass: Record<IconSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
  xlarge: styles.sizeXlarge,
};

export function Icon({
  children,
  size = "medium",
  color,
  className,
  ariaLabel,
  decorative = false,
}: IconProps): ReactNode {
  const composedClassName = [styles.icon, sizeClass[size], className]
    .filter(Boolean)
    .join(" ");

  const style = color ? { color: `var(${color}, ${color})` } : undefined;

  return (
    <span
      className={composedClassName}
      style={style}
      aria-label={ariaLabel}
      aria-hidden={decorative || undefined}
      role={decorative ? "presentation" : undefined}
    >
      {children}
    </span>
  );
}
