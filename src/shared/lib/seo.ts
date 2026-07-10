/**
 * SEO utilities for St. Elizabeth's High School.
 *
 * Generates structured data (JSON-LD) for rich search results
 * including FAQ Page schema and BreadcrumbList schema.
 */

/**
 * Generate FAQPage schema.org JSON-LD from a simple Q&A array.
 * Use this on pages that feature FAQ content (admissions, relocation, etc.).
 *
 * @example
 * generateFAQSchema(FAQS) // returns valid JSON-LD for FAQ rich snippets
 */
export function generateFAQSchema(
  faqs: readonly { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]*>/g, ""),
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema.org JSON-LD.
 *
 * @example
 * generateBreadcrumbSchema([
 *   { name: "Home", url: "/" },
 *   { name: "Admissions", url: "/admissions" },
 *   { name: "Apply", url: "/admissions/apply" },
 * ])
 */
export function generateBreadcrumbSchema(
  items: readonly { name: string; url: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://stelizabeths.in${item.url}`,
    })),
  };
}
