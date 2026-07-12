import { requireAnyAdmin } from "@/shared/lib/auth";

/**
 * Transparent auth boundary.
 *
 * Every page under /admin/(authenticated) runs through this layout.
 * It checks that the user is logged in AND has a recognized admin role.
 * No UI — just the gate.
 *
 * Per-section layouts (news/layout.tsx etc.) add their own chrome
 * AND their own role enforcement via requireSection().
 */
export default async function TransparentAuthLayout({ children }: { children: React.ReactNode }) {
  await requireAnyAdmin();
  return <>{children}</>;
}
