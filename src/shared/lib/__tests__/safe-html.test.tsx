import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderHighlightedText } from "../safe-html";

describe("safe-html", () => {
  describe("renderHighlightedText", () => {
    it("should render plain text without markup", () => {
      const result = renderHighlightedText("Hello world");
      render(<div>{result}</div>);
      expect(screen.getByText("Hello world")).toBeInTheDocument();
    });

    it("should convert Pagefind <mark> to React components", () => {
      const html = "This is <mark>highlighted</mark> text";
      const result = renderHighlightedText(html);
      render(<div>{result}</div>);

      expect(screen.getByText("highlighted")).toBeInTheDocument();
    });

    it("should sanitize dangerous HTML", () => {
      const dangerousHtml = 'Click <script>alert("xss")</script> here';
      const result = renderHighlightedText(dangerousHtml);
      render(<div>{result}</div>);

      // Script tag should be removed
      expect(screen.queryByText(/alert/)).not.toBeInTheDocument();
    });

    it("should remove onclick and other event handlers", () => {
      const html = '<span onclick="alert(1)">Click me</span>';
      const result = renderHighlightedText(html);
      render(<div>{result}</div>);

      const element = screen.getByText("Click me");
      expect(element.getAttribute("onclick")).toBeNull();
    });

    it("should preserve safe HTML entities", () => {
      const html = "Price: &pound;100 &amp; &euro;200";
      const result = renderHighlightedText(html);
      render(<div>{result}</div>);

      expect(screen.getByText(/Price:/)).toBeInTheDocument();
    });

    it("should handle nested marks", () => {
      const html = "<mark>Hello <mark>world</mark></mark>";
      const result = renderHighlightedText(html);
      render(<div>{result}</div>);

      expect(screen.getByText(/Hello/)).toBeInTheDocument();
      expect(screen.getByText(/world/)).toBeInTheDocument();
    });

    it("should handle empty string", () => {
      const result = renderHighlightedText("");
      render(<div>{result}</div>);

      expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
    });

    it("should strip style attributes", () => {
      const html = '<span style="color: red;">Red text</span>';
      const result = renderHighlightedText(html);
      render(<div>{result}</div>);

      const element = screen.getByText("Red text");
      expect(element.getAttribute("style")).toBeNull();
    });

    it("should remove javascript: URLs", () => {
      const html = '<a href="javascript:alert(1)">Link</a>';
      const result = renderHighlightedText(html);
      render(<div>{result}</div>);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("should handle multiple marks in one string", () => {
      const html = "<mark>First</mark> and <mark>second</mark> highlighted";
      const result = renderHighlightedText(html);
      render(<div>{result}</div>);

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("second")).toBeInTheDocument();
    });

    it("should preserve apostrophes and quotes", () => {
      const html = 'St. Elizabeth\'s "Best School" in Goa';
      const result = renderHighlightedText(html);
      render(<div>{result}</div>);

      expect(screen.getByText(/St\. Elizabeth's/)).toBeInTheDocument();
      expect(screen.getByText(/"Best School"/)).toBeInTheDocument();
    });
  });
});
