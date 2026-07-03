import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { renderHighlightedText } from "./safe-html";

describe("renderHighlightedText", () => {
  it("returns empty string for empty input", () => {
    const { container } = render(<>{renderHighlightedText("")}</>);
    expect(container.textContent).toBe("");
  });

  it("renders plain text without any marks", () => {
    const { container } = render(<>{renderHighlightedText("Hello world")}</>);
    expect(container.textContent).toBe("Hello world");
    expect(container.querySelectorAll("mark").length).toBe(0);
  });

  it("renders text with a single mark as highlighted span", () => {
    const { container } = render(<>{renderHighlightedText("Hello <mark>world</mark>")}</>);
    const mark = container.querySelector("mark");
    expect(mark).not.toBeNull();
    expect(mark?.textContent).toBe("world");
    expect(container.textContent).toBe("Hello world");
  });

  it("renders multiple marks", () => {
    const { container } = render(
      <>{renderHighlightedText("<mark>one</mark> and <mark>two</mark>")}</>,
    );
    const marks = container.querySelectorAll("mark");
    expect(marks.length).toBe(2);
    expect(marks[0].textContent).toBe("one");
    expect(marks[1].textContent).toBe("two");
    expect(container.textContent).toBe("one and two");
  });

  it("strips script tags and renders as text (XSS prevention)", () => {
    const { container } = render(
      <>{renderHighlightedText("<script>alert('xss')</script>safe")}</>,
    );
    expect(container.querySelector("script")).toBeNull();
    expect(container.textContent).toBe("safe");
  });

  it("strips event handler attributes by rendering as text", () => {
    const { container } = render(
      <>{renderHighlightedText('<img src=x onerror="alert(1)">ok')}</>,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container.textContent).toBe("ok");
  });

  it("strips iframe and other dangerous tags", () => {
    const { container } = render(
      <>{renderHighlightedText('<iframe src="evil.com"></iframe>safe')}</>,
    );
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.textContent).toBe("safe");
  });

  it("decodes common HTML entities", () => {
    const { container } = render(<>{renderHighlightedText("&amp; &lt; &gt; &quot;")}</>);
    expect(container.textContent).toBe('& < > "');
  });

  it("strips nested tags inside <mark>", () => {
    const { container } = render(
      <>{renderHighlightedText("<mark><b>bold match</b></mark>")}</>,
    );
    const mark = container.querySelector("mark");
    expect(mark).not.toBeNull();
    expect(mark?.textContent).toBe("bold match");
    expect(mark?.querySelector("b")).toBeNull();
  });

  it("handles text before and after marks correctly", () => {
    const { container } = render(
      <>{renderHighlightedText("before <mark>match</mark> after")}</>,
    );
    expect(container.textContent).toBe("before match after");
  });
});
