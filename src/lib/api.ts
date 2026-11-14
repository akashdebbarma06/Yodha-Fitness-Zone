/* ──────────────────────────────────────────────
   Yodha — Stub API Layer
   All functions return Promises wrapping mock data.
   TODO: Replace with real API calls in Phase 3.
   ────────────────────────────────────────────── */

import { delay } from "@/lib/utils";
import { PRODUCTS, getProductBySlug, getActiveProducts, getProductsByCategory } from "@/lib/data/products";
import { ORDERS, getOrderById } from "@/lib/data/orders";
import { CUSTOMERS } from "@/lib/data/customers";
import { COUPONS, validateCoupon, calculateDiscount } from "@/lib/data/coupons";
import { SHIPMENTS, generateMockAWB } from "@/lib/data/shipments";
import { REPORT_DATA } from "@/lib/data/reports";
import { STORE_SETTINGS, PIN_CODE_MAP } from "@/lib/data/settings";
import type { Product, Order, Customer, Coupon, Shipment, ReportData, StoreSettings, ProductCategory } from "@/types";

/* ── Products ── */

export async function fetchProducts(): Promise<Product[]> {
  await delay(100);
  return getActiveProducts();
}

export async function fetchAllProducts(): Promise<Product[]> {
  await delay(100);
  return [...PRODUCTS];
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  await delay(80);
  return getProductBySlug(slug) ?? null;
}

export async function fetchProductsByCategory(category: ProductCategory): Promise<Product[]> {
  await delay(80);
  return getProductsByCategory(category);
}

/* ── Orders ── */

export async function fetchOrders(): Promise<Order[]> {
  await delay(120);
  return [...ORDERS];
}

export async function fetchOrderById(id: string): Promise<Order | null> {
  await delay(80);
  return getOrderById(id) ?? null;
}

export async function lookupOrder(orderId: string, phone: string): Promise<Order | null> {
  await delay(150);
  // TODO: Replace with real API call in Phase 3
  const order = ORDERS.find(
    (o) => o.id.toLowerCase() === orderId.toLowerCase() &&
    o.shippingAddress.phone.replace(/\s/g, "").includes(phone.replace(/\s/g, "").slice(-5))
  );
  return order ?? null;
}

export async function createOrder(orderData: Omit<Order, "id">): Promise<Order> {
  await delay(200);
  // TODO: Replace with real API call + Razorpay in Phase 3
  const newOrder: Order = {
    ...orderData,
    id: `#YFZ-${Math.floor(Math.random() * 90000) + 10000}`,
  };
  return newOrder;
}

/* ── Customers ── */

export async function fetchCustomers(): Promise<Customer[]> {
  await delay(100);
  return [...CUSTOMERS];
}

/* ── Coupons ── */

export async function fetchCoupons(): Promise<Coupon[]> {
  await delay(80);
  return [...COUPONS];
}

export async function applyCoupon(code: string, subtotal: number) {
  await delay(100);
  const result = validateCoupon(code, subtotal);
  if (result.valid && result.coupon) {
    const discount = calculateDiscount(result.coupon, subtotal);
    return { valid: true, discount, coupon: result.coupon };
  }
  return { valid: false, discount: 0, error: result.error };
}

/* ── Shipments ── */

export async function fetchShipments(): Promise<Shipment[]> {
  await delay(100);
  return [...SHIPMENTS];
}

export async function generateAWB(courier: string): Promise<string> {
  await delay(300);
  // TODO: Replace with real Shiprocket API in Phase 3
  return generateMockAWB(courier);
}

/* ── Reports ── */

export async function fetchReports(): Promise<ReportData> {
  await delay(150);
  return { ...REPORT_DATA };
}

/* ── Settings ── */

export async function fetchSettings(): Promise<StoreSettings> {
  await delay(80);
  return { ...STORE_SETTINGS };
}

export async function updateSettings(updates: Partial<StoreSettings>): Promise<StoreSettings> {
  await delay(200);
  // TODO: Replace with real API call in Phase 3
  Object.assign(STORE_SETTINGS, updates);
  return { ...STORE_SETTINGS };
}

/* ── PIN Code Lookup ── */

export async function lookupPinCode(pin: string): Promise<{ city: string; state: string } | null> {
  await delay(100);
  return PIN_CODE_MAP[pin] ?? null;
}

/* ── Auth Stubs ── */

export async function signIn(_email: string, _password: string): Promise<{ success: boolean; user?: { name: string; email: string } }> {
  await delay(300);
  // TODO: Replace with real Firebase/Supabase auth in Phase 3
  return { success: true, user: { name: "Arjun Sharma", email: _email } };
}

export async function signUp(_name: string, _email: string, _password: string): Promise<{ success: boolean }> {
  await delay(300);
  // TODO: Replace with real auth in Phase 3
  return { success: true };
}

export async function adminLogin(_email: string, _password: string): Promise<{ success: boolean }> {
  await delay(300);
  // TODO: Replace with real admin auth in Phase 3
  return { success: true };
}
