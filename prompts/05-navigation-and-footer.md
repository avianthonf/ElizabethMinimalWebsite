# Step 5: Navigation & Footer — Full Wire-Up

> **Handoff to:** Senior Frontend Engineer
> **Estimated time:** 1–2 hours
> **Risk level:** Low — updating existing components with data layer content
> **Depends on:** Step 2 (data architecture), Step 3 (homepage), Step 4 (inner pages)
> **Baseline:** All previous tests passing, clean build

---

## 1. CONTEXT

### What This Step Accomplishes

The Header and Footer components were built as generic, reusable components with sensible defaults. This step wires them to the St. Elizabeth data layer so they display real school content rather than placeholder/default content.

This is a SMALL step — most of the work is updating prop values, not restructuring components. The components themselves remain unchanged.

### Current State

**Header defaults:**
- Brand text: `"St. Elizabeth High School"` ✓ (correct)
- Nav links: `["Inquire", "Visit", "Summer", "St. Elizabeth"]` ✗ (Walker School defaults)
- Search: disabled button ✗ (will remain disabled — future work)
- Menu: disabled button ✗ (will remain disabled — future work)

**Footer defaults:**
- Intro heading: `"St. Elizabeth"` (truncated)
- Link sections: Generic placeholder sections
- Social links: Empty array
- Copyright: Generic text

### Target State

**Header:**
- Nav links from `HEADER_NAV_LINKS` data (9 items: About through Contact)
- CTA links: Inquire → `/admissions`, Visit → `/contact/visit`
- Search and Menu buttons remain disabled (future steps)
- Scroll behavior: transparent over homepage hero, solid white on inner pages

**Footer:**
- Intro: School name + tagline from `FOOTER_INTRO`
- Link sections: 4 columns from `FOOTER_SECTIONS` (About, Admissions, Academics, Community)
- Social links: Facebook, Instagram from `FOOTER_SOCIAL_LINKS`
- Copyright: Dynamic year from `FOOTER_COPYRIGHT`
- Background: Royal blue (inherits from `--color-maroon` → `#0c217c`)

---

## 2. FILE-BY-FILE CHANGES

### File 1: `src/components/navigation/Header/Header.tsx` — Update Default Nav Links

**Current (lines 21–26):**
```typescript
const DEFAULT_NAV: HeaderNavLink[] = [
  { text: "Inquire", href: "/inquire" },
  { text: "Visit", href: "/visit" },
  { text: "Summer", href: "/summer" },
  { text: "St. Elizabeth", href: "/about" },
];
```

**Replace with:**
```typescript
const DEFAULT_NAV: HeaderNavLink[] = [
  { text: "About", href: "/about" },
  { text: "Admissions", href: "/admissions" },
  { text: "Academics", href: "/academics" },
  { text: "Athletics", href: "/athletics" },
  { text: "Arts", href: "/arts" },
  { text: "Student Life", href: "/student-life" },
  { text: "Alumni", href: "/alumni" },
  { text: "News", href: "/news" },
  { text: "Contact", href: "/contact" },
];
```

**Why this matters:** These defaults are used when no `navLinks` prop is passed. The homepage (Step 3) explicitly passes `HEADER_NAV_LINKS`, but inner pages (Step 4) rely on the defaults. Updating the defaults ensures consistency.

**Also update the JSDoc** (add a comment above `DEFAULT_NAV`):
```typescript
/**
 * Default primary navigation for St. Elizabeth High School.
 * Can be overridden per-page via the `navLinks` prop.
 * 
 * Note: The original Walker School defaults (Inquire, Visit, Summer, St. Elizabeth)
 * have been replaced with the St. Elizabeth site navigation from PAGE_ELEMENT_HIERARCHY.md §9.
 */
const DEFAULT_NAV: HeaderNavLink[] = [
  // ...
];
```

### File 2: `src/components/navigation/Header/Header.test.tsx` — Update Test Expectations

The existing Header test likely checks for default nav link text. Update to match the new links:

