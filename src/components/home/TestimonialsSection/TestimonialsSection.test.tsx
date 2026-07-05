import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestimonialsSection } from "./TestimonialsSection";
import type { TestimonialData } from "@/domains/homepage/homepage.data";

const mockTestimonials: TestimonialData[] = [
  {
    quote: "The values and education I received here shaped who I am today.",
    attribution: "Alumni, Class of 1998",
    role: "alumni" as const,
  },
  {
    quote: "My children love coming to school every day. The teachers are wonderful.",
    attribution: "Parent",
    role: "parent" as const,
  },
  {
    quote: "I have grown academically and personally during my time here.",
    attribution: "Student, Class 12",
    role: "student" as const,
  },
];

describe("TestimonialsSection", () => {
  it("renders the section with default aria-label", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    expect(screen.getByRole("region", { name: /testimonials/i })).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /voices from our community/i }),
    ).toBeInTheDocument();
  });

  it("renders all testimonials as blockquotes with quotes and attributions", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    for (const t of mockTestimonials) {
      // The component uses \u201c (curly quote) on each side
      expect(screen.getByText(`“${t.quote}”`)).toBeInTheDocument();
      expect(screen.getByText(t.attribution)).toBeInTheDocument();
    }
  });

  it("renders the testimonial roles", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    expect(screen.getByText("Alumni, Class of 1998")).toBeInTheDocument();
  });

  it("limits display to 3 testimonials", () => {
    const manyTestimonials = [
      ...mockTestimonials,
      {
        quote: "A great school that nurtures every child.",
        attribution: "Teacher",
        role: "teacher" as const,
      },
    ];
    render(<TestimonialsSection testimonials={manyTestimonials} />);
    const quotes = screen.getAllByRole("blockquote");
    expect(quotes.length).toBe(3);
  });

  it("uses semantic blockquote for each testimonial", () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />);
    const blockquotes = screen.getAllByRole("blockquote");
    expect(blockquotes.length).toBe(3);
  });
});
