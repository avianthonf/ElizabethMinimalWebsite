/**
 * Contact content for St. Elizabeth High School.
 */

export const SCHOOL_ADDRESS = {
  street: "Ven. Fr. Hilario Gonsalves Rd",
  area: "Pomburpa, Bardez",
  city: "Goa",
  pinCode: "4031102",
  country: "India",
} as const;

export const SCHOOL_CONTACT = {
  phone: "+91 XXXXXXXXXX",
  email: "info@stelizabethhighschool.in",
} as const;

export const GOOGLE_MAPS_EMBED_URL = "https://maps.google.com/maps?q=St.+Elizabeth+High+School+Pomburpa+Goa&output=embed";

export const CONTACT_FORM_FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel", required: false },
  { name: "message", label: "Message", type: "textarea", required: true },
] as const;
