import { describe, it, expect } from "vitest";
import { createPageMetadata, absoluteUrl, createPageId, SITE_URL, SITE_NAME } from "./page-utils";

describe("createPageMetadata", () => {
  it("appends site name to the title", () => {
    const meta = createPageMetadata("Admissions", "Apply now");
    expect(meta.title).toBe(`Admissions | ${SITE_NAME}`);
  });

  it("includes the description", () => {
    const meta = createPageMetadata("About", "Learn more");
    expect(meta.description).toBe("Learn more");
  });

  it("sets metadataBase to the site URL", () => {
    const meta = createPageMetadata("Test", "Desc");
    expect(meta.metadataBase).toBeInstanceOf(URL);
    expect((meta.metadataBase as URL).href).toBe(SITE_URL + "/");
  });

  it("sets a canonical URL when path is provided", () => {
    const meta = createPageMetadata("Admissions", "Apply", { path: "/admissions" });
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/admissions`);
  });

  it("omits canonical when no path is provided", () => {
    const meta = createPageMetadata("Test", "Desc");
    expect(meta.alternates).toBeUndefined();
  });

  it("builds OpenGraph with title, description, url, siteName, and image", () => {
    const meta = createPageMetadata("About", "About us", { path: "/about" });
    const og = meta.openGraph as Record<string, unknown> | undefined;
    expect(og?.title).toBe(`About | ${SITE_NAME}`);
    expect(og?.description).toBe("About us");
    expect(og?.url).toBe(`${SITE_URL}/about`);
    expect(og?.siteName).toBe(SITE_NAME);
    const images = og?.images as Array<Record<string, unknown>> | undefined;
    expect(images).toHaveLength(1);
    expect(images?.[0]?.url).toBe(`${SITE_URL}/og-default.jpg`);
    expect(og?.type).toBe("website");
  });

  it("uses the provided ogImage when supplied", () => {
    const meta = createPageMetadata("Test", "Desc", { ogImage: "/images/hero.jpg" });
    const og = meta.openGraph as Record<string, unknown> | undefined;
    const images = og?.images as Array<Record<string, unknown>> | undefined;
    expect(images?.[0]?.url).toBe(`${SITE_URL}/images/hero.jpg`);
  });

  it("uses the provided ogType (e.g., article)", () => {
    const meta = createPageMetadata("News", "Article", { ogType: "article" });
    const og = meta.openGraph as Record<string, unknown> | undefined;
    expect(og?.type).toBe("article");
  });

  it("includes publishedTime and modifiedTime on article metadata", () => {
    const meta = createPageMetadata("Article", "Read", {
      ogType: "article",
      publishedTime: "2024-01-15",
      modifiedTime: "2024-02-20",
    });
    const og = meta.openGraph as Record<string, unknown> | undefined;
    expect(og?.publishedTime).toBe("2024-01-15");
    expect(og?.modifiedTime).toBe("2024-02-20");
  });

  it("builds Twitter card with summary_large_image", () => {
    const meta = createPageMetadata("Test", "Desc");
    const tw = meta.twitter as Record<string, unknown> | undefined;
    expect(tw?.card).toBe("summary_large_image");
    expect(tw?.title).toBe(`Test | ${SITE_NAME}`);
    expect(tw?.images).toEqual([`${SITE_URL}/og-default.jpg`]);
  });

  it("sets robots to index/follow by default", () => {
    const meta = createPageMetadata("Test", "Desc");
    const robots = meta.robots as Record<string, unknown> | undefined;
    expect(robots?.index).toBe(true);
    expect(robots?.follow).toBe(true);
  });

  it("sets robots to noindex when noIndex is true", () => {
    const meta = createPageMetadata("Test", "Desc", { noIndex: true });
    const robots = meta.robots as Record<string, unknown> | undefined;
    expect(robots?.index).toBe(false);
    expect(robots?.follow).toBe(false);
  });

  it("uses en_IN as the default locale", () => {
    const meta = createPageMetadata("Test", "Desc");
    expect(meta.openGraph?.locale).toBe("en_IN");
  });

  it("respects a custom locale", () => {
    const meta = createPageMetadata("Test", "Desc", { locale: "hi_IN" });
    expect(meta.openGraph?.locale).toBe("hi_IN");
  });

  it("includes the author when provided", () => {
    const meta = createPageMetadata("Post", "Read", { author: "Jane Doe" });
    expect(meta.authors).toEqual([{ name: "Jane Doe" }]);
  });
});

describe("absoluteUrl", () => {
  it("returns absolute URLs unchanged", () => {
    expect(absoluteUrl("https://example.com/foo")).toBe("https://example.com/foo");
  });

  it("prepends the site URL to site-relative paths", () => {
    expect(absoluteUrl("/about")).toBe(`${SITE_URL}/about`);
  });

  it("adds a leading slash to paths without one", () => {
    expect(absoluteUrl("about")).toBe(`${SITE_URL}/about`);
  });
});

describe("createPageId", () => {
  it("converts a path to a hyphenated ID", () => {
    expect(createPageId("/about/mission")).toBe("about-mission");
  });

  it("strips leading slashes", () => {
    expect(createPageId("///about")).toBe("about");
  });

  it("replaces inner slashes with hyphens", () => {
    expect(createPageId("/academics/departments")).toBe("academics-departments");
  });

  it("handles single-segment paths", () => {
    expect(createPageId("/about")).toBe("about");
  });
});
