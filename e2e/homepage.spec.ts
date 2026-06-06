import { test, expect } from "@playwright/test";

/**
 * End-to-end tests for the homepage.
 *
 * Covers:
 * - Full-page screenshot (visual regression baseline)
 * - Reduced motion mode
 * - Scroll button interaction smoke test
 */

test.describe("Homepage", () => {
  test("full-page visual regression", async ({ page }) => {
    await page.goto("/");

    // Wait for the LoadOverlay to disappear
    // The overlay is removed from DOM when showOverlay becomes false.
    // We wait for the HorizontalScroll to be visible instead.
    await page.waitForSelector('[aria-roledescription="carousel"]', {
      timeout: 15_000,
    });

    // Give animations a moment to settle
    await page.waitForTimeout(1_000);

    await expect(page).toHaveScreenshot("homepage-desktop.png", {
      fullPage: false, // viewport only — fullPage would capture a very tall spacer
      maxDiffPixelRatio: 0.1,
    });
  });

  test("reduced motion: horizontal scroll falls back to native scrollbar", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.waitForSelector('[aria-roledescription="carousel"]', {
      timeout: 15_000,
    });
    await page.waitForTimeout(500);

    // Under reduced motion, the viewport should have overflow-x: auto
    // and the track should have transform: none
    const viewport = page.locator(".viewport");
    const track = page.locator(".track");

    await expect(viewport).toHaveCSS("overflow-x", "auto");
    await expect(track).toHaveCSS("will-change", "auto");

    // The transform should be "none" (no translate3d)
    const transform = await track.evaluate((el) =>
      getComputedStyle(el).transform,
    );
    expect(transform).toBe("none");

    // Scroll buttons should be visible (opacity 0.6 instead of 0)
    const prevBtn = page.locator('[aria-label="Scroll to previous panel"]');
    const nextBtn = page.locator('[aria-label="Scroll to next panel"]');
    await expect(prevBtn).toHaveCSS("opacity", "0.6");
    await expect(nextBtn).toHaveCSS("opacity", "0.6");
  });

  test("scroll buttons navigate between panels", async ({ page }) => {
    await page.goto("/");

    await page.waitForSelector('[aria-roledescription="carousel"]', {
      timeout: 15_000,
    });
    await page.waitForTimeout(500);

    const initialScrollY = await page.evaluate(() => window.scrollY);

    // Click the "next panel" button
    const nextBtn = page.locator('[aria-label="Scroll to next panel"]');
    await nextBtn.click();

    // Wait for scroll to settle
    await page.waitForTimeout(500);

    const afterNextScrollY = await page.evaluate(() => window.scrollY);

    // Scroll position should have changed
    expect(afterNextScrollY).toBeGreaterThan(initialScrollY);

    // Click the "previous panel" button
    const prevBtn = page.locator('[aria-label="Scroll to previous panel"]');
    await prevBtn.click();

    await page.waitForTimeout(500);

    const afterPrevScrollY = await page.evaluate(() => window.scrollY);
    expect(afterPrevScrollY).toBeLessThan(afterNextScrollY);
  });
});
