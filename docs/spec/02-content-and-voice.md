# Content Strategy & Brand Voice

## Brand Identity

**St. Elizabeth's High School** — A nurturing Catholic school in Pomburpa, Goa, founded in 1949, affiliated with CBSE. Rooted in the motto _"Truth and Honesty."_

### Core Messaging

- **Transformational learning** through meaningful relationships, academic excellence, and unique opportunities
- **Average class size of 15 students** — individual attention
- **Over seven decades of educational excellence** in North Goa
- **Inclusive, nurturing community** — "every student is known, valued, and loved"

## Content Types

### Eyebrow Text

- Short, uppercase, small-size label above headings
- Usage: "Faith", "Excellence", "Community", "Discover", "Ready to Discover"

### Hero Heading

- Large display text (h1), often with text-wrap balance
- Example: "Nurturing Hearts", "Academics at St. Elizabeth", "Visit St. Elizabeth"

### Hero Statement

- Descriptive paragraph below the heading, typically 1–2 sentences
- Example: "St. Elizabeth's High School inspires transformative learning..."

### Card (Standard)

- Eyebrow + heading + description (2 lines max)
- Used in: departments, clubs, programs lists

### Value Card

- Numbered (01, 02, 03) + title + body paragraph
- Used on homepage values panel

### Testimonial Card

- Quote + attribution + role badge
- Role options: "alumni", "student", "parent", "teacher"

### Stat Card

- Large number/fact + label + description
- Used on homepage stats panel (Founded: 1949, Students: 1200+, Curriculum: CBSE)

### News Card

- Image + title + date + excerpt + link to article
- Used on homepage news panel and /news page

## Tone of Voice

| Trait        | Guideline                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| Warm         | Speak with genuine warmth and care for the community                                                    |
| Aspirational | Paint a picture of what the school helps students become                                                |
| Grounded     | Reference specific place (Pomburpa, Bardez, Goa) and real details (founded 1949, 15 students per class) |
| Inclusive    | Use "our", "we", "every student" — never exclusive                                                      |
| Respectful   | Honor the Catholic heritage and educational tradition without being preachy                             |

## Content Modelling

### `HomepageData` (async)

- `HERO_CONTENT`: heading, statement, loadOverlayText
- `VALUES`: array of {number, title, body}
- `STATS`: array of {value, label, description}
- `TESTIMONIALS`: array of {quote, attribution, role}
- `CTA_CONTENT`: eyebrow, heading, description, primaryCTA, secondaryCTA
- `LATEST_NEWS`: array of {title, date, excerpt, imageFilename, href}

### `AboutData` (async)

- School history timeline
- Mission statement
- Staff directory
- Strategic plan

### All other section data (async)

- Each data file has typed exports + async getter
- When CMS integration comes: replace only the getter body, no component changes

## Image Strategy

- **Photography style**: Bright, warm, documentary-style. Real students, real campus.
- **Image sources**: Co-located in `public/` directory with descriptions in `src/data/images.ts`
- **Aspect ratios**: Hero (16:9 or wider), Cards (4:3 or 3:2), Gallery (mixed — masonry)
- **Lazy loading**: All non-hero images use `loading="lazy"` or Next.js Image optimization
- **Alt text**: Descriptive and specific; never decorative-only on meaning-carrying images.
