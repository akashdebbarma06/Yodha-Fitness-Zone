"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/store/ProductCard";

const activeProductsList = PRODUCTS.filter((p) => p.status === "active");

const CATEGORIES: { label: string; value: string; count: number }[] = [
  { label: "All Products", value: "all", count: activeProductsList.length },
  {
    label: "Sports Nutrition",
    value: "Sports Nutrition",
    count: activeProductsList.filter((p) => p.category === "Sports Nutrition").length,
  },
  {
    label: "Fitness Essentials",
    value: "Fitness Essentials",
    count: activeProductsList.filter((p) => p.category === "Fitness Essentials").length,
  },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setInStockOnly(false);
    setSortBy("featured");
  };

  const filteredProducts = useMemo(() => {
    return activeProductsList.filter((product) => {
      // Category filter
      if (
        selectedCategory !== "all" &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesSub = product.subtitle.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesSub) return false;
      }

      // In Stock filter
      if (inStockOnly) {
        const hasStock = product.variants.some((v) => v.stock > 0);
        if (!hasStock) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.variants[0]?.price ?? 0;
      const priceB = b.variants[0]?.price ?? 0;

      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "featured":
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <div className="w-full flex flex-col">
      {/* ── Breadcrumb & Trust Banner ── */}
      <section className="w-full bg-surface-container-low border-b border-outline-variant/50">
        <div className="max-w-[1360px] mx-auto px-gutter py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs text-[11px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-surface-variant font-label-sm uppercase tracking-widest">
            <Link href="/" className="hover:text-on-surface transition-colors">
              Home
            </Link>
            <span className="text-outline">/</span>
            <span className="text-on-surface font-semibold">Shop</span>
          </nav>
          <div className="flex items-center gap-space-md text-on-surface-variant font-label-sm uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-secondary font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Pan-India Shipping
            </span>
            <span className="text-outline hidden sm:inline">•</span>
            <span className="hidden sm:inline">Dispatched from Charilam, Tripura</span>
          </div>
        </div>
      </section>

      {/* ── Editorial Header ── */}
      <section className="w-full bg-surface py-10 lg:py-14 px-gutter border-b border-outline-variant/40">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="max-w-3xl flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.14em] text-secondary font-semibold">
              STORE
            </span>
            <h1 className="font-headline-lg text-headline-lg uppercase text-primary tracking-tight font-semibold">
              Products
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
              Supplements and fitness essentials available from Yodha Fitness Zone.
            </p>
          </div>

          <div className="flex items-center gap-space-lg bg-surface-container-low px-space-md py-space-sm rounded-lg self-start lg:self-auto border border-outline-variant/40">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Catalog
              </span>
              <span className="font-metric-num text-metric-num text-on-surface font-bold">
                {activeProductsList.length} Listed
              </span>
            </div>
          </div>
        </div>

        {/* ── Category Pill Bar ── */}
        <div className="max-w-[1360px] mx-auto pt-8 flex items-center justify-between gap-space-md overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                type="button"
                className={`font-label-md text-label-md uppercase tracking-wider px-4 py-2 transition-all ${
                  selectedCategory === cat.value
                    ? "bg-primary text-on-primary font-semibold"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/40"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Controls Strip: Search, Count, Sorting ── */}
      <section className="w-full bg-surface-container-lowest sticky top-[114px] z-30 shadow-sm border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto px-gutter py-3 flex flex-wrap items-center justify-between gap-space-md">
          {/* Mobile Filter Button & Active Count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase font-semibold border border-outline-variant"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Filters</span>
            </button>

            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline hidden sm:inline">
              Showing {filteredProducts.length} of {activeProductsList.length} products
            </span>

            {(selectedCategory !== "all" || inStockOnly || searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="font-label-sm text-label-sm uppercase text-secondary font-semibold hover:underline"
                type="button"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search Bar + Sort Dropdown */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="h-9 pl-8 pr-3 bg-surface-container-low text-body-sm font-body-sm text-on-surface placeholder:text-outline border border-outline-variant/60 focus:outline-none focus:border-primary w-44 sm:w-56"
              />
              <span className="material-symbols-outlined text-[16px] absolute left-2.5 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 appearance-none bg-surface-container-low text-on-surface font-label-sm text-label-sm uppercase tracking-wider pl-3 pr-8 border border-outline-variant/60 cursor-pointer focus:outline-none focus:border-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Catalog Grid & Sidebar ── */}
      <section className="w-full bg-surface py-12 px-gutter">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 bg-surface-container-lowest p-6 border border-outline-variant/50 sticky top-[180px]">
            <div>
              <h3 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold border-b border-outline-variant/60 pb-2 mb-4">
                Category
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    type="button"
                    className={`w-full text-left font-body-sm text-body-sm flex items-center justify-between py-1 transition-colors ${
                      selectedCategory === cat.value
                        ? "text-primary font-bold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-outline text-xs">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold border-b border-outline-variant/60 pb-2 mb-4">
                Availability
              </h3>
              <label className="flex items-center gap-2.5 font-body-sm text-body-sm text-on-surface cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-outline accent-primary"
                />
                <span>In Stock</span>
              </label>
            </div>

            <div className="p-4 bg-surface-container-low border border-outline-variant/40 space-y-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-secondary block">
                Shipping
              </span>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                Dispatched from Charilam, Tripura with tracking.
              </p>
            </div>
          </aside>

          {/* Product Cards Grid (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center bg-surface-container-lowest border border-outline-variant p-8 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-[54px] text-outline mb-3">
                  search_off
                </span>
                <h3 className="font-title-md text-title-md font-semibold text-primary">
                  No products found
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-1">
                  Try adjusting your filters to find what you need.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md uppercase font-semibold tracking-wider"
                  type="button"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-outline">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
