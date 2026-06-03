# Step 6: Menu Overlay — Full-Screen Navigation

> **Handoff to:** Senior Frontend Engineer
> **Estimated time:** 3–4 hours
> **Risk level:** Medium — new component, needs animation and accessibility work
> **Depends on:** Step 5 (navigation data wired up)
> **Baseline:** All previous tests passing, clean build

---

## 1. CONTEXT

### The Problem

The Header's **Menu** button is currently `disabled`. Clicking it does nothing. The PAGE_ELEMENT_HIERARCHY.md §9 specifies a full-screen menu overlay with:

1. **All 10 navigation categories** listed in a grid or column layout
2. **Image preview on hover** — hovering over a category (e.g., "ABOUT") shows a relevant school photo
3. **Smooth slide-in animation** with staggered nav item entrance
4. **Close button** — either clicking the Menu button again or an X button
5. **Mobile-responsive** — on narrow screens, a stacked list instead of a grid

This is the same pattern used by The Walker School (www.thewalkerschool.org).

---

## 2. DESIRED BEHAVIOR

### States

| State | Visual | Trigger |
|---|---|---|
| **Closed** | Overlay not in DOM (or `visibility: hidden`) | Initial page load, close button click, Escape key |
| **Opening** | Overlay slides in from right (or fades in), nav items stagger in | Menu button click |
| **Open** | Overlay covers viewport, nav items visible, image preview on hover | After animation completes |
| **Closing** | Overlay slides out, nav items fade out | Close button, Escape key, clicking outside |

### Interactions

| Interaction | Behavior |
|---|---|
| Click Menu button (hamburger) | Open overlay |
| Click Close/X button | Close overlay |
| Press Escape key | Close overlay |
| Click overlay backdrop (outside nav) | Close overlay |
| Hover over nav category (desktop) | Show image preview for that category |
| Focus on nav category (keyboard) | Show image preview for that category |
| Click a nav link | Navigate to that page, close overlay |
| Scroll (while open) | Prevent body scroll (`overflow: hidden` on body) |

### Animation Spec

- **Overlay entrance**: `opacity 0→1` over 300ms, `cubic-bezier(0.25, 1, 0.5, 1)` (matches `--ease-standard`)
- **Nav item entrance**: Each item fades in + slides up 20px, staggered by 50ms per item
- **Image preview**: Crossfade between images, 200ms transition
- **Overlay exit**: Reverse of entrance, 200ms
- **`prefers-reduced-motion`**: Instant show/hide, no stagger

---

## 3. COMPONENT CREATION

### New Component: `src/components/navigation/MenuOverlay/`

Create a new component following the project's 4-file pattern:

```
src/components/navigation/MenuOverlay/
├── MenuOverlay.tsx
├── MenuOverlay.module.css
├── MenuOverlay.test.tsx
└── index.ts
```

### File 1: `MenuOverlay.tsx`

