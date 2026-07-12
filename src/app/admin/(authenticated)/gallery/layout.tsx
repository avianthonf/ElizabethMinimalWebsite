import { requireSection } from "@/shared/lib/auth";
import { AdminSectionHeader } from "@/features/admin/section-header";

export default async function GalleryLayout({ children }: { children: React.ReactNode }) {
  await requireSection("gallery");

  return (
    <div>
      <AdminSectionHeader
        title="Gallery"
        description="Manage photo gallery images"
        newHref="/admin/gallery/upload"
        newLabel="+ Upload Image"
      />
      {children}
    </div>
  );
}
