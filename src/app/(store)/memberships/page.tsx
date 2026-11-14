"use client";

import { useState } from "react";
import Link from "next/link";
import { MEMBERSHIP_PLANS } from "@/lib/data/memberships";
import { formatINR } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import type { MembershipPlan } from "@/types";

export default function MembershipsPage() {
  const { user, isAuthenticated } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [generatedMemberId, setGeneratedMemberId] = useState("");
  const [buyerName, setBuyerName] = useState(user?.fullName || "Vikram Malhotra");
  const [buyerPhone, setBuyerPhone] = useState(user?.phone || "+91 87987 03787");
  const [buyerEmail, setBuyerEmail] = useState(user?.email || "user@yodhafitnesszone.in");
  const [paymentOption, setPaymentOption] = useState<"upi" | "card" | "pay_at_gym">("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setPurchaseSuccess(false);
  };

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setIsProcessing(true);
    setTimeout(() => {
      const newId = `YFZ-MEM-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedMemberId(newId);
      setIsProcessing(false);
      setPurchaseSuccess(true);
    }, 1200);
  };

  return (
    <div className="w-full bg-surface py-12 px-gutter">
      <div className="max-w-[1360px] mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-semibold">Memberships</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-outline-variant/60 pb-8 max-w-3xl">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.14em] text-secondary font-semibold">
            MEMBERSHIP PLANS & PASSES
          </span>
          <h1 className="font-display-xl text-display-xl uppercase tracking-tight text-primary font-semibold mt-2">
            Join Yodha Fitness Zone
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
            Select a membership tier for access to our Charilam training facility. Weight training, cardio zone, lockers, and personalized diet guidance included.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIP_PLANS.filter((p) => p.tier === "general").map((plan) => {
            const monthlyEquivalent = Math.round(plan.price / plan.durationMonths);

            return (
              <div
                key={plan.id}
                className={`p-6 bg-surface-container-lowest flex flex-col justify-between border relative transition-all ${
                  plan.isPopular
                    ? "border-secondary ring-1 ring-secondary shadow-md"
                    : "border-outline-variant/60 hover:border-outline"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 bg-secondary text-on-secondary font-label-sm text-[10px] uppercase font-bold tracking-widest">
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      {plan.duration.replace("_", " ")}
                    </span>
                    {plan.compareAtPrice && (
                      <span className="text-xs font-mono text-outline line-through">
                        {formatINR(plan.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary">
                    {plan.name}
                  </h3>

                  <div className="mt-4 mb-2 flex items-baseline gap-1.5">
                    <span className="font-mono text-3xl font-bold text-primary">
                      {formatINR(plan.price)}
                    </span>
                    <span className="text-xs font-body-sm text-on-surface-variant">
                      / {plan.durationMonths === 1 ? "month" : `${plan.durationMonths} months`}
                    </span>
                  </div>

                  {plan.durationMonths > 1 && (
                    <div className="text-xs font-mono text-secondary font-semibold mb-4">
                      ₹{monthlyEquivalent} per month
                    </div>
                  )}

                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="pt-4 border-t border-outline-variant/40 space-y-2.5 text-xs text-on-surface">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">
                          check
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-outline-variant/40">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    type="button"
                    className={`w-full h-11 font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      plan.isPopular
                        ? "bg-secondary hover:bg-secondary/90 text-on-secondary"
                        : "bg-primary hover:bg-neutral-800 text-on-primary"
                    }`}
                  >
                    <span>Choose Plan</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 1-on-1 Personal Training Banner */}
        <div className="p-8 bg-surface-container-low border border-outline-variant grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              ONE-ON-ONE COACHING
            </span>
            <h3 className="font-headline-md text-headline-md uppercase font-semibold text-primary">
              Personal Training &amp; Transformation
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
              Prefer direct 1-on-1 guidance? Our certified trainers work with you every session on form, progressive overload, and tailored nutrition for your physique and health goals.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-on-surface">
              <div>✓ DEDICATED TRAINER</div>
              <div>✓ WEEKLY DIET AUDITS</div>
              <div>✓ FORM CORRECTION</div>
              <div>✓ PROGRESS TRACKING</div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
            <div>
              <span className="text-xs text-outline uppercase block">FROM</span>
              <span className="font-mono text-3xl font-bold text-primary">₹4,500</span>
              <span className="text-xs text-on-surface-variant"> / month</span>
            </div>
            <button
              onClick={() => {
                const pt = MEMBERSHIP_PLANS.find((p) => p.tier === "personal_training");
                if (pt) handleSelectPlan(pt);
              }}
              type="button"
              className="h-12 px-6 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Book Personal Training</span>
              <span className="material-symbols-outlined text-[18px]">sports_martial_arts</span>
            </button>
          </div>
        </div>

        {/* Membership Details & Facility Policy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 bg-surface-container-lowest border border-outline-variant space-y-2">
            <span className="material-symbols-outlined text-secondary text-[26px]">schedule</span>
            <h4 className="font-title-md text-title-md font-semibold text-primary uppercase">Gym Timings</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Mon–Wed &amp; Fri–Sun: 5:30 AM – 10:30 PM. Thursdays closed for deep facility sanitization and equipment maintenance.
            </p>
          </div>

          <div className="p-6 bg-surface-container-lowest border border-outline-variant space-y-2">
            <span className="material-symbols-outlined text-secondary text-[26px]">badge</span>
            <h4 className="font-title-md text-title-md font-semibold text-primary uppercase">Digital ID Card</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every member receives an instant digital membership ID in their online account for hassle-free check-ins at the front desk.
            </p>
          </div>

          <div className="p-6 bg-surface-container-lowest border border-outline-variant space-y-2">
            <span className="material-symbols-outlined text-secondary text-[26px]">ac_unit</span>
            <h4 className="font-title-md text-title-md font-semibold text-primary uppercase">Freeze Options</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Travel or illness? 6-month and 12-month memberships include complimentary freeze privileges to pause validity.
            </p>
          </div>
        </div>
      </div>

      {/* ── Purchase Modal ── */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {purchaseSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[36px]">verified</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary">
                  Membership Activated!
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto">
                  Welcome to Yodha Fitness Zone. Your membership pass has been created.
                </p>

                <div className="p-4 bg-surface-container-low border border-outline-variant font-mono text-sm space-y-1.5 text-left my-4">
                  <div className="flex justify-between">
                    <span className="text-outline">MEMBERSHIP ID:</span>
                    <span className="font-bold text-secondary">{generatedMemberId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">PLAN:</span>
                    <span className="font-semibold text-primary">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">MEMBER:</span>
                    <span>{buyerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-outline">AMOUNT:</span>
                    <span className="font-bold text-primary">{formatINR(selectedPlan.price)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/account"
                    className="flex-1 h-11 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center transition-colors"
                  >
                    View in Account
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedPlan(null);
                      setPurchaseSuccess(false);
                    }}
                    type="button"
                    className="flex-1 h-11 bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmPurchase} className="space-y-6">
                <div className="flex items-center justify-between border-b border-outline-variant/60 pb-4">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                      MEMBERSHIP CHECKOUT
                    </span>
                    <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mt-0.5">
                      {selectedPlan.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    type="button"
                    className="text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                  </button>
                </div>

                {/* Plan Summary Box */}
                <div className="p-4 bg-surface-container-low border border-outline-variant flex items-center justify-between font-mono text-sm">
                  <div>
                    <span className="text-outline block text-xs">TOTAL PAYABLE:</span>
                    <span className="text-xl font-bold text-primary">{formatINR(selectedPlan.price)}</span>
                  </div>
                  <span className="px-2 py-1 bg-secondary/15 text-secondary text-xs uppercase font-bold">
                    {selectedPlan.duration.replace("_", " ")}
                  </span>
                </div>

                {/* Member Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                      Member Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="+91 87987 03787"
                        className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentOption("upi")}
                      className={`p-3 border text-xs font-semibold uppercase flex flex-col items-center gap-1 transition-colors ${
                        paymentOption === "upi"
                          ? "border-primary bg-primary text-on-primary"
                          : "border-outline-variant bg-surface hover:border-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                      <span>UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentOption("card")}
                      className={`p-3 border text-xs font-semibold uppercase flex flex-col items-center gap-1 transition-colors ${
                        paymentOption === "card"
                          ? "border-primary bg-primary text-on-primary"
                          : "border-outline-variant bg-surface hover:border-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">credit_card</span>
                      <span>Card / Net</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentOption("pay_at_gym")}
                      className={`p-3 border text-xs font-semibold uppercase flex flex-col items-center gap-1 transition-colors ${
                        paymentOption === "pay_at_gym"
                          ? "border-primary bg-primary text-on-primary"
                          : "border-outline-variant bg-surface hover:border-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">payments</span>
                      <span>Pay at Gym</span>
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-12 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Processing Membership...</span>
                  ) : (
                    <>
                      <span>Confirm &amp; Activate ({formatINR(selectedPlan.price)})</span>
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
