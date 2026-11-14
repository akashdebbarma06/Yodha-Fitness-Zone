"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminAuth } from "@/lib/auth/mock-auth";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const adminSession = getAdminAuth();
    if (!adminSession) {
      setAuthorized(false);
      router.replace("/admin/login");
    } else {
      setAuthorized(true);
    }

    const handleAuthChange = () => {
      const updated = getAdminAuth();
      if (!updated) {
        setAuthorized(false);
        router.replace("/admin/login");
      } else {
        setAuthorized(true);
      }
    };

    window.addEventListener("yodha_admin_auth_change", handleAuthChange);
    return () => {
      window.removeEventListener("yodha_admin_auth_change", handleAuthChange);
    };
  }, [router]);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-on-surface">
        <div className="flex flex-col items-center gap-4 max-w-sm text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin rounded-full" />
          <p className="font-mono text-xs uppercase tracking-widest text-outline">
            Verifying Operations Authority...
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
