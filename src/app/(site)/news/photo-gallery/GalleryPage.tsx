"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { GalleryCard } from "@/components/content/GalleryCard/GalleryCard";
import { GalleryFilter } from "@/components/content/GalleryFilter/GalleryFilter";
import { GalleryLightbox } from "@/components/content/GalleryLightbox/GalleryLightbox";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import type { GalleryCategory } from "@/components/content/GalleryFilter/GalleryFilter";
import type { LightboxImage } from "@/components/content/GalleryLightbox/GalleryLightbox";
import type { ImageAsset } from "@/data/images";
import {
  HOMEPAGE_GRID_IMAGES,
  HOMEPAGE_GRID_HERO_FILENAMES,
  ACADEMICS_IMAGES,
  ATHLETICS_IMAGES,
  ARTS_IMAGES,
  STUDENT_LIFE_IMAGES,
  COMMUNITY_IMAGES,
} from "@/data/images";
import styles from "./page.module.css";

// ── Combine all images for the full gallery ─────────────────────────

const ALL_IMAGES: ImageAsset[] = [
  ...HOMEPAGE_GRID_IMAGES,
  ...ACADEMICS_IMAGES,
  ...ATHLETICS_IMAGES,
  ...ARTS_IMAGES,
  ...STUDENT_LIFE_IMAGES,
  ...COMMUNITY_IMAGES,
];

// Deduplicate by filename
const SEEN = new Set<string>();
const UNIQUE_IMAGES = ALL_IMAGES.filter((img) => {
  if (SEEN.has(img.filename)) return false;
  SEEN.add(img.filename);
  return true;
});

// ── Filter mapping ─────────────────────────────────────────────────

const FILTER_MAP: Record<GalleryCategory, string | null> = {
  All: null,
  Academics: "academics",
  Athletics: "athletics",
  Community: "community",
  "Student Life": "student-life",
  General: "general",
};

// ── Types ──────────────────────────────────────────────────────────

interface GalleryImage extends ImageAsset {
  _index: number;
  isHero: boolean;
}

// ── Component ──────────────────────────────────────────────────────

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const countRef = useRef(0);

  const filteredImages = useMemo<GalleryImage[]>(() => {
    const target = FILTER_MAP[activeFilter];
    return UNIQUE_IMAGES.reduce<GalleryImage[]>((acc, img, i) => {
      if (target !== null && img.category !== target) return acc;
      acc.push({
        ...img,
        _index: i,
        isHero: HOMEPAGE_GRID_HERO_FILENAMES.includes(img.filename),
      });
      return acc;
    }, []);
  }, [activeFilter]);

  const lightboxImages = useMemo<LightboxImage[]>(
    () =>
      filteredImages.map((img) => ({
        src: `/images/${img.filename}`,
        alt: img.alt,
        caption: img.category.charAt(0).toUpperCase() + img.category.slice(1),
        subCaption: img.subCategory ?? img.date,
      })),
    [filteredImages],
  );

  useEffect(() => {
    countRef.current = lightboxImages.length;
  }, [lightboxImages.length]);

  const setFilter = useCallback((cat: GalleryCategory) => setActiveFilter(cat), []);
  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % countRef.current;
    });
  }, []);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + countRef.current) % countRef.current;
    });
  }, []);

  return (
    <Section background="paper" padding="xlarge" ariaLabel="Photo gallery">
      <Container>
        <Stack gap="large">
          <Stack gap="medium" className={styles.header}>
            <Text variant="eyebrow" as="p">
              Gallery
            </Text>
            <Heading level="h1" variant="hero">
              Life at Our School
            </Heading>
            <Text variant="body" as="p" className={styles.subtitle}>
              Explore moments from academics, athletics, arts, and community life at St.
              Elizabeth&apos;s High School, Pomburpa, Goa.
            </Text>
          </Stack>

          <GalleryFilter active={activeFilter} onChange={setFilter} />

          <div className={styles.grid}>
            {filteredImages.map((img, visibleIdx) => (
              <GalleryCardWithKey
                key={`${activeFilter}-${img._index}`}
                image={`/images/${img.filename}`}
                imageAlt={img.alt}
                title={img.category.charAt(0).toUpperCase() + img.category.slice(1)}
                subCategory={img.subCategory}
                date={img.date}
                span={img.isHero ? "hero" : "standard"}
                index={img._index}
                isVisible
                filterActive
                onSelect={() => openLightbox(visibleIdx)}
              />
            ))}
          </div>

          {filteredImages.length === 0 && (
            <Text variant="body" as="p" className={styles.empty}>
              No photos found in this category.
            </Text>
          )}

          <GalleryLightbox
            images={lightboxImages}
            currentIndex={lightboxIndex ?? -1}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        </Stack>
      </Container>
    </Section>
  );
}

// ── Simple wrapper to pass props through ───────────────────────────

function GalleryCardWithKey(props: React.ComponentProps<typeof GalleryCard>) {
  return <GalleryCard {...props} />;
}
