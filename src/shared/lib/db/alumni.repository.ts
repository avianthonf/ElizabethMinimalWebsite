import "server-only";

import { z } from "zod";
import { createAdminClient } from "@/shared/lib/supabase/admin";

const NewTestimonial = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  credentials: z.string().default(""),
  designation: z.string().default(""),
  academic_years: z.string().default(""),
  published: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

const UpdateTestimonial = NewTestimonial.partial();

export type TestimonialRow = {
  id: string;
  quote: string;
  name: string;
  credentials: string;
  designation: string;
  academic_years: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function toPublicTestimonial(row: TestimonialRow) {
  return {
    quote: row.quote,
    name: row.name,
    credentials: row.credentials || undefined,
    designation: row.designation || undefined,
    academicYears: row.academic_years || undefined,
  };
}

export async function getAllTestimonials(includeUnpublished = false) {
  const supabase = createAdminClient();
  let query = supabase
    .from("alumni_testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!includeUnpublished) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as TestimonialRow[];
}

export async function getPublishedTestimonials() {
  const rows = await getAllTestimonials(false);
  return rows.map(toPublicTestimonial);
}

export async function getTestimonialById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("alumni_testimonials")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as TestimonialRow;
}

export async function createTestimonial(raw: z.input<typeof NewTestimonial>) {
  const parsed = NewTestimonial.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("alumni_testimonials")
    .insert(parsed)
    .select()
    .single();
  if (error) throw error;
  return data as TestimonialRow;
}

export async function updateTestimonial(id: string, raw: z.input<typeof UpdateTestimonial>) {
  const parsed = UpdateTestimonial.parse(raw);
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("alumni_testimonials")
    .update(parsed)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as TestimonialRow;
}

export async function deleteTestimonial(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("alumni_testimonials").delete().eq("id", id);
  if (error) throw error;
}