```typescript
describe("Header", () => {
  it("renders default nav links", () => {
    render(<Header />);
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Admissions")).toBeDefined();
    expect(screen.getByText("Academics")).toBeDefined();
    expect(screen.getByText("Athletics")).toBeDefined();
    expect(screen.getByText("Arts")).toBeDefined();
    expect(screen.getByText("Student Life")).toBeDefined();
    expect(screen.getByText("Alumni")).toBeDefined();
    expect(screen.getByText("News")).toBeDefined();
    expect(screen.getByText("Contact")).toBeDefined();
  });

  it("renders brand text", () => {
    render(<Header />);
    expect(screen.getByText("St. Elizabeth High School")).toBeDefined();
  });

  it("renders with search and menu buttons disabled", () => {
    render(<Header />);
    const searchButton = screen.getByLabelText("Search");
    const menuButton = screen.getByLabelText("Open menu");
    expect(searchButton).toBeDefined();
    expect(menuButton).toBeDefined();
    expect((searchButton as HTMLButtonElement).disabled).toBe(true);
    expect((menuButton as HTMLButtonElement).disabled).toBe(true);
  });

  it("allows custom nav links via props", () => {
    const customLinks = [
      { text: "Custom 1", href: "/custom1" },
      { text: "Custom 2", href: "/custom2" },
    ];
    render(<Header navLinks={customLinks} />);
    expect(screen.getByText("Custom 1")).toBeDefined();
    expect(screen.getByText("Custom 2")).toBeDefined();
  });
});
```

### File 3: `src/components/navigation/Footer/Footer.tsx` — Update Default Props

Read the current Footer component first to understand its defaults, then update:

**If Footer has internal defaults for sections/intro, replace them** with St. Elizabeth content:

```typescript
// Default sections used when none provided via props
const DEFAULT_SECTIONS: FooterSection[] = [
  {
    title: "About",
    links: [
      { text: "Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
      { text: "Staff", href: "/about/staff" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { text: "Why St. Elizabeth", href: "/admissions/why" },
      { text: "Apply", href: "/admissions/apply" },
      { text: "Tuition", href: "/admissions/tuition" },
      { text: "FAQs", href: "/admissions/faqs" },
    ],
  },
  {
    title: "Academics",
    links: [
      { text: "Departments", href: "/academics/departments" },
      { text: "Languages", href: "/academics/languages" },
      { text: "Libraries", href: "/academics/libraries" },
      { text: "College Counseling", href: "/academics/college-counseling" },
    ],
  },
  {
    title: "Community",
    links: [
      { text: "Student Life", href: "/student-life" },
      { text: "Athletics", href: "/athletics" },
      { text: "Arts", href: "/arts" },
      { text: "Alumni", href: "/alumni" },
      { text: "News", href: "/news" },
      { text: "How to Help", href: "/how-to-help" },
    ],
  },
];

const DEFAULT_INTRO = {
  heading: "St. Elizabeth High School",
  body: "Guiding Minds, Nurturing Hearts, Building Futures. A nurturing Catholic school community in Pomburpa, Bardez, Goa — rooted in Truth and Honesty since 1949.",
};

const DEFAULT_SOCIAL = [
  { platform: "facebook" as const, href: "https://facebook.com/stelizabethhighschool" },
  { platform: "instagram" as const, href: "https://instagram.com/stelizabethhighschool" },
];

const DEFAULT_COPYRIGHT = `© ${new Date().getFullYear()} St. Elizabeth High School, Pomburpa, Goa. All Rights Reserved.`;
```

**Important:** The Footer component's interface (from COMPONENTS.md) expects:
- `sections?: FooterSection[]` — Link column groups
- `intro?: { heading: string; body: string }` — School intro text
- `socialLinks?: Array<{ platform: string; href: string }>` — Social media links
- `copyright?: string` — Copyright text
- `background?: "soft" | "maroon"` — Background color (default: "maroon")
- `visualContent?: ReactNode` — Optional visual content (crest, photo)

Set these defaults inside the component so `background="maroon"` resolves to royal blue (via the CSS variable from Step 1). If the Footer renders social icons, use the `platform` value to display the correct SVG icon.

### File 4: `src/components/navigation/Footer/Footer.test.tsx` — Update Test Expectations

```typescript
describe("Footer", () => {
  it("renders default intro content", () => {
    render(<Footer />);
    expect(screen.getByText("St. Elizabeth High School")).toBeDefined();
    expect(screen.getByText(/Guiding Minds, Nurturing Hearts, Building Futures/)).toBeDefined();
  });

  it("renders default link sections", () => {
    render(<Footer />);
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Admissions")).toBeDefined();
    expect(screen.getByText("Academics")).toBeDefined();
    expect(screen.getByText("Community")).toBeDefined();
  });

  it("renders social media links when provided", () => {
    render(<Footer socialLinks={DEFAULT_SOCIAL} />);
    // Social links should have accessible labels
    expect(screen.getByLabelText(/facebook/i)).toBeDefined();
    expect(screen.getByLabelText(/instagram/i)).toBeDefined();
  });

  it("renders copyright with current year", () => {
    render(<Footer copyright="© 2026 St. Elizabeth High School" />);
    expect(screen.getByText(/© 2026/)).toBeDefined();
  });

  it("uses maroon background by default", () => {
    const { container } = render(<Footer />);
    const footer = container.firstElementChild;
    expect(footer).toBeDefined();
    // The footer should have the maroon background class or CSS variable
    // This test verifies the default prop works
  });
});
```

