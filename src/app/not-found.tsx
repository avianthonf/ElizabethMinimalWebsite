"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  useEffect(() => {
    // Track 404 page views
    if (typeof window !== "undefined") {
      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.warn("[404] Page not found:", window.location.pathname);
      }

      // Send to analytics if available
      if (window.gtag) {
        window.gtag("event", "page_not_found", {
          page_path: window.location.pathname,
          page_referrer: document.referrer || "(direct)",
        });
      }

      // Send to Web Analytics if available
      if (window.va) {
        window.va("event", {
          name: "404_error",
          data: {
            path: window.location.pathname,
            referrer: document.referrer || "(direct)",
          },
        });
      }
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <h1 className={styles.heading}>Page Not Found</h1>
      <p className={styles.description}>
        The page you are looking for does not exist or has been moved. Please check the URL or
        return to the homepage.
      </p>
      <Link href="/" className={styles.homeLink}>
        Go to Homepage
      </Link>
    </div>
  );
}
