"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getCustomerAuth } from "@/lib/auth/mock-auth";

export function CustomerAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function verifyAuth() {
      // 1. Check client session storage
      const customer = getCustomerAuth();
      if (customer && customer.role === "customer") {
        if (isMounted) setAuthorized(true);
        return;
      }

      // 2. Check Supabase session
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          if (isMounted) setAuthorized(true);
          return;
        }
      } catch {
        // continue to unauthorized
      }

      if (isMounted) {
        setAuthorized(false);
        router.replace("/login");
      }
    }

    verifyAuth();

    const handleAuthChange = () => {
      verifyAuth();
    };

    window.addEventListener("yodha_auth_change", handleAuthChange);
    return () => {
      isMounted = false;
      window.removeEventListener("yodha_auth_change", handleAuthChange);
    };
  }, [router]);

  if (authorized === null) {
    return (
      <div className="min-h-[60vh] bg-surface flex flex-col items-center justify-center p-8 text-on-surface">
        <div className="flex flex-col items-center gap-4 max-w-sm text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin rounded-full" />
          <p className="font-mono text-xs uppercase tracking-widest text-outline">
            Verifying Athlete Authentication...
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
