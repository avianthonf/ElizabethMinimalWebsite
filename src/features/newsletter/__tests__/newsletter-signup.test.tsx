import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewsletterSignup } from "../newsletter-signup";

describe("NewsletterSignup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the form with all fields", () => {
      render(<NewsletterSignup />);

      expect(
        screen.getByRole("heading", { name: /subscribe to our newsletter/i }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
    });

    it("renders privacy notice with link", () => {
      render(<NewsletterSignup />);

      expect(screen.getByText(/we respect your privacy/i)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute(
        "href",
        "/privacy",
      );
    });

    it("has required field indicators", () => {
      render(<NewsletterSignup />);

      const requiredMarkers = screen.getAllByText("*");
      expect(requiredMarkers).toHaveLength(2); // First name and email
    });
  });

  describe("Validation", () => {
    it("shows error when first name is empty", async () => {
      render(<NewsletterSignup />);

      const submitButton = screen.getByRole("button", { name: /subscribe/i });
      fireEvent.click(submitButton);

      const errorMessage = await screen.findByText(
        /first name can only contain letters/i,
        {},
        { timeout: 3000 },
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("shows error when email is empty", async () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      fireEvent.change(firstNameInput, { target: { value: "John" } });

      const submitButton = screen.getByRole("button", { name: /subscribe/i });
      fireEvent.click(submitButton);

      const errorMessage = await screen.findByText(
        /please enter a valid email/i,
        {},
        { timeout: 3000 },
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("shows error when email is invalid", async () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const emailInput = screen.getByLabelText(/email address/i);

      fireEvent.change(firstNameInput, { target: { value: "John" } });
      fireEvent.change(emailInput, { target: { value: "not-an-email" } });

      const submitButton = screen.getByRole("button", { name: /subscribe/i });
      fireEvent.click(submitButton);

      const errorMessage = await screen.findByText(
        /please enter a valid email address/i,
        {},
        { timeout: 3000 },
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("shows error when first name contains invalid characters", async () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      fireEvent.change(firstNameInput, { target: { value: "John123" } });

      const submitButton = screen.getByRole("button", { name: /subscribe/i });
      fireEvent.click(submitButton);

      const errorMessage = await screen.findByText(
        /first name can only contain letters/i,
        {},
        { timeout: 3000 },
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("accepts valid first names with hyphens and apostrophes", async () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const emailInput = screen.getByLabelText(/email address/i);

      fireEvent.change(firstNameInput, { target: { value: "Mary-Jane O'Connor" } });
      fireEvent.change(emailInput, { target: { value: "mary@example.com" } });

      const submitButton = screen.getByRole("button", { name: /subscribe/i });
      fireEvent.click(submitButton);

      const successMessage = await screen.findByText(
        /successfully subscribed/i,
        {},
        { timeout: 3000 },
      );
      expect(successMessage).toBeInTheDocument();
    });

    it("clears error when user starts typing", async () => {
      render(<NewsletterSignup />);

      const submitButton = screen.getByRole("button", { name: /subscribe/i });
      fireEvent.click(submitButton);

      const errorMessage = await screen.findByText(
        /first name can only contain letters/i,
        {},
        { timeout: 3000 },
      );
      expect(errorMessage).toBeInTheDocument();

      const firstNameInput = screen.getByLabelText(/first name/i);
      fireEvent.change(firstNameInput, { target: { value: "J" } });

      await waitFor(
        () => {
          expect(
            screen.queryByText(/first name can only contain letters/i),
          ).not.toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });
  });

  describe("Form Submission", () => {
    it("disables form during submission", async () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(firstNameInput, { target: { value: "John" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(submitButton);

      // Check that inputs and button are disabled during submission
      expect(firstNameInput).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/subscribing/i)).toBeInTheDocument();
    });

    it("shows success message on successful submission", async () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(firstNameInput, { target: { value: "John" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(
        () => {
          expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("clears form after successful submission", async () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(firstNameInput, { target: { value: "John" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(
        () => {
          expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      expect(firstNameInput.value).toBe("");
      expect(emailInput.value).toBe("");
    });
  });

  describe("Honeypot Protection", () => {
    it("has hidden honeypot field", () => {
      render(<NewsletterSignup />);

      const honeypot = document.querySelector('input[name="honeypot"]');
      expect(honeypot).toBeInTheDocument();
      expect(honeypot).toHaveAttribute("tabindex", "-1");
      expect(honeypot).toHaveAttribute("aria-hidden", "true");
    });

    it("silently succeeds when honeypot is filled (bot detected)", async () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const honeypot = document.querySelector('input[name="honeypot"]') as HTMLInputElement;
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(firstNameInput, { target: { value: "Bot" } });
      fireEvent.change(emailInput, { target: { value: "bot@spam.com" } });
      fireEvent.change(honeypot, { target: { value: "I am a bot" } });
      fireEvent.click(submitButton);

      await waitFor(
        () => {
          expect(screen.getByText(/thanks for subscribing/i)).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      // Success message shown but form not actually submitted
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes on inputs", () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const emailInput = screen.getByLabelText(/email address/i);

      expect(firstNameInput).toHaveAttribute("aria-required", "true");
      expect(emailInput).toHaveAttribute("aria-required", "true");
    });

    it("links errors to inputs with aria-describedby", async () => {
      render(<NewsletterSignup />);

      const submitButton = screen.getByRole("button", { name: /subscribe/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const firstNameInput = screen.getByLabelText(/first name/i);
        expect(firstNameInput).toHaveAttribute("aria-describedby", "firstName-error");
        expect(firstNameInput).toHaveAttribute("aria-invalid", "true");
      });
    });

    it("error messages have alert role", async () => {
      render(<NewsletterSignup />);

      const submitButton = screen.getByRole("button", { name: /subscribe/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const errorMessages = screen.getAllByRole("alert");
        expect(errorMessages.length).toBeGreaterThan(0);
      });
    });

    it("success message has status role", async () => {
      render(<NewsletterSignup />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole("button", { name: /subscribe/i });

      fireEvent.change(firstNameInput, { target: { value: "John" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(
        () => {
          const successMessage = screen.getByRole("status");
          expect(successMessage).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });
  });
});
