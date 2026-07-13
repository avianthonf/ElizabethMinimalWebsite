"use client";

import { useState, useCallback, useRef, useLayoutEffect } from "react";
import { X } from "lucide-react";
import styles from "./announcement-bar.module.css";

interface AnnouncementBarProps {
  message: string;
  href?: string;
  linkText?: string;
  /** Storage key for persisting dismiss. */
  storageKey?: string;
}

const RE_SHOW_DAYS = 7;

/**
 * AnnouncementBar — dismissable fixed top banner.
 *
 * SSR-safe: always renders the same DOM tree (including the close button).
 * After hydration, reads `localStorage` to determine if the user dismissed
 * it. If dismissed within the last 7 days, the bar is hidden via
 * `data-hidden` attribute and `display: none`.
 *
 * Sets `--announcement-height` on `<html>` so the fixed header and reading
 * progress bar can offset themselves. Uses a ResizeObserver to measure the
 * bar's actual height — this stays accurate across viewport resizes and
 * text wrapping changes.
 */
export function AnnouncementBar({
  message,
  href,
  linkText,
  storageKey = "stelizabeths-announcement-dismissed",
}: AnnouncementBarProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (dismissed) {
        const dismissedAt = parseInt(dismissed, 10);
        if (!Number.isNaN(dismissedAt)) {
          const reShowMs = RE_SHOW_DAYS * 24 * 60 * 60 * 1000;
          if (Date.now() - dismissedAt < reShowMs) {
            return false;
          }
          localStorage.removeItem(storageKey);
        }
      }
    } catch {
      /* localStorage unavailable */
    }
    return true;
  });
  const barRef = useRef<HTMLDivElement>(null);

  // ── Measure bar height and broadcast to CSS custom property ──
  //
  // useLayoutEffect for the initial measurement: runs synchronously
  // before the browser paints, guaranteeing --announcement-height is
  // set by the time the header and progress bar compute their layout.
  // ResizeObserver handles subsequent size changes.

  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const measure = () => {
      document.documentElement.style.setProperty(
        "--announcement-height",
        visible ? `${el.offsetHeight}px` : "0px",
      );
    };

    // Synchronous initial measurement — no flash
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--announcement-height");
    };
  }, [visible]);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // localStorage unavailable — dismissal is still in-memory
    }
  }, [storageKey]);

  return (
    <div
      ref={barRef}
      className={styles.root}
      role="region"
      aria-label="Announcement"
      data-hidden={!visible}
    >
      <div className={styles.inner}>
        <p className={styles.message}>
          {message}
          {href && linkText && (
            <>
              {" — "}
              <a href={href} className={styles.link}>
                {linkText} <span aria-hidden="true">→</span>
              </a>
            </>
          )}
        </p>
        <button
          type="button"
          className={styles.close}
          onClick={dismiss}
          aria-label="Dismiss announcement"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
