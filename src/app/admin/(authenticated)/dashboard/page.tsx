import Link from "next/link";
import {
  getAllNewsArticles,
  getAllAnnouncements,
  getAllEvents,
  getAllTestimonials,
} from "@/shared/lib/db";

function StatCard({
  label,
  count,
  href,
  hrefLabel,
}: {
  label: string;
  count: number;
  href: string;
  hrefLabel: string;
}) {
  return (
    <div style={styles.card}>
      <span style={styles.cardCount}>{count}</span>
      <span style={styles.cardLabel}>{label}</span>
      <Link href={href} style={styles.cardLink}>
        {hrefLabel} →
      </Link>
    </div>
  );
}

export default async function DashboardPage() {
  let newsCount = 0;
  let announcementsCount = 0;
  let eventsCount = 0;
  let testimonialsCount = 0;

  try {
    const [news, announcements, events, testimonials] = await Promise.all([
      getAllNewsArticles(true),
      getAllAnnouncements(),
      getAllEvents(true),
      getAllTestimonials(true),
    ]);
    newsCount = news.length;
    announcementsCount = announcements.length;
    eventsCount = events.length;
    testimonialsCount = testimonials.length;
  } catch {
    // Supabase not configured — show zeros
  }

  return (
    <div>
      <p style={styles.welcome}>
        Welcome to the St. Elizabeth&apos;s High School content management system. Manage news,
        announcements, events, alumni content, and gallery images.
      </p>

      <div style={styles.grid}>
        <StatCard label="News Articles" count={newsCount} href="/admin/news" hrefLabel="Manage" />
        <StatCard
          label="Announcements"
          count={announcementsCount}
          href="/admin/announcements"
          hrefLabel="Manage"
        />
        <StatCard label="Events" count={eventsCount} href="/admin/events" hrefLabel="Manage" />
        <StatCard
          label="Alumni Testimonials"
          count={testimonialsCount}
          href="/admin/alumni"
          hrefLabel="Manage"
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  welcome: {
    fontSize: "0.9375rem",
    color: "#475569",
    lineHeight: 1.6,
    margin: "0 0 2rem",
    maxWidth: "600px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    padding: "1.5rem",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  cardCount: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#0f172a",
  },
  cardLabel: {
    fontSize: "0.8125rem",
    color: "#64748b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  cardLink: {
    marginTop: "0.5rem",
    fontSize: "0.8125rem",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500,
  },
};
