# Yodha Fitness Zone — E-Commerce & Gym Management Platform

> A modern e-commerce storefront, gym membership management system, and operations console built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 📍 About the Business
- **Business:** Yodha Fitness Zone (Unisex Gym)
- **Location:** NH08 near Tripura Gramin Bank, Charilam, Tripura 799103
- **Phone:** +91 87987 03787
- **Google Rating:** 5.0★ (12 reviews)
- **Operating Hours:** 5:30 AM – 10:30 PM (Thursday closed)
- **Instagram:** [@yodhafitnesszone_yfz](https://instagram.com/yodhafitnesszone_yfz)

---

## 🚀 Key Features

### 1. Customer Storefront
- **Home & Hero:** Dynamic hero section, category showcases, bestsellers, trust badges, and gym facilities tour.
- **Product Catalog:** Categories (Native Whey, Creatine, Mass Gainers, Electrolytes, Recovery), faceted filters, and sorting.
- **Product Details:** High-resolution product images, variant selectors (size/weight/flavour), nutritional composition, amino acid tables, usage guides, and third-party Certificate of Analysis (COA).
- **Cart & Checkout:** Real-time subtotal calculations, pin-code delivery validation, coupon engine (`YODHA15`), and Razorpay checkout flow with COD toggles.
- **Order Tracking:** Real-time consignment timeline synced with Shiprocket AWB statuses (Order placed → Packaged → Picked up → In Transit → Delivered).
- **Gym Memberships:** Dedicated membership plans (Monthly, Quarterly, Half-Yearly, Annual, and 1-on-1 Personal Training) with instant digital pass issuance.
- **Customer Account:** View profile, saved addresses, complete order history, and active **Digital Gym Membership Pass** with validity periods.

### 2. Operations & Admin Console (`/admin`)
- **Dashboard:** GMV velocity, order intake, repeat purchase index, and low-stock alerts.
- **Product Management:** Catalog inventory with variant management, batch codes, expiry dates, and pricing.
- **Inventory Tracking:** Real-time stock counts, reorder thresholds, and warehouse dispatch logging.
- **Order Fulfillment:** Filter by status, generate shipping labels, track courier pickups, and verify COD collection.
- **Memberships Hub:** Full active member list, upcoming expiry alerts, revenue ledger, and front-desk walk-in registration modal.
- **Coupons & Promotions:** Create percentage, fixed, or free-shipping discount codes.
- **Reports & Analytics:** Daily revenue velocity, category share, and product rankings.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Kinetic Editorial Minimalism design system)
- **Database & Auth:** Supabase (PostgreSQL with Row Level Security)
- **Payments:** Razorpay (UPI, Credit/Debit Cards, Netbanking, COD)
- **Logistics:** Shiprocket (Delhivery, Blue Dart, express courier tracking)
- **Deployment:** Vercel

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── (auth)/             # Login, Register, Sign In, Password Reset
│   │   ├── (store)/            # Storefront routes (Shop, Product, Cart, Checkout, Memberships, Account)
│   │   ├── admin/              # Protected admin operations console
│   │   └── api/                # Razorpay & Shiprocket webhooks and endpoints
│   ├── components/
│   │   ├── admin/              # Sidebar, Header, Admin Shell
│   │   ├── auth/               # Customer & Admin Route Guards
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── providers/          # CartProvider & React contexts
│   │   └── store/              # ProductCard, CartDrawer
│   ├── config/                 # Navigation and site constants
│   ├── hooks/                  # useAuth and custom React hooks
│   ├── lib/
│   │   ├── auth/               # Session management & permissions
│   │   ├── data/               # Typed mock data (Products, Orders, Memberships, Settings)
│   │   ├── payments/           # Razorpay integration
│   │   ├── shipping/           # Shiprocket integration
│   │   └── supabase/           # Supabase client, server, and admin SDKs
│   └── types/                  # Global TypeScript interfaces
└── supabase/
    └── schema.sql              # Production PostgreSQL schema with RLS policies
```

---

## 🏁 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env.local` and configure your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

SHIPROCKET_EMAIL=ops@yodhafitnesszone.in
SHIPROCKET_PASSWORD=your_shiprocket_password
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 📄 License
© 2026 Yodha Fitness Zone. All rights reserved.
