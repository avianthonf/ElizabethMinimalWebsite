import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useScrollLock, lockBodyScroll, unlockBodyScroll } from "../use-scroll-lock";

function TestComponent({ locked }: { locked: boolean }) {
  useScrollLock(locked);
  return <div>Test Component</div>;
}

describe("use-scroll-lock", () => {
  beforeEach(() => {
    // Reset body overflow style before each test
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  afterEach(() => {
    // Clean up after each test
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  describe("useScrollLock hook", () => {
    it("should lock body scroll when locked is true", () => {
      render(<TestComponent locked={true} />);

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should unlock body scroll when locked is false", () => {
      const { rerender } = render(<TestComponent locked={true} />);
      expect(document.body.style.overflow).toBe("hidden");

      rerender(<TestComponent locked={false} />);
      expect(document.body.style.overflow).toBe("");
    });

    it("should unlock on unmount", () => {
      const { unmount } = render(<TestComponent locked={true} />);
      expect(document.body.style.overflow).toBe("hidden");

      unmount();
      expect(document.body.style.overflow).toBe("");
    });

    it("should handle multiple components with reference counting", () => {
      const { unmount: unmount1 } = render(<TestComponent locked={true} />);
      const { unmount: unmount2 } = render(<TestComponent locked={true} />);

      expect(document.body.style.overflow).toBe("hidden");

      // Unmount first, body should still be locked
      unmount1();
      expect(document.body.style.overflow).toBe("hidden");

      // Unmount second, body should now unlock
      unmount2();
      expect(document.body.style.overflow).toBe("");
    });

    it("should compensate for scrollbar width when locking", () => {
      // Mock scrollbar width
      Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
      Object.defineProperty(document.documentElement, "clientWidth", {
        value: 1008,
        writable: true,
      });

      render(<TestComponent locked={true} />);

      // Should add padding equal to scrollbar width (1024 - 1008 = 16px)
      expect(document.body.style.paddingRight).toBeTruthy();
    });
  });

  describe("lockBodyScroll and unlockBodyScroll functions", () => {
    it("should lock body scroll", () => {
      lockBodyScroll();
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should unlock body scroll", () => {
      lockBodyScroll();
      unlockBodyScroll();
      expect(document.body.style.overflow).toBe("");
    });

    it("should use reference counting", () => {
      lockBodyScroll(); // count = 1
      lockBodyScroll(); // count = 2

      expect(document.body.style.overflow).toBe("hidden");

      unlockBodyScroll(); // count = 1
      expect(document.body.style.overflow).toBe("hidden");

      unlockBodyScroll(); // count = 0
      expect(document.body.style.overflow).toBe("");
    });

    it("should not go below zero", () => {
      unlockBodyScroll();
      unlockBodyScroll();
      unlockBodyScroll();

      expect(document.body.style.overflow).toBe("");
    });

    it("should preserve existing padding-right", () => {
      document.body.style.paddingRight = "10px";

      lockBodyScroll();
      const lockedPadding = document.body.style.paddingRight;

      unlockBodyScroll();
      expect(document.body.style.paddingRight).toBe("10px");
    });
  });

  describe("scrollbar width compensation", () => {
    it("should not add padding when no scrollbar present", () => {
      // Mock no scrollbar
      Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
      Object.defineProperty(document.documentElement, "clientWidth", {
        value: 1024,
        writable: true,
      });

      lockBodyScroll();

      expect(document.body.style.paddingRight).toBe("");
    });

    it("should remove padding compensation on unlock", () => {
      Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
      Object.defineProperty(document.documentElement, "clientWidth", {
        value: 1008,
        writable: true,
      });

      lockBodyScroll();
      expect(document.body.style.paddingRight).toBeTruthy();

      unlockBodyScroll();
      expect(document.body.style.paddingRight).toBe("");
    });
  });
});
