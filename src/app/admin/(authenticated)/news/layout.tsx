import { requireSection } from "@/shared/lib/auth";
import { AdminSectionHeader } from "@/features/admin/section-header";

export default async function NewsLayout({ children }: { children: React.ReactNode }) {
  await requireSection("news");

  return (
    <div>
      <AdminSectionHeader
        title="News"
        description="Manage news articles"
        newHref="/admin/news/new"
        newLabel="+ New Article"
      />
      {children}
    </div>
  );
}
