"use client";

import type { ReactNode, MouseEvent } from "react";
import { ConditionalLink } from "@/components/primitives/ConditionalLink/ConditionalLink";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const sizeClass: Record<ButtonSize, string> = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

export function Button({
  children,
  variant = "primary",
  size = "medium",
  href,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  icon,
  iconPosition = "left",
}: ButtonProps): ReactNode {
  const composedClassName = [
    styles.button,
    styles[variant],
    sizeClass[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
    </>
  );

  return (
    <ConditionalLink
      href={href}
      className={composedClassName}
      as="button"
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </ConditionalLink>
  );
}
