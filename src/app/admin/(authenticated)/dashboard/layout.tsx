import Link from "next/link";
import { requireAnyAdmin, isSuperAdmin, ROLE_LABELS, type ContentSection } from "@/shared/lib/auth";

const NAV: { label: string; section: ContentSection; href: string; icon: string }[] = [
  { label: "Dashboard", section: "news", href: "/admin/dashboard", icon: "⌂" },
  { label: "News", section: "news", href: "/admin/news", icon: "☰" },
  { label: "Announcements", section: "announcements", href: "/admin/announcements", icon: "♪" },
  { label: "Events", section: "events", href: "/admin/events", icon: "◷" },
  { label: "Alumni", section: "alumni", href: "/admin/alumni", icon: "♛" },
  { label: "Gallery", section: "gallery", href: "/admin/gallery", icon: "▣" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, role } = await requireAnyAdmin();
  const superAdmin = isSuperAdmin(user);

  // Non-super admins: only show their section + dashboard
  const visibleNav = superAdmin ? NAV : NAV.filter((n) => n.label === "Dashboard");

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <span style={styles.brandIcon}>✧</span>
          <span style={styles.brandText}>St. Elizabeth&apos;s</span>
          <span style={styles.brandLabel}>CMS</span>
        </div>

        <nav style={styles.nav}>
          {visibleNav.map((item) => (
            <Link key={item.href} href={item.href} style={styles.navItem}>
              <span style={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            <span style={styles.userEmail}>{user.email}</span>
            <span style={styles.userRole}>{ROLE_LABELS[role]}</span>
          </div>
          <Link href="/api/admin/logout" style={styles.logoutLink}>
            <span style={styles.navIcon}>←</span>
            Sign out
          </Link>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.pageTitle}>Admin Dashboard</h1>
        </header>
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
    background: "#f8fafc",
  },
  sidebar: {
    width: "240px",
    minWidth: "240px",
    display: "flex",
    flexDirection: "column",
    background: "#0f172a",
    color: "#e2e8f0",
    padding: "1.5rem 0",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0 1.25rem 1.25rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "1rem",
  },
  brandIcon: { fontSize: "1.25rem", color: "#c9a96e" },
  brandText: { fontSize: "0.9375rem", fontWeight: 700 },
  brandLabel: {
    fontSize: "0.6875rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#64748b",
    marginLeft: "auto",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
    padding: "0 0.75rem",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
    padding: "0.5rem 0.625rem",
    borderRadius: "8px",
    fontSize: "0.875rem",
    color: "#cbd5e1",
    textDecoration: "none",
    transition: "background 0.15s",
  },
  navIcon: {
    width: "1.5rem",
    textAlign: "center" as const,
    fontSize: "0.875rem",
    opacity: 0.7,
  },
  sidebarFooter: {
    padding: "1rem 1.25rem",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
    marginBottom: "0.75rem",
  },
  userEmail: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  userRole: {
    fontSize: "0.6875rem",
    color: "#c9a96e",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  logoutLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
    padding: "0.375rem 0.625rem",
    borderRadius: "8px",
    fontSize: "0.8125rem",
    color: "#94a3b8",
    textDecoration: "none",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  header: {
    padding: "1.25rem 2rem",
    background: "#fff",
    borderBottom: "1px solid #e2e8f0",
  },
  pageTitle: {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  content: {
    padding: "2rem",
    overflow: "auto",
    flex: 1,
  },
};
