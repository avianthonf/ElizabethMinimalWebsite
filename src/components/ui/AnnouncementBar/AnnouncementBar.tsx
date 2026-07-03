"use client";

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import styles from "./AnnouncementBar.module.css";

interface AnnouncementBarProps {
  message: string;
  href?: string;
  linkText?: string;
  /** Storage key for persisting dismiss. */
  storageKey?: string;
}

const RE_SHOW_DAYS = 7;

/**
 * AnnouncementBar — dismissable top banner.
 *
 * SSR-safe: always renders the same DOM tree (including the close button).
 * After hydration, reads `localStorage` to determine if the user dismissed
 * it. If dismissed within the last 7 days, the bar is hidden via
 * `data-hidden` attribute. On first render (pre-hydration), the bar is
 * always visible and the close button is hidden via CSS.
 *
 * This avoids the hydration mismatch that occurs when the server renders
 * a different DOM tree than the client (e.g. missing close button on SSR
 * vs present on hydration).
 */
export function AnnouncementBar({
  message,
  href,
  linkText,
  storageKey = "stelizabeths-announcement-dismissed",
}: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (dismissed) {
        const dismissedAt = parseInt(dismissed, 10);
        if (!Number.isNaN(dismissedAt)) {
          const reShowMs = RE_SHOW_DAYS * 24 * 60 * 60 * 1000;
          if (Date.now() - dismissedAt < reShowMs) {
            setVisible(false);
          } else {
            localStorage.removeItem(storageKey);
          }
        }
      }
    } catch {
      // localStorage unavailable — keep visible
    }
  }, [storageKey]);

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
      className={styles.root}
      role="banner"
      aria-label="Announcement"
      data-hidden={!visible}
      style={!visible ? { display: "none" } : undefined}
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
