import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getNewsArticleById, updateNewsArticle } from "@/shared/lib/db/news.repository";
import { NewsForm } from "@/features/admin/news-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;

  let article;

  try {
    article = await getNewsArticleById(id);
  } catch {
    notFound();
  }

  if (!article) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";

    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const excerpt = formData.get("excerpt") as string;
    const image_filename = (formData.get("image_filename") as string) || "";
    const category = (formData.get("category") as string) || "Events";
    const body = (formData.get("body") as string) || "";
    const published = formData.get("published") === "true";

    await updateNewsArticle(id, {
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
    revalidatePath(`/admin/news/${id}/edit`);
    redirect("/admin/news");
  }

  return (
    <div>
      <h2 style={styles.heading}>Edit News Article</h2>
      <NewsForm
        action={handleUpdate}
        defaults={{
          slug: article.slug,
          title: article.title,
          date: article.date,
          excerpt: article.excerpt,
          image_filename: article.image_filename,
          category: article.category,
          body: article.body,
          published: article.published,
        }}
        submitLabel="Update"
      />
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
