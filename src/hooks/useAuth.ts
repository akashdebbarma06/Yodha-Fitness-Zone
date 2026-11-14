"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { getCustomerAuth, clearCustomerAuth, type CustomerAuthSession } from "@/lib/auth/mock-auth";
import type { UserRole } from "@/types/database.types";

export interface AuthUserState {
  id: string;
  phone: string;
  fullName: string;
  email?: string;
  role: UserRole;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUserState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = useCallback(async () => {
    try {
      const supabase = createClient();
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser();

      if (authUser && !error) {
        // Fetch profile from database
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .maybeSingle();

        const phone =
          profile?.phone ||
          authUser.phone ||
          (authUser.user_metadata?.phone as string) ||
          "";
        const fullName =
          profile?.full_name ||
          (authUser.user_metadata?.full_name as string) ||
          (authUser.user_metadata?.name as string) ||
          "Athlete";
        const role = (profile?.role as UserRole) || "customer";

        setUser({
          id: authUser.id,
          phone,
          fullName,
          email: authUser.email || undefined,
          role,
        });
        setIsLoading(false);
        return;
      }
    } catch {
      // Supabase credentials not ready or network error
    }

    // Check customer session storage / cookie fallback
    const localCustomer = getCustomerAuth();
    if (localCustomer && localCustomer.id) {
      setUser({
        id: localCustomer.id,
        phone: localCustomer.phone,
        fullName: localCustomer.name,
        email: localCustomer.email,
        role: "customer",
      });
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkUser();

    // Subscribe to Supabase auth state change
    try {
      const supabase = createClient();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          await checkUser();
        } else {
          const localCustomer = getCustomerAuth();
          if (!localCustomer) {
            setUser(null);
          }
        }
      });

      // Also listen to window event for mock / local auth changes
      const handleLocalChange = () => {
        checkUser();
      };
      window.addEventListener("yodha_auth_change", handleLocalChange);

      return () => {
        subscription.unsubscribe();
        window.removeEventListener("yodha_auth_change", handleLocalChange);
      };
    } catch {
      const handleLocalChange = () => {
        checkUser();
      };
      window.addEventListener("yodha_auth_change", handleLocalChange);
      return () => {
        window.removeEventListener("yodha_auth_change", handleLocalChange);
      };
    }
  }, [checkUser]);

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // continue
    }
    clearCustomerAuth();
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    signOut,
    refresh: checkUser,
  };
}
