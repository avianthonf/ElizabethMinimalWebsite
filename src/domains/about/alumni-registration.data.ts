/**
 * Alumni Registration content for St. Elizabeth's High School.
 */

export const ALUMNI_REGISTRATION_PAGE = {
  metaTitle: "Alumni Registration",
  metaDescription:
    "Reconnect with St. Elizabeth's High School, Pomburpa. Register as an alumnus, share your story, and join our growing alumni community.",
  breadcrumb: {
    href: "/about",
    label: "About",
    currentLabel: "Alumni Registration",
  },
  heroEyebrow: "Reconnect",
  heroHeading: "Alumni Registration",
  heroDescription:
    "Whether you graduated last year or five decades ago, you are part of the St. Elizabeth's family. Register below to stay connected with your alma mater.",
  sectionHeading: "Register as an Alumnus",
  sectionDescription:
    "Help us build a vibrant alumni network. We use Google Forms to collect your details securely. All fields marked with an asterisk (*) are required.",
  // TODO: Replace with actual Google Form URL once alumni registration form is created
  googleFormUrl: "https://docs.google.com/forms/d/e/REPLACE_WITH_ACTUAL_FORM_ID/viewform",
  sectionAriaLabel: "Alumni registration",
} as const;

export const ALUMNI_FORM_FIELDS = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "classYear", label: "Year of Passing Class 10", type: "text", required: true },
  { name: "currentProfession", label: "Current Profession / Field", type: "text", required: false },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number (WhatsApp)", type: "tel", required: false },
  { name: "location", label: "Current City / Country", type: "text", required: false },
  { name: "memory", label: "A Memory from St. Elizabeth's", type: "textarea", required: false },
] as const;

export const ALUMNI_BENEFITS = [
  {
    title: "Stay Connected",
    description:
      "Receive our alumni newsletter with school updates, event invitations, and stories from fellow alumni around the world.",
  },
  {
    title: "Give Back",
    description:
      "Mentor current students, speak at Career Day, or contribute to school improvement projects. Your experience inspires the next generation.",
  },
  {
    title: "Alumni Events",
    description:
      "Join us for the Annual Alumni Reunion every December, Founder's Day celebrations in July, and regional meetups throughout the year.",
  },
] as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface AlumniRegistrationData {
  ALUMNI_REGISTRATION_PAGE: typeof ALUMNI_REGISTRATION_PAGE;
  ALUMNI_FORM_FIELDS: typeof ALUMNI_FORM_FIELDS;
  ALUMNI_BENEFITS: typeof ALUMNI_BENEFITS;
}

export async function getAlumniRegistrationData(): Promise<AlumniRegistrationData> {
  return { ALUMNI_REGISTRATION_PAGE, ALUMNI_FORM_FIELDS, ALUMNI_BENEFITS };
}
