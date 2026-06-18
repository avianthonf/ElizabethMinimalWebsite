import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GalleryLightbox } from "./GalleryLightbox";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} />
  ),
}));

const mockImages = [
  { src: "/images/photo1.jpg", alt: "Photo 1", caption: "Caption 1" },
  { src: "/images/photo2.jpg", alt: "Photo 2", caption: "Caption 2" },
  { src: "/images/photo3.jpg", alt: "Photo 3", caption: "Caption 3" },
];

describe("GalleryLightbox", () => {
  const defaultProps = {
    images: mockImages,
    currentIndex: 0,
    onClose: vi.fn(),
    onPrev: vi.fn(),
    onNext: vi.fn(),
  };

  it("renders when currentIndex is valid", () => {
    render(<GalleryLightbox {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("returns null when currentIndex is -1", () => {
    const { container } = render(<GalleryLightbox {...defaultProps} currentIndex={-1} />);
    expect(container.innerHTML).toBe("");
  });

  it("displays the current image caption", () => {
    render(<GalleryLightbox {...defaultProps} />);
    expect(screen.getByText("Caption 1")).toBeInTheDocument();
  });

  it("displays the image counter", () => {
    render(<GalleryLightbox {...defaultProps} />);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<GalleryLightbox {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close image viewer"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onPrev when prev button is clicked", () => {
    const onPrev = vi.fn();
    // Start at index 1 so prev button is visible
    render(<GalleryLightbox {...defaultProps} currentIndex={1} onPrev={onPrev} />);
    fireEvent.click(screen.getByLabelText("Previous image"));
    expect(onPrev).toHaveBeenCalled();
  });

  it("calls onNext when next button is clicked", () => {
    const onNext = vi.fn();
    render(<GalleryLightbox {...defaultProps} onNext={onNext} />);
    fireEvent.click(screen.getByLabelText("Next image"));
    expect(onNext).toHaveBeenCalled();
  });

  it("hides prev button on first image", () => {
    render(<GalleryLightbox {...defaultProps} currentIndex={0} />);
    expect(screen.queryByLabelText("Previous image")).not.toBeInTheDocument();
  });

  it("hides next button on last image", () => {
    render(<GalleryLightbox {...defaultProps} currentIndex={2} />);
    expect(screen.queryByLabelText("Next image")).not.toBeInTheDocument();
  });

  it("has correct aria-modal attribute", () => {
    render(<GalleryLightbox {...defaultProps} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });
});
