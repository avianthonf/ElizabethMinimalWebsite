import { describe, it, expect } from "vitest";
import { NEWS_ARTICLES, UPCOMING_EVENTS, type NewsArticle } from "../news";

describe("News Data", () => {
  describe("NEWS_ARTICLES", () => {
    it("has 6 articles", () => {
      expect(NEWS_ARTICLES).toHaveLength(6);
    });

    it("all articles have required fields", () => {
      for (const article of NEWS_ARTICLES) {
        expect(article.title).toBeTruthy();
        expect(article.date).toBeTruthy();
        expect(article.excerpt.length).toBeGreaterThan(30);
        expect(article.imageFilename.endsWith(".jpg")).toBe(true);
        expect(article.category).toBeTruthy();
        expect(article.href.startsWith("/news/")).toBe(true);
      }
    });

    it("categories include Events, Athletics, Community, and Academics", () => {
      const categories = [...new Set(NEWS_ARTICLES.map((a) => a.category))];
      expect(categories).toContain("Events");
      expect(categories).toContain("Athletics");
      expect(categories).toContain("Community");
      expect(categories).toContain("Academics");
    });

    it("all articles have unique titles", () => {
      const titles = NEWS_ARTICLES.map((a) => a.title);
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(titles.length);
    });

    it("all articles have unique hrefs", () => {
      const hrefs = NEWS_ARTICLES.map((a) => a.href);
      const uniqueHrefs = new Set(hrefs);
      expect(uniqueHrefs.size).toBe(hrefs.length);
    });

    it("includes Annual Day and Sports Meet articles", () => {
      expect(NEWS_ARTICLES[0].title).toContain("Annual Day Celebration");
      expect(NEWS_ARTICLES[1].title).toContain("Sports Meet XXII");
    });
  });

  describe("UPCOMING_EVENTS", () => {
    it("has 3 events", () => {
      expect(UPCOMING_EVENTS).toHaveLength(3);
    });

    it("all events have title, date, and description", () => {
      for (const event of UPCOMING_EVENTS) {
        expect(event.title).toBeTruthy();
        expect(event.date).toBeTruthy();
        expect(event.description.length).toBeGreaterThan(20);
      }
    });

    it("includes Parent-Teacher Meeting and Open House", () => {
      const titles = UPCOMING_EVENTS.map((e) => e.title);
      expect(titles).toContain("Parent-Teacher Meeting");
      expect(titles).toContain("Open House 2026");
    });
  });
});
