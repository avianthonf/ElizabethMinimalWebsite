import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getTestimonialById, updateTestimonial } from "@/shared/lib/db/alumni.repository";
import { TestimonialForm } from "@/features/admin/testimonial-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;

  let item;
  try {
    item = await getTestimonialById(id);
  } catch {
    notFound();
  }

  if (!item) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";

    await updateTestimonial(id, {
      quote: formData.get("quote") as string,
      name: formData.get("name") as string,
      credentials: (formData.get("credentials") as string) || "",
      designation: (formData.get("designation") as string) || "",
      academic_years: (formData.get("academic_years") as string) || "",
      published: formData.get("published") === "true",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    });

    revalidatePath("/admin/alumni");
    revalidatePath(`/admin/alumni/${id}/edit`);
    redirect("/admin/alumni");
  }

  return (
    <div>
      <h2 style={styles.heading}>Edit Alumni Testimonial</h2>
      <TestimonialForm
        action={handleUpdate}
        defaults={{
          name: item.name,
          quote: item.quote,
          credentials: item.credentials || undefined,
          designation: item.designation || undefined,
          academic_years: item.academic_years || undefined,
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
