"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./campus-then-now.module.css";

interface CampusThenNowProps {
  heading?: string;
  description?: string;
  beforeImage: { filename: string; alt: string; label: string };
  afterImage: { filename: string; alt: string; label: string };
}

/**
 * CampusThenNow — a draggable before/after comparison slider.
 *
 * Shows the school's transformation across decades. Drag the divider
 * handle to reveal the "after" image from underneath the "before" image.
 *
 * This feature is specifically noted as a differentiator in the 2026
 * UBIQ Education "Best School Websites" rankings (Greenhill School).
 *
 * Touch + mouse + keyboard accessible.
 */
export function CampusThenNow({
  heading = "Our Campus — Then & Now",
  description = "See how St. Elizabeth's has grown and evolved over 75+ years of educational excellence in Pomburpa.",
  beforeImage,
  afterImage,
}: CampusThenNowProps) {
  const [position, setPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section className={styles.root} aria-label="Campus before and after comparison">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div
          className={styles.slider}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ touchAction: "none" }}
        >
          {/* After image (full width, underneath) */}
          <div className={styles.imageBase}>
            <Image
              src={`/images/${afterImage.filename}`}
              alt={afterImage.alt}
              fill
              sizes="100vw"
              className={styles.image}
              loading="lazy"
              quality={85}
            />
          </div>

          {/* Before image (clipped from left) */}
          <div className={styles.imageClip} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <Image
              src={`/images/${beforeImage.filename}`}
              alt={beforeImage.alt}
              fill
              sizes="100vw"
              className={styles.image}
              loading="lazy"
              quality={85}
            />
          </div>

          {/* Divider handle */}
          <div
            className={`${styles.handle} ${isDragging ? styles.handleActive : ""}`}
            style={{ left: `${position}%` }}
          >
            <div className={styles.handleLine} />
            <div className={styles.handleGrip}>
              <span className={styles.handleArrow} aria-hidden="true">
                ◀
              </span>
              <span className={styles.handleArrow} aria-hidden="true">
                ▶
              </span>
            </div>
            <div className={styles.handleLine} />
          </div>

          {/* Labels */}
          <div className={styles.labelBefore} aria-hidden="true">
            {beforeImage.label}
          </div>
          <div className={styles.labelAfter} aria-hidden="true">
            {afterImage.label}
          </div>
        </div>
      </div>
    </section>
  );
}
