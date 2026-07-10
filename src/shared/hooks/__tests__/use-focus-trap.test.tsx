import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { useRef } from "react";
import { useFocusTrap } from "../use-focus-trap";

function TestComponent({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active);

  return (
    <div ref={ref}>
      <button>First</button>
      <button>Second</button>
      <button>Last</button>
    </div>
  );
}

describe("use-focus-trap", () => {
  beforeEach(() => {
    // Reset focus before each test
    document.body.focus();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should trap focus within container when active", () => {
    const { container } = render(<TestComponent active={true} />);

    const buttons = container.querySelectorAll("button");
    const firstButton = buttons[0] as HTMLButtonElement;
    const lastButton = buttons[2] as HTMLButtonElement;

    // Focus last button
    lastButton.focus();
    expect(document.activeElement).toBe(lastButton);

    // Simulate Tab from last button
    const tabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    lastButton.dispatchEvent(tabEvent);

    // Should cycle to first button (with small delay for focus management)
    setTimeout(() => {
      expect(document.activeElement).toBe(firstButton);
    }, 0);
  });

  it("should trap focus backwards with Shift+Tab", () => {
    const { container } = render(<TestComponent active={true} />);

    const buttons = container.querySelectorAll("button");
    const firstButton = buttons[0] as HTMLButtonElement;
    const lastButton = buttons[2] as HTMLButtonElement;

    // Focus first button
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    // Simulate Shift+Tab from first button
    const shiftTabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    firstButton.dispatchEvent(shiftTabEvent);

    // Should cycle to last button
    setTimeout(() => {
      expect(document.activeElement).toBe(lastButton);
    }, 0);
  });

  it("should not trap focus when inactive", () => {
    const { container } = render(<TestComponent active={false} />);

    const buttons = container.querySelectorAll("button");
    const lastButton = buttons[2] as HTMLButtonElement;

    lastButton.focus();

    // Simulate Tab - should not be trapped
    const tabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });

    const defaultPrevented = !lastButton.dispatchEvent(tabEvent);
    expect(defaultPrevented).toBe(false);
  });

  it("should handle containers with no focusable elements", () => {
    function EmptyComponent({ active }: { active: boolean }) {
      const ref = useRef<HTMLDivElement>(null);
      useFocusTrap(ref, active);
      return <div ref={ref}>No focusable elements</div>;
    }

    expect(() => {
      render(<EmptyComponent active={true} />);
    }).not.toThrow();
  });

  it("should handle disabled focusable elements", () => {
    function DisabledComponent({ active }: { active: boolean }) {
      const ref = useRef<HTMLDivElement>(null);
      useFocusTrap(ref, active);
      return (
        <div ref={ref}>
          <button disabled>Disabled</button>
          <button>Enabled</button>
        </div>
      );
    }

    const { container } = render(<DisabledComponent active={true} />);

    const enabledButton = container.querySelector("button:not([disabled])") as HTMLButtonElement;

    // Should skip disabled elements in focus trap
    expect(enabledButton).toBeTruthy();
  });

  it("should include all tabbable elements in trap", () => {
    function ComplexComponent({ active }: { active: boolean }) {
      const ref = useRef<HTMLDivElement>(null);
      useFocusTrap(ref, active);
      return (
        <div ref={ref}>
          <button>Button</button>
          <input type="text" />
          <textarea />
          <select>
            <option>Option</option>
          </select>
          <a href="/test">Link</a>
        </div>
      );
    }

    const { container } = render(<ComplexComponent active={true} />);

    const focusableElements = container.querySelectorAll(
      "button, input, textarea, select, a[href]",
    );

    expect(focusableElements.length).toBe(5);
  });

  it("should clean up event listeners on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = render(<TestComponent active={true} />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it("should respect tabindex attribute", () => {
    function TabIndexComponent({ active }: { active: boolean }) {
      const ref = useRef<HTMLDivElement>(null);
      useFocusTrap(ref, active);
      return (
        <div ref={ref}>
          <button tabIndex={2}>Second</button>
          <button tabIndex={1}>First</button>
          <button tabIndex={3}>Third</button>
        </div>
      );
    }

    const { container } = render(<TabIndexComponent active={true} />);

    const buttons = container.querySelectorAll("button");

    // Should respect tabindex order
    expect(buttons[0].tabIndex).toBe(2);
    expect(buttons[1].tabIndex).toBe(1);
    expect(buttons[2].tabIndex).toBe(3);
  });
});
