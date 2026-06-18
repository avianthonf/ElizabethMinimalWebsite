import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GalleryCard } from "./GalleryCard";

describe("GalleryCard", () => {
  const defaultProps = {
    image: "/images/test.jpg",
    imageAlt: "Test image",
    title: "Test Photo",
    index: 0,
    onSelect: vi.fn(),
    isVisible: true,
    filterActive: true,
  };

  it("renders the image with correct alt text", () => {
    render(<GalleryCard {...defaultProps} />);
    expect(screen.getByAltText("Test image")).toBeInTheDocument();
  });

  it("renders the title text", () => {
    render(<GalleryCard {...defaultProps} />);
    expect(screen.getByText("Test Photo")).toBeInTheDocument();
  });

  it("has role='button' for keyboard accessibility", () => {
    render(<GalleryCard {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(<GalleryCard {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it("calls onSelect on Enter key press", () => {
    const onSelect = vi.fn();
    render(<GalleryCard {...defaultProps} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it("calls onSelect on Space key press", () => {
    const onSelect = vi.fn();
    render(<GalleryCard {...defaultProps} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole("button"), { key: " " });
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it("renders subcategory pill when provided", () => {
    render(<GalleryCard {...defaultProps} subCategory="Academics" />);
    expect(screen.getByText("Academics")).toBeInTheDocument();
  });

  it("renders date pill when subCategory is not provided", () => {
    render(<GalleryCard {...defaultProps} date="Spring 2025" />);
    expect(screen.getByText("Spring 2025")).toBeInTheDocument();
  });

  it("applies visible class when isVisible is true", () => {
    const { container } = render(<GalleryCard {...defaultProps} isVisible={true} />);
    expect(container.firstElementChild?.className).toMatch(/visible/);
  });

  it("applies filteredOut class when filterActive is false", () => {
    const { container } = render(<GalleryCard {...defaultProps} filterActive={false} />);
    expect(container.firstElementChild?.className).toMatch(/filteredOut/);
  });
});
