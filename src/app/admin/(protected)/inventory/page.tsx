"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/data/products";
import { STORE_SETTINGS } from "@/lib/data/settings";

interface InventoryRow {
  productId: string;
  variantId: string;
  name: string;
  flavor: string;
  size: string;
  sku: string;
  stock: number;
  batch: string;
  expiryDate: string;
  reorderPoint: number;
}

export default function AdminInventoryPage() {
  const initialRows: InventoryRow[] = [];
  for (const p of PRODUCTS) {
    for (const v of p.variants) {
      initialRows.push({
        productId: p.id,
        variantId: v.id,
        name: p.name,
        flavor: v.flavor,
        size: v.size,
        sku: v.sku,
        stock: v.stock,
        batch: v.batch,
        expiryDate: v.expiryDate,
        reorderPoint: v.reorderPoint || STORE_SETTINGS.lowStockAlert,
      });
    }
  }

  const [rows, setRows] = useState<InventoryRow[]>(initialRows);
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [search, setSearch] = useState("");

  const updateStock = (variantId: string, delta: number) => {
    setRows((prev) =>
      prev.map((r) =>
        r.variantId === variantId
          ? { ...r, stock: Math.max(0, r.stock + delta) }
          : r
      )
    );
  };

  const filtered = rows.filter((r) => {
    if (filterLowStock && r.stock >= r.reorderPoint) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.sku.toLowerCase().includes(q) ||
        r.batch.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const lowStockCount = rows.filter((r) => r.stock < r.reorderPoint).length;
  const totalUnits = rows.reduce((s, r) => s + r.stock, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
            Warehouse Inventory &amp; Batch Telemetry
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Real-time stock yields across Bengaluru Central and Mumbai Hubs with automated reorder triggers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-surface-container-low border border-outline-variant text-xs font-mono">
            TOTAL STOCK: <strong className="text-primary font-bold">{totalUnits} units</strong>
          </div>
          {lowStockCount > 0 && (
            <div className="px-3.5 py-1.5 bg-error/15 border border-error/30 text-error text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              <span>{lowStockCount} BELOW REORDER POINT</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-4 bg-surface-container-lowest border border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search SKU, batch, formulation..."
            className="w-full h-10 pl-9 pr-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
          />
          <span className="material-symbols-outlined text-[18px] absolute left-2.5 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setFilterLowStock(!filterLowStock)}
            type="button"
            className={`px-4 py-2 text-xs uppercase font-semibold tracking-wider transition-colors border ${
              filterLowStock
                ? "bg-error text-on-error border-error shadow-sm"
                : "bg-surface text-on-surface border-outline-variant hover:bg-surface-container-low"
            }`}
          >
            {filterLowStock ? "Showing Low Stock Only" : "Filter Critical Stock (<25)"}
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-surface-container-lowest border border-outline-variant shadow-sm overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
            <tr>
              <th className="p-4">SKU / Formulation</th>
              <th className="p-4">Variant</th>
              <th className="p-4">Batch #</th>
              <th className="p-4">Expiry Date</th>
              <th className="p-4">Available Units</th>
              <th className="p-4">Reorder Trigger</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Stock Adjust</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/60">
            {filtered.map((item) => {
              const isLow = item.stock < item.reorderPoint;

              return (
                <tr key={item.variantId} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-primary block">
                      {item.name}
                    </span>
                    <span className="font-mono text-xs text-outline block">
                      SKU: {item.sku}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-primary block">
                      {item.size}
                    </span>
                    <span className="text-xs text-on-surface-variant block">
                      {item.flavor}
                    </span>
                  </td>

                  <td className="p-4 font-mono font-bold text-xs text-primary">
                    #{item.batch}
                  </td>

                  <td className="p-4 font-mono text-xs text-on-surface-variant">
                    {item.expiryDate}
                  </td>

                  <td className="p-4">
                    <span
                      className={`font-mono font-bold text-sm px-2.5 py-1 inline-block ${
                        isLow
                          ? "bg-error/15 text-error ring-1 ring-error/30"
                          : "bg-surface-container text-primary"
                      }`}
                    >
                      {item.stock} units
                    </span>
                  </td>

                  <td className="p-4 font-mono text-xs text-outline">
                    &lt; {item.reorderPoint} units
                  </td>

                  <td className="p-4">
                    {isLow ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-error/15 text-error text-xs font-bold uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
                        Reorder Needed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/15 text-secondary text-xs font-semibold uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        Nominal
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="inline-flex items-center border border-outline-variant bg-surface">
                      <button
                        onClick={() => updateStock(item.variantId, -1)}
                        type="button"
                        className="w-7 h-7 flex items-center justify-center hover:bg-surface-container text-on-surface font-bold transition-colors"
                        title="Deduct 1 unit"
                      >
                        -
                      </button>
                      <button
                        onClick={() => updateStock(item.variantId, 10)}
                        type="button"
                        className="px-2 h-7 flex items-center justify-center hover:bg-surface-container text-xs font-semibold text-secondary transition-colors border-x border-outline-variant"
                        title="Restock +10 units"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => updateStock(item.variantId, 1)}
                        type="button"
                        className="w-7 h-7 flex items-center justify-center hover:bg-surface-container text-on-surface font-bold transition-colors"
                        title="Add 1 unit"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
