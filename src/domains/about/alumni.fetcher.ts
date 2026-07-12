import { ALUMNI_TESTIMONIALS, ALUMNI_EVENTS } from "./alumni.data";

let isConfigured: boolean | null = null;
function check() {
  if (isConfigured !== null) return isConfigured;
  isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  return isConfigured;
}

export async function getAlumniTestimonials() {
  if (!check()) return ALUMNI_TESTIMONIALS;
  try {
    const { getPublishedTestimonials } = await import("@/shared/lib/db/alumni.repository");
    const items = await getPublishedTestimonials();
    if (items.length > 0) return items;
  } catch {
    /* fallback */
  }
  return ALUMNI_TESTIMONIALS;
}

export async function getAlumniEvents() {
  if (!check()) return ALUMNI_EVENTS;
  try {
    const { getPublishedAlumniEvents } = await import("@/shared/lib/db/alumni-events.repository");
    const items = await getPublishedAlumniEvents();
    if (items.length > 0) return items;
  } catch {
    /* fallback */
  }
  return ALUMNI_EVENTS;
}
