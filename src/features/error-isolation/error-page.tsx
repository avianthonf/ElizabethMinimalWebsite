"use client";

import { useEffect } from "react";
import { Link } from "next-view-transitions";
import { ErrorIllustration } from "@/features/error-illustration";
import styles from "./error-page.module.css";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Shared error boundary UI. Used by both root and site error pages. */
export function ErrorPage({ error, reset, label = "Site" }: ErrorPageProps & { label?: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(`[${label}] error:`, error);
    }
  }, [error, label]);

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
