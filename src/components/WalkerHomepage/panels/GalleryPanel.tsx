"use client";

import type { ReactNode } from "react";
import { HorizontalPage } from "@/components/HorizontalScroll";
import { GalleryCard } from "@/components/content/GalleryCard/GalleryCard";
import { GalleryFilter } from "@/components/content/GalleryFilter/GalleryFilter";
import { GalleryLightbox } from "@/components/content/GalleryLightbox/GalleryLightbox";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { useGalleryState } from "../hooks/useGalleryState";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { GalleryCardProps } from "@/components/content/GalleryCard/GalleryCard";
import shared from "./shared.module.css";
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

  return (
    <GalleryCard
      ref={ref}
      {...cardProps}
      isVisible={isVisible}
      filterActive
    />
  );
}

interface GalleryPanelProps {
  layout?: "horizontal" | "vertical";
}

function GalleryPanelContent({ layout = "horizontal" }: GalleryPanelProps): ReactNode {
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

  const isVertical = layout === "vertical";
  const panelClass = isVertical
    ? `${styles.verticalGalleryPanel}`
    : `${styles.galleryPanel}`;
  const gridClass = isVertical
    ? `${styles.verticalGalleryGrid}`
    : `${styles.galleryGrid}`;

  return (
    <section className={panelClass} aria-labelledby="gallery-heading">
      <div id="gallery-heading" className={styles.galleryHeader}>
        <Text variant="eyebrow" as="p">Experience St. Elizabeth</Text>
        <Heading level="h2" variant="section">Life at Our School</Heading>
      </div>
      <GalleryFilter
        active={activeFilter}
        onChange={setFilter}
      />
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

export function GalleryPanel({ layout = "horizontal" }: GalleryPanelProps): ReactNode {
  const isVertical = layout === "vertical";

  return (
    <>
      {isVertical ? (
        <div className={shared.panel}>
          <GalleryPanelContent layout={layout} />
        </div>
      ) : (
        <HorizontalPage
          width="auto"
          headerTheme="dark"
          className={shared.panel}
          ariaLabel="Photo gallery — Academics, Athletics, Arts, Student Life"
        >
          <GalleryPanelContent layout={layout} />
        </HorizontalPage>
      )}
    </>
  );
}
