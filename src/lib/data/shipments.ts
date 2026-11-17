import type { Shipment } from "@/types";

// Demo data — replace with real records.
export const SHIPMENTS: Shipment[] = [
  {
    id: "ship-001",
    orderId: "#YFZ-1001",
    courier: "Delhivery",
    awb: "AWB123456789",
    status: "in_transit",
    weight: "1.0 kg",
    dimensions: "25×20×15 cm",
    customerName: "[PLACEHOLDER — ask the gym] Demo Customer",
    destination: "Charilam, TR",
    createdAt: "14 Nov 2026",
    estimatedDelivery: "Standard delivery",
  },
];

export function generateMockAWB(courier: string): string {
  const prefixes: Record<string, string> = {
    Delhivery: "DEL",
    Shadowfax: "SFX",
  };
  const prefix = prefixes[courier] || "AWB";
  const num = Math.floor(Math.random() * 9000000000) + 1000000000;
  return `${prefix}${num}`;
}
