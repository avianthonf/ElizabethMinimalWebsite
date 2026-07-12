import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — bypasses Row Level Security.
 *
 * NEVER use this in a client component, Server Action called from the client,
 * or any code path that touches the browser. It grants unrestricted database
 * access and must only run in Server Components or route handlers that are
 * behind admin authentication guards.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
