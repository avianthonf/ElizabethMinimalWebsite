import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// ── window.matchMedia mock ──────────────────────────────────────────────
// Used by SmoothScrollProvider and ScrollReveal to detect reduced-motion preference.
// Default: matches everything (acts like a desktop with motion enabled). Tests that
// need a narrow/mobile viewport or reduced-motion should override per-test.

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

// ── ResizeObserver mock ─────────────────────────────────────────────────
// Required by GSAP / ZProximityEngine to measure element bounds.
// jsdom does not implement this API, so we provide a no-op stub.

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
});

// ── IntersectionObserver mock ───────────────────────────────────────────
// Required by GSAP's ScrollTrigger and ZProximityEngine visibility checks.
// jsdom does not implement this API, so we provide a no-op stub.

class IntersectionObserverMock {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "0px";
  readonly thresholds: ReadonlyArray<number> = [0];

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _callback: IntersectionObserverCallback,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options?: IntersectionObserverInit,
  ) {}

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// ── requestAnimationFrame mock ──────────────────────────────────────────
// GSAP uses rAF internally. Vitest's fake timers may interfere, so we
// provide a real-ish passthrough that uses setTimeout to keep the event
// loop running.

if (typeof window.requestAnimationFrame === "undefined") {
  window.requestAnimationFrame = (cb: FrameRequestCallback) =>
    window.setTimeout(() => cb(Date.now()), 16);
  window.cancelAnimationFrame = (id: number) => window.clearTimeout(id);
}
