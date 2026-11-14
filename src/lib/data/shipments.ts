import type { Shipment } from "@/types";

export const SHIPMENTS: Shipment[] = [
  {
    id: "ship-001",
    orderId: "#YFZ-98421",
    courier: "Blue Dart Apex",
    awb: "BDA2409876541",
    status: "in_transit",
    weight: "1.2 kg",
    dimensions: "30×22×15 cm",
    customerName: "Arjun Sharma",
    destination: "Bengaluru, KA",
    createdAt: "24 Oct 2024",
    estimatedDelivery: "26 Oct 2024",
  },
  {
    id: "ship-002",
    orderId: "#YFZ-98419",
    courier: "Delhivery",
    awb: "DEL2410543298",
    status: "picked_up",
    weight: "0.6 kg",
    dimensions: "20×15×10 cm",
    customerName: "Rohan Verma",
    destination: "Noida, UP",
    createdAt: "24 Oct 2024",
    estimatedDelivery: "27 Oct 2024",
  },
  {
    id: "ship-003",
    orderId: "#YFZ-98418",
    courier: "Shadowfax",
    awb: "SFX2410112233",
    status: "delivered",
    weight: "5.4 kg",
    dimensions: "35×25×20 cm",
    customerName: "Dr. Vikram Nair",
    destination: "Hyderabad, TS",
    createdAt: "24 Oct 2024",
    estimatedDelivery: "25 Oct 2024",
  },
  {
    id: "ship-004",
    orderId: "#YFZ-98415",
    courier: "Blue Dart Apex",
    awb: "BDA2409876538",
    status: "ndr",
    weight: "1.1 kg",
    dimensions: "30×22×15 cm",
    customerName: "Arun Krishnan",
    destination: "Kochi, KL",
    createdAt: "22 Oct 2024",
    estimatedDelivery: "24 Oct 2024",
    ndrReason: "Customer not available at address",
  },
  {
    id: "ship-005",
    orderId: "#YFZ-98410",
    courier: "Delhivery",
    awb: "DEL2410543290",
    status: "ready_to_ship",
    weight: "2.3 kg",
    dimensions: "32×24×18 cm",
    customerName: "Meera Joshi",
    destination: "Pune, MH",
    createdAt: "24 Oct 2024",
    estimatedDelivery: "28 Oct 2024",
  },
];

export function generateMockAWB(courier: string): string {
  const prefixes: Record<string, string> = {
    "Blue Dart Apex": "BDA",
    Delhivery: "DEL",
    Shadowfax: "SFX",
  };
  const prefix = prefixes[courier] || "AWB";
  const num = Math.floor(Math.random() * 9000000000) + 1000000000;
  return `${prefix}${num}`;
}
