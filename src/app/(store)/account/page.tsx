"use client";

import Link from "next/link";
import { useState } from "react";
import { ORDERS } from "@/lib/data/orders";
import { formatINR } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/components/providers/CartProvider";
import { INITIAL_MEMBERSHIPS } from "@/lib/data/memberships";

type AccountTab = "dashboard" | "membership" | "orders" | "wishlist" | "addresses" | "profile";

/* ──────────────────────────────────────────────
   Sample Wishlist Formulations
   ────────────────────────────────────────────── */
const INITIAL_WISHLIST = [
  {
    id: "prod-001",
    variantId: "var-001a",
    name: "Cold-Filtered Native Whey Isolate",
    subtitle: "Madagascar Vanilla Bean • 1 KG",
    category: "Native Whey",
    price: 3499,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 248,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMrVEnASILElR4hZ9mcGWtZG6Ey8DlnSQPxu8p_EqfDfwamv-CDnwt3Wb3bNwVL8mNNmHavFDlfMNksqtzWywExUaHeZGT8oH027GfQIi76-7peuhFQgmg4gGmykxNleEKn8k0hHPhmmKpk5C2KkWi01OFsbwG0aA5wqdjfTErIlHTip2gO6oggQgW95_zE04B66kWqzI_6jljXgLYJPLdumburO8xptfZXyVWLq-S",
    inStock: true,
  },
  {
    id: "prod-003",
    variantId: "var-003a",
    name: "Ultra-Pure Micronized Creatine",
    subtitle: "Pure Raw Unflavored • 500g (200 Mesh Creapure®)",
    category: "Cellular ATP",
    price: 1299,
    originalPrice: 1499,
    rating: 5.0,
    reviews: 412,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJd1ts64Gg57cxposALffxqiPfpKFiRdwHktNe_IGdKBmOQm101wdspdatsCAjENeobvD0kkixVqvXxSc-PZVCk-ixjQTImpPTtXgbW1HSpZ9Kg1VlI-Hit_SMkF1SItME_Tk3xG5rFJwDY4FiAzWuaau1NOF-NOn3js2Fynhfvt9n5j_B3aAvL56LTfsEw3aLCzf1xfXqZJGDM71c96HGEal67Ff3W3HaQfREn-rr",
    inStock: true,
  },
  {
    id: "prod-004",
    variantId: "var-004a",
    name: "Bio-Chelated Marine Collagen Peptides",
    subtitle: "Type I & III Wild-Caught • Unflavored 300g",
    category: "Joint & Connective",
    price: 2799,
    originalPrice: 3199,
    rating: 4.8,
    reviews: 134,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMrVEnASILElR4hZ9mcGWtZG6Ey8DlnSQPxu8p_EqfDfwamv-CDnwt3Wb3bNwVL8mNNmHavFDlfMNksqtzWywExUaHeZGT8oH027GfQIi76-7peuhFQgmg4gGmykxNleEKn8k0hHPhmmKpk5C2KkWi01OFsbwG0aA5wqdjfTErIlHTip2gO6oggQgW95_zE04B66kWqzI_6jljXgLYJPLdumburO8xptfZXyVWLq-S",
    inStock: true,
  },
  {
    id: "prod-005",
    variantId: "var-005a",
    name: "Double-Wall Insulated Steel Shaker",
    subtitle: "Matte Charcoal • 750ml Surgical 316 Stainless",
    category: "Hardware",
    price: 1499,
    originalPrice: 1799,
    rating: 4.9,
    reviews: 89,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJd1ts64Gg57cxposALffxqiPfpKFiRdwHktNe_IGdKBmOQm101wdspdatsCAjENeobvD0kkixVqvXxSc-PZVCk-ixjQTImpPTtXgbW1HSpZ9Kg1VlI-Hit_SMkF1SItME_Tk3xG5rFJwDY4FiAzWuaau1NOF-NOn3js2Fynhfvt9n5j_B3aAvL56LTfsEw3aLCzf1xfXqZJGDM71c96HGEal67Ff3W3HaQfREn-rr",
    inStock: true,
  },
  {
    id: "prod-006",
    variantId: "var-006a",
    name: "Pure Himalayan Shilajit Gold Resin",
    subtitle: "84+ Ionic Minerals • 20g 75% Fulvic Acid",
    category: "Vitality Matrix",
    price: 2199,
    originalPrice: 2499,
    rating: 5.0,
    reviews: 176,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMrVEnASILElR4hZ9mcGWtZG6Ey8DlnSQPxu8p_EqfDfwamv-CDnwt3Wb3bNwVL8mNNmHavFDlfMNksqtzWywExUaHeZGT8oH027GfQIi76-7peuhFQgmg4gGmykxNleEKn8k0hHPhmmKpk5C2KkWi01OFsbwG0aA5wqdjfTErIlHTip2gO6oggQgW95_zE04B66kWqzI_6jljXgLYJPLdumburO8xptfZXyVWLq-S",
    inStock: true,
  },
];

