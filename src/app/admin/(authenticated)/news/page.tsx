import Link from "next/link";
import { revalidatePath } from "next/cache";
import {
  getAllNewsArticles,
  deleteNewsArticle,
  type NewsArticleRow,
} from "@/shared/lib/db/news.repository";
import { DeleteButton } from "@/features/admin/delete-button";

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.125rem 0.5rem",
        borderRadius: "999px",
        fontSize: "0.6875rem",
        fontWeight: 600,
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
        background: published ? "#dcfce7" : "#fef3c7",
        color: published ? "#166534" : "#92400e",
      }}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

export default async function NewsListPage() {
  let articles: NewsArticleRow[] = [];

  try {
    articles = await getAllNewsArticles(true);
  } catch {
    // Supabase not configured — show empty
    if (process.env.NODE_ENV !== "production") {
      console.error("[admin] Failed to fetch news articles (Supabase may not be configured)");
    }
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteNewsArticle(id);
    revalidatePath("/admin/news");
  }

  return (
    <div>
      <div style={styles.toolbar}>
        <h2 style={styles.heading}>News Articles</h2>
        <Link href="/admin/news/new" style={styles.addButton}>
          + New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div style={styles.empty}>
          <p>No news articles yet.</p>
          <Link href="/admin/news/new">Create your first article →</Link>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} style={styles.tr}>
                <td style={styles.td}>
                  <strong>{a.title}</strong>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.125rem" }}>
                    /news/{a.slug}
                  </div>
                </td>
                <td style={styles.td}>{a.date}</td>
                <td style={styles.td}>{a.category}</td>
                <td style={styles.td}>
                  <StatusBadge published={a.published} />
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <Link href={`/admin/news/${a.id}/edit`} style={styles.editLink}>
                    Edit
                  </Link>
                  <DeleteButton id={a.id} label="article" onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  heading: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  addButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "#fff",
    background: "#0f172a",
    borderRadius: "8px",
    textDecoration: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  },
  th: {
    textAlign: "left" as const,
    padding: "0.75rem 1rem",
    fontSize: "0.6875rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    color: "#64748b",
    borderBottom: "1px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #f1f5f9",
  },
  td: {
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "#334155",
  },
  editLink: {
    fontSize: "0.8125rem",
    color: "#2563eb",
    textDecoration: "none",
    marginRight: "1rem",
  },
  empty: {
    padding: "3rem 0",
    textAlign: "center" as const,
    color: "#64748b",
  },
};
