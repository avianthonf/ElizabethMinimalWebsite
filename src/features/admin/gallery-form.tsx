"use client";

interface GalleryFormProps {
  action: (formData: FormData) => void;
  defaults?: {
    storage_path?: string;
    alt?: string;
    category?: string;
    section?: string;
    sub_category?: string;
    image_date?: string;
    published?: boolean;
    sort_order?: number;
  };
  submitLabel?: string;
}

const CATEGORIES = [
  "hero",
  "gallery",
  "academics",
  "athletics",
  "arts",
  "community",
  "heritage",
  "student-life",
  "general",
];

export function GalleryForm({ action, defaults, submitLabel = "Save" }: GalleryFormProps) {
  return (
    <form action={action} style={styles.form}>
      <label style={styles.label}>
        Storage Path <span style={styles.help}>e.g. gallery/homepage/DSC07580.jpg</span>
        <input
          name="storage_path"
          defaultValue={defaults?.storage_path}
          required
          style={styles.input}
          placeholder="gallery/homepage/DSC07580.jpg"
        />
      </label>

      <label style={styles.label}>
        Alt Text
        <input name="alt" defaultValue={defaults?.alt} required style={styles.input} />
      </label>

      <div style={styles.row}>
        <label style={{ ...styles.label, flex: 1 }}>
          Category
          <select
            name="category"
            defaultValue={defaults?.category ?? "general"}
            style={{ ...styles.input, WebkitAppearance: "menulist" } as React.CSSProperties}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label style={{ ...styles.label, flex: 1 }}>
          Section
          <input
            name="section"
            defaultValue={defaults?.section}
            required
            style={styles.input}
            placeholder="homepage-hero"
          />
        </label>
      </div>

      <div style={styles.row}>
        <label style={{ ...styles.label, flex: 1 }}>
          Sub-Category
          <input
            name="sub_category"
            defaultValue={defaults?.sub_category ?? ""}
            style={styles.input}
            placeholder="e.g. Inter-House 2024"
          />
        </label>
        <label style={{ ...styles.label, flex: 1 }}>
          Image Date
          <input
            name="image_date"
            defaultValue={defaults?.image_date ?? ""}
            style={styles.input}
            placeholder="e.g. Spring 2025"
          />
        </label>
      </div>

      <div style={styles.row}>
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="published"
            value="true"
            defaultChecked={defaults?.published}
          />
          Published
        </label>
        <label style={{ ...styles.label, flex: 1 }}>
          Sort Order
          <input
            name="sort_order"
            type="number"
            defaultValue={defaults?.sort_order ?? 0}
            style={styles.input}
          />
        </label>
      </div>

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
  row: { display: "flex", gap: "1rem", alignItems: "flex-end" },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "#334155",
  },
  help: { fontWeight: 400, color: "#94a3b8", fontSize: "0.75rem" },
  input: {
    padding: "0.5rem 0.625rem",
    fontSize: "0.875rem",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
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
