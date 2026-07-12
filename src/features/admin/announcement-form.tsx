"use client";

interface AnnouncementFormProps {
  action: (formData: FormData) => void;
  defaults?: {
    message?: string;
    href?: string;
    link_text?: string;
    enabled?: boolean;
    storage_key?: string;
  };
  submitLabel?: string;
}

export function AnnouncementForm({
  action,
  defaults,
  submitLabel = "Save",
}: AnnouncementFormProps) {
  return (
    <form action={action} style={styles.form}>
      <label style={styles.label}>
        Message
        <input name="message" defaultValue={defaults?.message} required style={styles.input} />
      </label>

      <label style={styles.label}>
        Link URL
        <input
          name="href"
          defaultValue={defaults?.href}
          style={styles.input}
          placeholder="/admissions/apply"
        />
      </label>

      <label style={styles.label}>
        Link Text
        <input
          name="link_text"
          defaultValue={defaults?.link_text}
          style={styles.input}
          placeholder="Apply Now"
        />
      </label>

      <label style={styles.label}>
        Storage Key
        <input
          name="storage_key"
          defaultValue={defaults?.storage_key}
          required
          style={styles.input}
          placeholder="stelizabeths-announcement-2026"
        />
      </label>

      <label style={styles.checkbox}>
        <input
          type="checkbox"
          name="enabled"
          value="true"
          defaultChecked={defaults?.enabled !== false}
        />
        Enabled
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
