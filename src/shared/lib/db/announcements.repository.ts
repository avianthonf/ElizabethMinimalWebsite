import "server-only";

import { z } from "zod";
import { createAdminClient } from "@/shared/lib/supabase/admin";

const NewAnnouncement = z.object({
  message: z.string().min(1),
  href: z.string().optional(),
  link_text: z.string().optional(),
  enabled: z.boolean().default(true),
  storage_key: z.string().min(1),
});

const UpdateAnnouncement = NewAnnouncement.partial();

export type AnnouncementRow = {
  id: string;
  message: string;
  href: string | null;
  link_text: string | null;
  enabled: boolean;
  storage_key: string;
  created_at: string;
  updated_at: string;
};

export function toPublicAnnouncement(row: AnnouncementRow) {
  return {
    message: row.message,
    href: row.href ?? undefined,
    linkText: row.link_text ?? undefined,
    enabled: row.enabled,
    storageKey: row.storage_key,
  };
}

export async function getAllAnnouncements() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as AnnouncementRow[];
}

export async function getEnabledAnnouncement() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("enabled", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data ? toPublicAnnouncement(data as AnnouncementRow) : null;
}

export async function getAnnouncementById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("announcements").select("*").eq("id", id).single();
  if (error) throw error;
  return data as AnnouncementRow;
}

export async function createAnnouncement(raw: z.input<typeof NewAnnouncement>) {
  const parsed = NewAnnouncement.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("announcements").insert(parsed).select().single();
  if (error) throw error;
  return data as AnnouncementRow;
}

export async function updateAnnouncement(id: string, raw: z.input<typeof UpdateAnnouncement>) {
  const parsed = UpdateAnnouncement.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("announcements")
    .update(parsed)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as AnnouncementRow;
}

export async function deleteAnnouncement(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw error;
}
