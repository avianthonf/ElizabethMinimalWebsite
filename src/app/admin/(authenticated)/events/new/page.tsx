import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createEvent } from "@/shared/lib/db/events.repository";
import { EventForm } from "@/features/admin/event-form";

export default function NewEventPage() {
  async function handleCreate(formData: FormData) {
    "use server";

    await createEvent({
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      time: (formData.get("time") as string) || undefined,
      location: (formData.get("location") as string) || undefined,
      type: formData.get("type") as "academic" | "sports" | "cultural" | "admissions" | "community",
      published: formData.get("published") === "true",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    });

    revalidatePath("/admin/events");
    redirect("/admin/events");
  }

  return (
    <div>
      <h2 style={styles.heading}>New Event</h2>
      <EventForm action={handleCreate} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: { fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem" },
};
