import Link from "next/link";
import { revalidatePath } from "next/cache";
import {
  getAllGalleryImages,
  deleteGalleryImage,
  type GalleryImageRow,
} from "@/shared/lib/db/gallery.repository";
import { DeleteButton } from "@/features/admin/delete-button";

export default async function GalleryListPage() {
  let items: GalleryImageRow[] = [];

  try {
    items = await getAllGalleryImages(true);
  } catch {
    /* empty */
  }

  async function handleDelete(id: string) {
    "use server";
    await deleteGalleryImage(id);
    revalidatePath("/admin/gallery");
  }

  return (
    <div>
      <div style={styles.toolbar}>
        <h2 style={styles.heading}>Gallery Images</h2>
        <Link href="/admin/gallery/upload" style={styles.addButton}>
          + Upload Image
        </Link>
      </div>
      {items.length === 0 ? (
        <div style={styles.empty}>
          <p>No gallery images yet.</p>
          <Link href="/admin/gallery/upload">Upload your first image →</Link>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Filename</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Section</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((img) => (
              <tr key={img.id} style={styles.tr}>
                <td style={styles.td}>
                  <strong>{img.filename}</strong>
                </td>
                <td style={styles.td}>{img.category}</td>
                <td style={styles.td}>{img.section}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.125rem 0.5rem",
                      borderRadius: "999px",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      textTransform: "uppercase" as const,
                      background: img.published ? "#dcfce7" : "#fef3c7",
                      color: img.published ? "#166534" : "#92400e",
                    }}
                  >
                    {img.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <Link href={`/admin/gallery/${img.id}/edit`} style={styles.editLink}>
                    Edit
                  </Link>
                  <DeleteButton id={img.id} label="image" onDelete={handleDelete} />
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
