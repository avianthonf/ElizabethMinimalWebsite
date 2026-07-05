import type { MetadataRoute } from "next";
import { NEWS_ARTICLES } from "@/domains/news/news.data";
import { SITE_URL } from "@/shared/lib/brand";

const BASE_URL = SITE_URL;

/** All static inner page routes — matches new 6-section IA */
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },

  // ── About Us ─────────────────────────────────────────────────────────
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  {
    url: `${BASE_URL}/about/mission`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/about/history`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/about/staff`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/about/motto-anthem`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/about/manager-message`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/about/achievements`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/about/alumni`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },

  // ── Academics ────────────────────────────────────────────────────────
  {
    url: `${BASE_URL}/academics`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/academics/curriculum`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/academics/library`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/academics/teaching-methods`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/academics/resource-room`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/academics/science-laboratory`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/academics/computer-laboratory`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },

  // ── Admissions ───────────────────────────────────────────────────────
  {
    url: `${BASE_URL}/admissions`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/admissions/apply`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/admissions/why`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/admissions/infrastructure`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },

  // ── Beyond Academics ─────────────────────────────────────────────────
  {
    url: `${BASE_URL}/beyond-academics`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/beyond-academics/clubs`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/beyond-academics/sports`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/beyond-academics/student-council`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/beyond-academics/cultural-activities`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/beyond-academics/educational-tours`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },

  // ── News & Media ─────────────────────────────────────────────────────
  { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  {
    url: `${BASE_URL}/news/newsletter`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/news/photo-gallery`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/news/video-gallery`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },

  // ── Contact Us ───────────────────────────────────────────────────────
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/contact/info`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/contact/location-map`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/contact/office-hours`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
];

/** Dynamic news article routes */
const NEWS_ROUTES: MetadataRoute.Sitemap = NEWS_ARTICLES.map((article) => ({
  url: `${BASE_URL}${article.href}`,
  lastModified: new Date(article.date),
  changeFrequency: "yearly" as const,
  priority: 0.6,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...STATIC_ROUTES, ...NEWS_ROUTES];
}
