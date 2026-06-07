import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// ── window.matchMedia mock ──────────────────────────────────────────────
// Required by the responsive layout hook (src/hooks/useIsDesktop.ts).
// Default: matches everything (acts like a very wide desktop). Tests that
// need a narrow/mobile viewport should override per-test.

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    // Default: act like a desktop viewport so existing tests that
    // expect the horizontal layout keep passing.
    matches: true,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
