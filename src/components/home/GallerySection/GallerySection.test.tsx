import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GallerySection } from "./GallerySection";

const mockImages = [
  { filename: "DSC07397.jpg", alt: "Main building", span: "normal" as const },
  { filename: "DSC07460.jpg", alt: "Classroom", span: "tall" as const },
  { filename: "DSC08376.jpg", alt: "Sports field", span: "normal" as const },
  { filename: "DSC07396.jpg", alt: "Science lab", span: "normal" as const },
];

describe("GallerySection", () => {
  it("renders the section with default aria-label", () => {
    render(<GallerySection eyebrow="Gallery" heading="Photo Gallery" images={mockImages} ctaText="View Gallery" ctaHref="/news/photo-gallery" />);
    expect(screen.getByRole("region", { name: /photo gallery/i })).toBeInTheDocument();
  });

  it("renders the eyebrow and heading", () => {
    render(<GallerySection eyebrow="Gallery" heading="Photo Gallery" images={mockImages} ctaText="View Gallery" ctaHref="/news/photo-gallery" />);
    expect(screen.getByText("Gallery")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /photo gallery/i })).toBeInTheDocument();
  });

  it("renders all images with alt text", () => {
    render(<GallerySection eyebrow="Gallery" heading="Gallery" images={mockImages} ctaText="View" ctaHref="/news/photo-gallery" />);
    for (const img of mockImages) {
      expect(screen.getByAltText(img.alt)).toBeInTheDocument();
    }
  });

  it("renders the CTA link to the full gallery", () => {
    render(<GallerySection eyebrow="Gallery" heading="Gallery" images={mockImages} ctaText="View Full Gallery" ctaHref="/news/photo-gallery" />);
    const cta = screen.getByRole("link", { name: /view full gallery/i });
    expect(cta).toHaveAttribute("href", "/news/photo-gallery");
  });

  it("uses lazy loading on images (not LCP candidates)", () => {
    render(<GallerySection eyebrow="Gallery" heading="Gallery" images={mockImages} ctaText="View" ctaHref="/news/photo-gallery" />);
    const images = screen.getAllByRole("img");
    for (const img of images) {
      expect(img).toHaveAttribute("loading", "lazy");
    }
  });

  it("uses next/image for optimization", () => {
    render(<GallerySection eyebrow="Gallery" heading="Gallery" images={mockImages} ctaText="View" ctaHref="/news/photo-gallery" />);
    const images = screen.getAllByRole("img");
    for (const img of images) {
      expect(img).toHaveAttribute("srcset");
    }
  });
});
