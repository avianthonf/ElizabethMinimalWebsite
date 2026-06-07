import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ValueCard } from "./ValueCard";

// next/image returns an img element in tests
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe("ValueCard", () => {
  it("renders number, title, and body", () => {
    render(
      <ValueCard number="01" title="Curiosity" body="Ask better questions." />,
    );
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Curiosity")).toBeInTheDocument();
    expect(screen.getByText("Ask better questions.")).toBeInTheDocument();
  });

  it("renders image when image and imageAlt are provided", () => {
    render(
      <ValueCard
        number="01"
        title="Faith"
        body="In God we trust..."
        image="/images/test.jpg"
        imageAlt="Faith tradition image"
      />,
    );
    const img = screen.getByAltText("Faith tradition image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/test.jpg");
  });

  it("does not render an image when image prop is omitted", () => {
    render(
      <ValueCard number="02" title="Excellence" body="Academic rigor..." />,
    );
    // queryByAltText returns null, getByAltText would throw
    const imgs = screen.queryAllByRole("img");
    expect(imgs).toHaveLength(0);
  });

  it("renders watermark number as decorative element", () => {
    render(
      <ValueCard number="03" title="Community" body="Inclusive..." />,
    );
    const watermark = screen.getByText("03");
    expect(watermark).toHaveAttribute("aria-hidden", "true");
  });
});
