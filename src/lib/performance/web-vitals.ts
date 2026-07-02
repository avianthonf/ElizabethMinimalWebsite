/**
 * Web Vitals performance monitoring.
 * Uses web-vitals to report Core Web Vitals metrics.
 *
 * Add to root layout:
 *   import { reportWebVitals } from "@/lib/performance/web-vitals";
 *   // In root layout or _app:
 *   if (typeof window !== "undefined") {
 *     reportWebVitals();
 *   }
 */
import type { Metric } from "web-vitals";

function sendToAnalytics(metric: Metric) {
  // In production, send to your analytics endpoint
  if (process.env.NODE_ENV === "production") {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });

    // Use sendBeacon for non-blocking analytics
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/vitals", body);
    } else {
      fetch("/api/vitals", { body, method: "POST", keepalive: true });
    }
  } else {
    // Development: log to console
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
}

export function reportWebVitals() {
  if (typeof window === "undefined") return;

  import("web-vitals").then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  });
}
