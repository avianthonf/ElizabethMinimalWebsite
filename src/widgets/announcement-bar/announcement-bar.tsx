"use client";

import { useCallback, useSyncExternalStore, useState } from "react";
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

// ── localStorage helpers (used by useSyncExternalStore) ──

function readDismissed(storageKey: string): boolean {
  try {
    const dismissed = localStorage.getItem(storageKey);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      if (!Number.isNaN(dismissedAt)) {
        const reShowMs = RE_SHOW_DAYS * 24 * 60 * 60 * 1000;
        return Date.now() - dismissedAt < reShowMs;
      }
    }
  } catch {
    /* localStorage unavailable */
  }
  return false;
}

/** No-op subscribe — localStorage doesn't change from external sources. */
function subscribe(): () => void {
  return () => {};
}

/**
 * AnnouncementBar — dismissable fixed top banner.
 *
 * SSR-safe: always renders the same DOM tree (including the close button).
 * Uses useSyncExternalStore to read localStorage without hydration mismatch.
 * Server always renders visible; client reads localStorage after hydration.
 *
 * Uses CSS grid auto-height for the bar — no JavaScript measurement needed.
 * The --announcement-height CSS variable is set via the bar's natural height
 * through CSS, avoiding the flicker from ResizeObserver-based measurement.
 */
export function AnnouncementBar({
  message,
  href,
  linkText,
  storageKey = "stelizabeths-announcement-dismissed",
}: AnnouncementBarProps) {
  // useSyncExternalStore: server always returns false (not dismissed → visible).
  // Client reads localStorage. No hydration mismatch because the DOM tree is identical.
  const dismissedFromStore = useSyncExternalStore(
    subscribe,
    () => readDismissed(storageKey),
    () => false,
  );

  // Local override for dismiss action (immediate UI update without re-reading localStorage).
  const [dismissedLocally, setDismissedLocally] = useState(false);

  const visible = !dismissedFromStore && !dismissedLocally;

  const dismiss = useCallback(() => {
    setDismissedLocally(true);
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // localStorage unavailable — dismissal is still in-memory
    }
  }, [storageKey]);

  return (
    <div className={styles.root} role="region" aria-label="Announcement" data-hidden={!visible}>
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
