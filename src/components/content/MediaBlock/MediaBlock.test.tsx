import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MediaBlock } from "./MediaBlock";

vi.mock("next/image", () => ({
  default: ({ src, alt, className }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={String(src)} alt={String(alt ?? "")} className={String(className ?? "")} />
  ),
}));

describe("MediaBlock", () => {
  it("renders image, heading, and description", () => {
    render(
      <MediaBlock
        mediaType="image"
        mediaSrc="/images/campus.jpg"
        mediaAlt="Campus"
        heading="Our Campus"
        description="Beautiful 40-acre campus."
      />,
    );
    expect(screen.getByAltText("Campus")).toBeInTheDocument();
    expect(screen.getByText("Our Campus")).toBeInTheDocument();
    expect(screen.getByText("Beautiful 40-acre campus.")).toBeInTheDocument();
  });

  it("renders CTA when provided", () => {
    render(
      <MediaBlock
        mediaType="image"
        mediaSrc="/images/tour.jpg"
        mediaAlt="Tour"
        heading="Visit Us"
        description="Come see our school."
        cta={{ text: "Schedule Visit", href: "/visit" }}
      />,
    );
    expect(screen.getByText("Schedule Visit")).toBeInTheDocument();
  });

  it("renders video when mediaType is video", () => {
    const { container } = render(
      <MediaBlock
        mediaType="video"
        mediaSrc="/videos/tour.mp4"
        mediaAlt="Video tour"
        heading="Video Tour"
        description="Watch our campus tour."
      />,
    );
    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();
  });
});
