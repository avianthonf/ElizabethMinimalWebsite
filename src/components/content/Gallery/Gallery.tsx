"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { MasonryPhotoAlbum, type Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

import { cn, blurPlaceholderSvg } from "@/lib/utils";
import type { ImageCategory } from "@/data/images";
import styles from "./Gallery.module.css";

// ── Types ──────────────────────────────────────────────────────────────

/** Gallery display categories (mapped from raw ImageCategory). */
export type GalleryFilterCategory = "Academic" | "Sports" | "Cultural" | "Campus Life";

/** Extended photo type with gallery metadata. */
interface GalleryPhoto extends Photo {
  rawCategory: ImageCategory;
  filterCategory: GalleryFilterCategory;
  alt: string;
  title?: string;
  description?: string;
}

export interface GalleryImageEntry {
  filename: string;
  alt: string;
  category: ImageCategory;
  subCategory?: string;
  date?: string;
}

export interface GalleryProps {
  images: GalleryImageEntry[];
  className?: string;
}

// ── Category Mapping ───────────────────────────────────────────────────

const CATEGORY_MAP: Record<ImageCategory, GalleryFilterCategory> = {
  academics: "Academic",
  athletics: "Sports",
  arts: "Cultural",
  community: "Cultural",
  heritage: "Cultural",
  "student-life": "Campus Life",
  general: "Campus Life",
  hero: "Campus Life",
  gallery: "Campus Life",
};

const ALL_FILTER_CATEGORIES: GalleryFilterCategory[] = [
  "Academic",
  "Sports",
  "Cultural",
  "Campus Life",
];

// ── Constants ──────────────────────────────────────────────────────────

const BLUR_DATA_URL = blurPlaceholderSvg("#f4f1ed");

// ── Component ──────────────────────────────────────────────────────────

export function Gallery({ images, className }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterCategory | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ── Build photo objects ────────────────────────────────────────────

  const allPhotos = useMemo<GalleryPhoto[]>(
    () =>
      images.map((img) => {
        const filterCat = CATEGORY_MAP[img.category] ?? "Campus Life";
        const captionParts = [img.subCategory, img.date].filter(Boolean);

        return {
          src: `/images/${img.filename}`,
          alt: img.alt,
          width: 800,
          height: 600,
          rawCategory: img.category,
          filterCategory: filterCat,
          title: filterCat,
          description: captionParts.length > 0 ? captionParts.join(" · ") : undefined,
        };
      }),
    [images],
  );

  // ── Filtered photos ───────────────────────────────────────────────

  const filteredPhotos = useMemo<GalleryPhoto[]>(
    () =>
      activeFilter === null
        ? allPhotos
        : allPhotos.filter((p) => p.filterCategory === activeFilter),
    [allPhotos, activeFilter],
  );

  // ── Lightbox slides ───────────────────────────────────────────────

  const slides = useMemo(
    () =>
      filteredPhotos.map((p) => ({
        src: p.src,
        alt: p.alt,
        title: p.title,
        description: p.description,
        width: p.width,
        height: p.height,
      })),
    [filteredPhotos],
  );

  // ── Handlers ───────────────────────────────────────────────────────

  const handleFilterChange = useCallback((cat: GalleryFilterCategory) => {
    setActiveFilter((prev) => (prev === cat ? null : cat));
  }, []);

  const handlePhotoClick = useCallback(
    ({ index }: { event: React.MouseEvent; photo: GalleryPhoto; index: number }) => {
      setLightboxIndex(index);
      setLightboxOpen(true);
    },
    [],
  );

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // ── Render: custom image using next/image with blur placeholder ────

  const renderImage = useCallback(
    (
      props: { src: string | Blob; alt?: string; style?: React.CSSProperties },
      { photo }: { photo: GalleryPhoto },
    ) => {
      const src = typeof props.src === "string" ? props.src : photo.src;
      return (
        <Image
          src={src}
          alt={props.alt ?? photo.alt}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
          quality={85}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className={styles.albumImage}
          style={props.style}
        />
      );
    },
    [],
  );

  // ── Render: overlay captions on each photo ─────────────────────────

  const renderExtras = useCallback(
    (
      _props: object,
      { photo }: { photo: GalleryPhoto; index: number; width: number; height: number },
    ) => {
      if (!photo.description) return null;

      return (
        <div className={styles.captionOverlay} aria-hidden="true">
          <span className={styles.captionText}>{photo.description}</span>
        </div>
      );
    },
    [],
  );

  // ── Render ─────────────────────────────────────────────────────────

  return (
    <div className={cn(styles.gallery, className)}>
      {/* Filter Bar */}
      <div className={styles.filterBar} role="tablist" aria-label="Filter gallery by category">
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === null}
          className={cn(styles.filterPill, activeFilter === null && styles.filterPillActive)}
          onClick={() => setActiveFilter(null)}
        >
          All
        </button>
        {ALL_FILTER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeFilter === cat}
            className={cn(styles.filterPill, activeFilter === cat && styles.filterPillActive)}
            onClick={() => handleFilterChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      {filteredPhotos.length > 0 ? (
        <MasonryPhotoAlbum
          photos={filteredPhotos}
          columns={(containerWidth) => {
            if (containerWidth < 480) return 1;
            if (containerWidth < 760) return 2;
            if (containerWidth < 1100) return 3;
            return 4;
          }}
          spacing={8}
          padding={0}
          onClick={handlePhotoClick}
          render={{
            image: renderImage,
            extras: renderExtras,
          }}
          sizes={{ size: "100vw" }}
        />
      ) : (
        <p className={styles.emptyState}>No photos found in this category.</p>
      )}

      {/* Lightbox — YARL with Captions, Counter, Thumbnails, Zoom plugins */}
      <Lightbox
        open={lightboxOpen}
        close={handleCloseLightbox}
        index={lightboxIndex}
        slides={slides}
        plugins={[Captions, Counter, Thumbnails, Zoom]}
        captions={{
          descriptionTextAlign: "start",
          descriptionMaxLines: 2,
        }}
        carousel={{
          finite: slides.length <= 1,
        }}
        toolbar={{
          buttons: ["close"],
        }}
      />
    </div>
  );
}
