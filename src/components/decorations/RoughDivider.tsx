"use client";

import { useEffect, useRef, type ReactNode } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import styles from "./RoughDivider.module.css";

export interface RoughDividerProps {
  /** Stroke color. Defaults to currentColor. */
  color?: string;
  /** Roughness (0 = smooth, 1 = very rough). Default 1.5 */
  roughness?: number;
  /** Stroke width. Default 1.5 */
  strokeWidth?: number;
  /** Height of the divider SVG in px. Default 40 */
  height?: number;
  /** Variant: 'wave' draws a wavy line, 'zigzag' draws a zigzag */
  variant?: "wave" | "zigzag";
  /** Extra className */
  className?: string;
}

/**
 * RoughDivider — a decorative wavy/zigzag section divider using rough.js.
 *
 * Renders a full-width SVG with a single hand-drawn path.
 * Recalculates on resize to fill available width.
 *
 * Accessibility:
 *   - Decorative only — aria-hidden, role="presentation"
 *   - Respects prefers-reduced-motion by using simpler strokes
 */
export function RoughDivider({
  color,
  roughness = 1.5,
  strokeWidth = 1.5,
  height = 40,
  variant = "wave",
  className,
}: RoughDividerProps): ReactNode {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mq.matches;

    const draw = (width: number) => {
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const rc = rough.svg(svg);
      const midY = height / 2;

      // Create a wavy path across the full width
      const points: [number, number][] = [];
      const segments = Math.max(4, Math.floor(width / 60));
      const step = width / segments;

      for (let i = 0; i <= segments; i++) {
        const x = i * step;
        const wave =
          variant === "wave"
            ? Math.sin((i / segments) * Math.PI * 3) * (height * 0.3)
            : (i % 2 === 0 ? -1 : 1) * (height * 0.3);
        points.push([x, midY + wave]);
      }

      const node = rc.linearPath(points, {
        roughness: reducedMotion ? 0.3 : roughness,
        strokeWidth,
        stroke: color || "currentColor",
        bowing: reducedMotion ? 0.5 : 1.5,
      });
      svg.appendChild(node);
    };

    const parent = svg.parentElement;
    const width = parent?.getBoundingClientRect().width || 800;
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    draw(width);

    let frameId: number;
    const observer = new ResizeObserver((entries) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const entry = entries[0];
        if (!entry) return;
        const w = entry.contentRect.width;
        svg.setAttribute("width", String(w));
        draw(w);
      });
    });

    if (parent) {
      observer.observe(parent);
    }

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [color, roughness, strokeWidth, height, variant]);

  return (
    <div className={`${styles.dividerContainer} ${className ?? ""}`}>
      <svg
        ref={svgRef}
        className={styles.divider}
        aria-hidden="true"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
}
