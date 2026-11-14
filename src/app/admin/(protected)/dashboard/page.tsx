"use client";

import Link from "next/link";
import { useState } from "react";
import { ORDERS } from "@/lib/data/orders";
import { PRODUCTS } from "@/lib/data/products";
import { REPORT_DATA } from "@/lib/data/reports";
import { formatINR } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState<"30d" | "7d" | "today">("30d");

  // Low stock products (< 25 units)
  const lowStockVariants: {
    productName: string;
    variantSize: string;
    stock: number;
    batch: string;
    sku: string;
  }[] = [];

  for (const product of PRODUCTS) {
    for (const v of product.variants) {
      if (v.stock < 25) {
        lowStockVariants.push({
          productName: product.name,
          variantSize: v.size,
          stock: v.stock,
          batch: v.batch,
          sku: v.sku,
        });
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
              Operations Overview
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-secondary/15 text-secondary font-label-sm text-label-sm uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Pan-India Cold Chain Online
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Real-time single-owner telemetry • Sovereign command over formulation catalog, fulfillment, and revenue velocity.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="inline-flex p-0.5 bg-surface-container-high border border-outline-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            <button
              onClick={() => setTimeRange("30d")}
              type="button"
              className={`px-3 py-1.5 transition-colors ${
                timeRange === "30d"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface hover:text-primary"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange("7d")}
              type="button"
              className={`px-3 py-1.5 transition-colors ${
                timeRange === "7d"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface hover:text-primary"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange("today")}
              type="button"
              className={`px-3 py-1.5 transition-colors ${
                timeRange === "today"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface hover:text-primary"
              }`}
            >
              Today
            </button>
          </div>

          <Link
            href="/admin/memberships"
            className="h-9 px-4 bg-surface-container-low hover:bg-surface-container border border-outline-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold text-primary flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">card_membership</span>
            <span>Memberships</span>
          </Link>

          <Link
            href="/admin/products/new"
            className="h-9 px-4 bg-primary hover:bg-neutral-800 text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Product</span>
          </Link>
        </div>
      </div>

      {/* ── 4 Top KPI Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block font-semibold">
                Gross GMV Velocity
              </span>
              <p className="font-metric-num text-[32px] text-primary font-bold mt-1">
                {formatINR(REPORT_DATA.grossGmv)}
              </p>
            </div>
            <div className="w-10 h-10 bg-surface-container-low border border-outline-variant flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">
                currency_rupee
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-outline-variant/60">
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +14.2% Growth
            </span>
            <span className="text-outline">vs prior 30d window</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block font-semibold">
                Total Orders Ingested
              </span>
              <p className="font-metric-num text-[32px] text-primary font-bold mt-1">
                {REPORT_DATA.totalOrders.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="w-10 h-10 bg-surface-container-low border border-outline-variant flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">
                receipt_long
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-outline-variant/60">
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +8.6% Velocity
            </span>
            <span className="text-outline">Avg. {formatINR(REPORT_DATA.avgOrderValue)}</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block font-semibold">
                Repeat Purchase Index
              </span>
              <p className="font-metric-num text-[32px] text-secondary font-bold mt-1">
                {REPORT_DATA.repeatPurchaseIndex}%
              </p>
            </div>
            <div className="w-10 h-10 bg-surface-container-low border border-outline-variant flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">
                autorenew
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-outline-variant/60">
            <span className="text-secondary font-bold">Top Quartile</span>
            <span className="text-outline">3,892 Athletes</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block font-semibold">
                Critical Low Stock
              </span>
              <p className="font-metric-num text-[32px] text-error font-bold mt-1">
                {lowStockVariants.length}{" "}
                <span className="text-xs font-normal text-outline">SKUs &lt;25</span>
              </p>
            </div>
            <div className="w-10 h-10 bg-error/10 border border-error/20 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[20px]">
                warning
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-outline-variant/60">
            <Link
              href="/admin/inventory"
              className="text-error hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Restock Queue →</span>
            </Link>
            <span className="text-outline">{PRODUCTS.length} Total SKUs</span>
          </div>
        </div>
      </div>

      {/* ── Daily Revenue Velocity & Dispatch Manifest ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Revenue Velocity SVG Chart (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-6 border border-outline-variant space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
            <div>
              <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
                Gross Fulfillment Trajectory (October)
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Daily order volume and air linehaul consignments
              </p>
            </div>
            <span className="font-mono text-xs text-secondary font-bold">
              30-DAY WATERFALL
            </span>
          </div>

          {/* Clean Vector Chart */}
          <div className="h-64 w-full relative flex items-end gap-2 pt-4">
            {REPORT_DATA.dailyVelocity.map((day, idx) => {
              const maxRev = 75000;
              const heightPercent = Math.min(100, Math.round((day.revenue / maxRev) * 100));

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 hidden group-hover:flex flex-col items-center z-10 bg-primary text-on-primary text-[10px] px-2 py-1 shadow-lg whitespace-nowrap pointer-events-none">
                    <span>{day.date}: {formatINR(day.revenue)}</span>
                    <span className="text-secondary-fixed">{day.orders} orders</span>
                  </div>

                  <div
                    className="w-full bg-surface-container-high group-hover:bg-secondary transition-all"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[9px] font-mono text-outline truncate block">
                    {day.date.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-outline-variant/60 text-xs font-mono text-outline">
            <span>ORIGIN: Bengaluru Air Hub (BLR)</span>
            <span>CARRIER CONCURRENCY: Blue Dart Apex (74%), Delhivery (26%)</span>
          </div>
        </div>

        {/* Right: Low Stock Alert Card & Operations Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Low Stock Alerts */}
          <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
              <div className="flex items-center gap-2 text-error">
                <span className="material-symbols-outlined text-[20px]">
                  warning
                </span>
                <h3 className="font-title-md text-title-md font-bold uppercase text-primary">
                  Low Stock Triggers
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-error/15 text-error text-xs font-bold font-mono">
                &lt;25 units
              </span>
            </div>

            <div className="space-y-3">
              {lowStockVariants.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-surface-container-low border border-outline-variant/60 flex items-center justify-between text-body-sm"
                >
                  <div>
                    <span className="font-semibold text-primary block line-clamp-1">
                      {item.productName}
                    </span>
                    <span className="text-xs text-on-surface-variant font-mono">
                      {item.variantSize} • Batch #{item.batch}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-error font-bold font-mono block">
                      {item.stock} left
                    </span>
                    <Link
                      href="/admin/inventory"
                      className="text-[11px] text-secondary font-semibold uppercase hover:underline"
                    >
                      Restock
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-3">
            <span className="font-label-sm text-label-sm uppercase font-bold text-outline block border-b border-outline-variant/60 pb-2">
              Operational Shortcuts
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold uppercase tracking-wider">
              <Link
                href="/admin/shipments"
                className="p-3 bg-surface-container-low hover:bg-surface-container flex flex-col gap-1 items-center justify-center text-center border border-outline-variant"
              >
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  local_shipping
                </span>
                <span>Manifest Dispatches</span>
              </Link>
              <Link
                href="/admin/coupons"
                className="p-3 bg-surface-container-low hover:bg-surface-container flex flex-col gap-1 items-center justify-center text-center border border-outline-variant"
              >
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  local_offer
                </span>
                <span>Promo Campaigns</span>
              </Link>
              <Link
                href="/admin/reports"
                className="p-3 bg-surface-container-low hover:bg-surface-container flex flex-col gap-1 items-center justify-center text-center border border-outline-variant"
              >
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  analytics
                </span>
                <span>Sales Ledger</span>
              </Link>
              <Link
                href="/admin/settings"
                className="p-3 bg-surface-container-low hover:bg-surface-container flex flex-col gap-1 items-center justify-center text-center border border-outline-variant"
              >
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  tune
                </span>
                <span>Store GSTIN</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Orders Ingestion Table ── */}
      <div className="bg-surface-container-lowest border border-outline-variant p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-4">
          <div>
            <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
              Live Order Queue &amp; Fulfillment Triage
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Synchronized with Razorpay webhooks and Blue Dart automated manifests
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs uppercase font-bold text-secondary hover:underline"
          >
            View All Orders ({ORDERS.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Formulations</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Fulfillment</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {ORDERS.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3 font-mono font-bold text-primary">
                    {order.id}
                  </td>
                  <td className="p-3 font-semibold text-primary">
                    {order.customerName}
                  </td>
                  <td className="p-3 text-on-surface-variant">
                    {order.customerCity}
                  </td>
                  <td className="p-3 text-xs text-on-surface-variant">
                    {order.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")}
                  </td>
                  <td className="p-3 font-mono font-bold text-primary">
                    {formatINR(order.total)}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-secondary/15 text-secondary text-xs uppercase font-bold">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface text-xs uppercase font-semibold">
                      {order.orderStatus.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/admin/orders`}
                      className="text-xs uppercase font-semibold text-primary hover:text-secondary underline decoration-outline-variant"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
