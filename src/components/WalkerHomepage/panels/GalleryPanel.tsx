"use client";

import type { ReactNode } from "react";
import { GalleryCard } from "@/components/content/GalleryCard/GalleryCard";
import { GalleryFilter } from "@/components/content/GalleryFilter/GalleryFilter";
import { GalleryLightbox } from "@/components/content/GalleryLightbox/GalleryLightbox";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { useGalleryState } from "../hooks/useGalleryState";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { GalleryCardProps } from "@/components/content/GalleryCard/GalleryCard";
import styles from "./GalleryPanel.module.css";

// ── Per-card scroll reveal wrapper ──────────────────────────────────
// Each card gets its own IntersectionObserver so filter changes
// (which remount via key) naturally reset the reveal animation.

type GalleryCardWithRevealProps = Omit<GalleryCardProps, "isVisible" | "filterActive"> & {
  activeFilter: string;
};

function GalleryCardWithReveal({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  activeFilter,
  ...cardProps
}: GalleryCardWithRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  return <GalleryCard ref={ref} {...cardProps} isVisible={isVisible} filterActive />;
}

/** CSS classes for the orchestrator — desktop uses .galleryPanel, mobile uses .verticalGalleryPanel */
export const galleryPanelClass = styles.galleryPanel;
export const verticalGalleryPanelClass = styles.verticalGalleryPanel;

/**
 * GalleryPanel — pure content component.
 *
 * The orchestrator is responsible for choosing the wrapper CSS class
 * (.galleryPanel for horizontal scroll, .verticalGalleryPanel for
 * vertical stack) and passing it via `className`.
 */
export function GalleryPanel({ className }: { className?: string }): ReactNode {
  const panelClass = className ?? styles.galleryPanel;
  const isVertical = className === styles.verticalGalleryPanel;
  const gridClass = isVertical ? styles.verticalGalleryGrid : styles.galleryGrid;

  const {
    activeFilter,
    lightboxIndex,
    filteredImages,
    lightboxImages,
    setFilter,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  } = useGalleryState();

  return (
    <section className={panelClass} aria-labelledby="gallery-heading">
      <div className={styles.gallerySidebar}>
        <div id="gallery-heading" className={styles.galleryHeader}>
          <Text variant="eyebrow" as="p">
            Experience St. Elizabeth
          </Text>
          <Heading level="h2" variant="section">
            Life at Our School
          </Heading>
        </div>
        <GalleryFilter active={activeFilter} onChange={setFilter} />
      </div>
      <div className={gridClass}>
        {filteredImages.map((img, visibleIdx) => (
          <GalleryCardWithReveal
            key={`${activeFilter}-${img._originalIndex}`}
            activeFilter={activeFilter}
            image={`/images/${img.filename}`}
            imageAlt={img.alt}
            title={img.category.charAt(0).toUpperCase() + img.category.slice(1)}
            subCategory={img.subCategory}
            date={img.date}
            span={img.isHero ? "hero" : "standard"}
            index={img._originalIndex}
            onSelect={() => openLightbox(visibleIdx)}
          />
        ))}
      </div>
      <GalleryLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex ?? -1}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </section>
  );
}
