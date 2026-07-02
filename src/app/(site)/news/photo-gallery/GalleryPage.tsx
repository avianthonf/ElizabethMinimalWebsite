"use client";

import { useMemo } from "react";
import { Gallery, type GalleryImageEntry } from "@/components/content/Gallery";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import type { ImageAsset } from "@/data/images";
import {
  HOMEPAGE_GRID_IMAGES,
  ACADEMICS_IMAGES,
  ATHLETICS_IMAGES,
  ARTS_IMAGES,
  STUDENT_LIFE_IMAGES,
  COMMUNITY_IMAGES,
  OVERFLOW_IMAGES,
} from "@/data/images";
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
