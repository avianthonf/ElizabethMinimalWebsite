import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/lib/brand";

/**
 * Generate XML sitemap for search engines.
 *
 * Includes all static pages with appropriate priorities and change frequencies.
 * Homepage and main section pages have higher priority.
 *
 * Static content pages use a fixed historical date (site launch) rather than
 * `new Date()`, preventing search engines from seeing constant-date-churn on
 * pages whose content genuinely hasn't changed.  Dynamic pages (news, events,
 * gallery) would use real `lastModified` dates from the CMS but those live in
 * the dynamic sitemap path not yet implemented.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

/**
 * Content pages that change very rarely (yearly cadence).
 * These use a stable launch-adjacent date so they don't appear to
 * shift every build.
 */
const STATIC_CONTENT_DATE = new Date("2026-07-01");

/**
 * Core pages that are updated more often (monthly/weekly) use this
 * rolling date.  Google treats `lastModified` as a signal, not a ranking
 * factor, so a small amount of date-churn on high-value pages is acceptable.
 */
const LAST_BUILD_DATE = new Date();
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Homepage - Highest priority
    {
      url: SITE_URL,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // About section pages
    {
      url: `${SITE_URL}/about`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about/history`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about/mission`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about/motto-anthem`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about/manager-message`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about/headmistress-message`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about/staff`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about/achievements`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about/alumni`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about/alumni/register`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // Academics section pages
    {
      url: `${SITE_URL}/academics`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/academics/curriculum`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/academics/teaching-methods`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/academics/library`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/academics/science-laboratory`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/academics/computer-laboratory`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/academics/resource-room`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/academics/vocational-education`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.7,
    },

    // Admissions section pages - High priority for conversion
    {
      url: `${SITE_URL}/admissions`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/admissions/apply`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/admissions/why`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/admissions/class-5-entry`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/admissions/relocating-to-goa`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/admissions/infrastructure`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Beyond Academics section pages
    {
      url: `${SITE_URL}/beyond-academics`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/beyond-academics/sports`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/beyond-academics/cultural-activities`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/beyond-academics/clubs`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/beyond-academics/student-council`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/beyond-academics/prahari-club`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/beyond-academics/educational-tours`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // Contact section pages - High priority for conversion
    {
      url: `${SITE_URL}/contact`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact/info`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact/location-map`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact/office-hours`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact/visit-our-campus`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact/thank-you`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    // News section pages
    {
      url: `${SITE_URL}/news`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/news/photo-gallery`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/news/video-gallery`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/news/events-calendar`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/news/newsletter`,
      lastModified: LAST_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
