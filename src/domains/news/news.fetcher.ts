/**
 * News data bridge: Supabase-first with static fallback.
 *
 * Replaces direct imports from news.data.ts in public-facing pages.
 * When Supabase is configured, fetches from the database.
 * Otherwise falls back to the static NEWS_ARTICLES array.
 */

import { NEWS_ARTICLES } from "./news.data";
import type { NewsArticle } from "./news.data";

let isSupabaseAvailable: boolean | null = null;

function isConfigured(): boolean {
  if (isSupabaseAvailable !== null) return isSupabaseAvailable;
  isSupabaseAvailable = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  return isSupabaseAvailable;
}

async function tryFetchFromSupabase(): Promise<NewsArticle[] | null> {
  if (!isConfigured()) return null;
  try {
    const { getPublishedNewsArticles } = await import("@/shared/lib/db/news.repository");
    const articles = await getPublishedNewsArticles();
    if (articles.length > 0) return articles;
  } catch {
    /* Supabase unreachable — fallback */
  }
  return null;
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const fromSupabase = await tryFetchFromSupabase();
  if (fromSupabase) return fromSupabase;
  return NEWS_ARTICLES;
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const articles = await getNewsArticles();
  return articles.find((a) => a.href === `/news/${slug}`) ?? null;
}

export type { NewsArticle };
