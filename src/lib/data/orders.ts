import type { Order } from "@/types";

// Demo data — replace with real records.
export const ORDERS: Order[] = [
  {
    id: "#YFZ-1001",
    customerId: "cust-001",
    customerName: "[PLACEHOLDER — ask the gym] Demo Customer",
    customerCity: "Charilam, TR",
    items: [
      {
        productId: "placeholder-1",
        variantId: "var-001",
        name: "[PLACEHOLDER — ask the gym] Sample Product 1",
        flavor: "Standard",
        size: "1 Pack",
        price: 0,
        quantity: 1,
        image: "/images/placeholder-gym.jpg",
      },
    ],
    subtotal: 0,
    discount: 0,
    shipping: 0,
    total: 0,
    paymentMethod: "upi",
    paymentStatus: "paid",
    orderStatus: "in_transit",
    shippingAddress: {
      id: "addr-001",
      fullName: "[PLACEHOLDER — ask the gym] Demo Customer",
      phone: "+91 87987 03787",
      email: "demo@example.com",
      addressLine1: "NH08 near Tripura Gramin Bank",
      city: "Charilam",
      state: "Tripura",
      pinCode: "799103",
      isDefault: true,
    },
    trackingId: "AWB123456789",
    courier: "Courier Partner",
    awb: "AWB123456789",
    estimatedDelivery: "Standard delivery",
    timeline: [
      { status: "confirmed", label: "Order Confirmed", description: "Order placed and payment verified.", timestamp: "14 Nov 2026, 10:00 AM", completed: true },
      { status: "packaged", label: "Packaged", description: "Items packed and ready for dispatch.", timestamp: "14 Nov 2026, 02:00 PM", completed: true },
      { status: "handed_to_courier", label: "Handed to Courier", description: "Shipment picked up by courier partner.", timestamp: "14 Nov 2026, 05:00 PM", completed: true },
      { status: "in_transit", label: "In Transit", description: "Package in transit to delivery station.", timestamp: "15 Nov 2026, 08:00 AM", completed: true },
      { status: "out_for_delivery", label: "Out for Delivery", description: "Package out for delivery.", timestamp: null, completed: false },
      { status: "delivered", label: "Delivered", description: "Delivered to recipient.", timestamp: null, completed: false },
    ],
    createdAt: "2026-11-14T10:00:00+05:30",
    updatedAt: "2026-11-15T08:00:00+05:30",
  },
];

export function getOrderById(id: string): Order | undefined {
  return ORDERS.find((o) => o.id === id);
}

export function getOrdersByCustomerId(customerId: string): Order[] {
  return ORDERS.filter((o) => o.customerId === customerId);
}
