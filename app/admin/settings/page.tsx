import { requireAdminPage } from "@/app/admin/layout";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { DatabaseStatusCard } from "@/components/admin/DatabaseStatusCard";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getDatabaseHealth } from "@/lib/db/init-tables";

export default async function AdminSettingsPage() {
  await requireAdminPage();
  const [settings, dbHealth] = await Promise.all([
    getSiteSettings(),
    getDatabaseHealth(),
  ]);

  return (
    <>
      <AdminPageHeader
        title="Site Settings"
        description="Logo, colors, contact info, and footer content."
      />
      <SettingsForm initial={settings} />
      <DatabaseStatusCard initial={dbHealth} />
    </>
  );
}

