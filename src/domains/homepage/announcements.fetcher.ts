import { CURRENT_ANNOUNCEMENT } from "./announcements.data";

let isConfigured: boolean | null = null;
function check() {
  if (isConfigured !== null) return isConfigured;
  isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  return isConfigured;
}

export async function getCurrentAnnouncement() {
  if (!check()) return CURRENT_ANNOUNCEMENT;
  try {
    const { getEnabledAnnouncement } = await import("@/shared/lib/db/announcements.repository");
    const item = await getEnabledAnnouncement();
    if (item) return item;
  } catch {
    /* fallback */
  }
  return CURRENT_ANNOUNCEMENT;
}
