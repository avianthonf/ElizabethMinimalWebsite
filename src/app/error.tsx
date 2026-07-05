"use client";

import { useEffect } from "react";
import { Link } from "next-view-transitions";
import { ErrorIllustration } from "@/features/error-illustration";
import styles from "./(site)/site-error.module.css";

/** Error boundary for the root route (/ homepage). Renders inside the root layout. */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root route error:", error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <ErrorIllustration />
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
