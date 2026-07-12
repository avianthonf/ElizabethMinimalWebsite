import Link from "next/link";

interface AdminSectionHeaderProps {
  title: string;
  description: string;
  newHref: string;
  newLabel: string;
}

export function AdminSectionHeader({
  title,
  description,
  newHref,
  newLabel,
}: AdminSectionHeaderProps) {
  return (
    <div style={styles.wrapper}>
      <div>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.desc}>{description}</p>
      </div>
      <Link href={newHref} style={styles.addBtn}>
        {newLabel}
      </Link>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  desc: {
    fontSize: "0.875rem",
    color: "#64748b",
    margin: "0.25rem 0 0",
  },
  addBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.625rem 1.25rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#fff",
    background: "#0f172a",
    borderRadius: "8px",
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
  },
};
