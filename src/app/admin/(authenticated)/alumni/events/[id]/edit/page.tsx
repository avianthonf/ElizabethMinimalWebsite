import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAlumniEventById, updateAlumniEvent } from "@/shared/lib/db/alumni-events.repository";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditAlumniEventPage({ params }: Props) {
  const { id } = await params;
  let item;
  try {
    item = await getAlumniEventById(id);
  } catch {
    notFound();
  }
  if (!item) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateAlumniEvent(id, {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      description: (formData.get("description") as string) || "",
      location: (formData.get("location") as string) || "",
      published: formData.get("published") === "true",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    });
    revalidatePath("/admin/alumni/events");
    revalidatePath(`/admin/alumni/events/${id}/edit`);
    redirect("/admin/alumni/events");
  }

  return (
    <div>
      <h3 style={styles.heading}>Edit Alumni Event</h3>
      <form action={handleUpdate} style={styles.form}>
        <label style={styles.label}>
          Title <input name="title" defaultValue={item.title} required style={styles.input} />
        </label>
        <div style={styles.row}>
          <label style={{ ...styles.label, flex: 1 }}>
            Date <input name="date" defaultValue={item.date} required style={styles.input} />
          </label>
          <label style={{ ...styles.label, flex: 1 }}>
            Location <input name="location" defaultValue={item.location} style={styles.input} />
          </label>
        </div>
        <label style={styles.label}>
          Description{" "}
          <textarea
            name="description"
            defaultValue={item.description}
            rows={3}
            style={styles.textarea}
          />
        </label>
        <div style={styles.row}>
          <label style={styles.checkbox}>
            <input type="checkbox" name="published" value="true" defaultChecked={item.published} />{" "}
            Published
          </label>
          <label style={{ ...styles.label, flex: 1 }}>
            Sort Order{" "}
            <input
              name="sort_order"
              type="number"
              defaultValue={item.sort_order}
              style={styles.input}
            />
          </label>
        </div>
        <button type="submit" style={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: { fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "640px",
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  row: { display: "flex", gap: "1rem" },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "#334155",
  },
  input: {
    padding: "0.5rem 0.625rem",
    fontSize: "0.875rem",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
  },
  textarea: {
    padding: "0.5rem 0.625rem",
    fontSize: "0.875rem",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    resize: "vertical" as const,
    fontFamily: "inherit",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "#334155",
    cursor: "pointer",
    paddingTop: "0.5rem",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.625rem 1.25rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#fff",
    background: "#0f172a",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
};
