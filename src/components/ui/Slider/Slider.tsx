"use client";

import { useState, useRef } from "react";
import styles from "./Slider.module.css";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Slider — range slider input.
 * Custom styled range input with value display.
 *
 * Usage:
 *   <Slider value={50} onChange={setValue} min={0} max={100} />
 */
export function Slider({
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  className,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <label className={styles.label}>{label}</label>}
          {showValue && <span className={styles.value}>{value}</span>}
        </div>
      )}
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percentage}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          disabled={disabled}
          className={styles.input}
        />
      </div>
    </div>
  );
}