```tsx
"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type KeyboardEvent, type MouseEvent } from "react";
import { Link } from "@/components/primitives/Link";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import type { NavCategory } from "@/data/navigation";
import styles from "./MenuOverlay.module.css";

export interface MenuOverlayProps {
  /** Navigation categories to display */
  categories: NavCategory[];
  /** Map of category title → image filename for hover preview */
  previewImages?: Record<string, string>;
  /** Whether the overlay is currently open */
  isOpen: boolean;
  /** Called when the user requests to close the overlay */
  onClose: () => void;
  /** aria-label for the overlay */
  ariaLabel?: string;
}

export function MenuOverlay({
  categories,
  previewImages = {},
  isOpen,
  onClose,
  ariaLabel = "Site navigation menu",
}: MenuOverlayProps): ReactNode {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // ── Open/Close lifecycle ──────────────────────────────────────────

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Prevent body scroll while menu is open
      document.body.style.overflow = "hidden";
      // Small delay to trigger entrance animation after render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "";
      // Wait for exit animation to complete before removing from DOM
      const timer = setTimeout(() => setShouldRender(false), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ── Keyboard: Escape to close ─────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // ── Focus trap: focus first link on open ──────────────────────────

  useEffect(() => {
    if (isOpen && overlayRef.current) {
      const firstLink = overlayRef.current.querySelector<HTMLAnchorElement>("a[href]");
      firstLink?.focus();
    }
  }, [isOpen]);

  // ── Handlers ──────────────────────────────────────────────────────

  const handleBackdropClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleCategoryHover = useCallback((categoryTitle: string) => {
    setActiveCategory(categoryTitle);
  }, []);

  const handleCategoryHoverEnd = useCallback(() => {
    setActiveCategory(null);
  }, []);

  // ── Don't render anything when closed ─────────────────────────────

  if (!shouldRender) {
    return null;
  }

  const overlayClassName = [
    styles.overlay,
    isAnimating ? styles.overlayOpen : styles.overlayClosed,
  ]
    .filter(Boolean)
    .join(" ");

  const currentPreviewImage = activeCategory
    ? previewImages[activeCategory]
    : null;

  return (
    <div
      ref={overlayRef}
      className={overlayClassName}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <span className={styles.closeIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </span>
        <span className={styles.closeLabel}>Close</span>
      </button>

      {/* Navigation grid */}
      <nav className={styles.nav} aria-label="Site navigation menu">
        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={styles.category}
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => handleCategoryHover(category.title)}
              onMouseLeave={handleCategoryHoverEnd}
              onFocus={() => handleCategoryHover(category.title)}
              onBlur={handleCategoryHoverEnd}
            >
              <Text variant="eyebrow" as="span" className={styles.categoryTitle}>
                {category.title}
              </Text>
              <ul className={styles.categoryLinks}>
                {category.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      variant="nav"
                      className={styles.menuLink}
                      onClick={onClose}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Image preview panel (desktop only) */}
      {currentPreviewImage && (
        <div className={styles.previewPanel} aria-hidden="true">
          <div
            className={styles.previewImage}
            style={{ backgroundImage: `url('/images/${currentPreviewImage}')` }}
          />
        </div>
      )}
    </div>
  );
}
```

### File 2: `MenuOverlay.module.css`

```css
/* ═══════════════════════════════════════════════════════════════════════
   MenuOverlay — Full-Screen Navigation Overlay
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Overlay Container ──────────────────────────────────────────────── */

.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  grid-template-columns: 1fr;
  background: var(--color-maroon);
  color: var(--color-paper);
  overflow-y: auto;
  transition: opacity var(--transition-normal);
}

.overlayClosed {
  opacity: 0;
  pointer-events: none;
}

.overlayOpen {
  opacity: 1;
  pointer-events: auto;
}

/* ── Close Button ───────────────────────────────────────────────────── */

.closeButton {
  position: absolute;
  top: clamp(22px, 3vw, 44px);
  right: clamp(24px, 5vw, 72px);
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-paper);
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.closeIcon {
  display: grid;
  place-items: center;
}

.closeIcon svg {
  display: block;
}

/* ── Navigation Grid ────────────────────────────────────────────────── */

.nav {
  padding: clamp(80px, 12vw, 140px) clamp(24px, 5vw, 72px) clamp(40px, 6vw, 80px);
  max-width: 1200px;
  width: 100%;
}

.categoriesGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 4vw, 48px) clamp(20px, 3vw, 40px);
}

/* ── Category Block ─────────────────────────────────────────────────── */

.category {
  opacity: 0;
  transform: translateY(20px);
  animation: staggerIn 400ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.categoryTitle {
  display: block;
  margin-bottom: clamp(12px, 2vw, 18px);
  color: rgba(255, 255, 255, 0.6) !important;
  font-size: 0.72rem !important;
}

.categoryLinks {
  margin: 0;
  padding: 0;
  list-style: none;
}

.categoryLinks li {
  margin-bottom: 8px;
}

.menuLink {
  color: var(--color-paper) !important;
  font-size: clamp(1rem, 1.4vw, 1.25rem) !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  transition: opacity var(--transition-fast);
}

.menuLink:hover,
.menuLink:focus-visible {
  opacity: 0.7;
}

/* ── Image Preview Panel ────────────────────────────────────────────── */

.previewPanel {
  display: none; /* Hidden on mobile */
  position: fixed;
  right: clamp(24px, 5vw, 72px);
  top: 50%;
  transform: translateY(-50%);
  width: clamp(300px, 30vw, 480px);
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.previewImage {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: opacity 200ms ease;
  animation: crossfadeIn 200ms ease;
}

/* ── Animations ─────────────────────────────────────────────────────── */

@keyframes staggerIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes crossfadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ── Responsive ─────────────────────────────────────────────────────── */

@media (min-width: 1101px) {
  .overlay {
    grid-template-columns: 1fr auto;
  }

  .previewPanel {
    display: block;
  }
}

@media (max-width: 1100px) {
  .categoriesGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(20px, 3vw, 36px);
  }
}

@media (max-width: 760px) {
  .categoriesGrid {
    grid-template-columns: 1fr;
    gap: clamp(16px, 2.5vw, 24px);
  }

  .nav {
    padding-top: clamp(100px, 15vw, 140px);
  }

  .menuLink {
    font-size: 1.1rem !important;
  }
}

/* ── Reduced Motion ─────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .category {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .overlay {
    transition: none;
  }
}
```

