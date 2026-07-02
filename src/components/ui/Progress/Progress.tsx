"use client";

import styles from "./Progress.module.css";

interface ProgressProps {
  /** Current value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Visual variant */
  variant?: "default" | "success" | "warning" | "error";
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Show label */
  showLabel?: boolean;
  className?: string;
}

/**
 * Progress — accessible progress bar.
 * Uses CSS animations for smooth transitions.
 *
 * Usage:
 *   <Progress value={75} showLabel />
 */
export function Progress({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {showLabel && (
        <div className={styles.label}>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`${styles.track} ${styles[size]}`}>
        <div
          className={`${styles.fill} ${styles[variant]}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
