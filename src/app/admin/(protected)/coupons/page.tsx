"use client";

import { useState } from "react";
import { COUPONS } from "@/lib/data/coupons";
import { formatINR } from "@/lib/utils";
import type { Coupon } from "@/types";

export default function AdminCouponsPage() {
  const [couponsList, setCouponsList] = useState<Coupon[]>(COUPONS);
  const [showNewModal, setShowNewModal] = useState(false);

  // New Coupon Form state
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<"percentage" | "flat">("percentage");
  const [newValue, setNewValue] = useState(15);
  const [newMinOrder, setNewMinOrder] = useState(1499);
  const [newMaxDiscount, setNewMaxDiscount] = useState(2000);
  const [newUsageLimit, setNewUsageLimit] = useState(500);
  const [newDescription, setNewDescription] = useState("");

  const toggleCoupon = (id: string) => {
    setCouponsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const created: Coupon = {
      id: `cpn-${Math.random().toString(36).substring(2, 7)}`,
      code: newCode.trim().toUpperCase(),
      type: newType,
      value: newValue,
      minOrder: newMinOrder,
      maxDiscount: newType === "percentage" ? newMaxDiscount : undefined,
      usageLimit: newUsageLimit,
      usedCount: 0,
      active: true,
      description: newDescription || "Seasonal promotional offer",
      validFrom: new Date().toISOString().split("T")[0],
      validTo: "2025-12-31",
    };

    setCouponsList([created, ...couponsList]);
    setShowNewModal(false);
    setNewCode("");
    setNewDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
            Promotional Campaigns &amp; Discount Rules
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Configure percentage and flat rupee concessions, cart thresholds, and global redemption budgets.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          type="button"
          className="h-10 px-5 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant shadow-sm overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
            <tr>
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Type &amp; Value</th>
              <th className="p-4">Thresholds</th>
              <th className="p-4">Campaign Description</th>
              <th className="p-4">Redemption Yield</th>
              <th className="p-4">Validity</th>
              <th className="p-4 text-right">Status Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/60">
            {couponsList.map((coupon) => {
              const usagePercent = Math.min(
                100,
                Math.round((coupon.usedCount / coupon.usageLimit) * 100)
              );

              return (
                <tr key={coupon.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-sm text-primary tracking-wider px-2.5 py-1 bg-surface-container-low border border-outline-variant inline-block">
                      {coupon.code}
                    </span>
                  </td>

                  <td className="p-4 font-mono">
                    {coupon.type === "percentage" ? (
                      <span className="font-bold text-secondary text-sm">
                        {coupon.value}% OFF
                      </span>
                    ) : (
                      <span className="font-bold text-secondary text-sm">
                        {formatINR(coupon.value)} FLAT
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-xs font-mono">
                    <div>Min Order: {formatINR(coupon.minOrder)}</div>
                    {coupon.maxDiscount && (
                      <div className="text-outline">Cap: {formatINR(coupon.maxDiscount)}</div>
                    )}
                  </td>

                  <td className="p-4 text-xs text-on-surface-variant max-w-xs">
                    {coupon.description}
                  </td>

                  <td className="p-4">
                    <div className="w-36 space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="font-bold text-primary">{coupon.usedCount}</span>
                        <span className="text-outline">/ {coupon.usageLimit}</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary"
                          style={{ width: `${usagePercent}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-mono text-xs text-on-surface-variant">
                    {coupon.validTo}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleCoupon(coupon.id)}
                      type="button"
                      className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                        coupon.active
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface-container-high text-outline"
                      }`}
                    >
                      {coupon.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* New Campaign Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest max-w-md w-full p-6 sm:p-8 border border-outline-variant shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
              <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
                New Promotion Campaign
              </h2>
              <button
                onClick={() => setShowNewModal(false)}
                type="button"
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-container"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Coupon Code (e.g. ELEVATE20) *
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="YODHA20"
                  className="w-full h-11 px-3 bg-surface border border-outline-variant font-mono font-bold uppercase focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Concession Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-xs uppercase font-semibold focus:outline-none focus:border-primary"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Rupee (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Concession Value
                  </label>
                  <input
                    type="number"
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant font-mono font-bold focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Min Order (₹)
                  </label>
                  <input
                    type="number"
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant font-mono focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Usage Cap Limit
                  </label>
                  <input
                    type="number"
                    value={newUsageLimit}
                    onChange={(e) => setNewUsageLimit(Number(e.target.value))}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant font-mono focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Description / Campaign Goal
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Coupon description"
                  className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant">
                <button
                  onClick={() => setShowNewModal(false)}
                  type="button"
                  className="px-4 py-2 border border-outline-variant text-xs uppercase font-semibold text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider shadow-sm"
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
