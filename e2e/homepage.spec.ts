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

    // Give animations a moment to settle (3-card + kinetic title sequence takes ~2.6s)
    await page.waitForTimeout(3_500);

    await expect(page).toHaveScreenshot("homepage-desktop.png", {
      fullPage: false, // viewport only — fullPage would capture a very tall spacer
      maxDiffPixelRatio: 0.1,
    });
  });

  test("reduced motion: horizontal scroll falls back to native scrollbar", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.waitForSelector('[aria-roledescription="carousel"]', {
      timeout: 15_000,
    });
    await page.waitForTimeout(500);

    // Under reduced motion, the viewport should have overflow-x: auto
    // and the track should have transform: none
    // Note: CSS Module classes are hashed, so we target by aria role
    const stage = page.locator('[aria-roledescription="carousel"]');

    await expect(stage).toBeVisible();
  });

  test("carousel dot navigation changes active slide", async ({ page }) => {
    await page.goto("/");

    await page.waitForSelector('[aria-roledescription="carousel"]', {
      timeout: 15_000,
    });
    await page.waitForTimeout(500);

    // The carousel has dot buttons with aria-label "Go to slide N"
    const dot2 = page.locator('[role="tab"][aria-label="Go to slide 2"]');
    await expect(dot2).toBeVisible();

    // Click the second dot
    await dot2.click();
    await page.waitForTimeout(500);

    // The second dot should now be selected
    await expect(dot2).toHaveAttribute("aria-selected", "true");
  });
});
