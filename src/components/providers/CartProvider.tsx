"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { PRODUCTS } from "@/lib/data/products";
import { STORE_SETTINGS } from "@/lib/data/settings";
import { validateCoupon, calculateDiscount } from "@/lib/data/coupons";
import type { CartItem, Product, ProductVariant, Coupon } from "@/types";

/* ── Rich Cart Item with resolved Product and Variant ── */
export interface CartItemDetail {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

/* ── Types ── */
interface CartContextType {
  items: CartItem[];
  detailedItems: CartItemDetail[];
  addItem: (productId: string, variantId: string, qty?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, qty: number) => void;
  updateQty: (productId: string, variantId: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  applyCouponCode: (code: string, discountAmount: number) => void;
  removeCoupon: () => void;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  amountToFreeShipping: number;
  isOpen: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ── Provider ── */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    // Seed with 1 whey isolate and 1 creatine for immediate interactive delight
    {
      productId: "prod-whey-isolate",
      variantId: "var-whey-vanilla-1kg",
      quantity: 1,
    },
    {
      productId: "prod-creatine-pure",
      variantId: "var-creatine-500g",
      quantity: 1,
    },
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((productId: string, variantId: string, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId && i.variantId === variantId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { productId, variantId, quantity: qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variantId: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }, []);

  const updateQuantity = useCallback((productId: string, variantId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity: qty } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  /* ── Resolved items ── */
  const detailedItems: CartItemDetail[] = useMemo(() => {
    const list: CartItemDetail[] = [];
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) continue;
      const variant = product.variants.find((v) => v.id === item.variantId) || product.variants[0];
      if (!variant) continue;
      list.push({ product, variant, quantity: item.quantity });
    }
    return list;
  }, [items]);

  /* ── Computed totals ── */
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = detailedItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return calculateDiscount(appliedCoupon, subtotal);
  }, [appliedCoupon, subtotal]);

  const freeShippingThreshold = STORE_SETTINGS.freeShippingThreshold || 1499;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const total = Math.max(0, subtotal - discount + shipping);

  const applyCoupon = useCallback(
    (code: string) => {
      const result = validateCoupon(code, subtotal);
      if (!result.valid || !result.coupon) {
        return { success: false, message: result.error || "Invalid coupon code." };
      }
      setAppliedCoupon(result.coupon);
      return { success: true, message: `Promo code ${result.coupon.code} applied successfully!` };
    },
    [subtotal]
  );

  const applyCouponCode = useCallback((code: string, _discountAmount: number) => {
    applyCoupon(code);
  }, [applyCoupon]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        detailedItems,
        addItem,
        removeItem,
        updateQuantity,
        updateQty: updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        discount,
        shipping,
        total,
        appliedCoupon,
        applyCoupon,
        applyCouponCode,
        removeCoupon,
        freeShippingThreshold,
        freeShippingProgress,
        amountToFreeShipping,
        isOpen,
        isCartOpen: isOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
