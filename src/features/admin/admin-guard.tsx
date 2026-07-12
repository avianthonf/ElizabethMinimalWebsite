"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const role = user.user_metadata?.role;
      if (role !== "admin") {
        router.replace("/");
        return;
      }

      if (!cancelled) {
        setVerified(true);
        setLoading(false);
      }
    }

    check();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.text}>Checking permissions…</p>
      </div>
    );
  }

  if (!verified) return null;

  return <>{children}</>;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "system-ui, sans-serif",
  },
  text: {
    fontSize: "1rem",
    color: "#64748b",
  },
};
