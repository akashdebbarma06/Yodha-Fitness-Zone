"use client";

import { useState } from "react";
import Link from "next/link";
import { ORDERS } from "@/lib/data/orders";
import { formatINR } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";

export default function AdminOrdersPage() {
  const [ordersList, setOrdersList] = useState<Order[]>(ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, orderStatus: newStatus } : null));
    }
  };

  const filtered = ordersList.filter((o) => {
    if (statusFilter === "all") return true;
    return o.orderStatus === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
            Orders
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Manage customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 bg-surface-container-low border border-outline-variant">
            ACTIVE ORDERS: <strong className="text-primary font-bold">{ordersList.length}</strong>
          </span>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-outline-variant/60 pb-2">
        {(
          [
            ["all", "All Consignments"],
            ["confirmed", "Confirmed (Unfulfilled)"],
            ["in_transit", "In Transit (Linehaul)"],
            ["delivered", "Delivered (OTP Verified)"],
          ] as const
        ).map(([status, label]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            type="button"
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
              statusFilter === status
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-surface-container-lowest border border-outline-variant shadow-sm overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Consignment Items</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Carrier &amp; AWB</th>
              <th className="p-4">Fulfillment Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/60">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-4 font-mono font-bold text-primary">
                  {order.id}
                </td>

                <td className="p-4">
                  <span className="font-semibold text-primary block">
                    {order.customerName}
                  </span>
                  <span className="text-xs text-outline font-mono block">
                    {order.shippingAddress?.phone}
                  </span>
                </td>

                <td className="p-4 text-on-surface-variant text-xs">
                  {order.customerCity}
                </td>

                <td className="p-4 text-xs">
                  {order.items.map((i) => (
                    <div key={`${i.productId}-${i.variantId}`} className="text-on-surface-variant">
                      {i.name} ({i.size}) x{i.quantity}
                    </div>
                  ))}
                </td>

                <td className="p-4 font-mono font-bold text-primary">
                  {formatINR(order.total)}
                </td>

                <td className="p-4 font-mono text-xs">
                  <span className="text-primary font-semibold block">
                    {order.courier || "Courier"}
                  </span>
                  <span className="text-secondary block">
                    AWB: {order.awb || "Pending"}
                  </span>
                </td>

                <td className="p-4">
                  <span className="px-2.5 py-1 bg-surface-container-high text-on-surface text-xs font-semibold uppercase tracking-wider rounded">
                    {order.orderStatus.replace("_", " ")}
                  </span>
                </td>

                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    type="button"
                    className="text-xs uppercase font-semibold text-primary hover:text-secondary underline decoration-outline-variant"
                  >
                    Inspect
                  </button>

                  {order.orderStatus !== "delivered" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "delivered")}
                      type="button"
                      className="text-xs uppercase font-semibold text-secondary hover:underline"
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspect Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest max-w-2xl w-full p-6 sm:p-8 border border-outline-variant shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-secondary font-bold">
                  CONSIGNMENT INSPECTOR
                </span>
                <h2 className="font-headline-sm text-headline-sm uppercase font-bold text-primary mt-0.5">
                  Order {selectedOrder.id}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                type="button"
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-container"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs font-mono p-4 bg-surface-container-low border border-outline-variant">
                <div>
                  <span className="text-outline block">RECIPIENT:</span>
                  <span className="font-bold text-primary">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-outline block">DESTINATION:</span>
                  <span className="font-bold text-primary">{selectedOrder.customerCity}</span>
                </div>
                <div>
                  <span className="text-outline block">CARRIER / AWB:</span>
                  <span className="font-bold text-secondary">{selectedOrder.courier} • {selectedOrder.awb}</span>
                </div>
                <div>
                  <span className="text-outline block">PAYABLE TOTAL:</span>
                  <span className="font-bold text-primary">{formatINR(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Items */}
              <div>
                <span className="text-xs uppercase font-bold text-outline block mb-2">
                  Consignment Line Items
                </span>
                <div className="border border-outline-variant divide-y divide-outline-variant">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-body-sm">
                      <div>
                        <span className="font-semibold text-primary">{item.name}</span>
                        <span className="text-xs text-on-surface-variant block">
                          {item.size} • {item.flavor}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-primary">
                        {formatINR(item.price * item.quantity)} (Qty: {item.quantity})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
                <Link
                  href={`/track?id=${encodeURIComponent(selectedOrder.id)}`}
                  target="_blank"
                  className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-xs uppercase font-semibold tracking-wider text-on-surface border border-outline-variant"
                >
                  View Public Tracking Link ↗
                </Link>
                <button
                  onClick={() => setSelectedOrder(null)}
                  type="button"
                  className="px-5 py-2 bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
