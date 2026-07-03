"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./site-error.module.css";

/** Error boundary for inner pages ( Site route group ). */
export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Site error:", error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Something went wrong</h1>
      <p className={styles.description}>
        We encountered an error loading this page. Please try again or go back to the homepage.
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={reset} className={styles.retryButton}>
          Try Again
        </button>
        <Link href="/" className={styles.homeLink}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
