import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-yodha.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "dummy-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh auth session
  await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // 1. Strict Server-Side Admin Isolation:
  // Protect all /admin/* routes except /admin/login. Customers MUST be rejected!
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminCookie = request.cookies.get("yodha_admin_auth")?.value;
    let hasAdminSession = false;

    if (adminCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(adminCookie));
        if (parsed?.role === "admin" || parsed?.role === "owner") {
          hasAdminSession = true;
        }
      } catch {
        // invalid JSON
      }
    }

    if (!hasAdminSession) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Strict Customer Route Protection:
  // Protect /account route. Unauthenticated visitors are redirected to /login.
  if (pathname.startsWith("/account")) {
    const customerCookie = request.cookies.get("yodha_customer_auth")?.value;
    const hasSbToken = request.cookies
      .getAll()
      .some((c) => c.name.includes("-auth-token"));
    let hasCustomerSession = hasSbToken;

    if (!hasCustomerSession && customerCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(customerCookie));
        if (parsed?.id) {
          hasCustomerSession = true;
        }
      } catch {
        // invalid
      }
    }

    if (!hasCustomerSession) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
