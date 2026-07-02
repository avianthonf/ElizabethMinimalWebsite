"use client";

import { useState } from "react";
import styles from "./Switch.module.css";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Switch — toggle switch input.
 * Accessible toggle with keyboard support.
 *
 * Usage:
 *   <Switch checked={enabled} onChange={setEnabled} label="Enable notifications" />
 */
export function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  className,
}: SwitchProps) {
  return (
    <label className={`${styles.wrapper} ${className ?? ""}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`${styles.track} ${checked ? styles.checked : ""}`}
        onClick={() => onChange?.(!checked)}
      >
        <span className={styles.thumb} />
      </button>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
