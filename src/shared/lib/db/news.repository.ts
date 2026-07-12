import "server-only";

import { z } from "zod";
import { createAdminClient } from "@/shared/lib/supabase/admin";

const NewNewsArticle = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title: z.string().min(1),
  date: z.string().min(1),
  excerpt: z.string().min(1),
  image_filename: z.string().default(""),
  category: z.string().default("Events"),
  body: z.string().default(""),
  published: z.boolean().default(false),
});

const UpdateNewsArticle = NewNewsArticle.partial();

export type NewsArticleRow = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image_filename: string;
  category: string;
  body: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

function toPublicArticle(row: NewsArticleRow) {
  return {
    title: row.title,
    date: row.date,
    excerpt: row.excerpt,
    imageFilename: row.image_filename,
    category: row.category,
    href: `/news/${row.slug}`,
  };
}

export async function getAllNewsArticles(includeUnpublished = false) {
  const supabase = createAdminClient();
  let query = supabase.from("news_articles").select("*").order("created_at", { ascending: false });

  if (!includeUnpublished) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as NewsArticleRow[];
}

export async function getPublishedNewsArticles() {
  const rows = await getAllNewsArticles(false);
  return rows.map(toPublicArticle);
}

export async function getNewsArticleById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("news_articles").select("*").eq("id", id).single();
  if (error) throw error;
  return data as NewsArticleRow;
}

export async function createNewsArticle(raw: z.input<typeof NewNewsArticle>) {
  const parsed = NewNewsArticle.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("news_articles").insert(parsed).select().single();
  if (error) throw error;
  return data as NewsArticleRow;
}

export async function updateNewsArticle(id: string, raw: z.input<typeof UpdateNewsArticle>) {
  const parsed = UpdateNewsArticle.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("news_articles")
    .update(parsed)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as NewsArticleRow;
}

export async function deleteNewsArticle(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("news_articles").delete().eq("id", id);
  if (error) throw error;
}
