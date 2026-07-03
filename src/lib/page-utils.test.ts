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
    expect(meta.openGraph?.title).toBe(`About | ${SITE_NAME}`);
    expect(meta.openGraph?.description).toBe("About us");
    expect(meta.openGraph?.url).toBe(`${SITE_URL}/about`);
    expect(meta.openGraph?.siteName).toBe(SITE_NAME);
    expect(meta.openGraph?.images).toHaveLength(1);
    expect(meta.openGraph?.images?.[0]?.url).toBe(`${SITE_URL}/og-default.jpg`);
    expect(meta.openGraph?.type).toBe("website");
  });

  it("uses the provided ogImage when supplied", () => {
    const meta = createPageMetadata("Test", "Desc", { ogImage: "/images/hero.jpg" });
    expect(meta.openGraph?.images?.[0]?.url).toBe(`${SITE_URL}/images/hero.jpg`);
  });

  it("uses the provided ogType (e.g., article)", () => {
    const meta = createPageMetadata("News", "Article", { ogType: "article" });
    expect(meta.openGraph?.type).toBe("article");
  });

  it("includes publishedTime and modifiedTime on article metadata", () => {
    const meta = createPageMetadata("Article", "Read", {
      ogType: "article",
      publishedTime: "2024-01-15",
      modifiedTime: "2024-02-20",
    });
    expect(meta.openGraph?.publishedTime).toBe("2024-01-15");
    expect(meta.openGraph?.modifiedTime).toBe("2024-02-20");
  });

  it("builds Twitter card with summary_large_image", () => {
    const meta = createPageMetadata("Test", "Desc");
    expect(meta.twitter?.card).toBe("summary_large_image");
    expect(meta.twitter?.title).toBe(`Test | ${SITE_NAME}`);
    expect(meta.twitter?.images).toEqual([`${SITE_URL}/og-default.jpg`]);
  });

  it("sets robots to index/follow by default", () => {
    const meta = createPageMetadata("Test", "Desc");
    expect(meta.robots?.index).toBe(true);
    expect(meta.robots?.follow).toBe(true);
  });

  it("sets robots to noindex when noIndex is true", () => {
    const meta = createPageMetadata("Test", "Desc", { noIndex: true });
    expect(meta.robots?.index).toBe(false);
    expect(meta.robots?.follow).toBe(false);
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
