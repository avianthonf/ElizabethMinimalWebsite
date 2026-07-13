import { describe, it, expect } from "vitest";
import { safeJsonStringify } from "./safe-json";

describe("safeJsonStringify", () => {
  it("serializes a plain object identically to JSON.stringify", () => {
    expect(safeJsonStringify({ a: 1, b: "hello" })).toBe(JSON.stringify({ a: 1, b: "hello" }));
  });

  it("escapes </script> to prevent HTML script tag breakout", () => {
    const result = safeJsonStringify({
      title: "Test",
      content: "</script><script>alert(1)</script>",
    });
    // Only '<' is escaped — preventing '</' which closes script tags
    expect(result).toContain("\\u003c/script");
    // The unescaped '</script>' sequence must NOT appear
    expect(result).not.toMatch(/<\/script>/);
  });

  it("escapes < in any context", () => {
    expect(safeJsonStringify({ html: "<div>" })).toContain("\\u003cdiv>");
    // '>' alone is harmless inside a script tag string — only '</' matters
    expect(safeJsonStringify({ html: "<div>" })).not.toContain("\\u003e");
  });

  it("handles arrays", () => {
    expect(safeJsonStringify([1, "</script>"])).toContain("\\u003c/script");
  });

  it("handles nested objects", () => {
    const result = safeJsonStringify({
      nested: { value: "</script>" },
    });
    expect(result).toContain("\\u003c/script");
    expect(result).not.toMatch(/<\/script>/);
  });

  it("handles null and undefined (undefined becomes absent)", () => {
    expect(safeJsonStringify(null)).toBe("null");
    // undefined values are omitted by JSON.stringify
    expect(safeJsonStringify({ a: undefined })).toBe("{}");
  });

  it("escapes < in nested objects to prevent script tag breakout", () => {
    const result = safeJsonStringify({
      nested: { value: "</script><script>alert(1)</script>" },
    });
    expect(result).toContain("\\u003c/script");
    expect(result).not.toMatch(/<\/script>/);
  });
});
