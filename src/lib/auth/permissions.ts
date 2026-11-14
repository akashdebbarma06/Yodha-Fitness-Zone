import { getCurrentUser, type AuthenticatedUser } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "owner";
}

/**
 * Server-side route guard: strictly restricts access to admin routes (/admin/*).
 * Mobile-authenticated customers with role='customer' are rejected and redirected.
 */
export async function requireAdmin(): Promise<AdminUser> {
  // 1. Check primary authenticated user
  const user = await getCurrentUser();
  if (user && (user.role === "admin" || user.role === "owner")) {
    return {
      id: user.id,
      name: user.fullName,
      email: user.email || "admin@yodhafitnesszone.com",
      role: user.role,
    };
  }

  // 2. Check dedicated admin console cookie session
  try {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("yodha_admin_auth")?.value;
    if (adminCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(adminCookie));
        if (parsed?.id && (parsed?.role === "admin" || parsed?.role === "owner")) {
          return {
            id: parsed.id,
            name: parsed.name || "Arjun Sharma",
            email: parsed.email || "arjun@yodhafitnesszone.com",
            role: parsed.role,
          };
        }
      } catch {
        // invalid format
      }
    }
  } catch {
    // cookies unavailable
  }

  // 3. Unauthorized access denied: redirect to direct admin login URL
  redirect("/admin/login");
}
