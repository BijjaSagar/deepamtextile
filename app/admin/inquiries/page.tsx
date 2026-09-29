import { requireAdminPage } from "@/app/admin/layout";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { InquiriesEditor } from "@/components/admin/InquiriesEditor";
import { getAllInquiriesAdmin } from "@/lib/data/inquiries";

export default async function AdminInquiriesPage() {
  await requireAdminPage();
  let inquiries: Awaited<ReturnType<typeof getAllInquiriesAdmin>> = [];
  try {
    inquiries = await getAllInquiriesAdmin();
  } catch (err) {
    console.error("[AdminInquiriesPage] Error loading inquiries:", err);
    inquiries = [];
  }

  return (
    <>
      <AdminPageHeader
        title="Inquiries"
        description="B2B quote requests and catalog download leads from the website."
      />
      <InquiriesEditor initial={inquiries} />
    </>
  );
}

