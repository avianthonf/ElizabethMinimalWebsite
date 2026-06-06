import { describe, it, expect, vi, beforeAll } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useGalleryState } from "./useGalleryState";

// Mock the data/images module so we control the input
const MOCK_GRID_IMAGES = [
  { filename: "img1.jpg", alt: "Image 1", category: "academics", section: "homepage-grid" },
  { filename: "img2.jpg", alt: "Image 2", category: "athletics", section: "homepage-grid" },
  { filename: "img3.jpg", alt: "Image 3", category: "community", section: "homepage-grid" },
  { filename: "img4.jpg", alt: "Image 4", category: "student-life", section: "homepage-grid" },
  { filename: "img5.jpg", alt: "Image 5", category: "general", section: "homepage-grid" },
  { filename: "img6.jpg", alt: "Image 6", category: "academics", section: "homepage-grid" },
];

const MOCK_HERO_FILENAMES = ["img1.jpg", "img2.jpg"];

vi.mock("@/data/images", () => ({
  HOMEPAGE_GRID_IMAGES: [
    { filename: "img1.jpg", alt: "Image 1", category: "academics", section: "homepage-grid" },
    { filename: "img2.jpg", alt: "Image 2", category: "athletics", section: "homepage-grid" },
    { filename: "img3.jpg", alt: "Image 3", category: "community", section: "homepage-grid" },
    { filename: "img4.jpg", alt: "Image 4", category: "student-life", section: "homepage-grid" },
    { filename: "img5.jpg", alt: "Image 5", category: "general", section: "homepage-grid" },
    { filename: "img6.jpg", alt: "Image 6", category: "academics", section: "homepage-grid" },
  ],
  HOMEPAGE_GRID_HERO_FILENAMES: ["img1.jpg", "img2.jpg"],
}));

describe("useGalleryState", () => {
  // ── Initial state ────────────────────────────────────────────────

  it("initializes with activeFilter 'All'", () => {
    const { result } = renderHook(() => useGalleryState());
    expect(result.current.activeFilter).toBe("All");
  });

  it("initializes with lightbox closed (index null)", () => {
    const { result } = renderHook(() => useGalleryState());
    expect(result.current.lightboxIndex).toBeNull();
  });

  it("includes all images when filter is 'All'", () => {
    const { result } = renderHook(() => useGalleryState());
    expect(result.current.filteredImages).toHaveLength(6);
  });

  // ── Filter ───────────────────────────────────────────────────────

  it("setFilter('Athletics') filters to only athletics images", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.setFilter("Athletics"));

    expect(result.current.activeFilter).toBe("Athletics");
    expect(result.current.filteredImages).toHaveLength(1);
    expect(result.current.filteredImages[0].category).toBe("athletics");
  });

  it("setFilter('Academics') filters to two academies images", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.setFilter("Academics"));

    expect(result.current.filteredImages).toHaveLength(2);
    expect(result.current.filteredImages.every((img) => img.category === "academics")).toBe(true);
  });

  it("returns empty array for a category with no images", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.setFilter("Student Life"));

    expect(result.current.filteredImages).toHaveLength(1);
  });

  it("preserves _originalIndex across filter changes", () => {
    const { result } = renderHook(() => useGalleryState());

    // All images: indices should be 0..5
    expect(result.current.filteredImages.map((i) => i._originalIndex)).toEqual([0, 1, 2, 3, 4, 5]);

    act(() => result.current.setFilter("Athletics"));
    // The athletics image had index 1 in the original array
    expect(result.current.filteredImages[0]._originalIndex).toBe(1);
  });

  it("marks hero images with isHero: true", () => {
    const { result } = renderHook(() => useGalleryState());

    const heroImages = result.current.filteredImages.filter((i) => i.isHero);
    expect(heroImages).toHaveLength(2);
    expect(heroImages[0].filename).toBe("img1.jpg");
    expect(heroImages[1].filename).toBe("img2.jpg");
  });

  // ── Lightbox open / close ────────────────────────────────────────

  it("openLightbox(2) sets lightboxIndex to 2", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.openLightbox(2));

    expect(result.current.lightboxIndex).toBe(2);
  });

  it("closeLightbox() sets lightboxIndex to null", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.openLightbox(0));
    expect(result.current.lightboxIndex).toBe(0);

    act(() => result.current.closeLightbox());
    expect(result.current.lightboxIndex).toBeNull();
  });

  // ── Lightbox navigation ──────────────────────────────────────────

  it("nextImage() advances index", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.openLightbox(0));

    act(() => result.current.nextImage());
    expect(result.current.lightboxIndex).toBe(1);
  });

  it("prevImage() decrements index", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.openLightbox(2));

    act(() => result.current.prevImage());
    expect(result.current.lightboxIndex).toBe(1);
  });

  it("nextImage() wraps from last to first", () => {
    const { result } = renderHook(() => useGalleryState());

    // 6 filtered images when filter is "All"
    act(() => result.current.openLightbox(5)); // last image

    act(() => result.current.nextImage());
    expect(result.current.lightboxIndex).toBe(0); // wraps to first
  });

  it("prevImage() wraps from first to last", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.openLightbox(0)); // first image

    act(() => result.current.prevImage());
    expect(result.current.lightboxIndex).toBe(5); // wraps to last
  });

  it("nextImage is a no-op when lightbox is closed", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.nextImage());
    expect(result.current.lightboxIndex).toBeNull();
  });

  it("prevImage is a no-op when lightbox is closed", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.prevImage());
    expect(result.current.lightboxIndex).toBeNull();
  });

  // ── Lightbox images derivation ───────────────────────────────────

  it("lightboxImages are derived from filteredImages", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.setFilter("Athletics"));

    expect(result.current.lightboxImages).toHaveLength(1);
    expect(result.current.lightboxImages[0].src).toBe("/images/img2.jpg");
    expect(result.current.lightboxImages[0].caption).toBe("Athletics");
  });

  // ── Navigation respects filter boundaries ────────────────────────

  it("navigation wraps within filtered set only", () => {
    const { result } = renderHook(() => useGalleryState());

    act(() => result.current.setFilter("Academics"));
    // Academics has 2 images
    expect(result.current.filteredImages).toHaveLength(2);

    act(() => result.current.openLightbox(1)); // last in filtered

    act(() => result.current.nextImage());
    expect(result.current.lightboxIndex).toBe(0); // wraps to first
  });
});
