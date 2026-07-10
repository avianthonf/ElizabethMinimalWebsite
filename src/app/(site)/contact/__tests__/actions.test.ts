import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitInquiry } from "../actions";

// Mock Resend
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: "mock-email-id" }),
    },
  })),
}));

describe("submitInquiry Server Action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset rate limiting map between tests
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Honeypot Protection", () => {
    it("should silently succeed when honeypot field is filled", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "john@example.com");
      formData.set("phone", "1234567890");
      formData.set("subject", "Inquiry");
      formData.set("message", "This is a test message");
      formData.set("website", "http://spam.com"); // Honeypot filled

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(true);
      expect(result.message).toBe("Thank you for your inquiry. We'll get back to you soon.");
    });

    it("should silently succeed when form submitted too quickly", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "john@example.com");
      formData.set("phone", "1234567890");
      formData.set("subject", "Inquiry");
      formData.set("message", "This is a test message");
      formData.set("_t", Date.now().toString()); // Timestamp too recent (< 2 seconds)

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(true);
      expect(result.message).toBe("Thank you for your inquiry. We'll get back to you soon.");
    });
  });

  describe("Input Validation", () => {
    it("should reject missing required fields", async () => {
      const formData = new FormData();
      formData.set("name", "");
      formData.set("email", "john@example.com");

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(false);
      expect(result.errors?.name).toBeDefined();
    });

    it("should reject invalid email format", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "invalid-email");
      formData.set("phone", "1234567890");
      formData.set("subject", "Inquiry");
      formData.set("message", "This is a test message");

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(false);
      expect(result.errors?.email).toBeDefined();
    });

    it("should reject message that is too short", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "john@example.com");
      formData.set("phone", "1234567890");
      formData.set("subject", "Inquiry");
      formData.set("message", "Short");

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(false);
      expect(result.errors?.message).toBeDefined();
    });

    it("should reject message that is too long", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "john@example.com");
      formData.set("phone", "1234567890");
      formData.set("subject", "Inquiry");
      formData.set("message", "a".repeat(1001)); // Exceeds 1000 char limit

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(false);
      expect(result.errors?.message).toBeDefined();
    });

    it("should reject name with invalid characters", async () => {
      const formData = new FormData();
      formData.set("name", "John<script>alert('xss')</script>");
      formData.set("email", "john@example.com");
      formData.set("phone", "1234567890");
      formData.set("subject", "Inquiry");
      formData.set("message", "This is a test message");

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(false);
      expect(result.errors?.name).toBeDefined();
    });

    it("should accept valid phone with various formats", async () => {
      const validPhones = ["+91 832 2334401", "832-233-4401", "(832) 233-4401", "8322334401"];

      for (const phone of validPhones) {
        const formData = new FormData();
        formData.set("name", "John Doe");
        formData.set("email", "john@example.com");
        formData.set("phone", phone);
        formData.set("subject", "Inquiry");
        formData.set("message", "This is a test message with sufficient length");
        formData.set("_t", (Date.now() - 3000).toString()); // 3 seconds ago

        const result = await submitInquiry({ success: false }, formData);

        expect(result.success).toBe(true);
      }
    });
  });

  describe("Rate Limiting", () => {
    it("should allow first submission", async () => {
      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "ratelimit@example.com");
      formData.set("phone", "1234567890");
      formData.set("subject", "Inquiry");
      formData.set("message", "This is a test message with sufficient length");
      formData.set("_t", (Date.now() - 3000).toString());

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(true);
    });

    // Note: Rate limiting tests are limited because the in-memory Map
    // is module-scoped. In production, this should use Redis.
  });

  describe("Email Sending", () => {
    it("should send email with correct data", async () => {
      const { Resend } = await import("resend");
      const mockSend = vi.fn().mockResolvedValue({ id: "mock-email-id" });
      (Resend as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "john@example.com");
      formData.set("phone", "+91 832 2334401");
      formData.set("subject", "Admissions Inquiry");
      formData.set("message", "I would like to know about the admission process");
      formData.set("_t", (Date.now() - 3000).toString());

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(true);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining("Admissions Inquiry"),
          replyTo: "john@example.com",
        }),
      );
    });

    it("should handle email sending failure gracefully", async () => {
      const { Resend } = await import("resend");
      const mockSend = vi.fn().mockRejectedValue(new Error("Email service unavailable"));
      (Resend as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const formData = new FormData();
      formData.set("name", "John Doe");
      formData.set("email", "john@example.com");
      formData.set("phone", "1234567890");
      formData.set("subject", "Inquiry");
      formData.set("message", "This is a test message with sufficient length");
      formData.set("_t", (Date.now() - 3000).toString());

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(false);
      expect(result.message).toContain("Something went wrong");
    });
  });

  describe("XSS Prevention", () => {
    it("should sanitize input but preserve safe characters", async () => {
      const formData = new FormData();
      formData.set("name", "John O'Reilly-Doe");
      formData.set("email", "john@example.com");
      formData.set("phone", "1234567890");
      formData.set("subject", "Question about St. Elizabeth's");
      formData.set(
        "message",
        "Hello, I'm interested in learning more about the school's programs & activities.",
      );
      formData.set("_t", (Date.now() - 3000).toString());

      const result = await submitInquiry({ success: false }, formData);

      expect(result.success).toBe(true);
    });

    it("should reject obvious XSS attempts", async () => {
      const xssPayloads = [
        "<script>alert('xss')</script>",
        "javascript:alert('xss')",
        "<img src=x onerror=alert('xss')>",
        "<svg onload=alert('xss')>",
      ];

      for (const payload of xssPayloads) {
        const formData = new FormData();
        formData.set("name", "John Doe");
        formData.set("email", "john@example.com");
        formData.set("phone", "1234567890");
        formData.set("subject", "Inquiry");
        formData.set("message", payload);

        const result = await submitInquiry({ success: false }, formData);

        expect(result.success).toBe(false);
        expect(result.errors?.message || result.errors?.name).toBeDefined();
      }
    });
  });
});
