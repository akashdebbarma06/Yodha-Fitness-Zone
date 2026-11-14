"use client";

import { REPORT_DATA } from "@/lib/data/reports";
import { formatINR } from "@/lib/utils";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
            Sales Reports &amp; Financial Ledger
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Sales and revenue breakdown by category.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            type="button"
            className="px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print P&amp;L Ledger</span>
          </button>
        </div>
      </div>

      {/* ── Gross-to-Net Financial Waterfall Card ── */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
          <div>
            <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
              Revenue Breakdown
            </h2>
            <p className="text-xs text-on-surface-variant">
              Payment breakdown
            </p>
          </div>
          <span className="px-2.5 py-1 bg-secondary/15 text-secondary text-xs uppercase font-bold font-mono">
            NET REVENUE: {formatINR(REPORT_DATA.netRevenue)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="p-4 bg-surface-container-low border border-outline-variant">
            <span className="text-[11px] font-mono text-outline block uppercase font-semibold">
              01. GROSS GMV
            </span>
            <span className="font-metric-num text-2xl font-bold text-primary block mt-1">
              {formatINR(REPORT_DATA.grossGmv)}
            </span>
            <span className="text-[11px] text-outline">1,248 orders</span>
          </div>

          <div className="p-4 bg-surface-container-low border border-outline-variant">
            <span className="text-[11px] font-mono text-outline block uppercase font-semibold">
              02. CAMPAIGN DISCOUNTS
            </span>
            <span className="font-metric-num text-2xl font-bold text-error block mt-1">
              -{formatINR(REPORT_DATA.discounts)}
            </span>
            <span className="text-[11px] text-error">Discounts</span>
          </div>

          <div className="p-4 bg-surface-container-low border border-outline-variant">
            <span className="text-[11px] font-mono text-outline block uppercase font-semibold">
              03. REFUNDS / CLAIMS
            </span>
            <span className="font-metric-num text-2xl font-bold text-error block mt-1">
              -{formatINR(REPORT_DATA.refunds)}
            </span>
            <span className="text-[11px] text-outline">2.0% claim rate</span>
          </div>

          <div className="p-4 bg-surface-container-low border border-outline-variant">
            <span className="text-[11px] font-mono text-outline block uppercase font-semibold">
              04. FREIGHT REVENUE
            </span>
            <span className="font-metric-num text-2xl font-bold text-primary block mt-1">
              +{formatINR(REPORT_DATA.shippingRevenue)}
            </span>
            <span className="text-[11px] text-outline">Sub-threshold orders</span>
          </div>

          <div className="p-4 bg-secondary/15 border-2 border-secondary">
            <span className="text-[11px] font-mono text-secondary block uppercase font-bold">
              05. NET REALIZED REVENUE
            </span>
            <span className="font-metric-num text-2xl font-bold text-secondary block mt-1">
              {formatINR(REPORT_DATA.netRevenue)}
            </span>
            <span className="text-[11px] text-secondary font-semibold">Realized to Bank</span>
          </div>
        </div>
      </div>

      {/* ── Category Contribution & Top Product Leaderboard ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Category Contribution (6 cols) */}
        <div className="lg:col-span-6 bg-surface-container-lowest p-6 border border-outline-variant space-y-4">
          <h3 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-2">
            Category Breakdown
          </h3>

          <div className="space-y-4">
            {REPORT_DATA.categoryBreakdown.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-body-sm font-semibold">
                  <span className="text-primary">{cat.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-on-surface-variant">
                      {formatINR(cat.revenue)}
                    </span>
                    <span className="font-mono text-xs text-secondary font-bold w-10 text-right">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Top Selling Batches (6 cols) */}
        <div className="lg:col-span-6 bg-surface-container-lowest p-6 border border-outline-variant space-y-4">
          <h3 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-2">
            Top Performing Products
          </h3>

          <div className="space-y-3 divide-y divide-outline-variant/40">
            {REPORT_DATA.topProducts.map((prod, idx) => (
              <div
                key={idx}
                className="pt-3 first:pt-0 flex items-center justify-between text-body-sm"
              >
                <div>
                  <span className="font-semibold text-primary block">
                    {idx + 1}. {prod.name}
                  </span>
                  <span className="text-xs text-outline font-mono">
                    {prod.sold} units dispatched this month
                  </span>
                </div>
                <span className="font-mono font-bold text-primary">
                  {formatINR(prod.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
