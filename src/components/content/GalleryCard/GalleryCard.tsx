"use client";

import { forwardRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import styles from "./GalleryCard.module.css";

export interface GalleryCardProps {
  image: string;
  imageAlt: string;
  title: string;
  subCategory?: string;
  date?: string;
  span?: "standard" | "hero";
  index: number;
  onSelect: (index: number) => void;
  isVisible: boolean;
  filterActive: boolean;
  className?: string;
}

export const GalleryCard = forwardRef<HTMLDivElement, GalleryCardProps>(function GalleryCard(
  {
    image,
    imageAlt,
    title,
    subCategory,
    date,
    span = "standard",
    index,
    onSelect,
    isVisible,
    filterActive,
    className,
  },
  ref,
): ReactNode {
  const handleClick = () => onSelect(index);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(index);
    }
  };

  const pillText = subCategory || date;

  const cardClasses = [
    styles.card,
    span === "hero" ? styles.hero : styles.standard,
    isVisible ? styles.visible : "",
    !filterActive ? styles.filteredOut : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    "--stagger-index": index,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cardClasses}
      style={style}
      data-gallery-index={index}
      role="button"
      tabIndex={0}
      aria-label={`View full image: ${title}${pillText ? ` — ${pillText}` : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* z-0: Full-bleed image */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          quality={90}
          priority={index < 2}
          className={styles.image}
          sizes={
            span === "hero"
              ? "(max-width: 1100px) 50vw, (max-width: 760px) 100vw, 50vw"
              : "(max-width: 1100px) 33vw, (max-width: 760px) 100vw, 25vw"
          }
        />
      </div>

      {/* z-1: Duotone overlay — brand primary (royal blue) at 8% */}
      <div className={styles.duotone} aria-hidden="true" />

      {/* z-2: Bottom gradient for text legibility */}
      <div className={styles.gradient} aria-hidden="true" />

      {/* z-3: Category title — bottom-left */}
      <div className={styles.titleOverlay}>
        <span className={styles.titleText}>{title}</span>
      </div>

      {/* z-4: Sub-category/date pill — top-right */}
      {pillText && (
        <div className={styles.pillContainer}>
          <span className={styles.pill}>{pillText}</span>
        </div>
      )}
    </div>
  );
});