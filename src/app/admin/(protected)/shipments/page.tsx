"use client";

import { useState } from "react";
import { SHIPMENTS, generateMockAWB } from "@/lib/data/shipments";
import type { Shipment } from "@/types";

export default function AdminShipmentsPage() {
  const [shipmentsList, setShipmentsList] = useState<Shipment[]>(SHIPMENTS);
  const [activePrintLabel, setActivePrintLabel] = useState<Shipment | null>(null);

  const assignAWB = (shipmentId: string) => {
    setShipmentsList((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId && s.awb.startsWith("Pending")) {
          return {
            ...s,
            awb: generateMockAWB(s.courier),
            status: "manifested",
          };
        }
        return s;
      })
    );
  };

  const resolveNDR = (shipmentId: string) => {
    setShipmentsList((prev) =>
      prev.map((s) =>
        s.id === shipmentId
          ? { ...s, status: "in_transit", ndrReason: undefined }
          : s
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
            Shipments &amp; Multi-Courier Dispatch Orchestrator
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Aggregated Shiprocket routing across Blue Dart Apex Air Priority, Delhivery Linehaul, and Shadowfax.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-surface-container-low border border-outline-variant text-xs font-mono">
            AIR DISPATCH STATUS: <strong className="text-secondary font-bold">100% NOMINAL</strong>
          </div>
        </div>
      </div>

      {/* Courier Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-surface-container-lowest border border-outline-variant space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold uppercase text-outline">
            <span>Blue Dart Apex Priority</span>
            <span className="text-secondary font-bold">Air Linehaul</span>
          </div>
          <span className="font-metric-num text-2xl font-bold text-primary block">
            42 Active Conclaves
          </span>
          <span className="text-[11px] text-on-surface-variant">
            Average transit: 22.4 hours pan-India
          </span>
        </div>

        <div className="p-5 bg-surface-container-lowest border border-outline-variant space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold uppercase text-outline">
            <span>Delhivery Surface</span>
            <span className="text-primary font-bold">Regional Linehaul</span>
          </div>
          <span className="font-metric-num text-2xl font-bold text-primary block">
            18 Active Conclaves
          </span>
          <span className="text-[11px] text-on-surface-variant">
            Heavy mass gainers (3kg–5kg tubs)
          </span>
        </div>

        <div className="p-5 bg-surface-container-lowest border border-outline-variant space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold uppercase text-outline">
            <span>Thermal 4x6 Manifests</span>
            <span className="text-secondary font-bold">Zebra / Rollo</span>
          </div>
          <span className="font-metric-num text-2xl font-bold text-primary block">
            Ready for Pickup
          </span>
          <span className="text-[11px] text-on-surface-variant">
            Shipping label attached
          </span>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-surface-container-lowest border border-outline-variant shadow-sm overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
            <tr>
              <th className="p-4">Shipment / Order ID</th>
              <th className="p-4">Courier Partner</th>
              <th className="p-4">AWB Code</th>
              <th className="p-4">Recipient &amp; Metro</th>
              <th className="p-4">Weight</th>
              <th className="p-4">Dispatch Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/60">
            {shipmentsList.map((shipment) => {
              const isNDR = shipment.status === "ndr";

              return (
                <tr
                  key={shipment.id}
                  className={`transition-colors ${
                    isNDR ? "bg-error/5 hover:bg-error/10" : "hover:bg-surface-container-low/40"
                  }`}
                >
                  <td className="p-4">
                    <span className="font-mono font-bold text-primary block">
                      {shipment.id}
                    </span>
                    <span className="font-mono text-xs text-outline block">
                      Ref: {shipment.orderId}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-primary block">
                      {shipment.courier}
                    </span>
                  </td>

                  <td className="p-4 font-mono font-bold text-xs text-primary">
                    {shipment.awb}
                  </td>

                  <td className="p-4 text-xs">
                    <span className="font-semibold text-primary block">
                      {shipment.customerName}
                    </span>
                    <span className="text-on-surface-variant block">
                      {shipment.destination}
                    </span>
                  </td>

                  <td className="p-4 font-mono text-xs text-outline">
                    {shipment.weight}
                  </td>

                  <td className="p-4">
                    {isNDR ? (
                      <div className="space-y-0.5">
                        <span className="px-2 py-0.5 bg-error/15 text-error text-[10px] font-bold uppercase rounded block w-fit">
                          NDR: {shipment.ndrReason}
                        </span>
                        <button
                          onClick={() => resolveNDR(shipment.id)}
                          type="button"
                          className="text-[11px] text-secondary font-bold underline cursor-pointer"
                        >
                          Resolve &amp; Re-dispatch
                        </button>
                      </div>
                    ) : (
                      <span className="px-2.5 py-0.5 bg-surface-container-high text-on-surface text-xs font-semibold uppercase tracking-wider rounded">
                        {shipment.status.replace("_", " ")}
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    {shipment.awb.startsWith("Pending") ? (
                      <button
                        onClick={() => assignAWB(shipment.id)}
                        type="button"
                        className="text-xs uppercase font-bold text-secondary hover:underline"
                      >
                        Generate AWB
                      </button>
                    ) : (
                      <button
                        onClick={() => setActivePrintLabel(shipment)}
                        type="button"
                        className="text-xs uppercase font-semibold text-primary hover:text-secondary underline decoration-outline-variant"
                      >
                        Print 4x6 Label
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Thermal 4x6 Label Print Preview Modal */}
      {activePrintLabel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-sm w-full p-6 border-4 border-black text-black space-y-4 shadow-2xl font-mono text-xs">
            {/* 4x6 Thermal Label Layout */}
            <div className="border-b-2 border-black pb-3 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase block font-bold">CARRIER:</span>
                <span className="text-base font-bold uppercase">{activePrintLabel.courier}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase block font-bold">TYPE:</span>
                <span className="text-sm font-bold bg-black text-white px-1.5 py-0.5">AIR PRIORITY</span>
              </div>
            </div>

            <div className="py-2 border-b-2 border-black space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-600 block">DELIVER TO:</span>
              <div className="text-sm font-bold">{activePrintLabel.customerName}</div>
              <div>{activePrintLabel.destination}</div>
              <div>INDIA • DOMESTIC DISPATCH</div>
            </div>

            <div className="py-2 border-b-2 border-black grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-600 block">AWB NUMBER:</span>
                <span className="font-bold">{activePrintLabel.awb}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-600 block">WEIGHT:</span>
                <span>{activePrintLabel.weight}</span>
              </div>
            </div>

            {/* Mock Thermal Barcode */}
            <div className="py-4 text-center space-y-1 bg-neutral-100 p-3 border border-neutral-300">
              <div className="h-12 w-full flex items-center justify-center gap-1 overflow-hidden px-4">
                {[...Array(32)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full bg-black ${i % 3 === 0 ? "w-1.5" : i % 2 === 0 ? "w-0.5" : "w-1"}`}
                  />
                ))}
              </div>
              <span className="text-[10px] tracking-widest block font-bold">{activePrintLabel.awb}</span>
            </div>

            <div className="text-[10px] text-center font-bold uppercase tracking-wider">
              STANDARD COURIER DELIVERY
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-black">
              <button
                onClick={() => setActivePrintLabel(null)}
                type="button"
                className="px-3 py-1.5 border border-black font-sans text-xs uppercase font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                type="button"
                className="px-4 py-1.5 bg-black text-white font-sans text-xs uppercase font-bold"
              >
                Print Label
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
