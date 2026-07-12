import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getGalleryImageById, updateGalleryImage } from "@/shared/lib/db/gallery.repository";
import { GalleryForm } from "@/features/admin/gallery-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryPage({ params }: Props) {
  const { id } = await params;
  let item;
  try {
    item = await getGalleryImageById(id);
  } catch {
    notFound();
  }
  if (!item) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    const storagePath = formData.get("storage_path") as string;
    await updateGalleryImage(id, {
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
    revalidatePath(`/admin/gallery/${id}/edit`);
    redirect("/admin/gallery");
  }

  return (
    <div>
      <GalleryForm
        action={handleUpdate}
        defaults={{
          storage_path: item.storage_path,
          alt: item.alt,
          category: item.category,
          section: item.section,
          sub_category: item.sub_category ?? undefined,
          image_date: item.image_date ?? undefined,
          published: item.published,
          sort_order: item.sort_order,
        }}
        submitLabel="Update"
      />
    </div>
  );
}
