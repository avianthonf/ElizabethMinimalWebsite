"use client";

import styles from "./error-illustration.module.css";

/**
 * ErrorIllustration — a CSS-animated education-themed error graphic.
 *
 * Renders a floating book with animated pages. Pure CSS — no external
 * Lottie dependency needed. Renders as two decorative SVG elements:
 * a book silhouette and floating page shapes that animate in.
 *
 * Hidden from screen readers via aria-hidden.
 */
export function ErrorIllustration() {
  return (
    <div className={styles.root} aria-hidden="true">
      {/* Book spine */}
      <svg
        className={styles.book}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="20" y="20" width="80" height="80" rx="4" fill="#0f1d35" opacity="0.12" />
        <line x1="60" y1="20" x2="60" y2="100" stroke="#0f1d35" strokeWidth="2" opacity="0.3" />
        <rect x="20" y="20" width="40" height="80" rx="4" fill="#c9a96e" opacity="0.15" />
        {/* Decorative lines (text rows) */}
        <line
          x1="28"
          y1="38"
          x2="52"
          y2="38"
          stroke="#0f1d35"
          strokeWidth="2"
          opacity="0.15"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="48"
          x2="48"
          y2="48"
          stroke="#0f1d35"
          strokeWidth="2"
          opacity="0.12"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="56"
          x2="50"
          y2="56"
          stroke="#0f1d35"
          strokeWidth="2"
          opacity="0.12"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="64"
          x2="44"
          y2="64"
          stroke="#0f1d35"
          strokeWidth="2"
          opacity="0.1"
          strokeLinecap="round"
        />
        {/* Left page */}
        <rect
          x="64"
          y="28"
          width="32"
          height="64"
          rx="2"
          fill="#0f1d35"
          opacity="0.08"
          className={styles.pageLeft}
        />
        <line
          x1="70"
          y1="40"
          x2="90"
          y2="40"
          stroke="#0f1d35"
          strokeWidth="1.5"
          opacity="0.12"
          strokeLinecap="round"
          className={styles.pageLeft}
        />
        <line
          x1="70"
          y1="48"
          x2="86"
          y2="48"
          stroke="#0f1d35"
          strokeWidth="1.5"
          opacity="0.1"
          strokeLinecap="round"
          className={styles.pageLeft}
        />
        <line
          x1="70"
          y1="56"
          x2="88"
          y2="56"
          stroke="#0f1d35"
          strokeWidth="1.5"
          opacity="0.1"
          strokeLinecap="round"
          className={styles.pageLeft}
        />
      </svg>
    </div>
  );
}
