import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/auth/AdminAuthGuard";
import { requireAdmin } from "@/lib/auth/permissions";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side strict authorization: customers (role='customer') are rejected here!
  await requireAdmin();

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-surface flex text-on-surface">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
