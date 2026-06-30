interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

const BASE_URL = "https://www.stelizabeths.edu.in";

/**
 * Renders JSON-LD structured data for BreadcrumbList schema.
 * Improves SEO by helping search engines understand page hierarchy.
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const nonce = process.env.NEXT_PUBLIC_CSP_NONCE ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
