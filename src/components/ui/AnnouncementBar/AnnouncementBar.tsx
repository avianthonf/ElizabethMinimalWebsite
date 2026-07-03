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
 * SSR-safe: starts as `visible: true` so the server HTML always
 * contains the bar. After hydration, we read `localStorage` to
 * determine if the user dismissed it. If dismissed within the
 * last 7 days, the bar is hidden. Otherwise it is shown.
 *
 * Why not read `localStorage` in `useState` initializer?
 *  - `localStorage` is `undefined` on the server, but a server-rendered
 *    "visible: true" with a client-rendered "visible: false" produces
 *    a React 19 hydration mismatch warning (and a possible content
 *    revert). Using `useEffect` to read the value post-mount keeps
 *    SSR and the first client paint consistent.
 */
export function AnnouncementBar({
  message,
  href,
  linkText,
  storageKey = "stelizabeths-announcement-dismissed",
}: AnnouncementBarProps) {
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hydrate from localStorage on mount. This is a one-time
    // sync from an external store, not a cascading re-render.
    /* eslint-disable react-hooks/set-state-in-effect */
    setHydrated(true);
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (dismissed) {
        const dismissedAt = parseInt(dismissed, 10);
        if (!Number.isNaN(dismissedAt)) {
          const reShowMs = RE_SHOW_DAYS * 24 * 60 * 60 * 1000;
          if (Date.now() - dismissedAt < reShowMs) {
            setVisible(false);
          } else {
            // Re-show after 7 days — clear old timestamp
            localStorage.removeItem(storageKey);
          }
        }
      }
    } catch {
      // localStorage unavailable (e.g. private browsing) — keep visible
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [storageKey]);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // localStorage unavailable — dismissal is still in-memory
    }
  }, [storageKey]);

  // Don't render the bar at all if user dismissed within the last 7 days.
  // Render an empty placeholder on first SSR pass to keep layout stable.
  if (!hydrated) {
    return (
      <div
        className={styles.root}
        role="banner"
        aria-label="Announcement"
        data-hydration-placeholder="true"
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
        </div>
      </div>
    );
  }

  if (!visible) return null;

  return (
    <div className={styles.root} role="banner" aria-label="Announcement">
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
