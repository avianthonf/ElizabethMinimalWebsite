import { SCHOOL_CONFIG, CONTACT_CONFIG } from "@/shared/config";

/**
 * Enhanced Structured Data Generation
 *
 * Creates comprehensive Schema.org structured data for SEO optimization.
 * Follows Google's structured data guidelines and includes all recommended properties.
 */

interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface ContactPoint {
  "@type": "ContactPoint";
  telephone: string;
  contactType: string;
  email?: string;
  availableLanguage: string[];
}

interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

/**
 * Create Organization + School + LocalBusiness schema
 * Combines multiple schema types for maximum SEO value
 */
export function createSchoolOrganizationSchema() {
  const address: PostalAddress = {
    "@type": "PostalAddress",
    streetAddress: CONTACT_CONFIG.ADDRESS.STREET,
    addressLocality: CONTACT_CONFIG.ADDRESS.CITY,
    addressRegion: CONTACT_CONFIG.ADDRESS.STATE,
    postalCode: CONTACT_CONFIG.ADDRESS.POSTAL_CODE,
    addressCountry: CONTACT_CONFIG.ADDRESS.COUNTRY,
  };

  const geo: GeoCoordinates = {
    "@type": "GeoCoordinates",
    latitude: SCHOOL_CONFIG.LOCATION.COORDINATES.LATITUDE,
    longitude: SCHOOL_CONFIG.LOCATION.COORDINATES.LONGITUDE,
  };

  const openingHours: OpeningHoursSpecification = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...CONTACT_CONFIG.OFFICE_HOURS.DAYS],
    opens: CONTACT_CONFIG.OFFICE_HOURS.WEEKDAY_OPEN,
    closes: CONTACT_CONFIG.OFFICE_HOURS.WEEKDAY_CLOSE,
  };

  const contactPoints: ContactPoint[] = [
    {
      "@type": "ContactPoint",
      telephone: CONTACT_CONFIG.PHONE.MAIN,
      contactType: "customer service",
      email: CONTACT_CONFIG.EMAIL.GENERAL,
      availableLanguage: ["English", "Hindi", "Konkani"],
    },
    {
      "@type": "ContactPoint",
      telephone: CONTACT_CONFIG.PHONE.OFFICE,
      contactType: "admissions",
      email: CONTACT_CONFIG.EMAIL.ADMISSIONS,
      availableLanguage: ["English"],
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization", "LocalBusiness"],
    "@id": "https://stelizabethhighschool.in/#school",
    name: SCHOOL_CONFIG.NAME,
    alternateName: SCHOOL_CONFIG.SHORT_NAME,
    description:
      "A Catholic English Medium Secondary School in Pomburpa, Goa, founded in 1954. Providing quality education with values since 1954.",
    url: "https://stelizabethhighschool.in",
    logo: "https://stelizabethhighschool.in/logo.png",
    image: "https://stelizabethhighschool.in/og-default.jpg",
    telephone: CONTACT_CONFIG.PHONE.MAIN,
    email: CONTACT_CONFIG.EMAIL.GENERAL,
    address,
    geo,
    openingHoursSpecification: openingHours,
    contactPoint: contactPoints,
    foundingDate: SCHOOL_CONFIG.FOUNDED_YEAR.toString(),
    foundingLocation: {
      "@type": "Place",
      name: `${SCHOOL_CONFIG.LOCATION.CITY}, ${SCHOOL_CONFIG.LOCATION.STATE}`,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Goa, India",
    },
    priceRange: "$$",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Bank Transfer",
    publicAccess: true,
    isAccessibleForFree: false,
    alumni: {
      "@type": "EducationalOccupationalProgram",
      name: "Alumni Network",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 25,
    },
    sameAs: [
      // Add social media URLs when available
      // "https://facebook.com/stelizabethsgoa",
      // "https://instagram.com/stelizabethsgoa",
    ].filter(Boolean),
    knowsAbout: [
      "Primary Education",
      "Secondary Education",
      "CBSE Curriculum",
      "Catholic Education",
      "English Medium Education",
    ],
    keywords:
      "school in goa, catholic school, english medium school, secondary school, CBSE school, pomburpa school",
  };
}

/**
 * Create BreadcrumbList schema for navigation
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Create WebSite schema with search action
 */
export function createWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://stelizabethhighschool.in/#website",
    url: "https://stelizabethhighschool.in",
    name: SCHOOL_CONFIG.NAME,
    description: "Official website of St. Elizabeth's High School, Pomburpa, Goa",
    publisher: {
      "@id": "https://stelizabethhighschool.in/#school",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://stelizabethhighschool.in/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Create NewsArticle schema for news/blog posts
 */
export function createNewsArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.imageUrl,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      "@type": "Organization",
      name: SCHOOL_CONFIG.NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SCHOOL_CONFIG.NAME,
      logo: {
        "@type": "ImageObject",
        url: "https://stelizabethhighschool.in/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

/**
 * Create Event schema for school events
 */
export function createEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location || SCHOOL_CONFIG.NAME,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT_CONFIG.ADDRESS.STREET,
        addressLocality: CONTACT_CONFIG.ADDRESS.CITY,
        addressRegion: CONTACT_CONFIG.ADDRESS.STATE,
        addressCountry: CONTACT_CONFIG.ADDRESS.COUNTRY,
      },
    },
    image: event.imageUrl || "https://stelizabethhighschool.in/og-default.jpg",
    organizer: {
      "@type": "Organization",
      name: SCHOOL_CONFIG.NAME,
      url: "https://stelizabethhighschool.in",
    },
  };
}

/**
 * Create FAQPage schema for frequently asked questions
 */
export function createFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Create Course schema for educational programs
 */
export function createCourseSchema(course: {
  name: string;
  description: string;
  provider?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: course.provider || SCHOOL_CONFIG.NAME,
    },
  };
}

/**
 * Create EducationalOccupationalProgram schema
 */
export function createEducationalProgramSchema(program: {
  name: string;
  description: string;
  timeToComplete?: string;
  educationalCredentialAwarded?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: program.name,
    description: program.description,
    provider: {
      "@id": "https://stelizabethhighschool.in/#school",
    },
    timeToComplete: program.timeToComplete,
    educationalCredentialAwarded: program.educationalCredentialAwarded,
  };
}

/**
 * Create Person schema for staff/faculty
 */
export function createPersonSchema(person: {
  name: string;
  jobTitle: string;
  email?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    email: person.email,
    image: person.imageUrl,
    worksFor: {
      "@id": "https://stelizabethhighschool.in/#school",
    },
  };
}

/**
 * Create Review/Rating schema (for testimonials)
 */
export function createReviewSchema(review: {
  author: string;
  rating?: number;
  reviewBody: string;
  datePublished?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewBody: review.reviewBody,
    itemReviewed: {
      "@id": "https://stelizabethhighschool.in/#school",
    },
  };

  if (review.rating) {
    schema.reviewRating = {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    };
  }

  if (review.datePublished) {
    schema.datePublished = review.datePublished;
  }

  return schema;
}