---

## 3. SOCIAL ICON IMPLEMENTATION

The Footer currently has `socialLinks` as an array of `{ platform: string; href: string }`. Check how the Footer renders these — if it uses a simple text link, we need to upgrade to SVG icons.

### Option A: Footer already renders icon-based social links

If the Footer already maps `platform` to an SVG icon, ensure the mapping handles `"facebook"` and `"instagram"`. If it uses a switch/case or lookup, the existing rendering should work.

### Option B: Footer renders text-only social links

If the Footer renders text links, add SVG icons inline. Use simple SVG paths (no external library):

```tsx
const SOCIAL_ICONS: Record<string, ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
};
```

Then in the Footer render:
```tsx
{socialLinks.map((link) => (
  <a
    key={link.platform}
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`St. Elizabeth High School on ${link.platform}`}
    className={styles.socialLink}
  >
    {SOCIAL_ICONS[link.platform] ?? link.platform}
  </a>
))}
```

---

## 4. FOOTER ADDRESS SECTION

The Footer component from COMPONENTS.md doesn't have an explicit address prop — it uses `intro` and `sections`. However, the PAGE_ELEMENT_HIERARCHY.md spec (Panel 8) shows the footer should include:

> Address: Ven. Fr. Hilario Gonsalves Rd, Pomburpa, Bardez, Goa 4031102, India
> Contact: +91 XXXXXXXXXX, info@stelizabethhighschool.in
> Social: Facebook, Instagram

**Implementation approach**: Since Footer uses `intro.heading` and `intro.body` for the left column, include the address in `intro.body`:

```typescript
const DEFAULT_INTRO = {
  heading: "St. Elizabeth High School",
  body: `Guiding Minds, Nurturing Hearts, Building Futures.
  
Ven. Fr. Hilario Gonsalves Rd
Pomburpa, Bardez
Goa 4031102, India

info@stelizabethhighschool.in`,
};
```

Or, if the Footer supports `visualContent`, use it for a custom address block:

```tsx
<Footer
  intro={FOOTER_INTRO}
  visualContent={
    <Stack gap="small">
      <Text variant="caption" as="address" className={styles.footerAddress}>
        Ven. Fr. Hilario Gonsalves Rd<br />
        Pomburpa, Bardez<br />
        Goa 4031102, India
      </Text>
      <Link href="mailto:info@stelizabethhighschool.in" variant="footer">
        info@stelizabethhighschool.in
      </Link>
    </Stack>
  }
  sections={FOOTER_SECTIONS}
  socialLinks={FOOTER_SOCIAL_LINKS}
  copyright={FOOTER_COPYRIGHT}
/>
```

**Read the Footer component source** to determine which approach fits best.

---

## 5. SCROLL BEHAVIOR VERIFICATION

After wiring the Header, verify the scroll behavior works correctly:

| Page | Header State | Expected |
|---|---|---|
| Homepage (/) | `transparent={true}`, `fixed={true}` | White text, transparent background over hero. After scrolling past hero (on inner pages after homepage), should become solid white with dark text. |
| About (/about) | `transparent={false}`, `fixed={true}` | Solid white background, dark text. Always visible. |
| All other inner pages | `transparent={false}`, `fixed={true}` | Same as About. |

**Homepage nuance**: The current Header doesn't dynamically change from transparent → solid on scroll. The `transparent` prop is static. This is fine for now — the homepage video/photo hero keeps the Header in transparent mode for the full horizontal scroll duration. The Header scroll-to-solid behavior is a future enhancement.

---

## 6. ACCEPTANCE CRITERIA

- [ ] `pnpm build` passes with zero TypeScript errors
- [ ] `pnpm test` passes — Header tests and Footer tests updated and green
- [ ] Header renders all 9 St. Elizabeth nav links by default
- [ ] Header brand text is "St. Elizabeth High School"
- [ ] Footer renders "St. Elizabeth High School" intro text with tagline
- [ ] Footer renders 4 link section columns (About, Admissions, Academics, Community)
- [ ] Footer renders Facebook and Instagram social links with proper aria-labels
- [ ] Footer renders copyright with current year
- [ ] Footer background is royal blue (via `--color-maroon` CSS variable)
- [ ] Footer links are functional (no 404s — they point to actual routes from Step 4)
- [ ] Search and Menu buttons remain disabled with `aria-label` attributes
- [ ] Social links have `target="_blank"` and `rel="noopener noreferrer"`
- [ ] No hardcoded text in Header/Footer defaults — matches `@/data/navigation` content

---

*Handoff complete. This is a focused, targeted step. Proceed to Step 6 after verification.*
