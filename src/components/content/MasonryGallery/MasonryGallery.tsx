"use client";

import Masonry from "react-masonry-css";
import styles from "./MasonryGallery.module.css";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface MasonryGalleryProps {
  /** Gallery items */
  items: GalleryItem[];
  /** Maximum columns */
  columns?: number;
  /** Gap between items */
  gap?: number;
  /** Additional className */
  className?: string;
  /** Click handler */
  onItemClick?: (item: GalleryItem) => void;
}

/**
 * MasonryGallery — responsive masonry grid layout.
 * Uses react-masonry-css for CSS-only masonry.
 *
 * Usage:
 *   <MasonryGallery items={images} columns={3} onItemClick={openLightbox} />
 */
export function MasonryGallery({
  items,
  columns = 3,
  gap = 16,
  className,
  onItemClick,
}: MasonryGalleryProps) {
  const breakpointColumns = {
    default: columns,
    1100: Math.min(columns, 3),
    768: Math.min(columns, 2),
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={`${styles.masonry} ${className ?? ""}`}
      columnClassName={styles.column}
      style={{ marginLeft: `-${gap}px` }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          className={styles.item}
          onClick={() => onItemClick?.(item)}
          type="button"
          aria-label={item.alt}
        >
          <img
            src={item.src}
            alt={item.alt}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.overlay}>
            <span className={styles.alt}>{item.alt}</span>
          </div>
        </button>
      ))}
    </Masonry>
  );
}
