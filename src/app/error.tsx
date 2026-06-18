"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

/** Global error boundary for the application. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>Something went wrong</h1>
          <p className={styles.description}>
            We apologize for the inconvenience. Please try again or contact us if the problem
            persists.
          </p>
          <button onClick={reset} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
