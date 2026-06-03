import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders footer element", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders link sections", () => {
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

  it("renders intro content", () => {
    render(
      <Footer
        intro={{ heading: "St. Elizabeth", body: "A school community." }}
      />,
    );
    expect(screen.getByText("St. Elizabeth")).toBeInTheDocument();
    expect(screen.getByText("A school community.")).toBeInTheDocument();
  });

  it("renders copyright", () => {
    render(<Footer copyright="© 2026 St. Elizabeth High School" />);
    expect(screen.getByText("© 2026 St. Elizabeth High School")).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(
      <Footer
        socialLinks={[
          { platform: "Instagram", href: "https://instagram.com" },
          { platform: "Facebook", href: "https://facebook.com" },
        ]}
      />,
    );
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
  });
});
