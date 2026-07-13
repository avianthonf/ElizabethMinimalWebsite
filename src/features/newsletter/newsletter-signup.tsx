"use client";

import { useState } from "react";
import { z } from "zod";
import styles from "./newsletter-signup.module.css";

// ── Validation Schema ──────────────────────────────────────────────────

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes",
    ),
  honeypot: z.string().max(0, "Invalid submission"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

// ── Component ──────────────────────────────────────────────────────────

interface NewsletterSignupProps {
  className?: string;
}

export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: "",
    firstName: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewsletterFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof NewsletterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setMessage("");

    // Honeypot check (before validation to catch bots silently)
    if (formData.honeypot) {
      setStatus("success");
      setMessage("Thanks for subscribing!");
      return;
    }

    // Validate with Zod
    const result = newsletterSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof NewsletterFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof NewsletterFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus("error");
      setMessage("Please fix the errors below");
      return;
    }

    try {
      // TODO: Replace with actual newsletter API endpoint
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock success
      setStatus("success");
      setMessage("🎉 Successfully subscribed! Check your email for confirmation.");
      setFormData({ email: "", firstName: "", honeypot: "" });
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
      if (process.env.NODE_ENV === "development") {
        console.error("[newsletter] Subscription failed:", error);
      }
    }
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Subscribe to Our Newsletter</h2>
        <p className={styles.description}>
          Get the latest updates, news, and events delivered to your inbox monthly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* First Name Field */}
        <div className={styles.field}>
          <label htmlFor="newsletter-firstName" className={styles.label}>
            First Name{" "}
            <span className={styles.required} aria-label="required">
              *
            </span>
          </label>
          <input
            type="text"
            id="newsletter-firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
            placeholder="Enter your first name"
            required
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            disabled={status === "submitting"}
          />
          {errors.firstName && (
            <span id="firstName-error" className={styles.error} role="alert">
              {errors.firstName}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className={styles.field}>
          <label htmlFor="newsletter-email" className={styles.label}>
            Email Address{" "}
            <span className={styles.required} aria-label="required">
              *
            </span>
          </label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            placeholder="your.email@example.com"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={status === "submitting"}
          />
          {errors.email && (
            <span id="email-error" className={styles.error} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {/* Honeypot (hidden from users, catches bots) */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className={styles.honeypot}
        />

        {/* Status Message */}
        {message && (
          <div
            className={`${styles.message} ${status === "success" ? styles.messageSuccess : styles.messageError}`}
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.button}
          disabled={status === "submitting" || status === "success"}
        >
          {status === "submitting" ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Subscribing...
            </>
          ) : status === "success" ? (
            "Subscribed ✓"
          ) : (
            "Subscribe"
          )}
        </button>

        {/* Privacy Notice */}
        <p className={styles.privacy}>
          We respect your privacy. Unsubscribe at any time. Read our{" "}
          <a href="/privacy" className={styles.privacyLink}>
            privacy policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
