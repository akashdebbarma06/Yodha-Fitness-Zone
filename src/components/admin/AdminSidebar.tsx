"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminAuth } from "@/lib/auth/mock-auth";

const ADMIN_NAV = [
  { label: "Overview", path: "/admin/dashboard", icon: "dashboard" },
  { label: "Products", path: "/admin/products", icon: "inventory_2" },
  { label: "Inventory", path: "/admin/inventory", icon: "warehouse" },
  { label: "Orders", path: "/admin/orders", icon: "receipt_long" },
  { label: "Customers", path: "/admin/customers", icon: "group" },
  { label: "Coupons", path: "/admin/coupons", icon: "local_offer" },
  { label: "Shipments", path: "/admin/shipments", icon: "local_shipping" },
  { label: "Reports", path: "/admin/reports", icon: "analytics" },
  { label: "Settings", path: "/admin/settings", icon: "settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();


  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Top Branding */}
      <div>
        <div className="h-20 px-6 flex items-center justify-between border-b border-outline-variant/60">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
              YODHA
            </span>
            <span className="font-label-sm text-label-sm uppercase px-1.5 py-0.5 bg-secondary text-on-secondary font-bold">
              OPS
            </span>
          </Link>
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" title="Live Operations" />
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/admin/dashboard" && pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 font-label-md text-label-md uppercase tracking-wider font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Operator Footer */}
      <div className="p-4 border-t border-outline-variant/60 space-y-3">
        <Link
          href="/"
          className="w-full h-10 px-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors border border-outline-variant/60"
        >
          <span className="material-symbols-outlined text-[16px]">
            arrow_back
          </span>
          <span>Back to Store</span>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs uppercase">
              YF
            </div>
            <div>
              <span className="font-title-md text-xs font-bold text-primary block leading-tight">
                Yodha Operations
              </span>
              <span className="text-[10px] text-secondary font-semibold uppercase">
                Gym Owner / Staff
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              clearAdminAuth();
              router.push("/admin/login");
            }}
            type="button"
            className="text-outline hover:text-error transition-colors p-1"
            title="Sign Out of Admin Console"
          >
            <span className="material-symbols-outlined text-[18px]">
              logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}

