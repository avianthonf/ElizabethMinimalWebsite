import { requireSection } from "@/shared/lib/auth";
import { AdminSectionHeader } from "@/features/admin/section-header";

export default async function AnnouncementsLayout({ children }: { children: React.ReactNode }) {
  await requireSection("announcements");

  return (
    <div>
      <AdminSectionHeader
        title="Announcements"
        description="Manage homepage announcements"
        newHref="/admin/announcements/new"
        newLabel="+ New Announcement"
      />
      {children}
    </div>
  );
}
