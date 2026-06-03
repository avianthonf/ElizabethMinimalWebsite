import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ImageCard } from "./ImageCard";

// Mock next/image — it renders an img with the same alt/aria attributes
vi.mock("next/image", () => ({
  default: ({ src, alt, fill, className, sizes }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={String(src)} alt={String(alt ?? "")} className={String(className ?? "")} data-fill={String(fill)} data-sizes={String(sizes ?? "")} />
  ),
}));

describe("ImageCard", () => {
  it("renders image, title, and description", () => {
    render(
      <ImageCard
        image="/images/campus.jpg"
        imageAlt="School campus"
        title="Our Campus"
        description="Beautiful grounds."
      />,
    );
    expect(screen.getByAltText("School campus")).toBeInTheDocument();
    expect(screen.getByText("Our Campus")).toBeInTheDocument();
    expect(screen.getByText("Beautiful grounds.")).toBeInTheDocument();
  });

  it("renders as link when href provided", () => {
    render(
      <ImageCard
        image="/images/library.jpg"
        imageAlt="Library"
        title="Library"
        href="/library"
      />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/library");
  });
});
