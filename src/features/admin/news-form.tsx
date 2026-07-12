"use client";

interface NewsFormProps {
  action: (formData: FormData) => void;
  defaults?: {
    slug?: string;
    title?: string;
    date?: string;
    excerpt?: string;
    image_filename?: string;
    category?: string;
    body?: string;
    published?: boolean;
  };
  submitLabel?: string;
}

export function NewsForm({ action, defaults, submitLabel = "Save" }: NewsFormProps) {
  return (
    <form action={action} style={styles.form}>
      <label style={styles.label}>
        Slug <span style={styles.help}>e.g. &quot;annual-day-2024&quot;</span>
        <input name="slug" defaultValue={defaults?.slug} required style={styles.input} />
      </label>

      <label style={styles.label}>
        Title
        <input name="title" defaultValue={defaults?.title} required style={styles.input} />
      </label>

      <div style={styles.row}>
        <label style={{ ...styles.label, flex: 1 }}>
          Date
          <input
            name="date"
            defaultValue={defaults?.date}
            required
            style={styles.input}
            placeholder="e.g. 15 November 2024"
          />
        </label>
        <label style={{ ...styles.label, flex: 1 }}>
          Category
          <select
            name="category"
            defaultValue={defaults?.category ?? "Events"}
            style={{ ...styles.input, WebkitAppearance: "menulist" } as React.CSSProperties}
          >
            <option>Events</option>
            <option>Academics</option>
            <option>Athletics</option>
            <option>Community</option>
            <option>Announcements</option>
          </select>
        </label>
      </div>

      <label style={styles.label}>
        Excerpt
        <textarea
          name="excerpt"
          defaultValue={defaults?.excerpt}
          required
          rows={3}
          style={styles.textarea}
        />
      </label>

      <label style={styles.label}>
        Body (Markdown)
        <textarea
          name="body"
          defaultValue={defaults?.body}
          rows={10}
          style={styles.textarea}
          placeholder="Full article body in markdown…"
        />
      </label>

      <label style={styles.label}>
        Image Filename
        <input
          name="image_filename"
          defaultValue={defaults?.image_filename}
          style={styles.input}
          placeholder="e.g. DSC07576.jpg"
        />
      </label>

      <label style={styles.checkbox}>
        <input type="checkbox" name="published" value="true" defaultChecked={defaults?.published} />
        Published
      </label>

      <button type="submit" style={styles.button}>
        {submitLabel}
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
  row: {
    display: "flex",
    gap: "1rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "#334155",
  },
  help: {
    fontWeight: 400,
    color: "#94a3b8",
    fontSize: "0.75rem",
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
