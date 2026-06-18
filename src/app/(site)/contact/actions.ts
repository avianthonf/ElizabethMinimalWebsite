"use server";

import { z } from "zod";
import type { Resend } from "resend";

/** Lazy Resend client — initialized on first use to avoid module-scope failures in tests. */
let resendClient: Resend | null = null;

async function getResend(): Promise<Resend> {
  if (!resendClient) {
    const { Resend } = await import("resend");
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

const INQUIRY_EMAIL = process.env.CONTACT_EMAIL ?? "info@stelizabeths.edu.in";

const inquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  /** Honeypot field — should be empty. Bots fill this in. */
  website: z.string().max(0, "Bot detected").optional().default(""),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

/** Simple in-memory rate limiter. Resets on server restart. */
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 submissions per minute per email

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const timestamps = submissions.get(email) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  submissions.set(email, recent);
  return recent.length >= RATE_LIMIT_MAX;
}

function recordSubmission(email: string): void {
  const timestamps = submissions.get(email) ?? [];
  timestamps.push(Date.now());
  submissions.set(email, timestamps);
}

export async function submitInquiry(_prevState: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  };

  const result = inquirySchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, subject, message } = result.data;

  // Honeypot check — bots fill this hidden field
  if (result.data.website) {
    // Silently pretend success to confuse bots
    return {
      success: true,
      message: "Thank you for your inquiry.",
    };
  }

  // Rate limiting
  if (isRateLimited(email)) {
    return {
      success: false,
      errors: { email: ["Too many submissions. Please wait a minute and try again."] },
    };
  }

  // Send email via Resend
  try {
    await (
      await getResend()
    ).emails.send({
      from: "St. Elizabeth's Website <noreply@stelizabeths.edu.in>",
      to: INQUIRY_EMAIL,
      replyTo: email,
      subject: `[Website Inquiry] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "",
        "",
        "Message:",
        message,
        "",
        "---",
        "Submitted via stelizabeths.edu.in contact form",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    recordSubmission(email);

    return {
      success: true,
      message: "Thank you for your inquiry. We will respond within two business days.",
    };
  } catch (error) {
    console.error("[contact] Failed to send inquiry email:", error);
    return {
      success: false,
      message:
        "Something went wrong. Please try again or contact us directly at info@stelizabeths.edu.in.",
    };
  }
}
