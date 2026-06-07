import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { HorizontalScroll } from "./HorizontalScroll";
import { HorizontalPage } from "./HorizontalPage";

/**
 * List of ResizeObserverMock instances created during a test.
 * Using an array avoids both "no-this-alias" and "no-explicit-any"
 * because we never have to cast the global assignment.
 */
const resizeInstances: ResizeObserverMock[] = [];

class ResizeObserverMock implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_callback: ResizeObserverCallback) {
    resizeInstances.push(this);
  }
}

global.ResizeObserver = ResizeObserverMock;

type MockInstance = Pick<ResizeObserverMock, "observe" | "unobserve" | "disconnect"> | null;

/** Return the last created (or current) mock instance, or null if none. */
function getLastInstance(): MockInstance {
  return resizeInstances.at(-1) ?? null;
}

describe("HorizontalScroll", () => {
  beforeEach(() => {
    resizeInstances.length = 0;
  });
  it("applies pinned stage CSS variables", () => {
    render(
      <HorizontalScroll height="72vh" gap="24px" ariaLabel="Feature scroller">
        <article>First panel</article>
        <article>Second panel</article>
      </HorizontalScroll>,
    );

    expect(screen.getByLabelText("Feature scroller")).toHaveStyle({
      "--horizontal-scroll-height": "72vh",
      "--horizontal-scroll-gap": "24px",
    });
  });

  it("renders children inside one vertical-driven horizontal stage", () => {
    render(
      <HorizontalScroll ariaLabel="Reusable horizontal section">
        <article>Video panel</article>
        <article>Dynamic panel</article>
      </HorizontalScroll>,
    );

    expect(screen.getByLabelText("Reusable horizontal section")).toBeInTheDocument();
    expect(screen.getByText("Video panel")).toBeInTheDocument();
    expect(screen.getByText("Dynamic panel")).toBeInTheDocument();
  });

  it("translates the track when vertical scroll progresses", () => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });

    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });

    render(
      <HorizontalScroll ariaLabel="Measured stage">
        <article>First panel</article>
        <article>Second panel</article>
      </HorizontalScroll>,
    );

    const stage = screen.getByLabelText("Measured stage");
    const viewport = stage.firstElementChild as HTMLDivElement;
    const track = viewport.firstElementChild as HTMLDivElement;

    Object.defineProperty(viewport, "clientWidth", { configurable: true, value: 1000 });
    Object.defineProperty(viewport, "clientHeight", { configurable: true, value: 800 });
    Object.defineProperty(track, "scrollWidth", { configurable: true, value: 1800 });
    vi.spyOn(stage, "getBoundingClientRect").mockReturnValue({
      bottom: 1600,
      height: 1600,
      left: 0,
      right: 1000,
      top: -400,
      width: 1000,
      x: 0,
      y: -400,
      toJSON: () => ({}),
    });

    act(() => {
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("scroll"));
    });

    expect(track).toHaveStyle({ transform: "translate3d(-400px, 0, 0)" });
  });
});

// ── Integration: HorizontalScroll + HorizontalPage composition ────

