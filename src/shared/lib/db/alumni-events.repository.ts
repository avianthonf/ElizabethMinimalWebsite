import "server-only";

import { z } from "zod";
import { createAdminClient } from "@/shared/lib/supabase/admin";

const NewAlumniEvent = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  description: z.string().default(""),
  location: z.string().default(""),
  published: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

const UpdateAlumniEvent = NewAlumniEvent.partial();

export type AlumniEventRow = {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function toPublicAlumniEvent(row: AlumniEventRow) {
  return {
    title: row.title,
    date: row.date,
    description: row.description || undefined,
    location: row.location || undefined,
  };
}

export async function getAllAlumniEvents(includeUnpublished = false) {
  const supabase = createAdminClient();
  let query = supabase.from("alumni_events").select("*").order("sort_order", { ascending: true });

  if (!includeUnpublished) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as AlumniEventRow[];
}

export async function getPublishedAlumniEvents() {
  const rows = await getAllAlumniEvents(false);
  return rows.map(toPublicAlumniEvent);
}

export async function getAlumniEventById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("alumni_events").select("*").eq("id", id).single();
  if (error) throw error;
  return data as AlumniEventRow;
}

export async function createAlumniEvent(raw: z.input<typeof NewAlumniEvent>) {
  const parsed = NewAlumniEvent.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("alumni_events").insert(parsed).select().single();
  if (error) throw error;
  return data as AlumniEventRow;
}

export async function updateAlumniEvent(id: string, raw: z.input<typeof UpdateAlumniEvent>) {
  const parsed = UpdateAlumniEvent.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("alumni_events")
    .update(parsed)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as AlumniEventRow;
}

export async function deleteAlumniEvent(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("alumni_events").delete().eq("id", id);
  if (error) throw error;
}
