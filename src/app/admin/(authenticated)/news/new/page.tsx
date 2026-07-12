import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createNewsArticle } from "@/shared/lib/db/news.repository";
import { NewsForm } from "@/features/admin/news-form";

export default function NewNewsPage() {
  async function handleCreate(formData: FormData) {
    "use server";

    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const excerpt = formData.get("excerpt") as string;
    const image_filename = (formData.get("image_filename") as string) || "";
    const category = (formData.get("category") as string) || "Events";
    const body = (formData.get("body") as string) || "";
    const published = formData.get("published") === "true";

    await createNewsArticle({
      slug,
      title,
      date,
      excerpt,
      image_filename,
      category,
      body,
      published,
    });

    revalidatePath("/admin/news");
    redirect("/admin/news");
  }

  return (
    <div>
      <h2 style={styles.heading}>New News Article</h2>
      <NewsForm action={handleCreate} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 1.5rem",
  },
};