/* ──────────────────────────────────────────────
   Sample Addresses
   ────────────────────────────────────────────── */
const INITIAL_ADDRESSES = [
  {
    id: "addr-01",
    tag: "Home Coordinates",
    fullName: "Vikram Malhotra",
    phone: "+91 98765 43210",
    street: "Flat 402, Oakwood Sanctuary, 12th Main Road, HAL 2nd Stage",
    city: "Indiranagar, Bengaluru",
    state: "Karnataka",
    pinCode: "560038",
    isDefault: true,
  },
  {
    id: "addr-02",
    tag: "Training Sanctuary",
    fullName: "Vikram Malhotra",
    phone: "+91 98765 43210",
    street: "Yodha Fitness Zone, NH08 near Tripura Gramin Bank, Charilam",
    city: "Charilam",
    state: "Tripura",
    pinCode: "799103",
    isDefault: false,
  },
];

export default function AccountPage() {
  const { user, signOut, isLoading } = useAuth();
  const { addItem, openCart } = useCart();

  const [activeTab, setActiveTab] = useState<AccountTab>("dashboard");
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [orderFilter, setOrderFilter] = useState<"all" | "in_transit" | "delivered">("all");

  // Profile Form State
  const [profileName, setProfileName] = useState(user?.fullName || "Vikram Malhotra");
  const [profileEmail, setProfileEmail] = useState(user?.email || "user@yodhafitnesszone.in");
  const [discipline, setDiscipline] = useState("Hypertrophy & Strength");
  const [profileSaved, setProfileSaved] = useState(false);

  // Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    tag: "Alternative Node",
    fullName: user?.fullName || "Vikram Malhotra",
    phone: user?.phone || "+91 98765 43210",
    street: "",
    city: "Bengaluru",
    state: "Karnataka",
    pinCode: "",
  });

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Fallback customer greeting
  const displayName = user?.fullName || "Vikram";
  const firstName = displayName.split(" ")[0] || "Sarah";
  const displayPhone = user?.phone || "+91 98765 43210";

  // Filtered orders
  const filteredOrders = ORDERS.filter((order) => {
    if (orderFilter === "all") return true;
    if (orderFilter === "in_transit") return order.orderStatus === "in_transit";
    if (orderFilter === "delivered") return order.orderStatus === "delivered";
    return true;
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.pinCode) return;
    const added = {
      id: `addr-${Date.now()}`,
      ...newAddress,
      isDefault: false,
    };
    setAddresses([...addresses, added]);
    setShowAddressModal(false);
    setNewAddress({
      tag: "Alternative Node",
      fullName: displayName,
      phone: displayPhone,
      street: "",
      city: "Bengaluru",
      state: "Karnataka",
      pinCode: "",
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleRemoveWishlist = (id: string) => {
    setWishlist(wishlist.filter((w) => w.id !== id));
  };

  const handleAddToCartFromWishlist = (item: (typeof INITIAL_WISHLIST)[0]) => {
    addItem(item.id, item.variantId, 1);
    openCart();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterSuccess(false);
    }, 4000);
  };

  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen text-[#1F1E1C]">
      {/* ──────────────────────────────────────────────
          Top Title Area — Exactly matching reference
          ────────────────────────────────────────────── */}
      <section className="pt-10 pb-8 text-center px-4">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#1F1E1C]">
          My Account
        </h1>
        <p className="text-neutral-500 font-light text-sm sm:text-base mt-2">
          Welcome back, {firstName}
        </p>
      </section>

      {/* ──────────────────────────────────────────────
          Main Account Section: Sidebar + Content
          ────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
          {/* ── Left Sidebar Navigation (Matching Attachment) ── */}
          <aside className="w-full md:w-60 lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl p-3 border border-[#EBE7DF] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1">
              {/* Dashboard */}
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-[#262422] text-white shadow-sm"
                    : "text-[#5C5852] hover:text-[#1F1E1C] hover:bg-[#F5F3ED]"
                }`}
              >
                {/* 4-squares grid icon */}
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                <span>Dashboard</span>
              </button>

              {/* Gym Membership */}
              <button
                type="button"
                onClick={() => setActiveTab("membership")}
                className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "membership"
                    ? "bg-[#262422] text-white shadow-sm"
                    : "text-[#5C5852] hover:text-[#1F1E1C] hover:bg-[#F5F3ED]"
                }`}
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <span>Gym Membership</span>
              </button>

              {/* Orders */}
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-[#262422] text-white shadow-sm"
                    : "text-[#5C5852] hover:text-[#1F1E1C] hover:bg-[#F5F3ED]"
                }`}
              >
                {/* 3D Box / Package icon */}
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m7.5 4.27 9 5.15" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
                <span>Orders</span>
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => setActiveTab("wishlist")}
                className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "wishlist"
                    ? "bg-[#262422] text-white shadow-sm"
                    : "text-[#5C5852] hover:text-[#1F1E1C] hover:bg-[#F5F3ED]"
                }`}
              >
                {/* Heart icon */}
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>Wishlist</span>
              </button>

              {/* Addresses */}
              <button
                type="button"
                onClick={() => setActiveTab("addresses")}
                className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "addresses"
                    ? "bg-[#262422] text-white shadow-sm"
                    : "text-[#5C5852] hover:text-[#1F1E1C] hover:bg-[#F5F3ED]"
                }`}
              >
                {/* Location Pin icon */}
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Addresses</span>
              </button>

              {/* Profile */}
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-[#262422] text-white shadow-sm"
                    : "text-[#5C5852] hover:text-[#1F1E1C] hover:bg-[#F5F3ED]"
                }`}
              >
                {/* User avatar outline icon */}
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
                <span>Profile</span>
              </button>

              {/* Divider */}
              <div className="pt-2 border-t border-neutral-100" />

              {/* Logout (Red Text as in Reference) */}
              <button
                type="button"
                onClick={signOut}
                className="w-full py-3 px-4 rounded-xl flex items-center gap-3 text-sm font-medium text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer"
                title="Sign Out of Customer Account"
              >
                {/* Door Logout Arrow icon */}
                <svg
                  className="w-4 h-4 shrink-0 text-rose-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* ── Right Content Area ── */}
          <section className="flex-1 w-full min-w-0">
            {/* ── 4 Top Stat Cards (Matching Attachment) ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              {/* Stat 1: Total Orders */}
              <div
                onClick={() => setActiveTab("orders")}
                className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-700 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-neutral-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                </div>
                <span className="text-2xl sm:text-[28px] font-semibold text-[#1F1E1C] mt-2 mb-0.5 tracking-tight">
                  12
                </span>
                <span className="text-xs text-neutral-500 font-normal">
                  Total Orders
                </span>
              </div>

              {/* Stat 2: Wishlist Items */}
              <div
                onClick={() => setActiveTab("wishlist")}
                className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-700 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-neutral-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <span className="text-2xl sm:text-[28px] font-semibold text-[#1F1E1C] mt-2 mb-0.5 tracking-tight">
                  {wishlist.length}
                </span>
                <span className="text-xs text-neutral-500 font-normal">
                  Wishlist Items
                </span>
              </div>

              {/* Stat 3: Reviews */}
              <div
                onClick={() => setActiveTab("profile")}
                className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-700 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-neutral-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-2xl sm:text-[28px] font-semibold text-[#1F1E1C] mt-2 mb-0.5 tracking-tight">
                  8
                </span>
                <span className="text-xs text-neutral-500 font-normal">
                  Reviews
                </span>
              </div>

              {/* Stat 4: Gym Membership */}
              <div
                onClick={() => setActiveTab("membership")}
                className="bg-white rounded-2xl p-5 border border-secondary/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-secondary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-secondary uppercase mt-2 mb-0.5 tracking-wider">
                  ACTIVE
                </span>
                <span className="text-xs text-neutral-500 font-normal">
                  Gym Pass • Quarterly
                </span>
              </div>
            </div>

            {/* ── Main Content Card (Switches with active tab) ── */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE7DF] shadow-[0_2px_12px_rgba(0,0,0,0.03)] min-h-[440px]">
              {/* ──────────────────────────────────────────────
                  TAB 1: DASHBOARD (Matching Attachment Exactly)
                  ────────────────────────────────────────────── */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Digital Gym Pass Ribbon */}
                  <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#262422] to-[#363432] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[24px] text-secondary">
                          card_membership
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                            ACTIVE MEMBER
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="font-mono text-xs text-white/70">#YFZ-MEM-1042</span>
                        </div>
                        <h3 className="font-serif text-base sm:text-lg font-normal text-white mt-0.5">
                          Quarterly Membership Plan
                        </h3>
                        <p className="text-xs text-white/60">
                          Valid through 31 Dec 2026 • Charilam Branch
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveTab("membership")}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        View Digital Pass
                      </button>
                      <Link
                        href="/memberships"
                        className="px-4 py-2 bg-secondary hover:bg-secondary/90 text-on-secondary rounded-lg text-xs font-semibold transition-colors"
                      >
                        Renew
                      </Link>
                    </div>
                  </div>

                  {/* Card Title & View All */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <h2 className="font-serif text-lg sm:text-xl font-normal text-[#1F1E1C]">
                      Recent Orders
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab("orders")}
                      className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      View All
                    </button>
                  </div>

                  {/* Order List: Exact visual match to attachment */}
                  <div className="divide-y divide-neutral-100">
                    {/* Order Row 1 */}
                    <div className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        {/* Rounded Product Thumbnail */}
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#FAF9F5] border border-neutral-100 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMrVEnASILElR4hZ9mcGWtZG6Ey8DlnSQPxu8p_EqfDfwamv-CDnwt3Wb3bNwVL8mNNmHavFDlfMNksqtzWywExUaHeZGT8oH027GfQIi76-7peuhFQgmg4gGmykxNleEKn8k0hHPhmmKpk5C2KkWi01OFsbwG0aA5wqdjfTErIlHTip2gO6oggQgW95_zE04B66kWqzI_6jljXgLYJPLdumburO8xptfZXyVWLq-S"
                            alt="Whey Isolate"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href="/track?id=LS-2024-1234"
                            className="font-medium text-sm sm:text-[15px] text-[#1F1E1C] hover:text-neutral-600 transition-colors block truncate"
                          >
                            #LS-2024-1234
                          </Link>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            Feb 15, 2024 • 2 items
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        {/* Status Badge */}
                        <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-[#EDF7ED] text-[#2E7D32]">
                          Delivered
                        </span>
                        {/* Price */}
                        <span className="font-semibold text-sm sm:text-base text-[#1F1E1C] min-w-[70px] text-right">
                          $89.00
                        </span>
                      </div>
                    </div>

                    {/* Order Row 2 */}
                    <div className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        {/* Rounded Product Thumbnail */}
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#FAF9F5] border border-neutral-100 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJd1ts64Gg57cxposALffxqiPfpKFiRdwHktNe_IGdKBmOQm101wdspdatsCAjENeobvD0kkixVqvXxSc-PZVCk-ixjQTImpPTtXgbW1HSpZ9Kg1VlI-Hit_SMkF1SItME_Tk3xG5rFJwDY4FiAzWuaau1NOF-NOn3js2Fynhfvt9n5j_B3aAvL56LTfsEw3aLCzf1xfXqZJGDM71c96HGEal67Ff3W3HaQfREn-rr"
                            alt="Micronized Creatine"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href="/track?id=LS-2024-1198"
                            className="font-medium text-sm sm:text-[15px] text-[#1F1E1C] hover:text-neutral-600 transition-colors block truncate"
                          >
                            #LS-2024-1198
                          </Link>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            Feb 02, 2024 • 1 item
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        {/* Status Badge */}
                        <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-[#EDF4FB] text-[#1E70BF]">
                          In Transit
                        </span>
                        {/* Price */}
                        <span className="font-semibold text-sm sm:text-base text-[#1F1E1C] min-w-[70px] text-right">
                          $45.00
                        </span>
                      </div>
                    </div>

                    {/* Order Row 3 */}
                    <div className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        {/* Rounded Product Thumbnail */}
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#FAF9F5] border border-neutral-100 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMrVEnASILElR4hZ9mcGWtZG6Ey8DlnSQPxu8p_EqfDfwamv-CDnwt3Wb3bNwVL8mNNmHavFDlfMNksqtzWywExUaHeZGT8oH027GfQIi76-7peuhFQgmg4gGmykxNleEKn8k0hHPhmmKpk5C2KkWi01OFsbwG0aA5wqdjfTErIlHTip2gO6oggQgW95_zE04B66kWqzI_6jljXgLYJPLdumburO8xptfZXyVWLq-S"
                            alt="Recovery Matrix"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href="/track?id=LS-2024-1082"
                            className="font-medium text-sm sm:text-[15px] text-[#1F1E1C] hover:text-neutral-600 transition-colors block truncate"
                          >
                            #LS-2024-1082
                          </Link>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            Jan 18, 2024 • 3 items
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        {/* Status Badge */}
                        <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-[#EDF7ED] text-[#2E7D32]">
                          Delivered
                        </span>
                        {/* Price */}
                        <span className="font-semibold text-sm sm:text-base text-[#1F1E1C] min-w-[70px] text-right">
                          $112.00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Account Summary Card */}
                  <div className="pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Default Dispatch Address Preview */}
                    <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EBE7DF] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                          Primary Dispatch Node
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveTab("addresses")}
                          className="text-xs text-neutral-800 hover:underline cursor-pointer font-medium"
                        >
                          Change
                        </button>
                      </div>
                      <p className="text-sm font-medium text-[#1F1E1C]">
                        {displayName}
                      </p>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Flat 402, Oakwood Sanctuary, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru — 560038
                      </p>
                    </div>

                    {/* Verified Security Details */}
                    <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EBE7DF] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                          Security &amp; Credentials
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                          ● Verified
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[#1F1E1C] flex items-center gap-2">
                        <span>{displayPhone}</span>
                      </p>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Authenticated via Supabase Phone OTP. Session cookies encrypted with server-side validation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────
                  TAB: GYM MEMBERSHIP (Digital Pass & Plan Details)
                  ────────────────────────────────────────────── */}
              {activeTab === "membership" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-100">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1E1C]">
                        Gym Membership Pass
                      </h2>
                      <p className="text-xs text-neutral-500 font-light mt-0.5">
                        Your official Yodha Fitness Zone membership and facility privileges
                      </p>
                    </div>
                    <Link
                      href="/memberships"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-neutral-800 text-on-primary text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg self-start sm:self-auto"
                    >
                      <span>Upgrade / Renew Plan</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>

                  {/* Digital Pass Card */}
                  <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1C1B1A] via-[#2A2826] to-[#1C1B1A] text-white shadow-xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Pass Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-white/10">
                      <div>
                        <span className="font-heading text-lg font-bold uppercase tracking-wider text-white block">
                          YODHA
                        </span>
                        <span className="text-[10px] font-label-sm uppercase tracking-[0.2em] text-secondary font-bold">
                          FITNESS ZONE • MEMBER PASS
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-secondary text-on-secondary text-xs uppercase font-bold tracking-wider rounded-full">
                        ACTIVE
                      </span>
                    </div>

                    {/* Member Details */}
                    <div className="py-6 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[11px] text-white/50 uppercase tracking-wider block">Member Name</span>
                        <span className="text-base font-semibold text-white mt-0.5 block">{displayName}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/50 uppercase tracking-wider block">Member ID</span>
                        <span className="text-base font-mono font-bold text-secondary mt-0.5 block">YFZ-MEM-1042</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/50 uppercase tracking-wider block">Plan Tier</span>
                        <span className="text-sm font-medium text-white mt-0.5 block">Quarterly (3 Months)</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/50 uppercase tracking-wider block">Valid Until</span>
                        <span className="text-sm font-mono text-white mt-0.5 block">31 Dec 2026</span>
                      </div>
                    </div>

                    {/* Pass Footer Barcode & QR Placeholder */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                      <div>
                        <span className="block font-mono text-[10px] tracking-widest text-white/40">BRANCH</span>
                        <span className="text-white/80">NH08, Charilam, Tripura</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-[10px] tracking-widest text-white/40">STATUS</span>
                        <span className="text-secondary font-semibold">Verified Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Included Privileges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="material-symbols-outlined text-secondary text-[22px] mb-2">fitness_center</span>
                      <h4 className="text-sm font-semibold text-primary">Full Equipment Access</h4>
                      <p className="text-xs text-neutral-500 mt-1">Weight training floor, cardio machines, and functional area.</p>
                    </div>

                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="material-symbols-outlined text-secondary text-[22px] mb-2">restaurant</span>
                      <h4 className="text-sm font-semibold text-primary">Diet Chart Consultation</h4>
                      <p className="text-xs text-neutral-500 mt-1">Personalized calorie and macro guidance for your target weight.</p>
                    </div>

                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="material-symbols-outlined text-secondary text-[22px] mb-2">loyalty</span>
                      <h4 className="text-sm font-semibold text-primary">10% Supplement Discount</h4>
                      <p className="text-xs text-neutral-500 mt-1">Automatic savings on all whey protein and creatine purchases.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────
                  TAB 2: ORDERS (Full Consignment History)
                  ────────────────────────────────────────────── */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-100">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1E1C]">
                        Order History &amp; Consignments
                      </h2>
                      <p className="text-xs text-neutral-500 mt-1">
                        Review past dispatches, track cold-chain shipments, and download tax invoices.
                      </p>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex items-center gap-2 bg-[#FAF9F5] p-1 rounded-xl border border-neutral-200">
                      <button
                        type="button"
                        onClick={() => setOrderFilter("all")}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                          orderFilter === "all"
                            ? "bg-[#262422] text-white shadow-xs"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        All (12)
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderFilter("in_transit")}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                          orderFilter === "in_transit"
                            ? "bg-[#262422] text-white shadow-xs"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        In Transit (2)
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderFilter("delivered")}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                          orderFilter === "delivered"
                            ? "bg-[#262422] text-white shadow-xs"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        Delivered (10)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 rounded-xl border border-[#EBE7DF] bg-[#FAF9F5]/50 hover:bg-[#FAF9F5] transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-semibold text-base text-[#1F1E1C]">
                              {order.id}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                                order.orderStatus === "delivered"
                                  ? "bg-[#EDF7ED] text-[#2E7D32]"
                                  : "bg-[#EDF4FB] text-[#1E70BF]"
                              }`}
                            >
                              {order.orderStatus.replace("_", " ")}
                            </span>
                            <span className="text-xs text-neutral-400">
                              • {order.createdAt.slice(0, 10)}
                            </span>
                          </div>

                          <div className="text-xs sm:text-sm text-neutral-600">
                            {order.items.map((i) => `${i.name} (${i.size})`).join(", ")}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-neutral-500 flex-wrap">
                            <span>Carrier: {order.courier || "Blue Dart Air Priority"}</span>
                            <span>•</span>
                            <span>AWB: {order.awb || "BDA2409876541"}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end lg:self-auto shrink-0">
                          <div className="text-right">
                            <span className="text-base font-semibold text-[#1F1E1C] block">
                              {formatINR(order.total)}
                            </span>
                            <span className="text-xs text-neutral-400 capitalize">
                              {order.paymentMethod.toUpperCase()} • Paid
                            </span>
                          </div>

                          <Link
                            href={`/track?id=${encodeURIComponent(order.id)}`}
                            className="px-4 py-2 bg-[#262422] hover:bg-neutral-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="1" y="3" width="15" height="13" />
                              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                              <circle cx="5.5" cy="18.5" r="2.5" />
                              <circle cx="18.5" cy="18.5" r="2.5" />
                            </svg>
                            <span>Track Order</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────
                  TAB 3: WISHLIST (Saved Formulations)
                  ────────────────────────────────────────────── */}
              {activeTab === "wishlist" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1E1C]">
                        Wishlist Items ({wishlist.length})
                      </h2>
                      <p className="text-xs text-neutral-500 mt-1">
                        Formulations and hardware flagged for replenishment or next athletic cycle.
                      </p>
                    </div>
                  </div>

                  {wishlist.length === 0 ? (
                    <div className="py-12 text-center text-neutral-400">
                      <p className="text-sm">Your wishlist is currently empty.</p>
                      <Link
                        href="/shop"
                        className="inline-block mt-4 px-5 py-2.5 bg-[#262422] text-white text-xs rounded-xl font-medium"
                      >
                        Explore Supplement Catalog
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl border border-[#EBE7DF] bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="relative w-full h-36 bg-[#FAF9F5] rounded-xl flex items-center justify-center p-3 mb-3 overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full object-contain group-hover:scale-105 transition-transform"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveWishlist(item.id)}
                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-neutral-400 hover:text-rose-500 transition-colors"
                                title="Remove from wishlist"
                              >
                                <svg
                                  className="w-4 h-4 fill-rose-500 text-rose-500"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                              </button>
                            </div>

                            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                              {item.category}
                            </span>
                            <h3 className="font-medium text-sm text-[#1F1E1C] line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                              {item.subtitle}
                            </p>

                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-semibold text-sm text-[#1F1E1C]">
                                {formatINR(item.price)}
                              </span>
                              <span className="text-xs text-neutral-400 line-through">
                                {formatINR(item.originalPrice)}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddToCartFromWishlist(item)}
                            className="mt-4 w-full py-2 bg-[#262422] hover:bg-neutral-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                              <path d="M3 6h18" />
                              <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            <span>Move to Bag</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ──────────────────────────────────────────────
                  TAB 4: ADDRESSES (Saved Delivery Coordinates)
                  ────────────────────────────────────────────── */}
              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-100">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1E1C]">
                        Saved Delivery Coordinates
                      </h2>
                      <p className="text-xs text-neutral-500 mt-1">
                        Registered residential and athletic sanctuary dispatch nodes for cold-chain couriers.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddressModal(true)}
                      className="px-4 py-2 bg-[#262422] text-white text-xs font-medium rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-1.5 self-start cursor-pointer"
                    >
                      <span>+ Add New Address</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-5 rounded-2xl border transition-all space-y-3 relative ${
                          addr.isDefault
                            ? "bg-white border-[#262422] shadow-xs"
                            : "bg-[#FAF9F5]/70 border-[#EBE7DF]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                            {addr.tag}
                          </span>
                          {addr.isDefault && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#262422] text-white">
                              Default
                            </span>
                          )}
                        </div>

                        <h3 className="font-medium text-sm sm:text-base text-[#1F1E1C]">
                          {addr.fullName}
                        </h3>

                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {addr.street}
                          <br />
                          {addr.city}, {addr.state} — {addr.pinCode}
                        </p>

                        <div className="text-xs text-neutral-500 flex items-center gap-1.5 pt-1">
                          <span className="text-emerald-700">●</span>
                          <span>Verified Mobile: {addr.phone}</span>
                        </div>

                        <div className="pt-2 border-t border-neutral-100 flex items-center gap-3 text-xs">
                          {!addr.isDefault && (
                            <button
                              type="button"
                              onClick={() => handleSetDefaultAddress(addr.id)}
                              className="text-neutral-700 hover:text-[#1F1E1C] font-medium cursor-pointer"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            type="button"
                            className="text-neutral-500 hover:text-neutral-800 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Address Modal */}
                  {showAddressModal && (
                    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-neutral-200 space-y-4">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                          <h3 className="font-serif text-lg font-medium text-[#1F1E1C]">
                            Add Dispatch Node
                          </h3>
                          <button
                            type="button"
                            onClick={() => setShowAddressModal(false)}
                            className="text-neutral-400 hover:text-neutral-700 text-lg cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>

                        <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                          <div>
                            <label className="block text-neutral-500 font-medium mb-1">
                              Node Label (e.g. Gym, Office, Vacation)
                            </label>
                            <input
                              type="text"
                              value={newAddress.tag}
                              onChange={(e) =>
                                setNewAddress({ ...newAddress, tag: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-neutral-500 font-medium mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={newAddress.fullName}
                              onChange={(e) =>
                                setNewAddress({ ...newAddress, fullName: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-neutral-500 font-medium mb-1">
                              Street Address / Building
                            </label>
                            <input
                              type="text"
                              value={newAddress.street}
                              onChange={(e) =>
                                setNewAddress({ ...newAddress, street: e.target.value })
                              }
                              placeholder="e.g. 100 Feet Road, 4th Block"
                              className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-neutral-500 font-medium mb-1">
                                City
                              </label>
                              <input
                                type="text"
                                value={newAddress.city}
                                onChange={(e) =>
                                  setNewAddress({ ...newAddress, city: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-neutral-500 font-medium mb-1">
                                PIN Code
                              </label>
                              <input
                                type="text"
                                value={newAddress.pinCode}
                                onChange={(e) =>
                                  setNewAddress({ ...newAddress, pinCode: e.target.value })
                                }
                                placeholder="560034"
                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900"
                                required
                              />
                            </div>
                          </div>

                          <div className="pt-3 flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => setShowAddressModal(false)}
                              className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 font-medium cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 bg-[#262422] text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                            >
                              Save Coordinates
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ──────────────────────────────────────────────
                  TAB 5: PROFILE (Athlete Credentials & Preferences)
                  ────────────────────────────────────────────── */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-neutral-100">
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1E1C]">
                      Profile &amp; Preferences
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Manage verified athlete credentials, session security, and nutrition preferences.
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-5 max-w-xl">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900"
                        required
                      />
                    </div>

                    {/* Verified Mobile Number (Supabase Auth) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Verified Mobile Number
                        </label>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          ✓ Verified via Supabase
                        </span>
                      </div>
                      <input
                        type="text"
                        value={displayPhone}
                        disabled
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm bg-neutral-50 text-neutral-500 cursor-not-allowed"
                      />
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Customer login is bound to this mobile number via secure SMS OTP.
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
                        Email Address (for Invoices &amp; COA Reports)
                      </label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    {/* Training Discipline */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wider">
                        Primary Athletic Discipline
                      </label>
                      <select
                        value={discipline}
                        onChange={(e) => setDiscipline(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900 bg-white"
                      >
                        <option>Hypertrophy &amp; Strength</option>
                        <option>Powerlifting &amp; Olympic Weightlifting</option>
                        <option>Endurance &amp; Hyrox</option>
                        <option>Functional Cross-Training</option>
                        <option>Recovery &amp; Longevity</option>
                      </select>
                    </div>

                    {/* Dietary Checkboxes */}
                    <div className="pt-2 space-y-2.5 text-xs text-neutral-700">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 accent-[#262422]"
                        />
                        <span>Zero artificial sweeteners &amp; stevia-only preference</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 accent-[#262422]"
                        />
                        <span>WhatsApp cold-chain dispatch and temperature milestone alerts</span>
                      </label>
                    </div>

                    {/* Action */}
                    <div className="pt-3 flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#262422] text-white text-xs font-medium rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        Save Profile Changes
                      </button>
                      {profileSaved && (
                        <span className="text-xs text-emerald-700 font-medium">
                          ✓ Saved successfully
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ──────────────────────────────────────────────
            Brand Logos / Press Strip — Exactly matching reference
            ────────────────────────────────────────────── */}
        <section className="mt-20 pt-10 border-t border-[#EBE7DF]">
          <div className="flex items-center justify-around gap-6 sm:gap-10 md:gap-16 flex-wrap text-neutral-300 font-serif tracking-[0.25em] text-lg sm:text-xl md:text-2xl uppercase select-none opacity-80">
            <span className="hover:text-neutral-700 transition-colors">VOGUE</span>
            <span className="hover:text-neutral-700 transition-colors">ELLE</span>
            <span className="hover:text-neutral-700 transition-colors">BAZAAR</span>
            <span className="hover:text-neutral-700 transition-colors">GLAMOUR</span>
            <span className="hover:text-neutral-700 transition-colors">Vanity Fair</span>
            <span className="hover:text-neutral-700 transition-colors hidden sm:inline">VOGUE</span>
            <span className="hover:text-neutral-700 transition-colors hidden md:inline">ELLE</span>
            <span className="hover:text-neutral-700 transition-colors hidden lg:inline">BAZAAR</span>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            Newsletter / First Order Banner — Exactly matching reference
            ────────────────────────────────────────────── */}
        <section className="mt-16 text-center max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] font-normal tracking-tight text-[#1F1E1C]">
            Get 10% OFF in Your First Order
          </h2>
          <form
            onSubmit={handleSubscribe}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-0 max-w-md mx-auto"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="E-mail"
              className="w-full px-5 py-3.5 bg-white border border-[#DCD7CD] sm:border-r-0 text-sm text-[#1F1E1C] placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 rounded-none"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#262422] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer shrink-0 rounded-none"
            >
              Subscribe
            </button>
          </form>
          {newsletterSuccess && (
            <p className="text-xs text-emerald-700 font-medium mt-3">
              ✓ Thank you for subscribing! Your 10% discount code has been sent.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
