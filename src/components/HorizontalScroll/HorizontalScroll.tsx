"use client";

import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./HorizontalScroll.module.css";

type HorizontalScrollProps = {
  children: ReactNode;
  height?: string;
  gap?: string;
  className?: string;
  trackClassName?: string;
  ariaLabel?: string;
};

type Measurements = {
  travelDistance: number;
  spacerHeight: number;
  panelCount: number;
};

const DEFAULT_MEASUREMENTS: Measurements = {
  travelDistance: 0,
  spacerHeight: 0,
  panelCount: 0,
};

export function HorizontalScroll({
  children,
  height = "100vh",
  gap = "0px",
  className,
  trackClassName,
  ariaLabel,
}: HorizontalScrollProps): ReactNode {
  const stageRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const measurementsRef = useRef(DEFAULT_MEASUREMENTS);
  const [spacerHeight, setSpacerHeight] = useState("100vh");
  const [currentPanel, setCurrentPanel] = useState(0);
  const [panelCount, setPanelCount] = useState(0);
  const mountedRef = useRef(true);
  const pendingMeasure = useRef(false);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const measure = useCallback(() => {
    if (!mountedRef.current) return;

    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;
    const travelDistance = Math.max(0, track.scrollWidth - viewportWidth);
    const nextSpacerHeight = viewportHeight + travelDistance;
    const panelCount = track.children.length;

    measurementsRef.current = {
      travelDistance,
      spacerHeight: nextSpacerHeight,
      panelCount,
    };

    setSpacerHeight(`${nextSpacerHeight}px`);
    setPanelCount(panelCount);
  }, []);

  const scrollByPanel = useCallback((direction: "prev" | "next") => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;

    if (!stage || !viewport) {
      return;
    }

    const rect = stage.getBoundingClientRect();
    const currentScroll = -rect.top;
    const panelAdvance = viewport.clientWidth;

    const targetScroll =
      direction === "next" ? currentScroll + panelAdvance : currentScroll - panelAdvance;

    window.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: "auto",
    });
  }, []);

  const updateTransform = useCallback(() => {
    frameRef.current = null;

    if (!mountedRef.current) return;

    const stage = stageRef.current;
    const track = trackRef.current;
    const {
      travelDistance,
      spacerHeight: measuredSpacerHeight,
      panelCount,
    } = measurementsRef.current;

    if (!stage || !track || travelDistance === 0 || measuredSpacerHeight === 0) {
      return;
    }

    const rect = stage.getBoundingClientRect();
    const scrollableDistance = Math.max(1, measuredSpacerHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));

    track.style.transform = `translate3d(${-progress * travelDistance}px, 0, 0)`;
    stage.style.setProperty("--scroll-progress", String(progress));
    document.documentElement.style.setProperty("--scroll-progress", String(progress));

    // Update current panel index for screen reader announcements
    const panelIndex = Math.min(panelCount - 1, Math.round(progress * (panelCount - 1)));
    setCurrentPanel(panelIndex);
  }, []);

  const scheduleMeasure = useCallback(() => {
    if (pendingMeasure.current) return;

    pendingMeasure.current = true;
    requestAnimationFrame(() => {
      pendingMeasure.current = false;
      measure();
      updateTransform();
    });
  }, [measure, updateTransform]);

  useLayoutEffect(() => {
    measure();
    updateTransform();
  }, [measure, updateTransform]);

  useEffect(() => {
    const handleResize = () => {
      measure();
      updateTransform();
    };

    const handleScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updateTransform);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      mountedRef.current = false;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [measure, updateTransform]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    resizeObserverRef.current = new ResizeObserver(() => {
      scheduleMeasure();
    });

    resizeObserverRef.current.observe(track);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
    };
  }, [scheduleMeasure]);

  // Touch swipe support for mobile/tablet
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      // Only handle horizontal swipes (dx > dy and threshold > 50px)
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        scrollByPanel(dx < 0 ? "next" : "prev");
      }
    };

    viewport.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewport.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      viewport.removeEventListener("touchstart", handleTouchStart);
      viewport.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollByPanel]);

  const stageClassName = [styles.stage, className ?? ""].filter(Boolean).join(" ");
  const trackClassNames = [styles.track, trackClassName ?? ""].filter(Boolean).join(" ");
  const style = {
    "--horizontal-scroll-height": height,
    "--horizontal-scroll-gap": gap,
    "--horizontal-scroll-spacer-height": spacerHeight,
  } as CSSProperties;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByPanel("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByPanel("next");
      }
    },
    [scrollByPanel],
  );

  return (
    <section
      ref={stageRef}
      className={stageClassName}
      style={style}
      aria-label={ariaLabel}
      role="region"
      aria-roledescription="carousel"
    >
      {/* Screen reader live region for panel announcements */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Panel {currentPanel + 1} of {panelCount || "…"}
      </span>

      <div ref={viewportRef} className={styles.viewport} tabIndex={0} onKeyDown={handleKeyDown}>
        <div ref={trackRef} className={trackClassNames} role="list">
          {children}
        </div>

        <button
          type="button"
          className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`}
          aria-label="Scroll to previous panel"
          onClick={() => scrollByPanel("prev")}
        />
        <button
          type="button"
          className={`${styles.scrollBtn} ${styles.scrollBtnRight}`}
          aria-label="Scroll to next panel"
          onClick={() => scrollByPanel("next")}
        />
      </div>
    </section>
  );
}
