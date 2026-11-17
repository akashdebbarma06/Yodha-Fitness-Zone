import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UserRole } from "@/types/database.types";

export interface AuthenticatedUser {
  id: string;
  phone: string;
  fullName: string;
  email?: string;
  role: UserRole;
  createdAt?: string;
}

/**
 * Server-side function to retrieve and verify the currently authenticated user
 * using Supabase SSR `supabase.auth.getUser()`, fetching their role & metadata from `profiles`.
 */
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user && !error) {
      // Fetch associated profile from database
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const phone =
        profile?.phone ||
        user.phone ||
        (user.user_metadata?.phone as string) ||
        "";
      const fullName =
        profile?.full_name ||
        (user.user_metadata?.full_name as string) ||
        (user.user_metadata?.name as string) ||
        "Member";
      const role = (profile?.role as UserRole) || "customer";

      return {
        id: user.id,
        phone,
        fullName,
        email: user.email || undefined,
        role,
        createdAt: profile?.created_at || user.created_at,
      };
    }
  } catch (err) {
    // Graceful fallback for local development before Supabase keys are configured
    console.warn("Supabase auth check notice:", err);
  }

  // Check secure cookie fallback for local offline sessions
  try {
    const cookieStore = await cookies();
    const customerCookie = cookieStore.get("yodha_customer_auth")?.value;
    if (customerCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(customerCookie));
        if (parsed?.id && parsed?.role === "customer") {
          // Demo placeholder identity — never a real person's name
          return {
            id: parsed.id,
            phone: parsed.phone || "",
            fullName: parsed.name || "Demo Member",
            email: parsed.email || undefined,
            role: "customer",
            createdAt: new Date().toISOString(),
          };
        }
      } catch {
        // invalid cookie format
      }
    }
  } catch {
    // cookies() unavailable in non-request contexts
  }

  return null;
}

/**
 * Server-side route guard: redirects unauthenticated customers to /login.
 */
export async function requireUser(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
