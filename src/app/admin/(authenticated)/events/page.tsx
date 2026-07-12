import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getAllEvents, deleteEvent, type EventRow } from "@/shared/lib/db/events.repository";
import { DeleteButton } from "@/features/admin/delete-button";

export default async function EventsListPage() {
  let items: EventRow[] = [];

  try {
    items = await getAllEvents(true);
  } catch {
    /* empty */
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteEvent(id);
    revalidatePath("/admin/events");
  }

  return (
    <div>
      <div style={styles.toolbar}>
        <h2 style={styles.heading}>Events</h2>
        <Link href="/admin/events/new" style={styles.addButton}>
          + New Event
        </Link>
      </div>
      {items.length === 0 ? (
        <div style={styles.empty}>
          <p>No events yet.</p>
          <Link href="/admin/events/new">Create your first →</Link>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id} style={styles.tr}>
                <td style={styles.td}>
                  <strong>{e.title}</strong>
                </td>
                <td style={styles.td}>{e.date}</td>
                <td style={styles.td}>{e.type}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.125rem 0.5rem",
                      borderRadius: "999px",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      textTransform: "uppercase" as const,
                      background: e.published ? "#dcfce7" : "#fef3c7",
                      color: e.published ? "#166534" : "#92400e",
                    }}
                  >
                    {e.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <Link href={`/admin/events/${e.id}/edit`} style={styles.editLink}>
                    Edit
                  </Link>
                  <DeleteButton id={e.id} label="event" onDelete={handleDelete} />
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
  heading: { fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: 0 },
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
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#334155" },
  editLink: {
    fontSize: "0.8125rem",
    color: "#2563eb",
    textDecoration: "none",
    marginRight: "1rem",
  },
  empty: { padding: "3rem 0", textAlign: "center" as const, color: "#64748b" },
};
