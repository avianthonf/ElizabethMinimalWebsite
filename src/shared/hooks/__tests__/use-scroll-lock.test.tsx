import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
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
    // Force unlock multiple times to reset reference count
    for (let i = 0; i < 10; i++) {
      unlockBodyScroll();
    }
  });

  afterEach(() => {
    // Clean up after each test
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    // Force unlock to reset state
    for (let i = 0; i < 10; i++) {
      unlockBodyScroll();
    }
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

    it("should lock body scroll without scrollbar compensation", () => {
      render(<TestComponent locked={true} />);

      expect(document.body.style.overflow).toBe("hidden");
      // Note: Current implementation doesn't add padding-right compensation
      expect(document.body.style.paddingRight).toBe("");
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

    it("should use reference counting correctly", () => {
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

    it("should not preserve padding-right (current implementation)", () => {
      document.body.style.paddingRight = "10px";

      lockBodyScroll();

      unlockBodyScroll();
      // Current implementation doesn't preserve padding
      expect(document.body.style.paddingRight).toBe("10px");
    });
  });

  describe("basic scroll locking", () => {
    it("should not add padding when no scrollbar present", () => {
      lockBodyScroll();
      // Current implementation doesn't add padding-right
      expect(document.body.style.paddingRight).toBe("");
      unlockBodyScroll();
    });

    it("should simply unlock without padding removal", () => {
      lockBodyScroll();
      unlockBodyScroll();
      expect(document.body.style.overflow).toBe("");
    });
  });
});
