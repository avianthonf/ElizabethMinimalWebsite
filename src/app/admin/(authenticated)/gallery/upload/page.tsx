import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createGalleryImage } from "@/shared/lib/db/gallery.repository";
import { GalleryForm } from "@/features/admin/gallery-form";

export default function UploadGalleryPage() {
  async function handleCreate(formData: FormData) {
    "use server";
    const storagePath = formData.get("storage_path") as string;
    await createGalleryImage({
      filename: storagePath.split("/").pop() || storagePath,
      alt: formData.get("alt") as string,
      category: formData.get("category") as
        | "hero"
        | "gallery"
        | "academics"
        | "athletics"
        | "arts"
        | "community"
        | "heritage"
        | "student-life"
        | "general",
      section: formData.get("section") as string,
      sub_category: (formData.get("sub_category") as string) || undefined,
      image_date: (formData.get("image_date") as string) || undefined,
      storage_path: storagePath,
      published: formData.get("published") === "true",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    });
    revalidatePath("/admin/gallery");
    redirect("/admin/gallery");
  }

  return (
    <div>
      <p style={styles.help}>
        Upload images via the Supabase Dashboard → Storage → gallery bucket, then register them here
        with metadata.
      </p>
      <GalleryForm action={handleCreate} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  help: { fontSize: "0.8125rem", color: "#64748b", margin: "0 0 1.5rem", lineHeight: 1.6 },
};