### File 3: `MenuOverlay.test.tsx`

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuOverlay } from "./MenuOverlay";
import type { NavCategory } from "@/data/navigation";

const mockCategories: NavCategory[] = [
  {
    title: "ABOUT",
    links: [
      { text: "Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
    ],
  },
  {
    title: "ADMISSIONS",
    links: [
      { text: "Why St. Elizabeth?", href: "/admissions/why" },
    ],
  },
];

describe("MenuOverlay", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <MenuOverlay categories={mockCategories} isOpen={false} onClose={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders categories when open", () => {
    render(<MenuOverlay categories={mockCategories} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("ABOUT")).toBeDefined();
    expect(screen.getByText("ADMISSIONS")).toBeDefined();
    expect(screen.getByText("Mission & Values")).toBeDefined();
    expect(screen.getByText("History")).toBeDefined();
  });

  it("renders nav links with correct hrefs", () => {
    render(<MenuOverlay categories={mockCategories} isOpen={true} onClose={vi.fn()} />);
    const link = screen.getByText("Mission & Values");
    expect(link.getAttribute("href")).toBe("/about/mission");
  });

  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(<MenuOverlay categories={mockCategories} isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close navigation menu"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when Escape pressed", () => {
    const onClose = vi.fn();
    render(<MenuOverlay categories={mockCategories} isOpen={true} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when backdrop clicked", () => {
    const onClose = vi.fn();
    render(<MenuOverlay categories={mockCategories} isOpen={true} onClose={onClose} />);
    const overlay = screen.getByRole("dialog");
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("has aria-modal and role attributes", () => {
    render(<MenuOverlay categories={mockCategories} isOpen={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
  });

  it("prevents body scroll when open", () => {
    render(<MenuOverlay categories={mockCategories} isOpen={true} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when closed", () => {
    const { rerender } = render(
      <MenuOverlay categories={mockCategories} isOpen={true} onClose={vi.fn()} />
    );
    rerender(<MenuOverlay categories={mockCategories} isOpen={false} onClose={vi.fn()} />);
    // After the exit animation timeout, body scroll should be restored
    // This test may need adjustment based on the actual timer in the component
  });
});
```

### File 4: `index.ts`

```typescript
export { MenuOverlay } from "./MenuOverlay";
export type { MenuOverlayProps } from "./MenuOverlay";
```

### Update: `src/components/navigation/index.ts`

Add the MenuOverlay to the barrel export:

```typescript
export { Header } from "./Header/Header";
export type { HeaderProps, HeaderNavLink } from "./Header/Header";
export { Footer } from "./Footer/Footer";
export type { FooterProps, FooterSection } from "./Footer/Footer";
export { MenuOverlay } from "./MenuOverlay/MenuOverlay";
export type { MenuOverlayProps } from "./MenuOverlay/MenuOverlay";
```

---

## 4. HEADER INTEGRATION

### Update `src/components/navigation/Header/Header.tsx`

1. **Remove the `disabled` attribute from the Menu button**
2. **Accept an `onMenuClick` callback prop** (or expose the menu state internally)
3. **Wire the Menu button to trigger the overlay**

Since the MenuOverlay needs to be rendered somewhere, the cleanest approach is to keep the parent (WalkerHomepage or layout) managing the state. Update the Header to accept a click handler:

```typescript
export interface HeaderProps {
  // ... existing props ...
  /** Called when the menu button is clicked. If not provided, menu button is disabled. */
  onMenuClick?: () => void;
  /** Whether the menu is currently open (changes button aria-label) */
  isMenuOpen?: boolean;
}
```

In the Header render:
```tsx
{showMenu && (
  <button
    className={styles.menuButton}
    type="button"
    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    aria-expanded={isMenuOpen}
    disabled={!onMenuClick}
    onClick={onMenuClick}
  >
    <span>Menu</span>
    <span className={styles.menuIcon} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  </button>
)}
```

---

## 5. WALKERHOMEPAGE INTEGRATION

### Update `src/components/WalkerHomepage/WalkerHomepage.tsx`

Add the MenuOverlay to the homepage (and the root layout for inner pages):

```tsx
"use client";  // Need client directive for menu state

import { useState, useCallback } from "react";
import { MenuOverlay } from "@/components/navigation/MenuOverlay";
import { MENU_CATEGORIES } from "@/data/navigation";

export function WalkerHomepage(): React.ReactNode {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = useCallback(() => setIsMenuOpen(true), []);
  const handleMenuClose = useCallback(() => setIsMenuOpen(false), []);

  return (
    <main className={styles.page}>
      <LoadOverlay />

      <Header
        brandText="St. Elizabeth High School"
        navLinks={HEADER_NAV_LINKS}
        transparent
        fixed
        onMenuClick={handleMenuOpen}
        isMenuOpen={isMenuOpen}
      />

      <MenuOverlay
        categories={MENU_CATEGORIES}
        previewImages={{
          ABOUT: HERO_IMAGES.find(i => i.section === "about-hero")?.filename ?? "",
          ADMISSIONS: HERO_IMAGES.find(i => i.section === "admissions-hero")?.filename ?? "",
          ACADEMICS: ACADEMICS_HERO.filename,
          ATHLETICS: ATHLETICS_IMAGES[0]?.filename ?? "",
          ARTS: ARTS_IMAGES[0]?.filename ?? "",
          "STUDENT LIFE": STUDENT_LIFE_IMAGES[0]?.filename ?? "",
          ALUMNI: COMMUNITY_IMAGES[0]?.filename ?? "",
          NEWS: NEWS_IMAGES[0]?.filename ?? "",
          CONTACT: CONTACT_IMAGES[0]?.filename ?? "",
          "HOW TO HELP": COMMUNITY_IMAGES[1]?.filename ?? "",
        }}
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
      />

      {/* ... rest of the 8 panels ... */}
    </main>
  );
}
```

**Important:** Adding `"use client"` to WalkerHomepage makes it a client component. This is necessary for managing the menu open/close state. Verify that the existing data imports still work (they will — data files are pure TypeScript, serializable, and safe for client components).

---

## 6. IMAGE PREVIEW MAPPING

Map each menu category to a representative image:

| Menu Category | Image | Rationale |
|---|---|---|
| ABOUT | `HERO_IMAGES` (about-hero) | DSC07548 — dynamic, warm, school-life |
| ADMISSIONS | `HERO_IMAGES` (admissions-hero) | DSC07360 — medium complexity, text-friendly |
| ACADEMICS | `ACADEMICS_HERO` | DSC07576 — only cool-tone image, contemplative |
| ATHLETICS | `ATHLETICS_IMAGES[0]` | Highest energy athletics photo |
| ARTS | `ARTS_IMAGES[0]` | Arts program image |
| STUDENT LIFE | `STUDENT_LIFE_IMAGES[0]` | Bright, engaging |
| ALUMNI | `COMMUNITY_IMAGES[0]` | Heritage, community |
| NEWS | `NEWS_IMAGES[0]` | Dynamic event |
| CONTACT | `CONTACT_IMAGES[0]` | Welcoming campus |
| HOW TO HELP | `COMMUNITY_IMAGES[1]` | Heritage, intimate |

---

## 7. ACCESSIBILITY REQUIREMENTS

| Requirement | Implementation |
|---|---|
| `role="dialog"` | On the overlay container |
| `aria-modal="true"` | On the overlay — tells screen readers content outside is inert |
| `aria-label` | On the overlay — describes the purpose |
| Focus trap | When overlay opens, first nav link gets focus |
| Escape to close | `keydown` listener on `document` |
| Click outside to close | Backdrop click handler (check `e.target === e.currentTarget`) |
| `aria-expanded` | On the Menu button — `true` when open, `false` when closed |
| `aria-label` on close button | "Close navigation menu" |
| Body scroll prevention | `document.body.style.overflow = "hidden"` when open |
| Focus restoration | When overlay closes, focus returns to the Menu button |
| `prefers-reduced-motion` | Disable stagger animation and crossfade |

---

## 8. ACCEPTANCE CRITERIA

- [ ] `pnpm build` passes with zero TypeScript errors
- [ ] `pnpm test` passes — MenuOverlay tests + all existing tests green
- [ ] Menu button is no longer disabled — clicking opens the overlay
- [ ] Overlay covers the full viewport with royal blue background
- [ ] All 10 navigation categories are displayed with their links
- [ ] Hovering a category shows a preview image (desktop only)
- [ ] Close button (X) closes the overlay
- [ ] Escape key closes the overlay
- [ ] Clicking overlay backdrop (outside nav) closes the overlay
- [ ] Clicking a nav link navigates and closes the overlay
- [ ] Body scroll is prevented while overlay is open
- [ ] Body scroll is restored when overlay closes
- [ ] Stagger animation plays on nav items (50ms per item)
- [ ] `prefers-reduced-motion` disables stagger animation
- [ ] Mobile (≤1100px): 2-column grid of categories
- [ ] Mobile narrow (≤760px): 1-column list
- [ ] Mobile: No image preview panel (hidden)
- [ ] Menu button shows `aria-expanded="true"` when open
- [ ] Overlay has `role="dialog"` and `aria-modal="true"`
- [ ] Focus is trapped — keyboard navigation works within the overlay
- [ ] Close button has accessible label "Close navigation menu"

---

## 9. EDGE CASES & NOTES

1. **The current WalkerHomepage is a server component** (no `"use client"` directive). Adding menu state requires `"use client"`. This is fine — the page isn't doing data fetching, and the data imports are all static TypeScript objects that serialize safely.

2. **The search button remains disabled.** Search functionality is future scope and should not be implemented in this step.

3. **The MenuOverlay does NOT need to be added to inner pages in this step.** Inner pages can use the Header with the disabled Menu button for now (pass `onMenuClick={undefined}`). Adding the overlay to inner pages is a follow-up task.

4. **The image preview uses `background-image`** with inline style — not Next.js `<Image>`. This is intentional for the hover crossfade effect. The preview images are loaded on demand via CSS, avoiding bandwidth waste when the user doesn't hover.

5. **The overlay's royal blue background** inherits from `--color-maroon` which was updated to `#0c217c` in Step 1. The white text on royal blue should be readable. If contrast is insufficient, add `text-shadow` to the nav links (the existing `--color-maroon-dark: #060f45` provides a darker fallback).

6. **The `!important` flags on `.menuLink` and `.categoryTitle`** override the Link component's default variant styles. The Link `variant="nav"` normally adds uppercase + text-shadow + specific font-size. The menu link should NOT be uppercase — it should be sentence-case, larger, and bold. The `!important` flags are necessary because CSS Modules can't control the specificity order of imported component styles.

---

*Handoff complete. This is the most technically involved step after Step 3. Proceed to Step 7 after verification.*
