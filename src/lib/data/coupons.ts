import type { Coupon } from "@/types";

// Coupons to be created by the gym in Admin.
export const COUPONS: Coupon[] = [];

export function validateCoupon(code: string, subtotal: number): { valid: boolean; coupon?: Coupon; error?: string } {
  const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase());
  if (!coupon) return { valid: false, error: "Invalid coupon code" };
  if (!coupon.active) return { valid: false, error: "This coupon has expired" };
  if (coupon.usedCount >= coupon.usageLimit) return { valid: false, error: "Coupon usage limit reached" };
  if (subtotal < coupon.minOrder) return { valid: false, error: `Minimum order ₹${coupon.minOrder.toLocaleString("en-IN")} required` };
  return { valid: true, coupon };
}

export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.type === "percentage") {
    const disc = Math.round(subtotal * (coupon.value / 100));
    return coupon.maxDiscount ? Math.min(disc, coupon.maxDiscount) : disc;
  }
  return coupon.value;
}
