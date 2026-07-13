import Link from "next/link";
import { revalidatePath } from "next/cache";
import {
  getAllAlumniEvents,
  deleteAlumniEvent,
  type AlumniEventRow,
} from "@/shared/lib/db/alumni-events.repository";
import { DeleteButton } from "@/features/admin/delete-button";

export default async function AlumniEventsPage() {
  let items: AlumniEventRow[] = [];
  try {
    items = await getAllAlumniEvents(true);
  } catch {
    if (process.env.NODE_ENV !== "production") {
      console.error("[admin] Failed to fetch alumni events (Supabase may not be configured)");
    }
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteAlumniEvent(id);
    revalidatePath("/admin/alumni/events");
  }

  return (
    <div>
      <div style={styles.toolbar}>
        <h3 style={styles.heading}>Alumni Events</h3>
        <Link href="/admin/alumni/events/new" style={styles.addBtn}>
          + New Event
        </Link>
      </div>
      {items.length === 0 ? (
        <p style={styles.empty}>No alumni events yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((evt) => (
              <tr key={evt.id} style={styles.tr}>
                <td style={styles.td}>
                  <strong>{evt.title}</strong>
                </td>
                <td style={styles.td}>{evt.date}</td>
                <td style={styles.td}>{evt.location || "—"}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.125rem 0.5rem",
                      borderRadius: "999px",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      textTransform: "uppercase" as const,
                      background: evt.published ? "#dcfce7" : "#fef3c7",
                      color: evt.published ? "#166534" : "#92400e",
                    }}
                  >
                    {evt.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <Link href={`/admin/alumni/events/${evt.id}/edit`} style={styles.editLink}>
                    Edit
                  </Link>
                  <DeleteButton id={evt.id} label="event" onDelete={handleDelete} />
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
    marginBottom: "1rem",
  },
  heading: { fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 },
  addBtn: {
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
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#334155" },
  editLink: {
    fontSize: "0.8125rem",
    color: "#2563eb",
    textDecoration: "none",
    marginRight: "1rem",
  },
  empty: { padding: "2rem 0", color: "#64748b", textAlign: "center" as const },
};
