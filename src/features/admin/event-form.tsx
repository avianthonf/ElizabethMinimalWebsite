"use client";

interface EventFormProps {
  action: (formData: FormData) => void;
  defaults?: {
    title?: string;
    date?: string;
    time?: string;
    location?: string;
    type?: string;
    published?: boolean;
    sort_order?: number;
  };
  submitLabel?: string;
}

export function EventForm({ action, defaults, submitLabel = "Save" }: EventFormProps) {
  return (
    <form action={action} style={styles.form}>
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
            placeholder="e.g. September 1, 2026"
          />
        </label>
        <label style={{ ...styles.label, flex: 1 }}>
          Time
          <input
            name="time"
            defaultValue={defaults?.time}
            style={styles.input}
            placeholder="e.g. 9:00 AM"
          />
        </label>
      </div>

      <label style={styles.label}>
        Location
        <input name="location" defaultValue={defaults?.location} style={styles.input} />
      </label>

      <div style={styles.row}>
        <label style={{ ...styles.label, flex: 1 }}>
          Type
          <select
            name="type"
            defaultValue={defaults?.type ?? "academic"}
            style={{ ...styles.input, WebkitAppearance: "menulist" } as React.CSSProperties}
          >
            <option>academic</option>
            <option>sports</option>
            <option>cultural</option>
            <option>admissions</option>
            <option>community</option>
          </select>
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
