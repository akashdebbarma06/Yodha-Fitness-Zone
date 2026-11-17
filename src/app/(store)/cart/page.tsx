"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { formatINR } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    detailedItems,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    amountToFreeShipping,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim());
    setCouponFeedback({
      success: res.success,
      message: res.message,
    });

    if (res.success) {
      setCouponInput("");
    }
  };

  const progressPercent =
    freeShippingThreshold > 0
      ? Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))
      : 0;

  return (
    <div className="w-full bg-surface py-10 px-gutter">
      <div className="max-w-[1360px] mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-semibold">Shopping Bag</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/60 pb-6">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.14em] text-secondary font-semibold">
              YOUR BAG
            </span>
            <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary font-semibold mt-1">
              Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              type="button"
              className="text-body-sm font-body-sm text-outline hover:text-error transition-colors uppercase tracking-wider font-semibold self-start sm:self-auto"
            >
              Empty Bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="py-24 text-center bg-surface-container-lowest border border-outline-variant p-8 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-[64px] text-outline mb-4">
              shopping_cart_checkout
            </span>
            <h2 className="font-headline-sm text-headline-sm font-semibold uppercase text-primary">
              Your bag is empty
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2 leading-relaxed">
              Browse our supplements and add items to your bag.
            </p>
            <Link
              href="/shop"
              className="mt-8 h-12 px-8 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center transition-colors shadow-sm"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          /* Two Column Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Items & Shipping Meter (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Indicator */}
              {freeShippingThreshold > 0 && (
                <div className="p-5 bg-surface-container-lowest border border-outline-variant">
                  <div className="flex items-center justify-between text-label-sm font-label-sm uppercase tracking-wider mb-2.5">
                    {amountToFreeShipping > 0 ? (
                      <span className="text-on-surface-variant">
                        Add{" "}
                        <strong className="text-primary font-bold">
                          {formatINR(amountToFreeShipping)}
                        </strong>{" "}
                        more for free shipping
                      </span>
                    ) : (
                      <span className="text-secondary font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">
                          check_circle
                        </span>
                        Free Shipping Unlocked
                      </span>
                    )}
                    <span className="font-semibold text-outline">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="bg-surface-container-lowest border border-outline-variant divide-y divide-outline-variant/60">
                {detailedItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variant.id}`}
                    className="p-6 flex flex-col sm:flex-row gap-6 items-start justify-between"
                  >
                    {/* Thumbnail & Product Info */}
                    <div className="flex gap-4 items-start flex-1">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="w-24 h-28 bg-surface-container-low shrink-0 p-2 flex items-center justify-center border border-outline-variant/40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>

                      <div className="flex flex-col gap-1">
                        <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider">
                          {item.product.category}
                        </span>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-title-md text-title-md font-semibold text-primary hover:text-secondary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {item.variant.size} • {item.variant.flavor}
                        </p>
                        <span className="font-mono text-xs text-outline">
                          SKU: {item.variant.sku}
                        </span>

                        <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-outline">
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.variant.id)
                            }
                            type="button"
                            className="hover:text-error transition-colors flex items-center gap-1 uppercase tracking-wider"
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              delete
                            </span>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                      <div className="flex items-center border border-outline-variant bg-surface">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant.id,
                              item.quantity - 1
                            )
                          }
                          type="button"
                          className="w-8 h-8 flex items-center justify-center hover:bg-surface-container text-on-surface font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-label-sm text-label-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant.id,
                              item.quantity + 1
                            )
                          }
                          type="button"
                          className="w-8 h-8 flex items-center justify-center hover:bg-surface-container text-on-surface font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-metric-num text-metric-num text-primary font-semibold block">
                          {formatINR(item.variant.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-outline block">
                            {formatINR(item.variant.price)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Notice */}
              <div className="p-4 bg-surface-container-low border border-outline-variant flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary">
                  local_shipping
                </span>
                <span className="text-xs text-on-surface-variant">
                  Dispatched from Charilam, Tripura with tracking.
                </span>
              </div>
            </div>

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 bg-surface-container-lowest p-6 border border-outline-variant space-y-6 sticky top-[140px]">
              <h2 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-3">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              {appliedCoupon ? (
                <div className="p-3 bg-secondary/10 border border-secondary/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      local_offer
                    </span>
                    <span className="font-label-sm text-label-sm font-mono font-bold text-secondary uppercase tracking-wider">
                      {appliedCoupon.code} (-{formatINR(discount)})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    type="button"
                    className="text-xs uppercase font-semibold text-outline hover:text-error transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code"
                      className="flex-1 h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm uppercase tracking-wider focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="h-11 px-5 bg-surface-container-high hover:bg-primary hover:text-on-primary font-label-sm text-label-sm uppercase font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponFeedback && (
                    <p
                      className={`text-xs ${
                        couponFeedback.success ? "text-secondary font-medium" : "text-error"
                      }`}
                    >
                      {couponFeedback.message}
                    </p>
                  )}
                </form>
              )}

              {/* Price Calculations */}
              <div className="space-y-3 border-t border-outline-variant/60 pt-4 text-body-sm font-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-on-surface font-semibold">
                    {formatINR(subtotal)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatINR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping</span>
                  <span className="text-on-surface font-semibold">
                    {shipping === 0 ? "FREE" : formatINR(shipping)}
                  </span>
                </div>

                <div className="flex justify-between text-on-surface-variant text-xs">
                  <span>GST (18%)</span>
                  <span className="text-outline">Included in Subtotal</span>
                </div>

                <div className="flex justify-between items-baseline text-primary font-title-md text-title-md font-bold pt-3 border-t border-outline-variant">
                  <span>Total</span>
                  <span className="font-metric-num text-[28px] text-primary">
                    {formatINR(total)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full h-12 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>

                <Link
                  href="/shop"
                  className="w-full h-10 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold flex items-center justify-center transition-colors border border-outline-variant"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Payment badges */}
              <div className="pt-3 border-t border-outline-variant text-center space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-outline font-semibold block">
                  Payment Methods
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {["UPI", "RAZORPAY", "RUPAY", "VISA", "MASTERCARD", "NETBANKING"].map(
                    (b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 bg-surface text-[10px] font-semibold border border-outline-variant text-on-surface-variant"
                      >
                        {b}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
