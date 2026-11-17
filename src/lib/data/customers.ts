import type { Customer } from "@/types";

// Demo data — replace with real records.
export const CUSTOMERS: Customer[] = [
  {
    id: "cust-001",
    name: "[PLACEHOLDER — ask the gym] Demo",
    email: "demo@example.com",
    phone: "",
    maskedPhone: "",
    city: "Charilam",
    state: "Tripura",
    totalOrders: 0,
    ltv: 0,
    lastPurchase: "—",
    cohortTags: ["New"],
    addresses: [
      {
        id: "addr-001",
        fullName: "[PLACEHOLDER — ask the gym] Demo",
        phone: "",
        email: "demo@example.com",
        addressLine1: "NH08 near Tripura Gramin Bank",
        city: "Charilam",
        state: "Tripura",
        pinCode: "799103",
        isDefault: true,
      },
    ],
    createdAt: "2026-11-14",
  },
];
