import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ensureDatabaseInitialized } from "@/lib/db/init-tables";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return session ? (
    <AdminShell email={session.email}>{children}</AdminShell>
  ) : (
    <>{children}</>
  );
}

export async function requireAdminPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Attempt automatic schema initialization in the background if tables are missing
  try {
    await ensureDatabaseInitialized();
  } catch (err) {
    console.error("[requireAdminPage] Database initialization check error:", err);
  }

  return session;
}

