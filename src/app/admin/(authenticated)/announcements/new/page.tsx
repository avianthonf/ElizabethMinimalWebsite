import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAnnouncement } from "@/shared/lib/db/announcements.repository";
import { AnnouncementForm } from "@/features/admin/announcement-form";

export default function NewAnnouncementPage() {
  async function handleCreate(formData: FormData) {
    "use server";

    await createAnnouncement({
      message: formData.get("message") as string,
      href: (formData.get("href") as string) || undefined,
      link_text: (formData.get("link_text") as string) || undefined,
      enabled: formData.get("enabled") === "true",
      storage_key: formData.get("storage_key") as string,
    });

    revalidatePath("/admin/announcements");
    redirect("/admin/announcements");
  }

  return (
    <div>
      <h2 style={styles.heading}>New Announcement</h2>
      <AnnouncementForm action={handleCreate} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: { fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem" },
};
