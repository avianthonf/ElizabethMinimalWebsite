"use client";

interface TestimonialFormProps {
  action: (formData: FormData) => void;
  defaults?: {
    quote?: string;
    name?: string;
    credentials?: string;
    designation?: string;
    academic_years?: string;
    published?: boolean;
    sort_order?: number;
  };
  submitLabel?: string;
}

export function TestimonialForm({ action, defaults, submitLabel = "Save" }: TestimonialFormProps) {
  return (
    <form action={action} style={styles.form}>
      <label style={styles.label}>
        Name
        <input name="name" defaultValue={defaults?.name} required style={styles.input} />
      </label>

      <label style={styles.label}>
        Quote
        <textarea
          name="quote"
          defaultValue={defaults?.quote}
          required
          rows={5}
          style={styles.textarea}
        />
      </label>

      <div style={styles.row}>
        <label style={{ ...styles.label, flex: 1 }}>
          Credentials
          <input
            name="credentials"
            defaultValue={defaults?.credentials}
            style={styles.input}
            placeholder="e.g. BHMS, PGDEMS, MBA"
          />
        </label>
        <label style={{ ...styles.label, flex: 1 }}>
          Academic Years
          <input
            name="academic_years"
            defaultValue={defaults?.academic_years}
            style={styles.input}
            placeholder="e.g. 1986–1996"
          />
        </label>
      </div>

      <label style={styles.label}>
        Designation
        <input
          name="designation"
          defaultValue={defaults?.designation}
          style={styles.input}
          placeholder="e.g. Svastha Health Clinic, Ecoxim"
        />
      </label>

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
