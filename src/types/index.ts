/* ──────────────────────────────────────────────
   Yodha — Core Type Definitions
   ────────────────────────────────────────────── */

export type ProductCategory =
  | "Sports Nutrition"
  | "Fitness Essentials"
  | "Native Whey Isolates"
  | "Cellular ATP & Creatine"
  | "Mineral Hydration & Electrolytes"
  | "Recovery & Adaptogens"
  | "Performance Hardware";

export type ProductStatus = "active" | "draft" | "archived";

export interface ProductVariant {
  id: string;
  flavor: string;
  size: string;
  servings: number;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  batch: string;
  expiryDate: string;
  reorderPoint: number;
}

export interface NutritionFact {
  nutrient: string;
  perServing: string;
  per100g: string;
  dailyValue: string;
}

export interface AminoAcid {
  name: string;
  amount: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  suite: string;
  description: string;
  shortDescription: string;
  images: string[];
  variants: ProductVariant[];
  nutrition: NutritionFact[];
  aminoAcids: AminoAcid[];
  ingredients: string;
  usage: string;
  coaUrl: string;
  coaVerified: boolean;
  tags: string[];
  dietary: string[];
  hsn: string;
  fssaiLic: string;
  rating: number;
  reviewCount: number;
  status: ProductStatus;
  createdAt: string;
}

export type OrderStatus =
  | "confirmed"
  | "processing"
  | "packaged"
  | "handed_to_courier"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";
export type PaymentMethod = "upi" | "cards" | "netbanking" | "emi" | "cod";

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  flavor: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  gstin?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerCity: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: ShippingAddress;
  trackingId?: string;
  courier?: string;
  awb?: string;
  estimatedDelivery?: string;
  timeline: OrderTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderTimelineEvent {
  status: string;
  label: string;
  description: string;
  timestamp: string | null;
  completed: boolean;
}

export type CohortTag = "VIP" | "Subscription" | "Dormant" | "New" | "Regular";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  maskedPhone: string;
  city: string;
  state: string;
  totalOrders: number;
  ltv: number;
  lastPurchase: string;
  cohortTags: CohortTag[];
  addresses: ShippingAddress[];
  createdAt: string;
}

export type CouponType = "percentage" | "flat";

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrder: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  active: boolean;
  description: string;
  validFrom: string;
  validTo: string;
}

export interface InventoryItem {
  productId: string;
  variantId: string;
  productName: string;
  sku: string;
  batch: string;
  stock: number;
  reorderPoint: number;
  expiryDate: string;
  lastRestocked: string;
  warehouseLocation: string;
}

export type CourierName = "Delhivery" | "Shadowfax" | "Standard Courier";

export type ShipmentStatus =
  | "ready_to_ship"
  | "manifested"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "ndr"
  | "rto";

export interface Shipment {
  id: string;
  orderId: string;
  courier: CourierName;
  awb: string;
  status: ShipmentStatus;
  weight: string;
  dimensions: string;
  customerName: string;
  destination: string;
  createdAt: string;
  estimatedDelivery: string;
  ndrReason?: string;
}

export interface ReportData {
  grossGmv: number;
  discounts: number;
  refunds: number;
  shippingRevenue: number;
  netRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  repeatPurchaseIndex: number;
  dailyVelocity: { date: string; revenue: number; orders: number }[];
  categoryBreakdown: { category: string; revenue: number; percentage: number }[];
  topProducts: { name: string; sold: number; revenue: number }[];
}

export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  gstin: string;
  fssaiLicense: string;
  originPin: string;
  originCity: string;
  originState: string;
  supportEmail: string;
  supportPhone: string;
  freeShippingThreshold: number;
  lowStockAlert: number;
  razorpayKeyId: string;
  razorpayWebhookSecret: string;
  shiprocketEmail: string;
  shiprocketToken: string;
  twoFactorEnabled: boolean;
  notifications: {
    orderConfirmation: boolean;
    shipmentUpdate: boolean;
    lowStock: boolean;
    dailyReport: boolean;
    whatsapp: boolean;
  };
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

/* ──────────────────────────────────────────────
   Memberships
   ────────────────────────────────────────────── */

export type MembershipPlanDuration = "1_month" | "3_months" | "6_months" | "12_months";
export type MembershipTier = "general" | "transformation" | "personal_training";
export type MembershipStatus = "active" | "expiring_soon" | "expired" | "frozen";

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  duration: MembershipPlanDuration;
  durationMonths: number;
  price: number;
  compareAtPrice?: number;
  tier: MembershipTier;
  features: string[];
  isPopular?: boolean;
  active: boolean;
}

export interface UserMembership {
  id: string;
  membershipNumber: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail?: string;
  planId: string;
  planName: string;
  startDate: string;
  expiryDate: string;
  status: MembershipStatus;
  amountPaid: number;
  paymentMethod: "online" | "cash" | "upi";
  paymentStatus: "paid" | "pending";
  source: "online" | "walk_in";
  notes?: string;
}

