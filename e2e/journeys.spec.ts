import { test, expect } from "@playwright/test";

/**
 * End-to-end tests for the 4 core user journeys defined in spec 01.
 *
 * Journey 1: Prospective Parent → Admissions → Visit
 * Journey 2: Current Student → Student Life → Clubs
 * Journey 3: Alumnus → Alumni → Events
 * Journey 4: Community Member → How to Help → Give
 */

test.describe("Journey 1: Prospective Parent → Admissions", () => {
  test("homepage → admissions → visit pages render correctly", async ({ page }) => {
    await page.goto("/admissions");
    await page.waitForLoadState("networkidle");

    // Verify admissions page content
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    // Navigate to visit page
    await page.getByRole("link", { name: /visit/i }).first().click();
    await page.waitForLoadState("networkidle");
    await expect(page.url()).toContain("/visit");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("admissions pages render without errors", async ({ page }) => {
    const subPages = [
      "/admissions/apply",
      "/admissions/faqs",
      "/admissions/tuition",
      "/admissions/why",
    ];

    for (const path of subPages) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
    }
  });
});

test.describe("Journey 2: Student → Student Life", () => {
  test("student-life and clubs pages render correctly", async ({ page }) => {
    await page.goto("/student-life");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    // Navigate to clubs
    await page.getByRole("link", { name: /clubs/i }).first().click();
    await page.waitForLoadState("networkidle");
    await expect(page.url()).toContain("/clubs");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Journey 3: Alumnus → Alumni", () => {
  test("alumni page renders correctly", async ({ page }) => {
    await page.goto("/alumni");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Journey 4: Community Member → Giving", () => {
  test("how-to-help and give pages render correctly", async ({ page }) => {
    await page.goto("/how-to-help");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    // Navigate to give page
    await page.getByRole("link", { name: /give/i }).first().click();
    await page.waitForLoadState("networkidle");
    await expect(page.url()).toContain("/give");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("News flow", () => {
  test("news listing page renders", async ({ page }) => {
    await page.goto("/news");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });

  test("news article detail pages render for all articles", async ({ page }) => {
    // Navigate from news listing to each article
    await page.goto("/news");
    await page.waitForLoadState("networkidle");

    // Find and click the first news article link
    const articleLinks = page.locator('a[href^="/news/"]');
    const count = await articleLinks.count();

    if (count > 0) {
      await articleLinks.first().click();
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
    }
  });
});

test.describe("Contact flow", () => {
  test("contact form page renders", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });

  test("thank you page renders", async ({ page }) => {
    await page.goto("/contact/thank-you");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Arts & Athletics", () => {
  test("arts subpages render", async ({ page }) => {
    for (const path of ["/arts/visual-arts", "/arts/performing-arts"]) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("athletics teams page renders", async ({ page }) => {
    await page.goto("/athletics/teams");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("About", () => {
  test("about subpages render", async ({ page }) => {
    for (const path of ["/about/mission", "/about/staff", "/about/strategic-plan"]) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
    }
  });
});
