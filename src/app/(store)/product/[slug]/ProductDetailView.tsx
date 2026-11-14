"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product, ProductVariant } from "@/types";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/components/providers/CartProvider";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"macros" | "aminos" | "usage" | "coa">("macros");
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const selectedVariant: ProductVariant =
    product.variants[selectedVariantIndex] || product.variants[0];

  const handleAddToCart = () => {
    addItem(product.id, selectedVariant.id, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product.id, selectedVariant.id, quantity);
    router.push("/checkout");
  };

  const servingCost = Math.round(selectedVariant.price / (selectedVariant.servings || 30));

  return (
    <div className="w-full flex flex-col">
      {/* ── Breadcrumbs & Batch Verification Strip ── */}
      <section className="w-full bg-surface-container-lowest border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto px-gutter py-2.5 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-[11px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-sm uppercase tracking-wider text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container px-2.5 py-1 border border-outline-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm text-secondary font-semibold tracking-wider uppercase">
              BATCH #{selectedVariant.batch} VERIFIED
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Showcase Grid (2 Columns) ── */}
      <section className="w-full bg-surface py-8 lg:py-14 border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* ── Left Column: Gallery & Badges ── */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* Primary Image Frame */}
              <div className="relative bg-surface-container-lowest border border-outline-variant overflow-hidden group">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest px-2.5 py-1 bg-secondary text-on-secondary font-semibold">
                    {product.suite || "NATIVE CFM ISOLATE"}
                  </span>
                  {selectedVariant.compareAtPrice && (
                    <span className="font-label-sm text-label-sm uppercase tracking-widest px-2.5 py-1 bg-primary text-on-primary font-semibold">
                      SAVE {Math.round(((selectedVariant.compareAtPrice - selectedVariant.price) / selectedVariant.compareAtPrice) * 100)}%
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur border border-outline-variant flex items-center justify-center transition-colors ${
                    isWishlisted ? "text-error" : "text-on-surface hover:text-error"
                  }`}
                  title="Wishlist formulation"
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    favorite
                  </span>
                </button>

                {/* Primary Image Canvas */}
                <div className="w-full aspect-square bg-[#F8F8F6] flex items-center justify-center p-8 sm:p-12 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      type="button"
                      className={`aspect-square p-2 bg-surface-container-lowest border transition-all overflow-hidden ${
                        selectedImageIndex === idx
                          ? "border-2 border-primary shadow-sm"
                          : "border-outline-variant hover:border-primary opacity-80 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Guarantees Strip */}
              <div className="bg-surface-container-low border border-outline-variant p-4 mt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left text-on-surface font-label-sm text-label-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-secondary font-bold">✓</span>
                    <span className="truncate">100% Grass-Fed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-secondary font-bold">✓</span>
                    <span className="truncate">CFM Filtered (&lt;4°C)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-secondary font-bold">✓</span>
                    <span className="truncate">Zero Sucralose</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-secondary font-bold">✓</span>
                    <span className="truncate">Informed-Sport</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Info & Purchase Controls ── */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Titles */}
              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                  YFZ SERIES • {product.category}
                </span>
                <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary font-semibold">
                  {product.name}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Reviews & Stock Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 border-y border-outline-variant/60">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[#C59B27] font-semibold">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-on-surface font-label-sm text-label-sm">
                      {product.rating || 4.9}
                    </span>
                  </div>
                  <span className="text-outline-variant">|</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {product.reviewCount || 428} verified athlete reviews
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="font-label-sm text-label-sm text-secondary font-medium">
                    In Stock • Dispatches in 24 hrs
                  </span>
                </div>
              </div>

              {/* Pricing Display */}
              <div className="flex flex-col gap-1 bg-surface-container-lowest p-5 border border-outline-variant">
                <div className="flex items-baseline gap-3">
                  <span className="font-metric-num text-[36px] leading-none text-primary font-bold">
                    {formatINR(selectedVariant.price)}
                  </span>
                  {selectedVariant.compareAtPrice && (
                    <span className="font-title-md text-title-md line-through text-outline">
                      {formatINR(selectedVariant.compareAtPrice)}
                    </span>
                  )}
                  {selectedVariant.compareAtPrice && (
                    <span className="font-label-sm text-label-sm uppercase px-2 py-0.5 bg-secondary/15 text-secondary font-bold">
                      Save {formatINR(selectedVariant.compareAtPrice - selectedVariant.price)}
                    </span>
                  )}
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  Inclusive of all taxes. Free express cold-chain delivery across India on this order.
                </p>
              </div>

              {/* Package Mass / Variant Yield Selector */}
              {product.variants.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                      Package Size / Serving Yield
                    </label>
                    <span className="font-label-sm text-label-sm text-secondary font-medium">
                      ₹{servingCost} per {selectedVariant.servings || 30} servings
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {product.variants.map((v, idx) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantIndex(idx)}
                        type="button"
                        className={`text-left p-3 transition-all border ${
                          selectedVariantIndex === idx
                            ? "border-2 border-primary bg-surface-container-lowest shadow-sm"
                            : "border-outline-variant hover:border-primary bg-surface-container-low"
                        }`}
                      >
                        <span className="block font-title-md text-title-md font-semibold text-on-surface">
                          {v.size}
                        </span>
                        <span className="block font-label-sm text-label-sm text-on-surface-variant">
                          {v.servings} Servings • {formatINR(v.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavor Selector */}
              <div className="flex flex-col gap-2">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                  Formulation Flavor
                </label>
                <div className="p-3 bg-surface-container-low border border-outline-variant flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-semibold text-primary">
                    {selectedVariant.flavor}
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                    Natural Flavor
                  </span>
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                {/* Quantity */}
                <div className="flex items-center border border-outline-variant bg-surface-container-lowest h-12 w-full sm:w-auto">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    type="button"
                    className="w-10 h-full flex items-center justify-center hover:bg-surface-container text-on-surface font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-title-md text-title-md font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    type="button"
                    className="w-10 h-full flex items-center justify-center hover:bg-surface-container text-on-surface font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className={`flex-1 h-12 px-6 font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all w-full ${
                    isAdded
                      ? "bg-secondary text-on-secondary"
                      : "bg-primary hover:bg-neutral-800 text-on-primary shadow-sm"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isAdded ? "check" : "shopping_bag"}
                  </span>
                  <span>
                    {isAdded
                      ? "Added to Bag"
                      : `Add to Bag • ${formatINR(selectedVariant.price * quantity)}`}
                  </span>
                </button>

                {/* Instant 1-Click Checkout */}
                <button
                  onClick={handleBuyNow}
                  type="button"
                  className="h-12 px-6 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto shrink-0"
                >
                  <span>Buy Now</span>
                  <span className="material-symbols-outlined text-[18px]">
                    bolt
                  </span>
                </button>
              </div>

              {/* Express dispatch notice */}
              <div className="p-3.5 bg-surface-container-high border border-outline-variant/60 flex items-center gap-3 text-body-sm font-body-sm text-on-surface">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  local_shipping
                </span>
                <div>
                  <span className="font-semibold text-primary">
                    Fast Dispatch:
                  </span>{" "}
                  Orders placed before 2 PM ship the same day.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Clinical Rigor, Macro Profile & COA Tabs ── */}
      <section className="w-full bg-surface-container-lowest py-16 px-gutter border-b border-outline-variant">
        <div className="max-w-[1360px] mx-auto">
          {/* Tab Navigation */}
          <div className="flex items-center gap-4 border-b border-outline-variant pb-px mb-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("macros")}
              type="button"
              className={`pb-3 font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors border-b-2 ${
                activeTab === "macros"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              Nutritional Macros
            </button>

            <button
              onClick={() => setActiveTab("aminos")}
              type="button"
              className={`pb-3 font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors border-b-2 ${
                activeTab === "aminos"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              Amino Acid Profile
            </button>

            <button
              onClick={() => setActiveTab("usage")}
              type="button"
              className={`pb-3 font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors border-b-2 ${
                activeTab === "usage"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              Usage &amp; Dosage
            </button>

            <button
              onClick={() => setActiveTab("coa")}
              type="button"
              className={`pb-3 font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors border-b-2 ${
                activeTab === "coa"
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              Certificate of Analysis (COA)
            </button>
          </div>

          {/* Tab Content: Macros */}
          {activeTab === "macros" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mb-3">
                  Nutritional Composition Per Serving
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                  Nutritional values per serving. No amino spiking or hidden fillers.
                </p>
                <div className="border border-outline-variant divide-y divide-outline-variant">
                  {product.nutrition && product.nutrition.length > 0 ? (
                    product.nutrition.map((item, i) => (
                      <div
                        key={i}
                        className="p-3 flex items-center justify-between text-body-sm font-body-sm"
                      >
                        <span className="font-semibold text-primary">{item.nutrient}</span>
                        <div className="flex items-center gap-6">
                          <span className="text-on-surface-variant">{item.perServing}</span>
                          <span className="text-secondary font-semibold font-mono text-xs w-12 text-right">
                            {item.dailyValue}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-outline">Macro data available in batch sheet.</div>
                  )}
                </div>
              </div>

              <div className="bg-surface-container-low p-6 border border-outline-variant space-y-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block">
                  Ingredients
                </span>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                  {product.ingredients || "Cold-filtered Native Whey Protein Isolate (Milk), Natural Flavors, Sunflower Lecithin (<0.5% for instant mixability), Stevia Leaf Extract."}
                </p>
                <div className="pt-2 border-t border-outline-variant text-[11px] text-outline uppercase tracking-wider">
                  ALLERGEN WARNING: CONTAINS DAIRY (MILK). MANUFACTURED IN AN NSF-CERTIFIED CLEANROOM FACILITY.
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Amino Acid Profile */}
          {activeTab === "aminos" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mb-1">
                  Amino Acid Profile
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Naturally occurring amino acids per 100g protein.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.aminoAcids && product.aminoAcids.length > 0 ? (
                  product.aminoAcids.map((aa, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-surface-container-low border border-outline-variant/60 flex items-center justify-between"
                    >
                      <span className="font-body-sm text-body-sm font-semibold text-primary">
                        {aa.name}
                      </span>
                      <span className="font-mono text-secondary font-bold text-body-sm">
                        {aa.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-outline">Complete amino breakdown verified on batch certificate.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab Content: Usage */}
          {activeTab === "usage" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-surface-container-low border border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold mb-4">
                  01
                </div>
                <h4 className="font-title-md text-title-md font-semibold text-primary uppercase mb-2">
                  After Training
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Mix 1 scoop (33g) with 250ml water or milk within 30–45 minutes after training.
                </p>
              </div>

              <div className="p-6 bg-surface-container-low border border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold mb-4">
                  02
                </div>
                <h4 className="font-title-md text-title-md font-semibold text-primary uppercase mb-2">
                  Morning Use
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Use in the morning for a quick protein boost. Easy to digest with no bloating.
                </p>
              </div>

              <div className="p-6 bg-surface-container-low border border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold mb-4">
                  03
                </div>
                <h4 className="font-title-md text-title-md font-semibold text-primary uppercase mb-2">
                  Mixing
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Dissolves in seconds with no clumps or residue.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content: Certificate of Analysis (COA) */}
          {activeTab === "coa" && (
            <div className="p-8 bg-surface-container-low border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-secondary" />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Third-Party Lab Tested
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-semibold uppercase text-primary">
                  Batch #{selectedVariant.batch} Certificate of Analysis
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Independently tested for protein purity and heavy metals.
                </p>
                <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-outline block">LEAD (Pb):</span>
                    <span className="text-secondary font-bold">&lt;0.005 ppm</span>
                  </div>
                  <div>
                    <span className="text-outline block">ARSENIC (As):</span>
                    <span className="text-secondary font-bold">&lt;0.005 ppm</span>
                  </div>
                  <div>
                    <span className="text-outline block">PROTEIN ASSAY:</span>
                    <span className="text-secondary font-bold">99.6% purity</span>
                  </div>
                </div>
              </div>

              <a
                href={product.coaUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center gap-2 shrink-0 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">
                  download
                </span>
                <span>Download Lab PDF</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
