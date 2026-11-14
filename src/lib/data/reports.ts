import type { ReportData } from "@/types";

// Sample structure only — no real sales data yet.
export const REPORT_DATA: ReportData = {
  grossGmv: 0,
  discounts: 0,
  refunds: 0,
  shippingRevenue: 0,
  netRevenue: 0,
  totalOrders: 0,
  avgOrderValue: 0,
  repeatPurchaseIndex: 0,
  dailyVelocity: [],
  categoryBreakdown: [
    { category: "Sports Nutrition", revenue: 0, percentage: 60 },
    { category: "Fitness Essentials", revenue: 0, percentage: 40 },
  ],
  topProducts: [],
};
