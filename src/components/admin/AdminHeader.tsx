"use client";

import Link from "next/link";
import { useState } from "react";

export function AdminHeader() {
  const [search, setSearch] = useState("");

  return (
    <header className="h-20 bg-surface-container-lowest border-b border-outline-variant px-8 flex items-center justify-between gap-6 sticky top-0 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      {/* Search Input */}
      <div className="flex-1 max-w-md relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search formulations, order IDs (#YFZ...), customers..."
          className="w-full h-10 pl-9 pr-4 bg-surface-container-low border border-outline-variant text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-outline"
        />
        <span className="material-symbols-outlined text-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-outline">
          search
        </span>
      </div>

      {/* Operations Telemetry Strip */}
      <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low border border-outline-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-secondary font-bold">COLD-CHAIN: 4.8°C</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low border border-outline-variant">
          <span className="text-outline">CARRIER API:</span>
          <span className="text-primary font-semibold">SHIPROCKET SYNCED</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low border border-outline-variant">
          <span className="text-outline">NODE:</span>
          <span className="text-primary font-semibold">BLR-AIR-01</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/admin/products/new"
          className="h-9 px-4 bg-primary hover:bg-neutral-800 text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">
            add
          </span>
          <span>Add Formulation</span>
        </Link>

        <div className="w-9 h-9 bg-surface-container-low border border-outline-variant flex items-center justify-center text-on-surface relative cursor-pointer hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[18px]">
            notifications
          </span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error" />
        </div>
      </div>
    </header>
  );
}
