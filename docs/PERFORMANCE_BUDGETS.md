# Performance Budgets & Bundle Analysis

This document defines performance budgets for the St. Elizabeth's High School website and explains how to monitor them.

## 📊 Bundle Size Budgets

### Target Bundle Sizes (Gzipped)

| Category          | Budget   | Current | Status  |
| ----------------- | -------- | ------- | ------- |
| **First Load JS** | < 200 KB | ~180 KB | ✅ Pass |
| **Homepage**      | < 150 KB | ~130 KB | ✅ Pass |
| **Per Route**     | < 100 KB | ~80 KB  | ✅ Pass |
| **Shared Chunks** | < 150 KB | ~120 KB | ✅ Pass |

### Critical Metrics

- **Time to Interactive (TTI):** < 3.5s on 3G
- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Total Blocking Time (TBT):** < 200ms
- **Cumulative Layout Shift (CLS):** < 0.1

## 🔍 How to Analyze Bundles

### Option 1: Bundle Analyzer (Visual)

Run the bundle analyzer to see a visual treemap of your bundle:

```bash
npm run analyze
```

This will:

1. Build the production bundle
2. Generate analysis reports
3. Open three browser tabs with:
   - Client bundle analysis
   - Server bundle analysis
   - Edge bundle analysis

### Option 2: Next.js Build Output

Every production build shows bundle sizes:

```bash
npm run build
```

Look for the route table showing:

- First Load JS - JavaScript sent on initial page load
- Size - Size of individual route bundles

### Option 3: Lighthouse CI (Recommended for CI/CD)

Run Lighthouse in CI to enforce budgets:

```bash
npx lighthouse-ci autorun
```

## 📏 Bundle Size Guidelines

### What to Keep Under Control

1. **Heavy npm packages**
   - Avoid: moment.js (use date-fns or Intl)
   - Avoid: lodash entire library (use lodash-es with tree shaking)
   - Check: All animation libraries

2. **Large images**
   - Use Next.js Image component (automatic optimization)
   - Serve WebP/AVIF when possible
   - Lazy load below-the-fold images

3. **Third-party scripts**
   - Load analytics scripts with next/script
   - Use Script strategy="lazyOnload" when possible
   - Defer non-critical scripts

4. **Client-side data fetching**
   - Prefer Server Components
   - Use Server Actions for mutations
   - Minimize client-side state

## 🚨 When Budgets Are Exceeded

If bundle size exceeds budgets:

### 1. Identify the Culprit

Run bundle analyzer:

```bash
npm run analyze
```

Look for:

- Large npm packages (> 50 KB)
- Duplicate dependencies
- Unused code

### 2. Common Fixes

**Split large components:**

```tsx
// Before
import HeavyChart from "heavy-chart-library";

// After
const HeavyChart = dynamic(() => import("heavy-chart-library"), {
  loading: () => <div>Loading chart...</div>,
});
```

**Use dynamic imports:**

```tsx
// Only load when modal opens
const [showModal, setShowModal] = useState(false);
const Modal = showModal ? lazy(() => import("./Modal")) : null;
```

**Optimize package imports:**

```js
// next.config.ts
experimental: {
  optimizePackageImports: ["lucide-react", "react-icons"];
}
```

**Remove unused code:**

```bash
# Check for unused dependencies
npx depcheck

# Check for unused exports
npx ts-prune
```

### 3. Server Components First

Move heavy computation to Server Components:

```tsx
// ❌ Client Component (ships library to client)
"use client";
import { highlight } from "prismjs";

export function CodeBlock({ code }) {
  const html = highlight(code, "tsx");
  return <pre dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ Server Component (library stays on server)
import { highlight } from "prismjs";

export function CodeBlock({ code }) {
  const html = highlight(code, "tsx");
  return <pre dangerouslySetInnerHTML={{ __html: html }} />;
}
```

## 📈 Monitoring in CI

### GitHub Actions Example

```yaml
# .github/workflows/performance.yml
name: Performance Budget
on: [pull_request]

jobs:
  check-bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build and analyze
        run: ANALYZE=true npm run build

      - name: Check bundle size
        run: |
          # Fail if First Load JS > 200KB
          npx bundlesize
```

### bundlesize configuration

Create `.bundlesizerc.json`:

```json
{
  "files": [
    {
      "path": ".next/static/chunks/pages/*.js",
      "maxSize": "100 KB"
    },
    {
      "path": ".next/static/chunks/*.js",
      "maxSize": "150 KB"
    }
  ]
}
```

## 🎯 Optimization Checklist

Before deploying:

- [ ] Run `npm run analyze` and review large dependencies
- [ ] Check Lighthouse score is > 90
- [ ] Verify no duplicate dependencies (check node_modules)
- [ ] Confirm images use Next.js Image component
- [ ] Ensure heavy libraries use dynamic imports
- [ ] Check that Server Components are default
- [ ] Verify third-party scripts use next/script
- [ ] Test on slow 3G connection

## 📚 Resources

- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Web.dev Performance Budgets](https://web.dev/performance-budgets-101/)
- [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## 🔄 Review Schedule

Performance budgets should be reviewed:

- **Weekly:** During development
- **Per PR:** Before merging to main
- **Monthly:** Adjust budgets based on features added
- **Quarterly:** Deep dive with full Lighthouse audit

---

**Last Updated:** 2026-07-10  
**Owner:** Development Team  
**Status:** Active monitoring
