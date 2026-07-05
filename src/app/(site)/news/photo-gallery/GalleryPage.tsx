"use client";

import { useMemo } from "react";
import { Gallery, type GalleryImageEntry } from "@/features/gallery";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import type { ImageAsset } from "@/domains/media/images.data";
import {
  HOMEPAGE_GRID_IMAGES,
  ACADEMICS_IMAGES,
  ATHLETICS_IMAGES,
  ARTS_IMAGES,
  STUDENT_LIFE_IMAGES,
  COMMUNITY_IMAGES,
  OVERFLOW_IMAGES,
} from "@/domains/media/images.data";
import styles from "./page.module.css";

// ── Combine and deduplicate all gallery images ────────────────────────

function buildGalleryImages(): GalleryImageEntry[] {
  const allSources: ImageAsset[] = [
    ...HOMEPAGE_GRID_IMAGES,
    ...ACADEMICS_IMAGES,
    ...ATHLETICS_IMAGES,
    ...ARTS_IMAGES,
    ...STUDENT_LIFE_IMAGES,
    ...COMMUNITY_IMAGES,
    ...OVERFLOW_IMAGES,
  ];

  const seen = new Set<string>();
  return allSources.reduce<GalleryImageEntry[]>((acc, img) => {
    if (seen.has(img.filename)) return acc;
    seen.add(img.filename);
    acc.push({
      filename: img.filename,
      alt: img.alt,
      category: img.category,
      subCategory: img.subCategory,
      date: img.date,
    });
    return acc;
  }, []);
}

// ── Component ──────────────────────────────────────────────────────────

export function GalleryPage() {
  const galleryImages = useMemo(() => buildGalleryImages(), []);

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
              Explore moments from academics, sports, cultural activities, and campus life at St.
              Elizabeth&apos;s High School, Pomburpa, Goa.
            </Text>
          </Stack>

          <Gallery images={galleryImages} />
        </Stack>
      </Container>
    </Section>
  );
}
