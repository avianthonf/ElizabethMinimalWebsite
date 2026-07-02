"use client";

import { type ReactNode } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  /** Image source */
  src?: string;
  /** Alt text */
  alt: string;
  /** Size in pixels */
  size?: number;
  /** Fallback content (initials) */
  fallback?: string;
  /** Fallback color */
  fallbackColor?: string;
  className?: string;
}

/**
 * Avatar — user avatar with fallback initials.
 * Shows initials when no image is available.
 *
 * Usage:
 *   <Avatar src="/images/teacher.jpg" alt="Mrs. Silva" fallback="MS" />
 */
export function Avatar({
  src,
  alt,
  size = 40,
  fallback,
  fallbackColor = "var(--s-color-primary, #0c217c)",
  className,
}: AvatarProps) {
  const initials =
    fallback ??
    alt
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  if (!src) {
    return (
      <div
        className={`${styles.fallback} ${className ?? ""}`}
        style={{ width: size, height: size, background: fallbackColor }}
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`${styles.image} ${className ?? ""}`}
      style={{ width: size, height: size }}
    />
  );
}
