"use client";

import { useEffect, useRef, type ReactNode } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import styles from "./RoughBorder.module.css";

export interface RoughBorderProps {
  children: ReactNode;
  /** Stroke color for the hand-drawn border. Defaults to currentColor. */
  color?: string;
  /** Roughness of the hand-drawn effect (0 = smooth, 1 = very rough). Default 1.2 */
  roughness?: number;
  /** Stroke width. Default 1.5 */
  strokeWidth?: number;
  /** Fill style — 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'dashed' | 'zigzag-line'. Default undefined (no fill) */
  fill?: string;
  /** Fill color when fill is set. */
  fillColor?: string;
  /** Border radius (virtual — roughjs will approximate). Default 8 */
  borderRadius?: number;
  /** Extra className on the outer wrapper */
  className?: string;
}

/**
 * RoughBorder — wraps children with a rough.js hand-drawn SVG border.
 *
 * The SVG is absolutely positioned behind the children, resized via
 * ResizeObserver to always match the container dimensions.
 *
 * Accessibility:
 *   - Purely decorative — aria-hidden on the SVG
 *   - Respects prefers-reduced-motion by using simpler strokes
 */
export function RoughBorder({
  children,
  color,
  roughness = 1.2,
  strokeWidth = 1.5,
  fill,
  fillColor,
  borderRadius: _borderRadius = 8,
  className,
}: RoughBorderProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    // Check prefers-reduced-motion — use smoother strokes
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mq.matches;

    const draw = (width: number, height: number) => {
      // Clear previous drawings
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const rc = rough.svg(svg);
      const options: Record<string, unknown> = {
        roughness: reducedMotion ? 0.5 : roughness,
        strokeWidth,
        stroke: color || "currentColor",
        fill: fill || "transparent",
        fillStyle: "hachure",
        bowing: reducedMotion ? 1 : 2,
        ...(fillColor ? { fill: fillColor } : {}),
      };

      const node = rc.rectangle(2, 2, width - 4, height - 4, {
        ...options,
        seed: 42, // deterministic — same shape every render
      });
      svg.appendChild(node);
    };

    // Initial draw
    const rect = container.getBoundingClientRect();
    svg.setAttribute("width", String(rect.width));
    svg.setAttribute("height", String(rect.height));
    draw(rect.width, rect.height);

    // ResizeObserver to redraw on size changes
    let frameId: number;
    const observer = new ResizeObserver((entries) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const entry = entries[0];
        if (!entry) return;
        const { width, height } = entry.contentRect;
        svg.setAttribute("width", String(width));
        svg.setAttribute("height", String(height));
        draw(width, height);
      });
    });

    observer.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [color, roughness, strokeWidth, fill, fillColor]);

  return (
    <div ref={containerRef} className={`${styles.wrapper} ${className ?? ""}`}>
      <svg
        ref={svgRef}
        className={styles.border}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
