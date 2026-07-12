"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";
import {
  type AdminRole,
  ROLE_LABELS,
  ALL_ROLES,
  getLoginRedirectPath,
} from "@/shared/lib/auth-types";

interface LoginFormProps {
  /** Override where each role lands after login (for testing) */
  getRedirect?: (role: AdminRole) => string;
}

export function LoginForm({ getRedirect = getLoginRedirectPath }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    // 1. Authenticate
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2. Fetch user metadata to get role
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const rawRole = user?.user_metadata?.role;

    if (!rawRole || !ALL_ROLES.includes(rawRole)) {
      await supabase.auth.signOut();
      setError("This account does not have CMS access. Contact the site administrator.");
      setLoading(false);
      return;
    }

    // 3. Redirect to the appropriate section
    const role = rawRole as AdminRole;
    router.push(getRedirect(role));
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.brand}>
        <span style={styles.brandIcon}>✧</span>
        <div>
          <h1 style={styles.heading}>St. Elizabeth&apos;s CMS</h1>
          <p style={styles.subtitle}>Content Management System</p>
        </div>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <label style={styles.label}>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={styles.input}
          placeholder="editor@stelizabethhighschool.in"
        />
      </label>

      <label style={styles.label}>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={styles.input}
          placeholder="••••••••"
        />
      </label>

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <div style={styles.roles}>
        <p style={styles.rolesTitle}>Available access levels</p>
        <div style={styles.roleGrid}>
          {ALL_ROLES.map((r) => (
            <span key={r} style={styles.roleBadge}>
              {ROLE_LABELS[r]}
            </span>
          ))}
        </div>
      </div>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "420px",
    padding: "2.25rem",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.25rem",
  },
  brandIcon: {
    fontSize: "1.75rem",
    color: "#c9a96e",
    lineHeight: 1,
  },
  heading: {
    fontSize: "1.375rem",
    fontWeight: 700,
    margin: 0,
    color: "#0f172a",
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: "0.8125rem",
    color: "#64748b",
    margin: 0,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#334155",
  },
  input: {
    padding: "0.625rem 0.75rem",
    fontSize: "0.9375rem",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.75rem",
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "#fff",
    background: "#0f172a",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    padding: "0.625rem 0.75rem",
    fontSize: "0.8125rem",
    color: "#b91c1c",
    background: "#fef2f2",
    borderRadius: "8px",
    margin: 0,
  },
  roles: {
    marginTop: "0.75rem",
    paddingTop: "1rem",
    borderTop: "1px solid #f1f5f9",
  },
  rolesTitle: {
    fontSize: "0.6875rem",
    color: "#94a3b8",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    margin: "0 0 0.5rem",
  },
  roleGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.375rem",
  },
  roleBadge: {
    padding: "0.1875rem 0.5rem",
    fontSize: "0.6875rem",
    fontWeight: 500,
    color: "#475569",
    background: "#f1f5f9",
    borderRadius: "4px",
  },
};
