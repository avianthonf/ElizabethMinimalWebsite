/**
 * Contact content for St. Elizabeth's High School.
 *
 * Note: SCHOOL_ADDRESS, SCHOOL_CONTACT, and GOOGLE_MAPS_EMBED_URL
 * have moved to src/data/visits.ts. Import them from "@/data/visits".
 */

export const CONTACT_VISIT_PAGE = {
  metaTitle: "Visit St. Elizabeth",
  metaDescription:
    "Visit St. Elizabeth's High School in Pomburpa, Goa. Get directions, schedule a campus tour, and find our address and contact information.",
  heroEyebrow: "Welcome",
  heroHeading: "Visit St. Elizabeth",
  heroDescription:
    "We invite you to experience our campus, meet our community, and discover what makes St. Elizabeth's High School special.",
  sectionHeading: "Directions",
  introText:
    "St. Elizabeth's High School is located in the village of Pomburpa in Bardez taluka, North Goa. We're easily accessible from Panjim (approximately 15 km), Mapusa (approximately 10 km), and Calangute (approximately 12 km).",
  sectionAriaLabel: "Visit information and directions",
} as const;

export const CONTACT_FORM_FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel", required: false },
  { name: "message", label: "Message", type: "textarea", required: true },
] as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface ContactData {
  CONTACT_VISIT_PAGE: typeof CONTACT_VISIT_PAGE;
  CONTACT_FORM_FIELDS: typeof CONTACT_FORM_FIELDS;
}

export async function getContactData(): Promise<ContactData> {
  return { CONTACT_VISIT_PAGE, CONTACT_FORM_FIELDS };
}
