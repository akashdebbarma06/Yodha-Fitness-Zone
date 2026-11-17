"use client";

export interface CustomerAuthSession {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer";
  signedInAt: number;
}

export interface AdminAuthSession {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin";
  signedInAt: number;
}

const CUSTOMER_AUTH_KEY = "yodha_customer_auth";
const ADMIN_AUTH_KEY = "yodha_admin_auth";

// Helper to set cookie for synchronous SSR/layout checks if needed
function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// ──────────────────────────────────────────────
// CUSTOMER AUTH (Storefront)
// ──────────────────────────────────────────────

export function getCustomerAuth(): CustomerAuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CUSTOMER_AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CustomerAuthSession;
  } catch {
    return null;
  }
}

export function setCustomerAuth(session?: Partial<CustomerAuthSession>): CustomerAuthSession {
  // Demo placeholder identity — never a real person's name
  const fullSession: CustomerAuthSession = {
    id: session?.id || "cust_demo_member",
    name: session?.name || "Demo Member",
    email: session?.email || "",
    phone: session?.phone || "",
    role: "customer",
    signedInAt: Date.now(),
  };

  if (typeof window !== "undefined") {
    const serialized = JSON.stringify(fullSession);
    localStorage.setItem(CUSTOMER_AUTH_KEY, serialized);
    setCookie(CUSTOMER_AUTH_KEY, serialized);
    window.dispatchEvent(new Event("yodha_auth_change"));
  }


  return fullSession;
}

export function clearCustomerAuth(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CUSTOMER_AUTH_KEY);
    deleteCookie(CUSTOMER_AUTH_KEY);
    window.dispatchEvent(new Event("yodha_auth_change"));
  }
}

// ──────────────────────────────────────────────
// ADMIN AUTH (Operations Console)
// ──────────────────────────────────────────────

export function getAdminAuth(): AdminAuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminAuthSession;
  } catch {
    return null;
  }
}

export function setAdminAuth(session?: Partial<AdminAuthSession>): AdminAuthSession {
  const fullSession: AdminAuthSession = {
    id: session?.id || "admin_arjun_sharma",
    name: session?.name || "Arjun Sharma",
    email: session?.email || "arjun@yodhafitnesszone.com",
    role: "owner",
    signedInAt: Date.now(),
  };

  if (typeof window !== "undefined") {
    const serialized = JSON.stringify(fullSession);
    localStorage.setItem(ADMIN_AUTH_KEY, serialized);
    setCookie(ADMIN_AUTH_KEY, serialized);
    window.dispatchEvent(new Event("yodha_admin_auth_change"));
  }


  return fullSession;
}

export function clearAdminAuth(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    deleteCookie(ADMIN_AUTH_KEY);
    window.dispatchEvent(new Event("yodha_admin_auth_change"));
  }
}
