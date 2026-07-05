"use client";

import { Suspense, lazy, useState } from "react";
import type { Application } from "@splinetool/runtime";
import styles from "./hero-spline-scene.module.css";

const Spline = lazy(() =>
  import("@splinetool/react-spline").then((mod) => ({ default: mod.default })),
);

export interface HeroSplineSceneProps {
  /** URL to the Spline scene (.splinecode file) */
  sceneUrl: string;
  /** Optional callback when the Spline scene loads */
  onLoad?: (spline: Application) => void;
}

/**
 * HeroSplineScene — renders an interactive 3D Spline scene behind the hero overlay.
 *
 * Lazy-loaded via React.lazy to avoid blocking initial page render.
 * If the scene fails to load, it silently falls back to nothing (the CSS
 * gradient overlay in the parent provides the visual fallback).
 *
 * Respects prefers-reduced-motion by disabling the scene entirely on
 * devices that prefer reduced motion.
 */
export function HeroSplineScene({ sceneUrl, onLoad }: HeroSplineSceneProps) {
  const [errored, setErrored] = useState(false);

  // Check for reduced-motion preference
  if (typeof window !== "undefined") {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return null;
  }

  if (errored) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <Suspense fallback={null}>
        <Spline
          scene={sceneUrl}
          className={styles.canvas}
          onLoad={(splineApp) => {
            // Set initial zoom for a subtle entrance
            splineApp.setZoom(0.8);
            onLoad?.(splineApp);
          }}
          onError={() => {
            setErrored(true);
          }}
        />
      </Suspense>
    </div>
  );
}
