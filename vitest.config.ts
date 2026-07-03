import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Stub the pagefind runtime in tests — it's a build artifact, not a real module.
      "/pagefind/pagefind.js": path.resolve(__dirname, "src/test/mocks/pagefind.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["e2e/**", "node_modules/**", ".worktrees/**"],
    coverage: {
      provider: "v8",
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
    server: {
      deps: {
        // Pagefind is a runtime artifact, not a real module — stub it.
        fallbackCJS: true,
      },
    },
  },
});
