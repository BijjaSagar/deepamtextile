import { redirect } from "next/navigation";
import { requireAdminPage } from "@/app/admin/layout";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { UsersEditor } from "@/components/admin/UsersEditor";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminUsersPage() {
  const session = await requireAdminPage();

  if (session.role !== "admin") {
    redirect("/admin");
  }

  let initial: Array<{
    id: string;
    email: string;
    name: string | null;
    role: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  }> = [];

  let isFallback = false;

  try {
    const users = await prisma.adminUser.findMany({
      orderBy: { createdAt: "asc" },
    });

    if (users && users.length > 0) {
      initial = users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        active: user.active,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }));
    } else {
      isFallback = true;
      initial = [
        {
          id: session.id || "session-admin",
          email: session.email,
          name: "Deepam Admin",
          role: session.role || "admin",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    }
  } catch (err) {
    console.error("[AdminUsersPage] DB error, using session fallback:", err);
    isFallback = true;
    initial = [
      {
        id: session.id || "session-admin",
        email: session.email,
        name: "Deepam Admin",
        role: session.role || "admin",
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  return (
    <>
      <AdminPageHeader
        title="Users"
        description="Create and manage CMS admin and editor accounts."
      />

      {isFallback && (
        <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
          <p className="font-semibold">Database Sync Note:</p>
          <p className="mt-1">
            Displaying the active authenticated session user (
            <code className="font-mono font-semibold">{session.email}</code>). To
            sync and verify all database tables on Hostinger, visit{" "}
            <Link href="/admin/settings" className="underline font-medium">
              Admin Settings
            </Link>{" "}
            or run the 1-Click Database Setup.
          </p>
        </div>
      )}

      <UsersEditor initial={initial} />
    </>
  );
}

