import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import { type AdminRole, type ContentSection, ALL_ROLES, getLoginRedirectPath } from "./auth-types";

// Re-export client-safe types
export type { AdminRole, ContentSection };
export { ALL_ROLES, SECTION_ROLES, ROLE_LABELS, canAccessSectionByRole } from "./auth-types";

// getLoginRedirectPath is imported directly above and re-exported here
export { getLoginRedirectPath };

// ── Server-side auth guards ────────────────────────────────────────────

/** Parse and validate a role string from user metadata. */
export function getRole(user: { user_metadata?: { role?: string } } | null): AdminRole | null {
  const raw = user?.user_metadata?.role;
  if (typeof raw !== "string") return null;
  return (ALL_ROLES as readonly string[]).includes(raw) ? (raw as AdminRole) : null;
}

export function isSuperAdmin(user: { user_metadata?: { role?: string } } | null): boolean {
  return user?.user_metadata?.role === "super_admin";
}

/** Can this user (from Supabase) access a given section? */
export function canAccessSection(
  user: { user_metadata?: { role?: string } } | null,
  section: ContentSection,
): boolean {
  if (!user) return false;
  if (user.user_metadata?.role === "super_admin") return true;
  const roleMap: Record<ContentSection, string> = {
    news: "news_editor",
    announcements: "announcement_editor",
    events: "event_editor",
    alumni: "alumni_editor",
    gallery: "gallery_editor",
  };
  return user.user_metadata?.role === roleMap[section];
}

/**
 * Require that the user has the role for `section` (or super_admin).
 * Redirects if not authenticated or unauthorized.
 */
export async function requireSection(section: ContentSection) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const role = getRole(user);

  if (!role) {
    // Logged in but no admin role → kick to homepage
    redirect("/");
  }

  if (!canAccessSection(user, section)) {
    // Has a role but not for this section → redirect to their own section
    const redirectPath = getLoginRedirectPath(role);
    redirect(redirectPath);
  }

  return user;
}

/**
 * Require that the user has ANY valid admin role.
 * Used by the transparent auth boundary.
 */
export async function requireAnyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const role = getRole(user);

  if (!role) redirect("/");

  return { user, role };
}
