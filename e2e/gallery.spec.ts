import { test, expect } from "@playwright/test";

test.describe("Photo Gallery E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/news/photo-gallery");
  });

  test("should display gallery images", async ({ page }) => {
    // Wait for images to load
    await page.waitForSelector("img", { timeout: 5000 });

    // Should have multiple images
    const images = page.locator("img[alt]");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should open lightbox when clicking image", async ({ page }) => {
    // Wait for images to load
    await page.waitForSelector("img[alt]", { timeout: 5000 });

    // Click first image
    await page.click("img[alt]");

    // Lightbox should open
    await expect(page.locator('[class*="yarl"]').first()).toBeVisible({ timeout: 3000 });
  });

  test("should navigate through lightbox with arrow keys", async ({ page }) => {
    await page.waitForSelector("img[alt]", { timeout: 5000 });
    await page.click("img[alt]");

    // Wait for lightbox to open
    await page.waitForSelector('[class*="yarl"]', { timeout: 3000 });

    // Press right arrow to go to next image
    await page.keyboard.press("ArrowRight");

    // Wait a bit for image to change
    await page.waitForTimeout(300);

    // Lightbox should still be visible
    await expect(page.locator('[class*="yarl"]')).toBeVisible();
  });

  test("should navigate with lightbox buttons", async ({ page }) => {
    await page.waitForSelector("img[alt]", { timeout: 5000 });
    await page.click("img[alt]");

    await page.waitForSelector('[class*="yarl"]', { timeout: 3000 });

    // Click next button
    const nextButton = page.locator('button[aria-label*="Next"]');
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(300);
      await expect(page.locator('[class*="yarl"]')).toBeVisible();
    }
  });

  test("should close lightbox with Escape key", async ({ page }) => {
    await page.waitForSelector("img[alt]", { timeout: 5000 });
    await page.click("img[alt]");

    await page.waitForSelector('[class*="yarl"]', { timeout: 3000 });

    // Press Escape to close
    await page.keyboard.press("Escape");

    // Lightbox should be closed
    await expect(page.locator('[class*="yarl"]')).not.toBeVisible();
  });

  test("should close lightbox with close button", async ({ page }) => {
    await page.waitForSelector("img[alt]", { timeout: 5000 });
    await page.click("img[alt]");

    await page.waitForSelector('[class*="yarl"]', { timeout: 3000 });

    // Click close button
    const closeButton = page.locator('button[aria-label*="Close"]');
    await closeButton.click();

    // Lightbox should be closed
    await expect(page.locator('[class*="yarl"]')).not.toBeVisible();
  });

  test("should have proper alt text on images", async ({ page }) => {
    await page.waitForSelector("img[alt]", { timeout: 5000 });

    // All images should have alt text
    const imagesWithoutAlt = await page.locator('img:not([alt]), img[alt=""]').count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test("should be keyboard accessible", async ({ page }) => {
    await page.waitForSelector("img[alt]", { timeout: 5000 });

    // Tab to first image
    await page.keyboard.press("Tab");

    // Should be able to activate with Enter
    await page.keyboard.press("Enter");

    // Lightbox should open
    await expect(page.locator('[class*="yarl"]')).toBeVisible({ timeout: 3000 });
  });

  test("should lazy load images", async ({ page }) => {
    // Check if images have loading="lazy" attribute
    const lazyImages = await page.locator('img[loading="lazy"]').count();
    expect(lazyImages).toBeGreaterThan(0);
  });

  test("should handle missing images gracefully", async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check for any broken image icons or error states
    const brokenImages = await page.locator("img[alt]:not([src])").count();
    expect(brokenImages).toBe(0);
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/news/photo-gallery");
    await page.waitForSelector("img[alt]", { timeout: 5000 });

    // Images should be visible
    const images = page.locator("img[alt]");
    await expect(images.first()).toBeVisible();

    // Lightbox should work on mobile
    await page.click("img[alt]");
    await expect(page.locator('[class*="yarl"]')).toBeVisible({ timeout: 3000 });
  });

  test("should show image captions in lightbox", async ({ page }) => {
    await page.waitForSelector("img[alt]", { timeout: 5000 });
    await page.click("img[alt]");

    await page.waitForSelector('[class*="yarl"]', { timeout: 3000 });

    // Should have some text content (caption or description)
    const lightboxContent = page.locator('[class*="yarl"]');
    const hasText = await lightboxContent.textContent();
    expect(hasText).toBeTruthy();
  });
});

test.describe("Video Gallery E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/news/video-gallery");
  });

  test("should display video thumbnails", async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Should have video elements or iframes
    const videos = page.locator("iframe, video");
    const count = await videos.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should have accessible video players", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    // Video iframes should have titles
    const iframes = page.locator("iframe");
    const count = await iframes.count();

    if (count > 0) {
      const firstIframe = iframes.first();
      const title = await firstIframe.getAttribute("title");
      expect(title).toBeTruthy();
    }
  });
});
