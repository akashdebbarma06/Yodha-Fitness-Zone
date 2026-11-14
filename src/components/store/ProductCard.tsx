"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product, ProductVariant } from "@/types";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/components/providers/CartProvider";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const selectedVariant: ProductVariant =
    product.variants[selectedVariantIndex] || product.variants[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, selectedVariant.id, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group bg-surface-container-lowest flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-outline-variant/40 hover:border-outline-variant">
      <div>
        {/* Product Image Stage */}
        <Link
          href={`/product/${product.slug}`}
          className="relative block w-full aspect-[4/5] bg-surface-container-low p-6 overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Top Badge */}
          {product.tags && product.tags.length > 0 && (
            <span className="absolute top-3 left-3 bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-2.5 py-1 font-semibold tracking-wider">
              {product.tags[0]}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center transition-colors ${
              isWishlisted
                ? "text-error"
                : "text-on-surface hover:text-error"
            }`}
            title="Wishlist"
            type="button"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              favorite
            </span>
          </button>
        </Link>

        {/* Content Info */}
        <div className="p-5">
          {/* Star Rating — only show if real reviews exist */}
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-1.5 text-[#C59B27] mb-1.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                {product.rating}
              </span>
              <span className="font-label-sm text-label-sm text-outline">
                ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Title & Subtitle */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-title-md text-title-md font-semibold text-primary hover:text-secondary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>

          {/* Variant Selector Pills */}
          {product.variants.length > 1 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {product.variants.map((variant, idx) => (
                <button
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariantIndex(idx);
                  }}
                  type="button"
                  className={`px-2.5 py-0.5 font-label-sm text-label-sm font-semibold transition-colors ${
                    selectedVariantIndex === idx
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          )}

          {/* Pricing */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-metric-num text-metric-num text-primary font-semibold">
              {formatINR(selectedVariant.price)}
            </span>
            {selectedVariant.compareAtPrice && (
              <span className="font-body-sm text-body-sm text-outline line-through">
                {formatINR(selectedVariant.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Inventory Badge */}
          {selectedVariant.stock > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5 text-secondary font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>In Stock</span>
            </div>
          )}
        </div>
      </div>

      {/* Add To Cart Footer CTA */}
      <div className="p-5 pt-0">
        <button
          onClick={handleAddToCart}
          type="button"
          disabled={selectedVariant.stock <= 0}
          className={`w-full h-11 font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
            isAdded
              ? "bg-secondary text-on-secondary"
              : selectedVariant.stock <= 0
              ? "bg-surface-container-high text-outline cursor-not-allowed"
              : "bg-primary hover:bg-neutral-800 text-on-primary"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isAdded ? "check" : "shopping_bag"}
          </span>
          <span>{isAdded ? "Added to Bag" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
}
