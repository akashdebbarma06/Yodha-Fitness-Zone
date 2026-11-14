"use client";

import Link from "next/link";
import { useState } from "react";
import { PRODUCTS } from "@/lib/data/products";
import { formatINR } from "@/lib/utils";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const toggleStatus = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: p.status === "active" ? "draft" : "active",
          };
        }
        return p;
      })
    );
  };

  const filtered = productsList.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
            Products
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Manage products, pricing, stock and storefront visibility.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="h-10 px-5 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 bg-surface-container-lowest border border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product name, SKU..."
            className="w-full h-10 pl-9 pr-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
          />
          <span className="material-symbols-outlined text-[18px] absolute left-2.5 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3 bg-surface border border-outline-variant text-xs uppercase font-semibold text-on-surface focus:outline-none focus:border-primary w-full sm:w-auto"
          >
            <option value="all">All Categories</option>
            <option value="Sports Nutrition">Sports Nutrition</option>
            <option value="Fitness Essentials">Fitness Essentials</option>
          </select>

          <span className="text-xs font-mono text-outline whitespace-nowrap">
            {filtered.length} Products
          </span>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-surface-container-lowest border border-outline-variant shadow-sm overflow-x-auto">
        <table className="w-full text-left font-body-sm text-body-sm">
          <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Variants</th>
              <th className="p-4">Base Price</th>
              <th className="p-4">Stock Yield</th>
              <th className="p-4">Verification</th>
              <th className="p-4">Storefront Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/60">
            {filtered.map((product) => {
              const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
              const minPrice = Math.min(...product.variants.map((v) => v.price));

              return (
                <tr key={product.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-14 object-contain bg-surface-container-low p-1 border border-outline-variant/40 shrink-0"
                      />
                      <div>
                        <span className="font-semibold text-primary block">
                          {product.name}
                        </span>
                        <span className="text-xs text-on-surface-variant block">
                          {product.subtitle}
                        </span>
                        <span className="text-[10px] font-mono text-outline">
                          HSN: {product.hsn} • FSSAI: {product.fssaiLic}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface text-xs font-semibold uppercase">
                      {product.category}
                    </span>
                  </td>

                  <td className="p-4 font-mono text-xs">
                    {product.variants.map((v) => v.size).join(", ")}
                  </td>

                  <td className="p-4 font-mono font-bold text-primary">
                    {formatINR(minPrice)}
                  </td>

                  <td className="p-4">
                    <span
                      className={`font-mono font-semibold text-xs px-2 py-0.5 rounded ${
                        totalStock < 25
                          ? "bg-error/15 text-error font-bold"
                          : "bg-surface-container text-on-surface"
                      }`}
                    >
                      {totalStock} units
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      Verified
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(product.id)}
                      type="button"
                      className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                        product.status === "active"
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface-container-high text-outline"
                      }`}
                    >
                      {product.status === "active" ? "Active" : "Draft"}
                    </button>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/product/${product.slug}`}
                      target="_blank"
                      className="text-xs uppercase font-semibold text-outline hover:text-primary transition-colors"
                      title="View live product"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/products/new?id=${product.id}`}
                      className="text-xs uppercase font-semibold text-primary hover:text-secondary underline decoration-outline-variant"
                    >
                      Edit
                    </Link>
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
