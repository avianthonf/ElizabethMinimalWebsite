import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AdmissionsCTA } from "./AdmissionsCTA";
import type { AdmissionsStep } from "@/data/homepage-sections";

const mockSteps: AdmissionsStep[] = [
  { step: 1, title: "Inquire", description: "Submit an inquiry form", href: "/admissions/why" },
  { step: 2, title: "Visit", description: "Schedule a campus tour", href: "/contact" },
  { step: 3, title: "Apply", description: "Complete the application", href: "/admissions/apply" },
];

describe("AdmissionsCTA", () => {
  it("renders the section with proper ARIA label", () => {
    render(
      <AdmissionsCTA
        steps={mockSteps}
        heading="Begin Your Journey"
        description="Join our community of learners."
        primaryCtaText="Apply Now"
        primaryCtaHref="/admissions/apply"
      />,
    );
    expect(screen.getByRole("region", { name: /admissions/i })).toBeInTheDocument();
  });

  it("renders the heading and description", () => {
    render(
      <AdmissionsCTA
        steps={mockSteps}
        heading="Begin Your Journey"
        description="Join our community of learners."
        primaryCtaText="Apply Now"
        primaryCtaHref="/admissions/apply"
      />,
    );
    expect(screen.getByRole("heading", { level: 2, name: /begin your journey/i })).toBeInTheDocument();
    expect(screen.getByText(/community of learners/i)).toBeInTheDocument();
  });

  it("renders all 3 step cards with titles and descriptions", () => {
    render(
      <AdmissionsCTA
        steps={mockSteps}
        heading="Begin Your Journey"
        description="Apply now."
        primaryCtaText="Apply Now"
        primaryCtaHref="/admissions/apply"
      />,
    );
    for (const step of mockSteps) {
      expect(screen.getByRole("heading", { level: 3, name: step.title })).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    }
  });

  it("renders step numbers", () => {
    render(
      <AdmissionsCTA
        steps={mockSteps}
        heading="Begin Your Journey"
        description="Apply now."
        primaryCtaText="Apply Now"
        primaryCtaHref="/admissions/apply"
      />,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders the primary CTA", () => {
    render(
      <AdmissionsCTA
        steps={mockSteps}
        heading="Begin Your Journey"
        description="Apply now."
        primaryCtaText="Apply Now"
        primaryCtaHref="/admissions/apply"
      />,
    );
    const cta = screen.getByRole("link", { name: /apply now/i });
    expect(cta).toHaveAttribute("href", "/admissions/apply");
  });

  it("renders step cards as links to their respective hrefs", () => {
    render(
      <AdmissionsCTA
        steps={mockSteps}
        heading="Begin Your Journey"
        description="Apply now."
        primaryCtaText="Apply Now"
        primaryCtaHref="/admissions/apply"
      />,
    );
    expect(screen.getByRole("link", { name: /^1.*inquire/i })).toHaveAttribute("href", "/admissions/why");
    expect(screen.getByRole("link", { name: /^2.*visit/i })).toHaveAttribute("href", "/contact");
    // 'apply' appears in step 3 and the primary CTA, so use the heading-scoped query
    expect(screen.getByRole("heading", { level: 3, name: "Apply" }).closest("a")).toHaveAttribute(
      "href",
      "/admissions/apply",
    );
  });
});
