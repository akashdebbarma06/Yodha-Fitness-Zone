"use client";

import Link from "next/link";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ORDERS } from "@/lib/data/orders";
import { formatINR } from "@/lib/utils";

function TrackContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [orderQuery, setOrderQuery] = useState(initialId || "#YFZ-98421");
  const [phoneQuery, setPhoneQuery] = useState("+91 98765 43210");
  const [searchedOrder, setSearchedOrder] = useState(() => {
    return (
      ORDERS.find(
        (o) =>
          o.id.toLowerCase() === (initialId || "#yfz-98421").toLowerCase()
      ) || ORDERS[0]
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = orderQuery.trim().toLowerCase();
    const match =
      ORDERS.find((o) => o.id.toLowerCase().includes(cleaned)) || ORDERS[0];
    setSearchedOrder(match);
  };

  return (
    <div className="w-full bg-surface py-10 px-gutter">
      <div className="max-w-[1100px] mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-semibold">Track Order</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-outline-variant/60 pb-6">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.14em] text-secondary font-semibold">
            ORDER TRACKING
          </span>
          <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary font-semibold mt-1">
            Track Your Order
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
            Enter your order ID and phone number to see real-time delivery updates.
          </p>
        </div>

        {/* Lookup Box */}
        <form
          onSubmit={handleSearch}
          className="p-6 bg-surface-container-lowest border border-outline-variant grid grid-cols-1 sm:grid-cols-12 gap-4 items-end shadow-sm"
        >
          <div className="sm:col-span-5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
              Consignment Order ID
            </label>
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="#YFZ-98421"
              required
              className="w-full h-11 px-3 bg-surface border border-outline-variant font-mono font-bold text-sm focus:outline-none focus:border-primary uppercase"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
              Registered Phone Number
            </label>
            <input
              type="tel"
              value={phoneQuery}
              onChange={(e) => setPhoneQuery(e.target.value)}
              placeholder="+91 98765 43210"
              required
              className="w-full h-11 px-3 bg-surface border border-outline-variant font-mono text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">
                search
              </span>
              <span>Track</span>
            </button>
          </div>
        </form>

        {searchedOrder && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 6-Step Vertical Timeline (7 cols) */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant space-y-6">
              <div className="flex items-center justify-between border-b border-outline-variant/60 pb-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                    ORDER SHIPMENT
                  </span>
                  <h2 className="font-title-md text-title-md font-bold uppercase text-primary mt-0.5">
                    Shipping Progress
                  </h2>
                </div>
                <span className="px-2.5 py-1 bg-secondary/15 text-secondary text-xs uppercase font-bold">
                  {searchedOrder.orderStatus.replace("_", " ")}
                </span>
              </div>

              {/* Vertical Milestone Timeline */}
              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant">
                {searchedOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <span
                      className={`absolute -left-6 mt-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.completed
                          ? "bg-secondary text-on-secondary ring-4 ring-secondary/20"
                          : "bg-surface-container-high text-outline"
                      }`}
                    >
                      {step.completed ? "✓" : idx + 1}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <h3
                          className={`font-title-md text-title-md font-semibold ${
                            step.completed ? "text-primary" : "text-outline"
                          }`}
                        >
                          {step.label}
                        </h3>
                        {step.timestamp && (
                          <span className="font-mono text-xs text-outline">
                            {step.timestamp}
                          </span>
                        )}
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Courier Details & Consignment Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6 sticky top-[140px]">
              {/* Shipment Details Card */}
              <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block border-b border-outline-variant/60 pb-2">
                  Shipment Details
                </span>

                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-outline">CARRIER:</span>
                    <span className="font-bold text-primary">
                      {searchedOrder.courier || "Courier Partner"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">AWB NUMBER:</span>
                    <span className="font-bold text-secondary">
                      {searchedOrder.awb || "AWB123456789"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">ESTIMATED ARRIVAL:</span>
                    <span className="font-bold text-primary">
                      {searchedOrder.estimatedDelivery || "Standard delivery"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">RECIPIENT:</span>
                    <span>{searchedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">DESTINATION:</span>
                    <span>{searchedOrder.shippingAddress?.city}, {searchedOrder.shippingAddress?.state}</span>
                  </div>
                </div>
              </div>

              {/* Items in Consignment */}
              <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block border-b border-outline-variant/60 pb-2">
                  Items in this Consignment ({searchedOrder.items.length})
                </span>

                <div className="space-y-3 divide-y divide-outline-variant/40">
                  {searchedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="pt-3 first:pt-0 flex items-center justify-between text-body-sm"
                    >
                      <div>
                        <span className="font-semibold text-primary block">
                          {item.name}
                        </span>
                        <span className="text-xs text-on-surface-variant block">
                          {item.size} • {item.flavor} (Qty: {item.quantity})
                        </span>
                      </div>
                      <span className="font-semibold text-primary">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-outline-variant flex justify-between font-semibold">
                  <span>Consignment Total:</span>
                  <span className="text-secondary font-bold">
                    {formatINR(searchedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-outline">Loading order tracking...</div>}>
      <TrackContent />
    </Suspense>
  );
}
