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
  const { addItem } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"macros" | "usage">("macros");
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

  return (
    <div className="w-full flex flex-col">
      {/* ── Breadcrumbs ── */}
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
        </div>
      </section>

      {/* ── Main Showcase Grid (2 Columns) ── */}
      <section className="w-full bg-surface py-8 lg:py-14 border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* ── Left Column: Gallery ── */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* Primary Image Frame */}
              <div className="relative bg-surface-container-lowest border border-outline-variant overflow-hidden group">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest px-2.5 py-1 bg-secondary text-on-secondary font-semibold">
                    {product.suite || "YFZ STORE"}
                  </span>
                  {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
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
                  title="Wishlist product"
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
            </div>

            {/* ── Right Column: Info & Purchase Controls ── */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Titles */}
              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                  {product.category}
                </span>
                <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary font-semibold">
                  {product.name}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Reviews & Stock Ribbon — only show reviews if real reviews exist */}
              <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 border-y border-outline-variant/60">
                {product.reviewCount > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[#C59B27] font-semibold">
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-on-surface font-label-sm text-label-sm">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-outline-variant">|</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {product.reviewCount} customer reviews
                    </span>
                  </div>
                ) : (
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Sports Nutrition &amp; Accessories
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="font-label-sm text-label-sm text-secondary font-medium">
                    {selectedVariant.stock > 0 ? "In Stock" : "Stock details to be updated"}
                  </span>
                </div>
              </div>

              {/* Pricing Display */}
              <div className="flex flex-col gap-1 bg-surface-container-lowest p-5 border border-outline-variant">
                <div className="flex items-baseline gap-3">
                  <span className="font-metric-num text-[36px] leading-none text-primary font-bold">
                    {formatINR(selectedVariant.price)}
                  </span>
                  {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price ? (
                    <span className="font-title-md text-title-md line-through text-outline">
                      {formatINR(selectedVariant.compareAtPrice)}
                    </span>
                  ) : null}
                  {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price ? (
                    <span className="font-label-sm text-label-sm uppercase px-2 py-0.5 bg-secondary/15 text-secondary font-bold">
                      Save {formatINR(selectedVariant.compareAtPrice - selectedVariant.price)}
                    </span>
                  ) : null}
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  Inclusive of all taxes. Pan-India shipping available.
                </p>
              </div>

              {/* Package Size / Variant Selector */}
              {product.variants.length > 1 && (
                <div className="flex flex-col gap-2.5">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Options / Sizes
                  </label>
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
                          {formatINR(v.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

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

              {/* Dispatch notice */}
              <div className="p-3.5 bg-surface-container-high border border-outline-variant/60 flex items-center gap-3 text-body-sm font-body-sm text-on-surface">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  local_shipping
                </span>
                <div>
                  <span className="font-semibold text-primary">
                    Shipping:
                  </span>{" "}
                  Dispatched from Charilam, Tripura with tracking.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Information Tabs ── */}
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
              Product Details &amp; Ingredients
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
              Usage &amp; Storage
            </button>
          </div>

          {/* Tab Content: Details */}
          {activeTab === "macros" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mb-3">
                  Nutritional Composition
                </h3>
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
                    <div className="p-4 text-outline font-body-sm">
                      Nutritional details to be provided by the gym.
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-surface-container-low p-6 border border-outline-variant space-y-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block">
                  Ingredients
                </span>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                  {product.ingredients || "Ingredients to be provided by the gym."}
                </p>
              </div>
            </div>
          )}

          {/* Tab Content: Usage */}
          {activeTab === "usage" && (
            <div className="p-6 bg-surface-container-low border border-outline-variant">
              <h4 className="font-title-md text-title-md font-semibold text-primary uppercase mb-2">
                Directions for Use
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {product.usage || "Directions for use to be provided by the gym."}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
