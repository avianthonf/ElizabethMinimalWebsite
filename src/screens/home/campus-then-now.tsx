"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import styles from "./campus-then-now.module.css";

interface CampusThenNowProps {
  heading?: string;
  description?: string;
  beforeImage: { filename: string; alt: string; label: string };
  afterImage: { filename: string; alt: string; label: string };
}

/**
 * CampusThenNow — a before/after comparison slider powered by react-compare-slider.
 *
 * Shows the school's transformation across decades. Uses react-compare-slider
 * for polished touch, mouse, keyboard, and accessibility support.
 *
 * This feature is specifically noted as a differentiator in the 2026
 * UBIQ Education "Best School Websites" rankings (Greenhill School).
 */
export function CampusThenNow({
  heading = "Our Campus — Then & Now",
  description = "See how St. Elizabeth's has grown and evolved over seven decades of educational excellence in Pomburpa.",
  beforeImage,
  afterImage,
}: CampusThenNowProps) {
  return (
    <section className={styles.root} aria-label="Campus before and after comparison">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.slider}>
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={`/images/${beforeImage.filename}`}
                alt={beforeImage.alt}
                aria-label={beforeImage.label}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={`/images/${afterImage.filename}`}
                alt={afterImage.alt}
                aria-label={afterImage.label}
              />
            }
            aria-label={`Compare: ${beforeImage.label} vs ${afterImage.label}`}
          />
        </div>
      </div>
    </section>
  );
}
