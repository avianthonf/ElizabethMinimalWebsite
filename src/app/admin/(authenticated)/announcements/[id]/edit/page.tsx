import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAnnouncementById, updateAnnouncement } from "@/shared/lib/db/announcements.repository";
import { AnnouncementForm } from "@/features/admin/announcement-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditAnnouncementPage({ params }: Props) {
  const { id } = await params;

  let item;

  try {
    item = await getAnnouncementById(id);
  } catch {
    notFound();
  }

  if (!item) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";

    await updateAnnouncement(id, {
      message: formData.get("message") as string,
      href: (formData.get("href") as string) || undefined,
      link_text: (formData.get("link_text") as string) || undefined,
      enabled: formData.get("enabled") === "true",
      storage_key: formData.get("storage_key") as string,
    });

    revalidatePath("/admin/announcements");
    revalidatePath(`/admin/announcements/${id}/edit`);
    redirect("/admin/announcements");
  }

  return (
    <div>
      <h2 style={styles.heading}>Edit Announcement</h2>
      <AnnouncementForm
        action={handleUpdate}
        defaults={{
          message: item.message,
          href: item.href ?? undefined,
          link_text: item.link_text ?? undefined,
          enabled: item.enabled,
          storage_key: item.storage_key,
        }}
        submitLabel="Update"
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: { fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem" },
};
