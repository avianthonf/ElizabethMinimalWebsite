import { UPCOMING_EVENTS } from "./events.data";
import type { HomepageEvent } from "./events.data";

let isConfigured: boolean | null = null;
function check() {
  if (isConfigured !== null) return isConfigured;
  isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  return isConfigured;
}

export async function getUpcomingEvents(): Promise<HomepageEvent[]> {
  if (!check()) return UPCOMING_EVENTS;
  try {
    const { getPublishedEvents } = await import("@/shared/lib/db/events.repository");
    const items = await getPublishedEvents();
    if (items.length > 0) return items;
  } catch {
    /* fallback */
  }
  return UPCOMING_EVENTS;
}
