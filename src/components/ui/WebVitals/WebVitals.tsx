"use client";

import { useEffect } from "react";
import { reportWebVitals } from "@/lib/performance/web-vitals";

/**
 * WebVitals — reports Core Web Vitals metrics.
 * Add to root layout for performance monitoring.
 */
export function WebVitals() {
  useEffect(() => {
    reportWebVitals();
  }, []);

  return null;
}
