import "server-only";

import { z } from "zod";
import { createAdminClient } from "@/shared/lib/supabase/admin";

const NewEvent = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  time: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(["academic", "sports", "cultural", "admissions", "community"]),
  published: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

const UpdateEvent = NewEvent.partial();

export type EventRow = {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  type: "academic" | "sports" | "cultural" | "admissions" | "community";
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function toPublicEvent(row: EventRow) {
  return {
    title: row.title,
    date: row.date,
    time: row.time ?? undefined,
    location: row.location ?? undefined,
    type: row.type,
  };
}

export async function getAllEvents(includeUnpublished = false) {
  const supabase = createAdminClient();
  let query = supabase.from("upcoming_events").select("*").order("sort_order", { ascending: true });

  if (!includeUnpublished) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as EventRow[];
}

export async function getPublishedEvents() {
  const rows = await getAllEvents(false);
  return rows.map(toPublicEvent);
}

export async function getEventById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("upcoming_events").select("*").eq("id", id).single();
  if (error) throw error;
  return data as EventRow;
}

export async function createEvent(raw: z.input<typeof NewEvent>) {
  const parsed = NewEvent.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("upcoming_events").insert(parsed).select().single();
  if (error) throw error;
  return data as EventRow;
}

export async function updateEvent(id: string, raw: z.input<typeof UpdateEvent>) {
  const parsed = UpdateEvent.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("upcoming_events")
    .update(parsed)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as EventRow;
}

export async function deleteEvent(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("upcoming_events").delete().eq("id", id);
  if (error) throw error;
}
