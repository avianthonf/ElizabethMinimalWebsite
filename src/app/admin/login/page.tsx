import { LoginForm } from "@/features/admin/login-form";

export default function LoginPage() {
  return (
    <div style={styles.outer}>
      <LoginForm />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  outer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#f1f5f9",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
};
