import { describe, it, expect } from "vitest";
import { createPageMetadata, absoluteUrl } from "../page-utils";

describe("page-utils", () => {
  describe("absoluteUrl", () => {
    it("should convert relative path to absolute URL", () => {
      const url = absoluteUrl("/about/history");
      expect(url).toMatch(/^https?:\/\//);
      expect(url).toContain("/about/history");
    });

    it("should handle paths with query params", () => {
      const url = absoluteUrl("/search?q=test");
      expect(url).toContain("/search?q=test");
    });

    it("should handle paths with hash", () => {
      const url = absoluteUrl("/page#section");
      expect(url).toContain("/page#section");
    });

    it("should not double-slash root", () => {
      const url = absoluteUrl("/");
      expect(url).not.toMatch(/\/\/$/);
    });
  });

  describe("createPageMetadata", () => {
    it("should create basic metadata with site name appended", () => {
      const metadata = createPageMetadata("Test Page", "Test description", "/test");

      expect(metadata.title).toBe("Test Page | St. Elizabeth's High School");
      expect(metadata.description).toBe("Test description");
    });

    it("should include OpenGraph data", () => {
      const metadata = createPageMetadata("Test Page", "Test description", "/test");

      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe("Test Page | St. Elizabeth's High School");
      expect(metadata.openGraph?.description).toBe("Test description");
    });

    it("should include Twitter card data", () => {
      const metadata = createPageMetadata("Test Page", "Test description", "/test");

      expect(metadata.twitter).toBeDefined();
      const twitter = metadata.twitter as Record<string, string>;
      expect(twitter.card).toBe("summary_large_image");
      expect(twitter.title).toBe("Test Page | St. Elizabeth's High School");
    });

    it("should use custom OG image when provided", () => {
      const metadata = createPageMetadata("Test Page", "Test description", "/test", {
        ogImage: "/custom-og-image.jpg",
      });

      const ogImages = metadata.openGraph?.images as Array<{ url: string }>;
      expect(ogImages[0]!.url).toContain("/custom-og-image.jpg");
    });

    it("should set canonical URL when path provided", () => {
      const metadata = createPageMetadata("Test Page", "Test description", "/about/history");

      expect(metadata.alternates?.canonical).toContain("/about/history");
    });

    it("should handle default path", () => {
      const metadata = createPageMetadata("Test Page", "Test description");

      expect(metadata.alternates?.canonical).toBeDefined();
    });

    it("should not truncate descriptions (no truncation in current implementation)", () => {
      const longDescription = "a".repeat(200);
      const metadata = createPageMetadata("Test Page", longDescription, "/test");

      // Current implementation doesn't truncate
      expect(metadata.description).toBe(longDescription);
    });

    it("should handle noindex option", () => {
      const metadata = createPageMetadata("Test Page", "Test description", "/test", {
        noIndex: true,
      });

      expect(metadata.robots).toEqual({ index: false, follow: false });
    });
  });
});
