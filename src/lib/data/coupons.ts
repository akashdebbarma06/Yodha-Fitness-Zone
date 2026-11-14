import type { Coupon } from "@/types";

export const COUPONS: Coupon[] = [
  {
    id: "cpn-001",
    code: "YODHA15",
    type: "percentage",
    value: 15,
    minOrder: 1499,
    maxDiscount: 2000,
    usageLimit: 500,
    usedCount: 187,
    active: true,
    description: "15% off subscriptions + free steel shaker",
    validFrom: "2024-10-01",
    validTo: "2025-01-31",
  },
  {
    id: "cpn-002",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrder: 999,
    maxDiscount: 1000,
    usageLimit: 1000,
    usedCount: 342,
    active: true,
    description: "10% off first order — new athletes only",
    validFrom: "2024-01-01",
    validTo: "2025-12-31",
  },
  {
    id: "cpn-003",
    code: "FLAT500",
    type: "flat",
    value: 500,
    minOrder: 3000,
    usageLimit: 200,
    usedCount: 88,
    active: true,
    description: "₹500 off on orders above ₹3,000",
    validFrom: "2024-09-15",
    validTo: "2024-12-31",
  },
  {
    id: "cpn-004",
    code: "PURITY20",
    type: "percentage",
    value: 20,
    minOrder: 5000,
    maxDiscount: 3000,
    usageLimit: 100,
    usedCount: 100,
    active: false,
    description: "20% off premium formulations — expired campaign",
    validFrom: "2024-06-01",
    validTo: "2024-08-31",
  },
  {
    id: "cpn-005",
    code: "BULK1000",
    type: "flat",
    value: 1000,
    minOrder: 8000,
    usageLimit: 50,
    usedCount: 12,
    active: true,
    description: "₹1,000 off bulk orders above ₹8,000",
    validFrom: "2024-10-15",
    validTo: "2025-03-31",
  },
];

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
