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
    it("should create basic metadata", () => {
      const metadata = createPageMetadata("Test Page", "Test description");

      expect(metadata.title).toBe("Test Page");
      expect(metadata.description).toBe("Test description");
    });

    it("should include OpenGraph data", () => {
      const metadata = createPageMetadata("Test Page", "Test description");

      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe("Test Page");
      expect(metadata.openGraph?.description).toBe("Test description");
    });

    it("should include Twitter card data", () => {
      const metadata = createPageMetadata("Test Page", "Test description");

      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.card).toBe("summary_large_image");
      expect(metadata.twitter?.title).toBe("Test Page");
    });

    it("should use custom OG image when provided", () => {
      const metadata = createPageMetadata("Test Page", "Test description", {
        ogImage: "/custom-og-image.jpg",
      });

      expect(metadata.openGraph?.images).toContain("/custom-og-image.jpg");
    });

    it("should set canonical URL when path provided", () => {
      const metadata = createPageMetadata("Test Page", "Test description", {
        path: "/about/history",
      });

      expect(metadata.alternates?.canonical).toContain("/about/history");
    });

    it("should handle keywords array", () => {
      const metadata = createPageMetadata("Test Page", "Test description", {
        keywords: ["education", "school", "goa"],
      });

      expect(metadata.keywords).toEqual(["education", "school", "goa"]);
    });

    it("should truncate long descriptions", () => {
      const longDescription = "a".repeat(200);
      const metadata = createPageMetadata("Test Page", longDescription);

      expect(metadata.description?.length).toBeLessThanOrEqual(160);
    });

    it("should handle noindex option", () => {
      const metadata = createPageMetadata("Test Page", "Test description", {
        noindex: true,
      });

      expect(metadata.robots).toContain("noindex");
    });
  });
});
