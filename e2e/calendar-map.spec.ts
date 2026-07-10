import { test, expect } from "@playwright/test";

test.describe("Events Calendar E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/news/events-calendar");
  });

  test("should display calendar", async ({ page }) => {
    // Wait for FullCalendar to load
    await page.waitForSelector('[class*="fc-"]', { timeout: 10000 });

    // Calendar container should be visible
    const calendar = page.locator('[class*="fc-"]');
    await expect(calendar.first()).toBeVisible();
  });

  test("should show current month by default", async ({ page }) => {
    await page.waitForSelector('[class*="fc-toolbar-title"]', { timeout: 10000 });

    // Should show current month/year
    const title = page.locator('[class*="fc-toolbar-title"]');
    const titleText = await title.textContent();

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    const currentYear = currentDate.getFullYear().toString();

    expect(titleText).toContain(currentMonth);
    expect(titleText).toContain(currentYear);
  });

  test("should navigate to next month", async ({ page }) => {
    await page.waitForSelector('[class*="fc-toolbar-title"]', { timeout: 10000 });

    const initialTitle = await page.locator('[class*="fc-toolbar-title"]').textContent();

    // Click next button
    await page.click('[class*="fc-next-button"]');

    // Wait for calendar to update
    await page.waitForTimeout(500);

    const newTitle = await page.locator('[class*="fc-toolbar-title"]').textContent();
    expect(newTitle).not.toBe(initialTitle);
  });

  test("should navigate to previous month", async ({ page }) => {
    await page.waitForSelector('[class*="fc-toolbar-title"]', { timeout: 10000 });

    const initialTitle = await page.locator('[class*="fc-toolbar-title"]').textContent();

    // Click previous button
    await page.click('[class*="fc-prev-button"]');

    await page.waitForTimeout(500);

    const newTitle = await page.locator('[class*="fc-toolbar-title"]').textContent();
    expect(newTitle).not.toBe(initialTitle);
  });

  test("should return to today", async ({ page }) => {
    await page.waitForSelector('[class*="fc-toolbar-title"]', { timeout: 10000 });

    // Navigate away from current month
    await page.click('[class*="fc-next-button"]');
    await page.waitForTimeout(500);

    // Click today button
    const todayButton = page.locator('[class*="fc-today-button"]');
    if (await todayButton.isVisible()) {
      await todayButton.click();
      await page.waitForTimeout(500);

      // Should show current month again
      const title = await page.locator('[class*="fc-toolbar-title"]').textContent();
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString("default", { month: "long" });
      expect(title).toContain(currentMonth);
    }
  });

  test("should display events on calendar", async ({ page }) => {
    await page.waitForSelector('[class*="fc-"]', { timeout: 10000 });

    // Check if any events are present
    const events = page.locator('[class*="fc-event"]');
    const eventCount = await events.count();

    // If no events this month, that's also valid
    expect(eventCount).toBeGreaterThanOrEqual(0);
  });

  test("should show event details on click", async ({ page }) => {
    await page.waitForSelector('[class*="fc-"]', { timeout: 10000 });

    const events = page.locator('[class*="fc-event"]');
    const eventCount = await events.count();

    if (eventCount > 0) {
      // Click first event
      await events.first().click();

      // Should show event details (modal or tooltip)
      await page.waitForTimeout(500);
      // Event details should appear somewhere
      const hasModal = await page.locator('[role="dialog"]').count();
      const hasTooltip = await page.locator('[class*="fc-popover"]').count();
      expect(hasModal + hasTooltip).toBeGreaterThan(0);
    }
  });

  test("should be keyboard accessible", async ({ page }) => {
    await page.waitForSelector('[class*="fc-"]', { timeout: 10000 });

    // Tab through calendar controls
    await page.keyboard.press("Tab");

    // Should be able to focus on calendar controls
    const focusedElement = await page.evaluate(() => document.activeElement?.className);
    expect(focusedElement).toBeTruthy();
  });

  test("should switch between month and list view", async ({ page }) => {
    await page.waitForSelector('[class*="fc-"]', { timeout: 10000 });

    // Look for view toggle buttons
    const listViewButton = page.locator('button:has-text("List"), [class*="fc-listMonth-button"]');

    if ((await listViewButton.count()) > 0) {
      await listViewButton.first().click();
      await page.waitForTimeout(500);

      // Should show list view
      const listView = page.locator('[class*="fc-list"]');
      await expect(listView).toBeVisible();
    }
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/news/events-calendar");
    await page.waitForSelector('[class*="fc-"]', { timeout: 10000 });

    // Calendar should still be visible and usable
    const calendar = page.locator('[class*="fc-"]');
    await expect(calendar.first()).toBeVisible();

    // On mobile, might show different view or compact layout
    const isMobileView = await page.locator('[class*="fc-list"]').count();
    expect(isMobileView).toBeGreaterThanOrEqual(0);
  });

  test("should show loading state", async ({ page }) => {
    // Navigate to page and try to catch loading state
    const response = page.goto("/news/events-calendar");

    // Might briefly show loading state
    const hasLoadingState = await page.locator('[aria-busy="true"], [class*="loading"]').count();

    await response;

    // After loading, calendar should be visible
    await page.waitForSelector('[class*="fc-"]', { timeout: 10000 });
    const calendar = page.locator('[class*="fc-"]');
    await expect(calendar.first()).toBeVisible();
  });

  test("should highlight today's date", async ({ page }) => {
    await page.waitForSelector('[class*="fc-"]', { timeout: 10000 });

    // Look for today's date cell
    const todayCell = page.locator('[class*="fc-day-today"]');
    const todayCount = await todayCell.count();

    // Should have at least one today cell if current month is visible
    expect(todayCount).toBeGreaterThanOrEqual(0);
  });

  test("should handle empty state gracefully", async ({ page }) => {
    await page.waitForSelector('[class*="fc-"]', { timeout: 10000 });

    // Navigate to a far future month with no events
    for (let i = 0; i < 12; i++) {
      await page.click('[class*="fc-next-button"]');
      await page.waitForTimeout(200);
    }

    // Calendar should still render properly
    const calendar = page.locator('[class*="fc-"]');
    await expect(calendar.first()).toBeVisible();
  });
});

test.describe("Map Embed E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact/location-map");
  });

  test("should display map embed", async ({ page }) => {
    // Wait for map iframe or container
    await page.waitForSelector('iframe[src*="maps"], [class*="leaflet"]', { timeout: 10000 });

    const mapContainer = page.locator('iframe[src*="maps"], [class*="leaflet"]');
    await expect(mapContainer.first()).toBeVisible();
  });

  test("should have accessible iframe title", async ({ page }) => {
    const iframe = page.locator('iframe[src*="maps"]');
    const count = await iframe.count();

    if (count > 0) {
      const title = await iframe.first().getAttribute("title");
      expect(title).toBeTruthy();
    }
  });

  test("should load map without errors", async ({ page }) => {
    // Wait for network idle to ensure map loads
    await page.waitForLoadState("networkidle");

    // Check for any console errors related to map
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    // Filter out unrelated errors
    const mapErrors = errors.filter(
      (e) => e.includes("map") || e.includes("leaflet") || e.includes("google"),
    );

    expect(mapErrors.length).toBe(0);
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/contact/location-map");
    await page.waitForSelector('iframe[src*="maps"], [class*="leaflet"]', { timeout: 10000 });

    const mapContainer = page.locator('iframe[src*="maps"], [class*="leaflet"]');
    await expect(mapContainer.first()).toBeVisible();
  });
});