describe("HorizontalScroll + HorizontalPage composition", () => {
  it("renders multiple HorizontalPage children inside the track", () => {
    render(
      <HorizontalScroll ariaLabel="Multi-page scroller">
        <HorizontalPage screen ariaLabel="Page One">
          <h2>First Page</h2>
        </HorizontalPage>
        <HorizontalPage screen ariaLabel="Page Two">
          <h2>Second Page</h2>
        </HorizontalPage>
        <HorizontalPage screen ariaLabel="Page Three">
          <h2>Third Page</h2>
        </HorizontalPage>
      </HorizontalScroll>,
    );

    // All three pages should be present by aria-label
    expect(screen.getByLabelText("Page One")).toBeInTheDocument();
    expect(screen.getByLabelText("Page Two")).toBeInTheDocument();
    expect(screen.getByLabelText("Page Three")).toBeInTheDocument();

    // All headings should be present
    expect(screen.getByText("First Page")).toBeInTheDocument();
    expect(screen.getByText("Second Page")).toBeInTheDocument();
    expect(screen.getByText("Third Page")).toBeInTheDocument();
  });

  it("has aria-roledescription='carousel' on the stage", () => {
    render(
      <HorizontalScroll ariaLabel="Carousel region">
        <HorizontalPage screen ariaLabel="Panel A">
          <p>A</p>
        </HorizontalPage>
      </HorizontalScroll>,
    );

    const stage = screen.getByRole("region", { name: "Carousel region" });
    expect(stage.getAttribute("aria-roledescription")).toBe("carousel");
  });

  it("renders scroll navigation buttons", () => {
    render(
      <HorizontalScroll ariaLabel="Scrollable section">
        <HorizontalPage screen ariaLabel="Panel 1">
          <p>One</p>
        </HorizontalPage>
        <HorizontalPage screen ariaLabel="Panel 2">
          <p>Two</p>
        </HorizontalPage>
      </HorizontalScroll>,
    );

    const prevBtn = screen.getByLabelText("Scroll to previous panel");
    const nextBtn = screen.getByLabelText("Scroll to next panel");

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn.tagName).toBe("BUTTON");
    expect(nextBtn.tagName).toBe("BUTTON");
  });

  it("scroll buttons call window.scrollTo when clicked", () => {
    const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    // Mock measurements so scrollByPanel has a non-zero travel distance
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 1;
    });

    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });

    render(
      <HorizontalScroll ariaLabel="Nav scroll section">
        <HorizontalPage screen ariaLabel="Panel A">
          <p>First</p>
        </HorizontalPage>
        <HorizontalPage screen ariaLabel="Panel B">
          <p>Second</p>
        </HorizontalPage>
      </HorizontalScroll>,
    );

    const stage = screen.getByLabelText("Nav scroll section");
    const viewport = stage.firstElementChild as HTMLDivElement;
    const track = viewport.firstElementChild as HTMLDivElement;

    Object.defineProperty(viewport, "clientWidth", { configurable: true, value: 1000 });
    Object.defineProperty(viewport, "clientHeight", { configurable: true, value: 800 });
    Object.defineProperty(track, "scrollWidth", { configurable: true, value: 1800 });
    vi.spyOn(stage, "getBoundingClientRect").mockReturnValue({
      bottom: 800,
      height: 1600,
      left: 0,
      right: 1000,
      top: -400,
      width: 1000,
      x: 0,
      y: -400,
      toJSON: () => ({}),
    });

    // Trigger measure so scroll buttons have real state
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    const nextBtn = screen.getByLabelText("Scroll to next panel");
    fireEvent.click(nextBtn);

    expect(scrollSpy).toHaveBeenCalled();

    scrollSpy.mockRestore();
  });
});

// ── ResizeObserver Integration ────────────────────────────────────

describe("HorizontalScroll ResizeObserver behavior", () => {
  beforeEach(() => {
    resizeInstances.length = 0;
  });

  it("should observe track element for dimension changes", () => {
    render(
      <HorizontalScroll ariaLabel="Observed scroller">
        <article>Panel content</article>
      </HorizontalScroll>,
    );

    const stage = screen.getByLabelText("Observed scroller");
    const viewport = stage.firstElementChild as HTMLDivElement;
    const track = viewport.firstElementChild as HTMLDivElement;

    expect(getLastInstance()).not.toBeNull();
    expect(getLastInstance()!.observe).toHaveBeenCalledWith(track);
  });

  it("should disconnect observer on unmount", () => {
    const { unmount } = render(
      <HorizontalScroll ariaLabel="Temporary scroller">
        <article>Panel content</article>
      </HorizontalScroll>,
    );

    expect(getLastInstance()).not.toBeNull();
    const instance = getLastInstance()!;

    unmount();

    expect(instance.disconnect).toHaveBeenCalled();
  });

  it("should create ResizeObserver instance when component mounts", () => {
    render(
      <HorizontalScroll ariaLabel="Mounted scroller">
        <article>Panel content</article>
      </HorizontalScroll>,
    );

    expect(getLastInstance()).not.toBeNull();
    expect(getLastInstance()!.observe).toHaveBeenCalledTimes(1);
  });
});
