import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockSubmitInquiry = vi.fn();
vi.mock("@/app/(site)/contact/actions", () => ({
  submitInquiry: (...args: unknown[]) => mockSubmitInquiry(...args),
}));

import { ContactForm } from "./contact-form";

describe("ContactForm", () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockSubmitInquiry.mockReset();
  });

  it("renders all required fields with proper labels", () => {
    render(<ContactForm />);
    // The form has 4 required fields (name, email, subject, message) and 1 optional (phone)
    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /subject/i })).toBeInTheDocument();
    // Message is a textarea
    expect(screen.getByRole("textbox", { name: /message/i })).toBeInTheDocument();
  });

  it("marks required fields with aria-required", () => {
    render(<ContactForm />);
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveAttribute("aria-required", "true");
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
      "aria-required",
      "true",
    );
    expect(screen.getByRole("textbox", { name: /subject/i })).toHaveAttribute(
      "aria-required",
      "true",
    );
    expect(screen.getByRole("textbox", { name: /message/i })).toHaveAttribute(
      "aria-required",
      "true",
    );
    // Phone is optional
    expect(screen.getByRole("textbox", { name: /phone/i })).not.toHaveAttribute(
      "aria-required",
      "true",
    );
  });

  it("includes a honeypot field hidden from users", () => {
    const { container } = render(<ContactForm />);
    // The honeypot has aria-hidden="true" and tabIndex={-1}
    const honeypot = container.querySelector('[aria-hidden="true"] input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
  });

  it("email field uses type=email for native validation", () => {
    render(<ContactForm />);
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute("type", "email");
  });

  it("phone field uses type=tel", () => {
    render(<ContactForm />);
    expect(screen.getByRole("textbox", { name: /phone/i })).toHaveAttribute("type", "tel");
  });

  it("form has an accessible name via aria-label", () => {
    render(<ContactForm />);
    expect(screen.getByRole("form", { name: /contact inquiry form/i })).toBeInTheDocument();
  });

  it("submit button has accessible label and is not disabled initially", () => {
    render(<ContactForm />);
    const button = screen.getByRole("button", { name: /send inquiry/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("shows the email validation error when state has email error", async () => {
    mockSubmitInquiry.mockReturnValue({
      success: false,
      errors: { email: ["Please enter a valid email address"] },
    });
    render(<ContactForm />);

    const form = screen.getByRole("form", { name: /contact inquiry form/i });
    // Manually dispatch the form action to get the error state rendered
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    });
  });

  it("uses Heading primitive for semantic structure (h2)", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("heading", { level: 2, name: /send us an inquiry/i }),
    ).toBeInTheDocument();
  });
});

describe("ContactForm aria", () => {
  it("each input is associated with its label via htmlFor/id", () => {
    const { container } = render(<ContactForm />);
    // Inputs should have matching ids with their labels
    const inputs = container.querySelectorAll("input, textarea");
    for (const input of Array.from(inputs)) {
      const id = input.getAttribute("id");
      if (!id) continue; // honeypot is hidden
      const label = container.querySelector(`label[for="${id}"]`);
      expect(label, `Input ${id} should have a label`).toBeTruthy();
    }
  });
});
