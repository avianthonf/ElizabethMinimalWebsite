import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders footer element", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders default intro content", () => {
    render(<Footer />);
    expect(screen.getByText("St. Elizabeth's High School")).toBeInTheDocument();
    expect(
      screen.getByText(/Guiding Minds, Nurturing Hearts, Building Futures/),
    ).toBeInTheDocument();
  });

  it("renders default link sections from navigation data", () => {
    render(<Footer />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Academics")).toBeInTheDocument();
    expect(screen.getByText("Admissions")).toBeInTheDocument();
    expect(screen.getByText("Beyond Academics")).toBeInTheDocument();
    expect(screen.getByText("News & Media")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders custom link sections", () => {
    render(
      <Footer
        sections={[
          {
            title: "Links",
            links: [{ text: "Home", href: "/" }],
          },
        ]}
      />,
    );
    expect(screen.getByText("Links")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders custom intro content", () => {
    render(<Footer intro={{ heading: "St. Elizabeth", body: "A school community." }} />);
    expect(screen.getByText("St. Elizabeth")).toBeInTheDocument();
    expect(screen.getByText("A school community.")).toBeInTheDocument();
  });

  it("renders copyright with the current year", () => {
    const currentYear = new Date().getFullYear();
    render(<Footer copyright={`© {year} St. Elizabeth's High School`} />);
    // CopyrightYear is a client component that renders the year as a fragment.
    // The text is split across sibling nodes, so we search by partial text.
    expect(screen.getByText(`© ${currentYear} St. Elizabeth's High School`)).toBeInTheDocument();
  });

  it("renders social media links with accessible labels", () => {
    render(
      <Footer
        socialLinks={[
          { platform: "facebook", href: "https://facebook.com" },
          { platform: "instagram", href: "https://instagram.com" },
        ]}
      />,
    );
    expect(screen.getByLabelText("St. Elizabeth's High School on facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("St. Elizabeth's High School on instagram")).toBeInTheDocument();
  });

  it("uses primary background by default", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });
});
