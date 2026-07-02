"use server";

import { z } from "zod";
import type { Resend } from "resend";
import { InquiryEmail } from "@/lib/email";
import { render } from "@react-email/components";

/** Lazy Resend client — initialized on first use to avoid module-scope failures in tests. */
let resendClient: Resend | null = null;

async function getResend(): Promise<Resend> {
  if (!resendClient) {
    const { Resend } = await import("resend");
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

const INQUIRY_EMAIL = process.env.CONTACT_EMAIL ?? "info@stelizabethhighschool.in";

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

// ── Rate Limiting ───────────────────────────────────────────────────────

/** Simple in-memory rate limiter. Resets on server restart. */
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 3_600_000; // 1 hour
const RATE_LIMIT_MAX = 3; // 3 submissions per hour per email

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

// ── Server Action ───────────────────────────────────────────────────────

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

  // Rate limiting — checked before honeypot so bots can't exhaust limits
  if (isRateLimited(email)) {
    return {
      success: false,
      errors: {
        email: ["Too many submissions. Please wait an hour and try again."],
      },
    };
  }

  // Honeypot check — bots fill this hidden field; silently pretend success
  if (result.data.website) {
    return {
      success: true,
      message: "Thank you for your inquiry.",
    };
  }

  // Send email via Resend using React Email template
  try {
    const emailHtml = await render(
      InquiryEmail({
        name,
        email,
        phone,
        subject,
        message,
      }),
    );

    await (
      await getResend()
    ).emails.send({
      from: "St. Elizabeth's Website <noreply@stelizabethhighschool.in>",
      to: INQUIRY_EMAIL,
      replyTo: email,
      subject: `[Website Inquiry] ${subject}`,
      html: emailHtml,
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
        "Something went wrong. Please try again or contact us directly at info@stelizabethhighschool.in.",
    };
  }
}
