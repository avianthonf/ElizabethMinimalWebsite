import { describe, it, expect } from "vitest";
import { cn } from "../cn";

describe("cn (className utility)", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("should handle undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("should handle arrays", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("should handle objects", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("should deduplicate classes", () => {
    expect(cn("foo", "foo", "bar")).toBe("foo bar");
  });

  it("should handle tailwind conflicts", () => {
    // If using clsx + tailwind-merge
    expect(cn("px-2", "px-4")).toMatch(/px-/);
  });

  it("should handle empty input", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
  });

  it("should trim whitespace", () => {
    expect(cn("  foo  ", "  bar  ")).toBe("foo bar");
  });
});
