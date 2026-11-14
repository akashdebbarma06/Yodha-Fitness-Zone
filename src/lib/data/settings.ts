import type { StoreSettings } from "@/types";

export const STORE_SETTINGS: StoreSettings = {
  storeName: "Yodha Fitness Zone",
  storeTagline: "Gym, training & sports nutrition — Charilam, Tripura",
  gstin: "", // Gym to provide
  fssaiLicense: "", // Gym to provide if selling food supplements
  originPin: "799103",
  originCity: "Charilam",
  originState: "Tripura",
  supportEmail: "contact@yodhafitnesszone.in", // Confirm the gym owns this domain before launch.
  supportPhone: "+91 87987 03787",
  freeShippingThreshold: 1499,
  lowStockAlert: 25,
  razorpayKeyId: "rzp_live_XXXXXXXXXXXXXXX",
  razorpayWebhookSecret: "whsec_XXXXXXXXXXXXXXX",
  shiprocketEmail: "ops@yodhafitnesszone.in", // Confirm the gym owns this domain before launch.
  shiprocketToken: "sr_token_XXXXXXXXXXXXXXX",
  twoFactorEnabled: false,
  notifications: {
    orderConfirmation: true,
    shipmentUpdate: true,
    lowStock: true,
    dailyReport: true,
    whatsapp: false,
  },
};

/* PIN code → city/state auto-fill (mock subset for Indian PINs) */
export const PIN_CODE_MAP: Record<string, { city: string; state: string }> = {
  "560034": { city: "Bengaluru", state: "Karnataka" },
  "560001": { city: "Bengaluru", state: "Karnataka" },
  "400050": { city: "Mumbai", state: "Maharashtra" },
  "400001": { city: "Mumbai", state: "Maharashtra" },
  "110001": { city: "New Delhi", state: "Delhi" },
  "201301": { city: "Noida", state: "Uttar Pradesh" },
  "500034": { city: "Hyderabad", state: "Telangana" },
  "700019": { city: "Kolkata", state: "West Bengal" },
  "600040": { city: "Chennai", state: "Tamil Nadu" },
  "411001": { city: "Pune", state: "Maharashtra" },
  "380001": { city: "Ahmedabad", state: "Gujarat" },
  "302001": { city: "Jaipur", state: "Rajasthan" },
  "682001": { city: "Kochi", state: "Kerala" },
  "226001": { city: "Lucknow", state: "Uttar Pradesh" },
  "440001": { city: "Nagpur", state: "Maharashtra" },
  "799103": { city: "Charilam", state: "Tripura" },
  "799001": { city: "Agartala", state: "Tripura" },
  "799004": { city: "Agartala", state: "Tripura" },
};
