import "server-only";

import { z } from "zod";
import { createAdminClient } from "@/shared/lib/supabase/admin";

const NewGalleryImage = z.object({
  filename: z.string().min(1),
  alt: z.string().min(1),
  category: z.enum([
    "hero",
    "gallery",
    "academics",
    "athletics",
    "arts",
    "community",
    "heritage",
    "student-life",
    "general",
  ]),
  section: z.string().min(1),
  sub_category: z.string().optional(),
  image_date: z.string().optional(),
  storage_path: z.string().min(1),
  published: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

const UpdateGalleryImage = NewGalleryImage.partial();

export type GalleryImageRow = {
  id: string;
  filename: string;
  alt: string;
  category: string;
  section: string;
  sub_category: string | null;
  image_date: string | null;
  storage_path: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export function toPublicImage(row: GalleryImageRow) {
  return {
    filename: row.filename,
    alt: row.alt,
    category: row.category,
    section: row.section,
    subCategory: row.sub_category ?? undefined,
    date: row.image_date ?? undefined,
  };
}

export async function getAllGalleryImages(includeUnpublished = false) {
  const supabase = createAdminClient();
  let query = supabase.from("gallery_images").select("*").order("sort_order", { ascending: true });

  if (!includeUnpublished) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as GalleryImageRow[];
}

export async function getPublishedGalleryImages() {
  const rows = await getAllGalleryImages(false);
  return rows.map(toPublicImage);
}

export async function getGalleryImageById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("gallery_images").select("*").eq("id", id).single();
  if (error) throw error;
  return data as GalleryImageRow;
}

export async function createGalleryImage(raw: z.input<typeof NewGalleryImage>) {
  const parsed = NewGalleryImage.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("gallery_images").insert(parsed).select().single();
  if (error) throw error;
  return data as GalleryImageRow;
}

export async function updateGalleryImage(id: string, raw: z.input<typeof UpdateGalleryImage>) {
  const parsed = UpdateGalleryImage.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .update(parsed)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as GalleryImageRow;
}

export async function deleteGalleryImage(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) throw error;
}
