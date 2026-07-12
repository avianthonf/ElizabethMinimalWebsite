/**
 * Admin role type system — CLIENT-SAFE.
 *
 * Imported by both server auth guards and client components.
 * No Supabase imports, no server-only deps.
 */

export type AdminRole =
  | "super_admin"
  | "news_editor"
  | "announcement_editor"
  | "event_editor"
  | "alumni_editor"
  | "gallery_editor";

export type ContentSection = "news" | "announcements" | "events" | "alumni" | "gallery";

export const ALL_ROLES: AdminRole[] = [
  "super_admin",
  "news_editor",
  "announcement_editor",
  "event_editor",
  "alumni_editor",
  "gallery_editor",
];

export const SECTION_ROLES: Record<ContentSection, AdminRole> = {
  news: "news_editor",
  announcements: "announcement_editor",
  events: "event_editor",
  alumni: "alumni_editor",
  gallery: "gallery_editor",
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  news_editor: "News Editor",
  announcement_editor: "Announcement Editor",
  event_editor: "Event Editor",
  alumni_editor: "Alumni Editor",
  gallery_editor: "Gallery Editor",
};

/** Can a given role access a section? (Pure function, no Supabase needed) */
export function canAccessSectionByRole(role: AdminRole, section: ContentSection): boolean {
  if (role === "super_admin") return true;
  return SECTION_ROLES[section] === role;
}

/** Get a landing path for a given role */
export function getLoginRedirectPath(role: AdminRole): string {
  if (role === "super_admin") return "/admin/dashboard";
  for (const [section, sectionRole] of Object.entries(SECTION_ROLES)) {
    if (sectionRole === role) return `/admin/${section}`;
  }
  return "/admin/dashboard";
}
