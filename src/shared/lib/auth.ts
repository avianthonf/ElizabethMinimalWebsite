import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import { type AdminRole, type ContentSection, ALL_ROLES, getLoginRedirectPath } from "./auth-types";

// Re-export client-safe types
export type { AdminRole, ContentSection };
export { ALL_ROLES, SECTION_ROLES, ROLE_LABELS, canAccessSectionByRole } from "./auth-types";

// getLoginRedirectPath is imported directly above and re-exported here
export { getLoginRedirectPath };

// ── Type alias for structural identity (works with both User and JwtPayload) ──

/** Minimal shape needed from Supabase auth — satisfied by both `getUser()` and `getClaims()`. */
type AuthIdentity = { user_metadata?: { role?: string }; email?: string; sub: string } | null;

// ── Server-side auth guards ────────────────────────────────────────────

/** Parse and validate a role string from identity metadata. */
export function getRole(identity: AuthIdentity): AdminRole | null {
  const raw = identity?.user_metadata?.role;
  if (typeof raw !== "string") return null;
  return (ALL_ROLES as readonly string[]).includes(raw) ? (raw as AdminRole) : null;
}

export function isSuperAdmin(identity: AuthIdentity): boolean {
  return identity?.user_metadata?.role === "super_admin";
}

/** Can this identity (from Supabase auth) access a given section? */
export function canAccessSection(identity: AuthIdentity, section: ContentSection): boolean {
  if (!identity) return false;
  if (identity.user_metadata?.role === "super_admin") return true;
  const roleMap: Record<ContentSection, string> = {
    news: "news_editor",
    announcements: "announcement_editor",
    events: "event_editor",
    alumni: "alumni_editor",
    gallery: "gallery_editor",
  };
  return identity.user_metadata?.role === roleMap[section];
}

/**
 * Require that the user has the role for `section` (or super_admin).
 * Redirects if not authenticated or unauthorized.
 *
 * Uses `auth.getClaims()` — validates JWT signature against published
 * public keys locally (no server round-trip). Recommended by Supabase
 * docs for page protection over `getUser()`.
 */
export async function requireSection(section: ContentSection) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data) redirect("/admin/login");

  const { claims } = data;

  const role = getRole(claims);

  if (!role) {
    // Logged in but no admin role → kick to homepage
    redirect("/");
  }

  if (!canAccessSection(claims, section)) {
    // Has a role but not for this section → redirect to their own section
    const redirectPath = getLoginRedirectPath(role);
    redirect(redirectPath);
  }

  return claims;
}

/**
 * Require that the user has ANY valid admin role.
 * Used by the transparent auth boundary.
 *
 * Uses `auth.getClaims()` — validates JWT signature against published
 * public keys locally (no server round-trip). Recommended by Supabase
 * docs for page protection over `getUser()`.
 */
export async function requireAnyAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data) redirect("/admin/login");

  const { claims } = data;

  const role = getRole(claims);

  if (!role) redirect("/");

  return { claims, role };
}
