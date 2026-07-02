"use client";

import { forwardRef } from "react";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  /** Selected date */
  value?: Date;
  /** Date change handler */
  onChange?: (date: Date) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Minimum date */
  minDate?: Date;
  /** Maximum date */
  maxDate?: Date;
  /** Label */
  label?: string;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
}

/**
 * DatePicker — styled date input.
 * Uses native HTML date input with consistent styling.
 *
 * Usage:
 *   <DatePicker value={date} onChange={setDate} label="Event Date" />
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    value,
    onChange,
    placeholder = "Select date",
    minDate,
    maxDate,
    label,
    error,
    disabled,
    className,
  },
  ref,
) {
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        ref={ref}
        type="date"
        value={value ? formatDate(value) : ""}
        onChange={(e) => {
          if (e.target.value) {
            onChange?.(new Date(e.target.value));
          }
        }}
        placeholder={placeholder}
        min={minDate ? formatDate(minDate) : undefined}
        max={maxDate ? formatDate(maxDate) : undefined}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
});
