import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GalleryFilter } from "./GalleryFilter";

describe("GalleryFilter", () => {
  it("renders all category buttons", () => {
    render(<GalleryFilter active="All" onChange={vi.fn()} />);
    expect(screen.getByRole("tab", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Academics" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Athletics" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Community" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Student Life" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "General" })).toBeInTheDocument();
  });

  it("marks the active tab with aria-selected", () => {
    render(<GalleryFilter active="Academics" onChange={vi.fn()} />);
    expect(screen.getByRole("tab", { name: "Academics" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "All" })).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange when a tab is clicked", () => {
    const onChange = vi.fn();
    render(<GalleryFilter active="All" onChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: "Athletics" }));
    expect(onChange).toHaveBeenCalledWith("Athletics");
  });

  it("has role='tablist' with accessible label", () => {
    render(<GalleryFilter active="All" onChange={vi.fn()} />);
    expect(screen.getByRole("tablist")).toHaveAttribute("aria-label", "Filter gallery by category");
  });
});
