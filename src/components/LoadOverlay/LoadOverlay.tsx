"use client";

import { useId, useEffect, useRef, useState, type AnimationEvent, type ReactNode } from "react";
import styles from "./LoadOverlay.module.css";

const LOAD_MESSAGE = "WE BELIEVE";

/* ── Gap target configuration ──
   "WE BELIEVE": W=0 E=1 ' '=2 B=3 E=4 L=5 I=6 E=7 V=8 E=9
   Offsets are fractions of the character's bbox — tuned for Impact/Haettenschweiler. */
const GAP_TARGET = {
  charIndex: 3, // first B in BELIEVE — upper counter
  ox: 0.55,     // horizontal offset within char (0.55 = just right of vertical center)
  oy: 0.28,     // vertical offset within char (0.28 = upper third)
  cw: 0.35,     // counter width as fraction of char width
  ch: 0.30,     // counter height as fraction of char height
} as const;

export interface LoadOverlayProps {
  /** Called when the fade-out animation completes. Parent can use this to show Header etc. */
  onComplete?: () => void;
}

export function LoadOverlay({ onComplete }: LoadOverlayProps): ReactNode {
  const maskId = useId();
  const [isVisible, setIsVisible] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  /* Measure the target gap after fonts load and pin transform-origin to its
     exact screen position.  Scaling the entire SVG element (not just mask
     content) creates a true dolly-zoom through the chosen counter/hole. */
  useEffect(() => {
    const svg = svgRef.current;
    const text = textRef.current;
    if (!svg || !text) return;

    function measureAndApply() {
      // Letter counter — measured relative to the character's bounding box
      const extent = text!.getExtentOfChar(GAP_TARGET.charIndex);
      const gapCx = extent.x + extent.width * GAP_TARGET.ox;
      const gapCy = extent.y + extent.height * GAP_TARGET.oy;
      const gapW = extent.width * GAP_TARGET.cw;
      const gapH = extent.height * GAP_TARGET.ch;

      // ViewBox → viewport coordinates (xMidYMid slice)
      const vW = svg!.clientWidth;
      const vH = svg!.clientHeight;
      const s = Math.max(vW / 100, vH / 100);
      const offsetX = (vW - 100 * s) / 2;
      const offsetY = (vH - 100 * s) / 2;

      const screenX = gapCx * s + offsetX;
      const screenY = gapCy * s + offsetY;
      const pctX = (screenX / vW) * 100;
      const pctY = (screenY / vH) * 100;

      // Scale factor so the gap fills the viewport (+10 % overshoot for safety)
      const gapScreenW = gapW * s;
      const gapScreenH = gapH * s;
      const scaleFactor = Math.max(vW / gapScreenW, vH / gapScreenH);

      svg!.style.transformOrigin = `${pctX}% ${pctY}%`;
      svg!.style.setProperty("--expand-scale", String(Math.ceil(scaleFactor * 4)));
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(measureAndApply);
    } else {
      measureAndApply();
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target && event.animationName.includes("revealOverlay")) {
      setIsVisible(false);
      onComplete?.();
    }
  };

  return (
    <div
      className={styles.overlay}
      aria-label="Homepage load overlay"
      aria-live="polite"
      onAnimationEnd={handleAnimationEnd}
    >
      {/* Phase 1 & 2: Heritage text on dark background */}
      <div className={styles.heritageContainer} aria-hidden="true">
        <p className={styles.heritageMotto}>Truth and Honesty</p>
        <p className={styles.heritageYear}>Est. 1949</p>
      </div>

      {/* Phase 3: SVG mask — entire element scales to zoom through the target gap */}
      <svg
        ref={svgRef}
        className={styles.maskStage}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <rect width="100" height="100" fill="white" />
            <text
              ref={textRef}
              className={styles.maskText}
              x="50"
              y="50"
              dominantBaseline="middle"
              textAnchor="middle"
              vectorEffect="non-scaling-stroke"
            >
              {LOAD_MESSAGE}
            </text>
          </mask>
        </defs>
        <rect width="100" height="100" fill="white" mask={`url(#${maskId})`} />
      </svg>

      <span className={styles.screenReaderText}>{LOAD_MESSAGE}</span>
    </div>
  );
}
