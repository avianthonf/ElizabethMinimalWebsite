import type { Metadata } from "next";
import { HERO_IMAGES, IMAGE_BY_SECTION, type ImageAsset, type ImageSection } from "@/data/images";

// Re-export brand constants for backwards compatibility with the original
// `from "@/lib/page-utils"` import path. New code should import directly
// from "@/lib/brand" instead.
export { SITE_URL, SITE_NAME, absoluteUrl } from "./brand";

import { SITE_URL, SITE_NAME, absoluteUrl } from "./brand";

export const SITE_DESCRIPTION =
  "St. Elizabeth's High School in Pomburpa, Goa — nurturing hearts since 1949. Catholic education affiliated with CBSE with an average class size of 15 students.";

interface CreatePageMetadataOptions {
  /** Optional Open Graph image URL (absolute or site-relative). */
  ogImage?: string;
  /** If true, sets robots to noindex. */
  noIndex?: boolean;
  /** Canonical URL — defaults to ogImage/ogUrl derived from `path`. */
  path?: string;
  /** Override the open graph type. Defaults to "website". */
  ogType?: "website" | "article";
  /** When the page was last modified (ISO date string). */
  modifiedTime?: string;
  /** When the page was first published (ISO date string). */
  publishedTime?: string;
  /** Author name for article-type pages. */
  author?: string;
  /** Locale. Defaults to "en_IN". */
  locale?: string;
}

/**
 * Creates a Next.js Metadata object with consistent formatting.
 * Includes canonical URLs, OpenGraph, and Twitter card metadata.
 *
 * @param title - The page title (appended with " | St. Elizabeth's High School")
 * @param description - The page description for SEO
 * @param options - SEO enhancement options
 */
export function createPageMetadata(
  title: string,
  description: string,
  options?: CreatePageMetadataOptions,
): Metadata {
  const canonical = options?.path ? absoluteUrl(options.path) : undefined;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const ogImage = options?.ogImage
    ? absoluteUrl(options.ogImage)
    : absoluteUrl("/og-default.jpg");
  const ogType = options?.ogType ?? "website";
  const locale = options?.locale ?? "en_IN";

  const metadata: Metadata = {
    title: fullTitle,
    description,
    authors: options?.author ? [{ name: options.author }] : undefined,
    metadataBase: new URL(SITE_URL),
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: ogType,
      ...(options?.publishedTime && { publishedTime: options.publishedTime }),
      ...(options?.modifiedTime && { modifiedTime: options.modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: options?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };

  return metadata;
}

/**
 * Finds a hero image by its section identifier.
 *
 * Uses the O(1) IMAGE_BY_SECTION record for fast lookups.
 * Falls back to the first hero image if the section is not found.
 *
 * @param section - The ImageSection value to look up
 * @returns The matching ImageAsset, or the first hero image as fallback
 */
export function getHeroImage(section: ImageSection): ImageAsset {
  return IMAGE_BY_SECTION[section] ?? HERO_IMAGES[0]!;
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
