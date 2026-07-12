-- ============================================================================
-- St. Elizabeth's High School — Supabase CMS Schema
-- ============================================================================
-- Run this in the Supabase SQL Editor to set up all tables, indexes,
-- RLS policies, and helper functions needed for the admin CMS.
--
-- Each table maps to a static .data.ts file in the codebase. The
-- public-facing site reads from these tables (via anon key + SELECT-only
-- RLS), while admin users behind /admin/* use the service-role client
-- for full CRUD.
-- ============================================================================

-- ── 1. Helper: role-based access check ────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = (SELECT auth.uid())
      AND raw_user_meta_data ->> 'role' IN (
        'super_admin','news_editor','announcement_editor',
        'event_editor','alumni_editor','gallery_editor'
      )
  );
$$;

-- ── 1b. Check if user has a specific role ─────────────────────────────

CREATE OR REPLACE FUNCTION public.has_role(r TEXT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = (SELECT auth.uid())
      AND (
        raw_user_meta_data ->> 'role' = r
        OR raw_user_meta_data ->> 'role' = 'super_admin'
      )
  );
$$;

-- ── 2. News Articles ──────────────────────────────────────────────────
-- Maps to: src/domains/news/news.data.ts → NewsArticle

CREATE TABLE public.news_articles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT NOT NULL UNIQUE
              CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title       TEXT NOT NULL CHECK (length(trim(title)) > 0),
  date        TEXT NOT NULL,          -- display date e.g. "21 June 2026"
  excerpt     TEXT NOT NULL CHECK (length(trim(excerpt)) > 0),
  image_filename TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL DEFAULT 'Events',
  body        TEXT NOT NULL DEFAULT '',  -- full article body (markdown)
  published   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published news"
  ON public.news_articles FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admin full access to news_articles"
  ON public.news_articles FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE INDEX idx_news_published_date
  ON public.news_articles (published, date DESC);

-- ── 3. Announcements ──────────────────────────────────────────────────
-- Maps to: src/domains/homepage/announcements.data.ts → Announcement

CREATE TABLE public.announcements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message     TEXT NOT NULL CHECK (length(trim(message)) > 0),
  href        TEXT,
  link_text   TEXT,
  enabled     BOOLEAN NOT NULL DEFAULT true,
  storage_key TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read enabled announcements"
  ON public.announcements FOR SELECT
  TO anon
  USING (enabled = true);

CREATE POLICY "Admin full access to announcements"
  ON public.announcements FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── 4. Upcoming Events ────────────────────────────────────────────────
-- Maps to: src/domains/homepage/events.data.ts → HomepageEvent

CREATE TABLE public.upcoming_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL CHECK (length(trim(title)) > 0),
  date        TEXT NOT NULL,
  time        TEXT,
  location    TEXT,
  type        TEXT NOT NULL DEFAULT 'academic'
              CHECK (type IN ('academic','sports','cultural','admissions','community')),
  published   BOOLEAN NOT NULL DEFAULT false,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.upcoming_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published events"
  ON public.upcoming_events FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admin full access to events"
  ON public.upcoming_events FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE INDEX idx_events_published_order
  ON public.upcoming_events (published, sort_order);

-- ── 5. Alumni Testimonials ────────────────────────────────────────────
-- Maps to: src/domains/about/alumni.data.ts → ALUMNI_TESTIMONIALS

CREATE TABLE public.alumni_testimonials (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote           TEXT NOT NULL CHECK (length(trim(quote)) > 0),
  name            TEXT NOT NULL CHECK (length(trim(name)) > 0),
  credentials     TEXT NOT NULL DEFAULT '',
  designation     TEXT NOT NULL DEFAULT '',
  academic_years  TEXT NOT NULL DEFAULT '',
  published       BOOLEAN NOT NULL DEFAULT false,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.alumni_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published testimonials"
  ON public.alumni_testimonials FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admin full access to testimonials"
  ON public.alumni_testimonials FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE INDEX idx_testimonials_published_order
  ON public.alumni_testimonials (published, sort_order);

-- ── 6. Alumni Events ─────────────────────────────────────────────────
-- Maps to: src/domains/about/alumni.data.ts → ALUMNI_EVENTS

CREATE TABLE public.alumni_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL CHECK (length(trim(title)) > 0),
  date        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  location    TEXT NOT NULL DEFAULT '',
  published   BOOLEAN NOT NULL DEFAULT false,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.alumni_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published alumni events"
  ON public.alumni_events FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admin full access to alumni events"
  ON public.alumni_events FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── 7. Gallery Images ─────────────────────────────────────────────────
-- Maps to: src/domains/media/images.data.ts → ImageAsset
-- Images themselves stored in Supabase Storage bucket "gallery"

CREATE TABLE public.gallery_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename    TEXT NOT NULL,
  alt         TEXT NOT NULL CHECK (length(trim(alt)) > 0),
  category    TEXT NOT NULL DEFAULT 'general'
              CHECK (category IN ('hero','gallery','academics','athletics','arts',
                                  'community','heritage','student-life','general')),
  section     TEXT NOT NULL DEFAULT 'overflow',
  sub_category TEXT,
  image_date  TEXT,
  storage_path TEXT NOT NULL,          -- path in Supabase Storage bucket
  sort_order  INTEGER NOT NULL DEFAULT 0,
  published   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published gallery"
  ON public.gallery_images FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admin full access to gallery"
  ON public.gallery_images FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ── 8. Auto-update trigger for updated_at ─────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT unnest(ARRAY[
      'news_articles','announcements','upcoming_events',
      'alumni_testimonials','alumni_events','gallery_images'
    ])
  LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I
       FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()',
      tbl
    );
  END LOOP;
END $$;

-- ── 9. Seed data: mark existing admin user (if any) ───────────────────
-- Uncomment and fill in the admin user's email after creating an account:
-- UPDATE auth.users
--   SET raw_user_meta_data = jsonb_set(
--     COALESCE(raw_user_meta_data, '{}'::jsonb),
--     '{role}',
--     '"admin"'
--   )
--   WHERE email = 'admin@stelizabethhighschool.in';
