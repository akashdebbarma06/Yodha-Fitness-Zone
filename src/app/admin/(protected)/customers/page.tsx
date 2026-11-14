"use client";

import { useState } from "react";
import { CUSTOMERS } from "@/lib/data/customers";
import { formatINR } from "@/lib/utils";
import type { Customer, CohortTag } from "@/types";

export default function AdminCustomersPage() {
  const [cohortFilter, setCohortFilter] = useState<string>("all");
  const [unmasked, setUnmasked] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = CUSTOMERS.filter((c) => {
    if (cohortFilter !== "all" && !c.cohortTags.includes(cohortFilter as CohortTag)) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalLTV = CUSTOMERS.reduce((s, c) => s + c.ltv, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
            Customer Cohorts &amp; LTV Intelligence
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Analyze customer lifetime spend, recurring replenishment loyalty, and DPDP Act privacy masking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-surface-container-low border border-outline-variant text-xs font-mono">
            AGGREGATE LTV: <strong className="text-secondary font-bold">{formatINR(totalLTV)}</strong>
          </div>
          <button
            onClick={() => setUnmasked(!unmasked)}
            type="button"
            className="px-3.5 py-1.5 bg-surface-container-high hover:bg-surface-container text-xs font-semibold uppercase tracking-wider text-on-surface border border-outline-variant flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              {unmasked ? "visibility_off" : "visibility"}
            </span>
            <span>{unmasked ? "Mask Phones" : "Unmask Phones"}</span>
          </button>
        </div>
      </div>

      {/* Cohort Filter Tabs & Search */}
      <div className="p-4 bg-surface-container-lowest border border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name, email, city..."
            className="w-full h-10 pl-9 pr-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
          />
          <span className="material-symbols-outlined text-[18px] absolute left-2.5 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {(
            [
              ["all", "All Customers"],
              ["VIP", "VIP (>₹25k)"],
              ["Subscription", "Active Subscription"],
              ["Dormant", "Dormant (>60d)"],
            ] as const
          ).map(([tag, label]) => (
            <button
              key={tag}
              onClick={() => setCohortFilter(tag)}
              type="button"
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
                cohortFilter === tag
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface border border-outline-variant/60"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-surface-container-lowest border border-outline-variant shadow-sm overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Mobile Coordinates</th>
              <th className="p-4">Metro City</th>
              <th className="p-4">Total Orders</th>
              <th className="p-4">Realized LTV</th>
              <th className="p-4">Last Purchase</th>
              <th className="p-4">Cohort Segmentation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/60">
            {filtered.map((customer) => (
              <tr key={customer.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs uppercase">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <span className="font-semibold text-primary block">
                        {customer.name}
                      </span>
                      <span className="text-xs text-outline block">
                        {customer.email}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="p-4 font-mono text-xs text-on-surface-variant">
                  {unmasked ? customer.phone : customer.maskedPhone}
                </td>

                <td className="p-4 text-xs text-on-surface-variant">
                  {customer.city}, {customer.state}
                </td>

                <td className="p-4 font-mono font-semibold">
                  {customer.totalOrders}
                </td>

                <td className="p-4 font-mono font-bold text-primary">
                  {formatINR(customer.ltv)}
                </td>

                <td className="p-4 font-mono text-xs text-on-surface-variant">
                  {customer.lastPurchase}
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {customer.cohortTags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                          tag === "VIP"
                            ? "bg-secondary text-on-secondary"
                            : tag === "Subscription"
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container text-outline"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
