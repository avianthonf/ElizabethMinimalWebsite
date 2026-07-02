"use client";

import Countdown from "react-countdown";
import styles from "./CountdownTimer.module.css";

interface CountdownTimerProps {
  /** Target date */
  targetDate: Date | string;
  /** Optional label */
  label?: string;
  /** Callback when countdown completes */
  onComplete?: () => void;
  className?: string;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className={styles.unit}>
      <span className={styles.value}>{String(value).padStart(2, "0")}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

/**
 * CountdownTimer — countdown to a target date.
 * Uses react-countdown for rendering.
 *
 * Usage:
 *   <CountdownTimer targetDate="2026-12-01" label="Admission Deadline" />
 */
export function CountdownTimer({ targetDate, label, onComplete, className }: CountdownTimerProps) {
  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {label && <div className={styles.label}>{label}</div>}
      <Countdown
        date={targetDate}
        onComplete={onComplete}
        renderer={({ days, hours, minutes, seconds }) => (
          <div className={styles.grid}>
            <TimeUnit value={days} label="Days" />
            <span className={styles.separator}>:</span>
            <TimeUnit value={hours} label="Hours" />
            <span className={styles.separator}>:</span>
            <TimeUnit value={minutes} label="Minutes" />
            <span className={styles.separator}>:</span>
            <TimeUnit value={seconds} label="Seconds" />
          </div>
        )}
      />
    </div>
  );
}
