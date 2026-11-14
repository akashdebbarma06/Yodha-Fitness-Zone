"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    detailedItems,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
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

  const [couponCode, setCouponCode] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode.trim());
    setCouponFeedback({
      success: res.success,
      message: res.message,
    });

    if (res.success) {
      setCouponCode("");
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <aside className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface flex flex-col shadow-2xl border-l border-outline-variant">
          {/* Header */}
          <div className="p-6 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-primary">
                shopping_bag
              </span>
              <h2 className="font-headline-sm text-headline-sm font-semibold uppercase tracking-tight text-primary">
                Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors"
              title="Close Bag"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-surface-container-lowest border-b border-outline-variant">
            <div className="flex items-center justify-between text-label-sm font-label-sm uppercase tracking-wider mb-2">
              {amountToFreeShipping > 0 ? (
                <span className="text-on-surface-variant">
                  Add{" "}
                  <strong className="text-primary font-bold">
                    {formatINR(amountToFreeShipping)}
                  </strong>{" "}
                  more for Free Shipping
                </span>
              ) : (
                <span className="text-secondary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  Free Shipping Unlocked
                </span>
              )}
              <span className="font-semibold text-outline">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-[56px] text-outline mb-3">
                  shopping_cart_checkout
                </span>
                <p className="font-title-md text-title-md font-semibold text-primary">
                  Your bag is empty
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mt-1">
                  Browse our supplements and add items to your bag.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 h-11 px-6 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center transition-colors"
                >
                  Explore Supplements
                </Link>
              </div>
            ) : (
              detailedItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="p-4 bg-surface-container-lowest border border-outline-variant flex gap-4 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-surface-container-low shrink-0 p-2 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-title-md text-title-md font-semibold text-primary hover:text-secondary transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.variant.id)
                          }
                          className="text-outline hover:text-error transition-colors p-0.5"
                          title="Remove item"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>

                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {item.variant.size} • {item.variant.flavor}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-outline-variant bg-surface">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant.id,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors"
                          type="button"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-label-sm text-label-sm font-semibold">
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
                          className="w-7 h-7 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors"
                          type="button"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-title-md text-title-md font-semibold text-primary">
                        {formatINR(item.variant.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations (Only when cart has items) */}
          {items.length > 0 && (
            <div className="p-6 bg-surface-container-lowest border-t border-outline-variant space-y-4">
              {/* Promo Code Input */}
              {appliedCoupon ? (
                <div className="p-3 bg-secondary/10 border border-secondary/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      local_offer
                    </span>
                    <span className="font-label-sm text-label-sm font-mono font-bold text-secondary uppercase tracking-wider">
                      {appliedCoupon.code} applied (-{formatINR(discount)})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs uppercase font-semibold text-outline hover:text-error transition-colors"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleApplyCoupon}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 h-10 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm uppercase tracking-wider focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 bg-surface-container-high hover:bg-primary hover:text-on-primary font-label-sm text-label-sm uppercase font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p
                  className={`text-xs ${
                    couponFeedback.success ? "text-secondary" : "text-error"
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}

              {/* Subtotal & Math Breakdown */}
              <div className="space-y-2 border-t border-outline-variant/60 pt-3 text-body-sm font-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-on-surface font-semibold">
                    {formatINR(subtotal)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Promotional Discount</span>
                    <span className="font-semibold">-{formatINR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping</span>
                  <span className="text-on-surface font-semibold">
                    {shipping === 0 ? "FREE" : formatINR(shipping)}
                  </span>
                </div>

                <div className="flex justify-between text-primary font-title-md text-title-md font-bold pt-2 border-t border-outline-variant">
                  <span>Estimated Total</span>
                  <span className="text-metric-num text-[20px]">
                    {formatINR(total)}
                  </span>
                </div>
                <p className="text-[11px] text-outline text-right">
                  Includes applicable GST (18%)
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full h-12 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full h-10 bg-surface hover:bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold flex items-center justify-center transition-colors border border-outline-variant"
                >
                  View Full Cart Details
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[10px] text-outline uppercase tracking-wider font-semibold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    lock
                  </span>
                  256-Bit SSL
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    verified
                  </span>
                  Secure Checkout
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
