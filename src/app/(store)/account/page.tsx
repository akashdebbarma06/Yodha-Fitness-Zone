"use client";

import Link from "next/link";
import { useState } from "react";
import { ORDERS } from "@/lib/data/orders";
import { formatINR } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

type AccountTab = "orders" | "addresses" | "profile";

/* ──────────────────────────────────────────────
   Sample Addresses
   ────────────────────────────────────────────── */
const INITIAL_ADDRESSES: {
  id: string;
  tag: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault: boolean;
}[] = [];

export default function AccountPage() {
  const { user, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [orderFilter, setOrderFilter] = useState<"all" | "in_transit" | "delivered">("all");

  // Profile Form State
  const [profileName, setProfileName] = useState(user?.fullName || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");
  const [discipline, setDiscipline] = useState("Weight Training & Cardio");
  const [profileSaved, setProfileSaved] = useState(false);

  // Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    tag: "Home",
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    street: "",
    city: "Charilam",
    state: "Tripura",
    pinCode: "799103",
  });

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Fallback customer greeting
  const displayName =
    user?.fullName && !user.fullName.includes("Demo") && !user.fullName.includes("[PLACEHOLDER")
      ? user.fullName
      : (user?.email ? user.email.split("@")[0] : "Member");
  const firstName = displayName.split(" ")[0] || "Member";
  const displayPhone = user?.phone || "";

  // Demo records must not render on customer-facing pages
  const customerOrders =
    !user?.id || user.id.includes("demo")
      ? []
      : ORDERS.filter((order) => order.customerId === user.id);

  // Filtered orders
  const filteredOrders = customerOrders.filter((order) => {
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
      tag: "Home",
      fullName: displayName,
      phone: displayPhone,
      street: "",
      city: "Charilam",
      state: "Tripura",
      pinCode: "799103",
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterSuccess(false);
    }, 4000);
  };

  const inTransitCount = customerOrders.filter((o) => o.orderStatus === "in_transit").length;

  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen text-[#1F1E1C]">
      {/* ──────────────────────────────────────────────
          Top Title Area
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
          {/* ── Left Sidebar Navigation ── */}
          <aside className="w-full md:w-60 lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl p-3 border border-[#EBE7DF] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1">
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

              {/* Logout */}
              <button
                type="button"
                onClick={signOut}
                className="w-full py-3 px-4 rounded-xl flex items-center gap-3 text-sm font-medium text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer"
                title="Sign Out of Customer Account"
              >
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
            {/* ── Top Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
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
                  {customerOrders.length}
                </span>
                <span className="text-xs text-neutral-500 font-normal">
                  Total Orders
                </span>
              </div>

              {/* Stat 2: In Transit */}
              <div
                onClick={() => {
                  setActiveTab("orders");
                  setOrderFilter("in_transit");
                }}
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
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <span className="text-2xl sm:text-[28px] font-semibold text-[#1F1E1C] mt-2 mb-0.5 tracking-tight">
                  {inTransitCount}
                </span>
                <span className="text-xs text-neutral-500 font-normal">
                  In Transit
                </span>
              </div>

              {/* Stat 3: Saved Addresses */}
              <div
                onClick={() => setActiveTab("addresses")}
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
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="text-2xl sm:text-[28px] font-semibold text-[#1F1E1C] mt-2 mb-0.5 tracking-tight">
                  {addresses.length}
                </span>
                <span className="text-xs text-neutral-500 font-normal">
                  Saved Addresses
                </span>
              </div>
            </div>

            {/* ── Main Content Card (Switches with active tab) ── */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE7DF] shadow-[0_2px_12px_rgba(0,0,0,0.03)] min-h-[440px]">
              {/* ──────────────────────────────────────────────
                  TAB: ORDERS
                  ────────────────────────────────────────────── */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-100">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1E1C]">
                        Order History
                      </h2>
                      <p className="text-xs text-neutral-500 mt-1">
                        Review past orders, track shipments, and view details.
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
                        All ({customerOrders.length})
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
                        In Transit ({inTransitCount})
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
                        Delivered ({customerOrders.filter((o) => o.orderStatus === "delivered").length})
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
                            <span>Carrier: {order.courier || "Courier (assigned at dispatch)"}</span>
                            {order.awb && (
                              <>
                                <span>•</span>
                                <span>AWB: {order.awb}</span>
                              </>
                            )}
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
                    {filteredOrders.length === 0 && (
                      <div className="py-12 text-center text-xs text-neutral-400">
                        No orders found.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────
                  TAB: ADDRESSES
                  ────────────────────────────────────────────── */}
              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-100">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1E1C]">
                        Saved Delivery Addresses
                      </h2>
                      <p className="text-xs text-neutral-500 mt-1">
                        Manage your delivery addresses for orders.
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

                  {addresses.length === 0 ? (
                    <div className="py-12 text-center text-xs text-neutral-400">
                      No saved addresses yet.
                    </div>
                  ) : (
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
                            <span>Phone: {addr.phone}</span>
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
                  )}

                  {/* Add Address Modal */}
                  {showAddressModal && (
                    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-neutral-200 space-y-4">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                          <h3 className="font-serif text-lg font-medium text-[#1F1E1C]">
                            Add Address
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
                              Address Label (e.g. Home, Work)
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
                              placeholder="e.g. NH08 near Tripura Gramin Bank"
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
                                placeholder="799103"
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
                              Save Address
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ──────────────────────────────────────────────
                  TAB: PROFILE
                  ────────────────────────────────────────────── */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-neutral-100">
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1E1C]">
                      Profile &amp; Preferences
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Manage your profile, account details, and preferences.
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

                    {/* Mobile Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Mobile Number
                        </label>
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
                        Email Address (for Invoices &amp; Order Updates)
                      </label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    {/* Dietary Checkboxes */}
                    <div className="pt-2 space-y-2.5 text-xs text-neutral-700">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 accent-[#262422]"
                        />
                        <span>WhatsApp order dispatch and delivery alerts</span>
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
            Brand Logos / Press Strip
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
            Newsletter / First Order Banner
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
