"use server";

import { z } from "zod";
import type { Resend } from "resend";
import { headers } from "next/headers";
import { InquiryEmail } from "@/shared/lib/email";
import { render } from "@react-email/components";
import { CONTACT_EMAIL, TRANSACTIONAL_EMAIL_FROM } from "@/shared/lib/brand";
import { rateLimit, getClientIP } from "@/shared/lib/rate-limit";

/** Lazy Resend client — initialized on first use to avoid module-scope failures in tests. */
let resendClient: Resend | null = null;

async function getResend(): Promise<Resend> {
  if (!resendClient) {
    const { Resend } = await import("resend");
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

const INQUIRY_EMAIL = process.env.CONTACT_EMAIL ?? CONTACT_EMAIL;

const inquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  /**
   * Honeypot field — must always be empty. Bots fill this in.
   *
   * IMPORTANT: Do NOT add a .max(0) constraint — it would reject non-empty
   * values BEFORE the fake-success check below, leaking the detection
   * mechanism to attackers. The honeypot must silently return success so
   * attackers don't know they were detected.
   */
  website: z.string().optional().default(""),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

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

  // ═══ Bot defenses — ordered by cost: cheapest checks first ══════

  // 1. Honeypot — bots fill the hidden field; silently pretend success
  //    Place BEFORE rate limiting so bots don't poison real-user buckets
  if (result.data.website) {
    return {
      success: true,
      message: "Thank you for your inquiry.",
    };
  }

  // 2. Timing check — bots submit forms faster than any human can type
  //    `submissionStartedAt` is set client-side when the form is focused
  const startedAt = formData.get("submissionStartedAt");
  if (typeof startedAt === "string") {
    const elapsed = Date.now() - parseInt(startedAt, 10);
    if (elapsed < 3_000) {
      return {
        success: true,
        message: "Thank you for your inquiry.",
      };
    }
  }

  // 3. Rate limiting — per-IP limit prevents abuse across serverless instances
  //    Uses Upstash Redis if configured, falls back to in-memory for development
  const headersList = await headers();
  const ip = getClientIP(headersList);
  const { success: rateLimitSuccess } = await rateLimit(`contact:${ip}`, 3, 3600);

  if (!rateLimitSuccess) {
    return {
      success: false,
      errors: {
        email: ["Too many submissions. Please wait an hour and try again."],
      },
    };
  }

  // ═══ Send email via Resend using React Email template ════════════

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
      from: TRANSACTIONAL_EMAIL_FROM,
      to: INQUIRY_EMAIL,
      replyTo: email,
      // Strip CR/LF to prevent SMTP header injection
      subject: `[Website Inquiry] ${subject.replace(/[\r\n]/g, "")}`,
      html: emailHtml,
    });

    return {
      success: true,
      message: "Thank you for your inquiry. We will respond within two business days.",
    };
  } catch (error) {
    console.error("[contact] Failed to send inquiry email:", error);
    return {
      success: false,
      message: `Something went wrong. Please try again or contact us directly at ${CONTACT_EMAIL}.`,
    };
  }
}
