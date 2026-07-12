import { requireSection } from "@/shared/lib/auth";
import { AdminSectionHeader } from "@/features/admin/section-header";

export default async function AlumniLayout({ children }: { children: React.ReactNode }) {
  await requireSection("alumni");

  return (
    <div>
      <AdminSectionHeader
        title="Alumni"
        description="Manage alumni testimonials"
        newHref="/admin/alumni/new"
        newLabel="+ New Testimonial"
      />
      {children}
    </div>
  );
}
