import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getEventById, updateEvent } from "@/shared/lib/db/events.repository";
import { EventForm } from "@/features/admin/event-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;

  let item;
  try {
    item = await getEventById(id);
  } catch {
    notFound();
  }

  if (!item) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";

    await updateEvent(id, {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      time: (formData.get("time") as string) || undefined,
      location: (formData.get("location") as string) || undefined,
      type: formData.get("type") as "academic" | "sports" | "cultural" | "admissions" | "community",
      published: formData.get("published") === "true",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    });

    revalidatePath("/admin/events");
    revalidatePath(`/admin/events/${id}/edit`);
    redirect("/admin/events");
  }

  return (
    <div>
      <h2 style={styles.heading}>Edit Event</h2>
      <EventForm
        action={handleUpdate}
        defaults={{
          title: item.title,
          date: item.date,
          time: item.time ?? undefined,
          location: item.location ?? undefined,
          type: item.type,
          published: item.published,
          sort_order: item.sort_order,
        }}
        submitLabel="Update"
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: { fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem" },
};
