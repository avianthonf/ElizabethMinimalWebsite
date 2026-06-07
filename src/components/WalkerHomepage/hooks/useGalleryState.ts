"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import type { GalleryCategory } from "@/components/content/GalleryFilter/GalleryFilter";
import type { LightboxImage } from "@/components/content/GalleryLightbox/GalleryLightbox";
import type { ImageAsset } from "@/data/images";
import { HOMEPAGE_GRID_IMAGES, HOMEPAGE_GRID_HERO_FILENAMES } from "@/data/images";

// ── Types ──────────────────────────────────────────────────────────────

export interface FilteredGalleryImage extends ImageAsset {
  /** Index in the original HOMEPAGE_GRID_IMAGES array (for stagger delay + stable keys) */
  _originalIndex: number;
  /** Whether this image spans 2× rows in the masonry grid */
  isHero: boolean;
}

export interface UseGalleryStateReturn {
  /** Currently active gallery filter category */
  activeFilter: GalleryCategory;
  /** Current lightbox image index, or null when closed */
  lightboxIndex: number | null;
  /** Images filtered by activeFilter, with _originalIndex preserved */
  filteredImages: FilteredGalleryImage[];
  /** Lightbox-ready image list derived from filteredImages */
  lightboxImages: LightboxImage[];
  /** Update the active filter category */
  setFilter: (category: GalleryCategory) => void;
  /** Open the lightbox at a specific visible index */
  openLightbox: (index: number) => void;
  /** Close the lightbox */
  closeLightbox: () => void;
  /** Navigate to the next lightbox image (circular) */
  nextImage: () => void;
  /** Navigate to the previous lightbox image (circular) */
  prevImage: () => void;
}

// ── Filter Mapping ────────────────────────────────────────────────────

const FILTER_CATEGORY_MAP: Record<GalleryCategory, string | null> = {
  All: null,
  Academics: "academics",
  Athletics: "athletics",
  Community: "community",
  "Student Life": "student-life",
  General: "general",
};

// ── Hook ──────────────────────────────────────────────────────────────

/**
 * Combined gallery state — filter, filtered image list, lightbox
 * images, and lightbox open/close/navigate controls.
 *
 * Lightbox navigation uses a ref-based image count so callbacks
 * always read the latest count without re-creating on every filter
 * change (avoids the stale-closure problem).
 */
export function useGalleryState(): UseGalleryStateReturn {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const countRef = useRef<number>(0);

  // ── Filter ──────────────────────────────────────────────────────

  const setFilter = useCallback((category: GalleryCategory) => {
    setActiveFilter(category);
  }, []);

  // ── Lightbox open / close / navigate ────────────────────────────

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const count = countRef.current;
      if (count === 0) return prev;
      return (prev + 1) % count;
    });
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const count = countRef.current;
      if (count === 0) return prev;
      return (prev - 1 + count) % count;
    });
  }, []);

  // ── Filtered image list (useMemo) ───────────────────────────────

  const filteredImages = useMemo<FilteredGalleryImage[]>(() => {
    const targetCat = FILTER_CATEGORY_MAP[activeFilter];
    return HOMEPAGE_GRID_IMAGES.reduce<FilteredGalleryImage[]>((acc, img, i) => {
      if (targetCat !== null && img.category !== targetCat) {
        return acc;
      }
      acc.push({
        ...img,
        _originalIndex: i,
        isHero: HOMEPAGE_GRID_HERO_FILENAMES.includes(img.filename),
      });
      return acc;
    }, []);
  }, [activeFilter]);

  // ── Lightbox image list (useMemo, derived from filteredImages) ───

  const lightboxImages = useMemo<LightboxImage[]>(() => {
    return filteredImages.map((img) => ({
      src: `/images/${img.filename}`,
      alt: img.alt,
      caption: img.category.charAt(0).toUpperCase() + img.category.slice(1),
      subCaption: img.subCategory ?? img.date,
    }));
  }, [filteredImages]);

  // Keep ref current in an effect so nav callbacks always have
  // the latest count (stale-closure safety) without mutating
  // during render.
  useEffect(() => {
    countRef.current = lightboxImages.length;
  }, [lightboxImages.length]);

  return {
    activeFilter,
    lightboxIndex,
    filteredImages,
    lightboxImages,
    setFilter,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  };
}
