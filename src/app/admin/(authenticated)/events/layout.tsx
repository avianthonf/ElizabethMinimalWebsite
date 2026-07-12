import { requireSection } from "@/shared/lib/auth";
import { AdminSectionHeader } from "@/features/admin/section-header";

export default async function EventsLayout({ children }: { children: React.ReactNode }) {
  await requireSection("events");

  return (
    <div>
      <AdminSectionHeader
        title="Events"
        description="Manage upcoming school events"
        newHref="/admin/events/new"
        newLabel="+ New Event"
      />
      {children}
    </div>
  );
}
