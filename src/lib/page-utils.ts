import type { Metadata } from "next";
import { HERO_IMAGES, type ImageAsset, type ImageSection } from "@/data/images";

/**
 * Creates a Next.js Metadata object with consistent formatting.
 *
 * @param title - The page title (appended with " | St. Elizabeth's High School")
 * @param description - The page description for SEO
 * @param options.ogImage - Optional Open Graph image URL
 * @param options.noIndex - If true, sets robots to noindex
 */
export function createPageMetadata(
  title: string,
  description: string,
  options?: { ogImage?: string; noIndex?: boolean },
): Metadata {
  const metadata: Metadata = {
    title: `${title} | St. Elizabeth's High School`,
    description,
  };

  if (options?.ogImage) {
    metadata.openGraph = {
      images: [options.ogImage],
    };
  }

  if (options?.noIndex) {
    metadata.robots = { index: false };
  }

  return metadata;
}

/**
 * Finds a hero image by its section identifier.
 *
 * Wraps the common pattern:
 *   HERO_IMAGES.find((i) => i.section === section) ?? HERO_IMAGES[0]
 *
 * @param section - The ImageSection value to look up
 * @returns The matching ImageAsset, or the first hero image as fallback
 */
export function getHeroImage(section: ImageSection): ImageAsset {
  return HERO_IMAGES.find((i) => i.section === section) ?? HERO_IMAGES[0];
}

/**
 * Converts a URL path into a hyphenated element ID.
 *
 * @example
 *   createPageId("/about/mission") // "about-mission"
 *   createPageId("/academics/departments") // "academics-departments"
 *
 * @param path - The URL path to convert
 * @returns A hyphenated string suitable for use as an element ID
 */
export function createPageId(path: string): string {
  return path.replace(/^\/+/, "").replace(/\//g, "-");
}
