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
      // server-only is compiled into next/dist — not resolvable in vitest.
      "server-only": path.resolve(__dirname, "src/test/mocks/server-only.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["e2e/**", "node_modules/**", ".worktrees/**"],
    coverage: {
      provider: "v8",
      enabled: true,
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "**/*.d.ts",
        "**/*.config.*",
        "**/node_modules/**",
        "**/dist/**",
        "**/.next/**",
        "**/e2e/**",
        "**/test/**",
        "**/__tests__/**",
        "**/vitest.setup.ts",
      ],
      thresholds: {
        // Current coverage: ~40%
        // Set realistic thresholds that will gradually increase
        statements: 40,
        branches: 35,
        functions: 40,
        lines: 40,
        // Fail on coverage decrease
        autoUpdate: false,
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
