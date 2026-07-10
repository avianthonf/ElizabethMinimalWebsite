import { test, expect } from "@playwright/test";

test.describe("Contact Form E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("should successfully submit contact form", async ({ page }) => {
    // Fill out the form
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "john.doe@example.com");
    await page.fill('input[name="phone"]', "+91 832 2334401");
    await page.selectOption('select[name="subject"]', "General Inquiry");
    await page.fill(
      'textarea[name="message"]',
      "I would like to know more about the admission process for the upcoming academic year.",
    );

    // Wait for honeypot timer (2+ seconds)
    await page.waitForTimeout(2500);

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for success message
    await expect(page.locator("text=/Thank you for your inquiry/i")).toBeVisible({
      timeout: 10000,
    });

    // Form should be reset
    await expect(page.locator('input[name="name"]')).toHaveValue("");
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    // Try to submit without filling fields
    await page.click('button[type="submit"]');

    // Should show validation errors
    await expect(page.locator("text=/required/i").first()).toBeVisible();
  });

  test("should validate email format", async ({ page }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "invalid-email");
    await page.fill('input[name="phone"]', "1234567890");
    await page.selectOption('select[name="subject"]', "General Inquiry");
    await page.fill('textarea[name="message"]', "This is a test message");

    await page.waitForTimeout(2500);
    await page.click('button[type="submit"]');

    // Should show email validation error
    await expect(page.locator("text=/valid email/i")).toBeVisible();
  });

  test("should validate message length", async ({ page }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "john@example.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.selectOption('select[name="subject"]', "General Inquiry");
    await page.fill('textarea[name="message"]', "Short");

    await page.waitForTimeout(2500);
    await page.click('button[type="submit"]');

    // Should show message length error
    await expect(page.locator("text=/at least/i")).toBeVisible();
  });

  test("should show loading state during submission", async ({ page }) => {
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "john@example.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.selectOption('select[name="subject"]', "General Inquiry");
    await page.fill('textarea[name="message"]', "This is a test message with sufficient length");

    await page.waitForTimeout(2500);
    await page.click('button[type="submit"]');

    // Should show loading indicator
    await expect(page.locator('button[type="submit"][disabled]')).toBeVisible();
  });

  test("should be keyboard accessible", async ({ page }) => {
    // Tab through form fields
    await page.keyboard.press("Tab"); // Name
    await expect(page.locator('input[name="name"]')).toBeFocused();

    await page.keyboard.press("Tab"); // Email
    await expect(page.locator('input[name="email"]')).toBeFocused();

    await page.keyboard.press("Tab"); // Phone
    await expect(page.locator('input[name="phone"]')).toBeFocused();

    await page.keyboard.press("Tab"); // Subject
    await expect(page.locator('select[name="subject"]')).toBeFocused();

    await page.keyboard.press("Tab"); // Message
    await expect(page.locator('textarea[name="message"]')).toBeFocused();
  });

  test("should handle network errors gracefully", async ({ page }) => {
    // Simulate offline
    await page.context().setOffline(true);

    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "john@example.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.selectOption('select[name="subject"]', "General Inquiry");
    await page.fill('textarea[name="message"]', "This is a test message with sufficient length");

    await page.waitForTimeout(2500);
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator("text=/something went wrong/i")).toBeVisible({
      timeout: 10000,
    });

    // Go back online
    await page.context().setOffline(false);
  });

  test("should preserve form data on validation error", async ({ page }) => {
    const name = "John Doe";
    const email = "john@example.com";
    const message = "Short";

    await page.fill('input[name="name"]', name);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="phone"]', "1234567890");
    await page.selectOption('select[name="subject"]', "General Inquiry");
    await page.fill('textarea[name="message"]', message);

    await page.waitForTimeout(2500);
    await page.click('button[type="submit"]');

    // Wait for validation error
    await expect(page.locator("text=/at least/i")).toBeVisible();

    // Form data should be preserved
    await expect(page.locator('input[name="name"]')).toHaveValue(name);
    await expect(page.locator('input[name="email"]')).toHaveValue(email);
    await expect(page.locator('textarea[name="message"]')).toHaveValue(message);
  });

  test("should have proper ARIA labels", async ({ page }) => {
    // Check for proper labels
    await expect(page.locator('label[for*="name"]')).toBeVisible();
    await expect(page.locator('label[for*="email"]')).toBeVisible();
    await expect(page.locator('label[for*="phone"]')).toBeVisible();
    await expect(page.locator('label[for*="subject"]')).toBeVisible();
    await expect(page.locator('label[for*="message"]')).toBeVisible();

    // Check for aria-required attributes
    await expect(page.locator('input[name="name"][aria-required="true"]')).toBeVisible();
    await expect(page.locator('input[name="email"][aria-required="true"]')).toBeVisible();
  });

  test("should prevent rapid submissions", async ({ page }) => {
    // Fill form
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "rapid@example.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.selectOption('select[name="subject"]', "General Inquiry");
    await page.fill('textarea[name="message"]', "This is a test message with sufficient length");

    await page.waitForTimeout(2500);

    // Submit first time
    await page.click('button[type="submit"]');
    await expect(page.locator("text=/Thank you for your inquiry/i")).toBeVisible({
      timeout: 10000,
    });

    // Try to submit again immediately with same email
    await page.fill('input[name="name"]', "Jane Doe");
    await page.fill('input[name="email"]', "rapid@example.com");
    await page.fill('input[name="phone"]', "1234567890");
    await page.selectOption('select[name="subject"]', "General Inquiry");
    await page.fill('textarea[name="message"]', "Another test message with sufficient length");

    await page.waitForTimeout(2500);
    await page.click('button[type="submit"]');

    // Should be rate limited
    await expect(page.locator("text=/rate limit/i")).toBeVisible({
      timeout: 10000,
    });
  });
});
