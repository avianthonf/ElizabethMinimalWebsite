import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createTestimonial } from "@/shared/lib/db/alumni.repository";
import { TestimonialForm } from "@/features/admin/testimonial-form";

export default function NewTestimonialPage() {
  async function handleCreate(formData: FormData) {
    "use server";

    await createTestimonial({
      quote: formData.get("quote") as string,
      name: formData.get("name") as string,
      credentials: (formData.get("credentials") as string) || "",
      designation: (formData.get("designation") as string) || "",
      academic_years: (formData.get("academic_years") as string) || "",
      published: formData.get("published") === "true",
      sort_order: parseInt((formData.get("sort_order") as string) || "0", 10),
    });

    revalidatePath("/admin/alumni");
    redirect("/admin/alumni");
  }

  return (
    <div>
      <h2 style={styles.heading}>New Alumni Testimonial</h2>
      <TestimonialForm action={handleCreate} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: { fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem" },
};
