"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { formatINR } from "@/lib/utils";
import { PIN_CODE_MAP } from "@/lib/data/settings";

type PaymentMethodType = "upi" | "cards" | "netbanking" | "cod";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    detailedItems,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    clearCart,
  } = useCart();

  // Contact & Address Form
  const [email, setEmail] = useState("arjun.sharma@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [firstName, setFirstName] = useState("Arjun");
  const [lastName, setLastName] = useState("Sharma");
  const [addressLine, setAddressLine] = useState(
    "Flat 402, Oakwood Sanctuary, 12th Main Road, HAL 2nd Stage"
  );
  const [landmark, setLandmark] = useState("Near 100 Feet Road Junction");
  const [pinCode, setPinCode] = useState("560038");
  const [city, setCity] = useState("Bengaluru");
  const [state, setState] = useState("Karnataka");
  const [gstin, setGstin] = useState("");
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("upi");
  const [upiVpa, setUpiVpa] = useState("arjun@okhdfcbank");

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  // Auto-detect city & state when PIN is entered
  const handlePinChange = (val: string) => {
    setPinCode(val);
    const cleaned = val.trim();
    if (cleaned.length === 6 && PIN_CODE_MAP[cleaned]) {
      setCity(PIN_CODE_MAP[cleaned].city);
      setState(PIN_CODE_MAP[cleaned].state);
    } else if (cleaned.startsWith("560")) {
      setCity("Bengaluru");
      setState("Karnataka");
    } else if (cleaned.startsWith("400")) {
      setCity("Mumbai");
      setState("Maharashtra");
    } else if (cleaned.startsWith("110")) {
      setCity("New Delhi");
      setState("Delhi");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `#KR-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderConfirmed(generatedOrderId);
      setIsSubmitting(false);
      clearCart();
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="w-full bg-surface py-16 px-gutter">
        <div className="max-w-2xl mx-auto bg-surface-container-lowest p-8 sm:p-12 border border-outline-variant shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[36px]">
              check_circle
            </span>
          </div>

          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              PAYMENT CONFIRMED
            </span>
            <h1 className="font-headline-lg text-headline-lg uppercase font-semibold text-primary mt-1">
              Order Confirmed
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Thank you, {firstName}. Your order has been placed and will be shipped via express delivery.
            </p>
          </div>

          <div className="p-6 bg-surface-container-low border border-outline-variant text-left space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-outline">ORDER ID:</span>
              <span className="font-bold text-primary">{orderConfirmed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">AMOUNT PAID:</span>
              <span className="font-bold text-secondary">{formatINR(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">ESTIMATED DELIVERY:</span>
              <span className="font-bold text-primary">24–48 Hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">DISPATCH:</span>
              <span>Bengaluru</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline">DESTINATION:</span>
              <span>{city}, {state} ({pinCode})</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href={`/track?id=${encodeURIComponent(orderConfirmed)}`}
              className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                local_shipping
              </span>
              <span>Track Order</span>
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto h-12 px-8 bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center transition-colors border border-outline-variant"
            >
              Continue to Shop
            </Link>
          </div>

          <p className="text-[11px] text-outline uppercase tracking-wider">
            A confirmation email has been sent to {email}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface py-10 px-gutter">
      <div className="max-w-[1360px] mx-auto space-y-8">
        {/* Progress Stepper */}
        <section className="w-full bg-surface-container-low p-4 border border-outline-variant/60">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <nav aria-label="Checkout Progress" className="flex items-center space-x-3 text-xs uppercase tracking-wider font-semibold">
              <Link href="/cart" className="flex items-center gap-1.5 text-secondary hover:underline">
                <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <span>1. Bag</span>
              </Link>
              <span className="text-outline">/</span>
              <div className="flex items-center gap-1.5 text-primary">
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>2. Shipping &amp; Payment</span>
              </div>
              <span className="text-outline">/</span>
              <div className="flex items-center gap-1.5 text-outline">
                <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>3. Delivery</span>
              </div>
            </nav>

            <div className="flex items-center gap-2 text-secondary text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-[16px]">
                verified_user
              </span>
              <span>RBI Tokenized &amp; 256-Bit SSL Encrypted</span>
            </div>
          </div>
        </section>

        {/* Main Form + Sidebar Grid */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Form: Contact, Shipping, Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Express Checkout Button */}
            <div className="p-6 bg-surface-container-lowest border border-outline-variant space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    bolt
                  </span>
                  <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
                    Express 1-Click UPI Checkout
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm uppercase px-2 py-0.5 bg-secondary/15 text-secondary font-bold">
                  Instant
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className="w-full h-12 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-3 transition-colors shadow-sm"
              >
                <span>Instant Checkout via UPI / GPay / PhonePe</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Step 1: Customer Contact Info */}
            <div className="p-6 bg-surface-container-lowest border border-outline-variant space-y-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/60 pb-3">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                  01
                </span>
                <h2 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary">
                  Athlete Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Email (For Invoice)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-xs text-on-surface-variant cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={whatsappAlerts}
                  onChange={(e) => setWhatsappAlerts(e.target.checked)}
                  className="w-4 h-4 rounded border-outline accent-primary"
                />
                <span>
                  Receive delivery updates on WhatsApp.
                </span>
              </label>
            </div>

            {/* Step 2: Shipping Destination Address (India Optimized) */}
            <div className="p-6 bg-surface-container-lowest border border-outline-variant space-y-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/60 pb-3">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                  02
                </span>
                <h2 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary">
                  Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Flat / House No., Building Name, Street &amp; Locality
                </label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    PIN Code (6 Digits)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={pinCode}
                    onChange={(e) => handlePinChange(e.target.value)}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono font-bold focus:outline-none focus:border-primary tracking-widest"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    City (Auto-filled)
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Optional GSTIN for B2B input tax credit */}
              <div className="pt-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Business GSTIN (Optional — For 18% Input Tax Credit)
                </label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  placeholder="29AABCK8921M1Z5"
                  className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Step 3: Payment Rail Selection */}
            <div className="p-6 bg-surface-container-lowest border border-outline-variant space-y-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/60 pb-3">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                  03
                </span>
                <h2 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 border flex flex-col gap-3 cursor-pointer transition-all ${
                    paymentMethod === "upi"
                      ? "border-2 border-primary bg-surface-container-lowest"
                      : "border-outline-variant hover:border-primary bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="font-title-md text-title-md font-semibold text-primary">
                        UPI (GPay / PhonePe / Paytm / CRED)
                      </span>
                    </div>
                    <span className="text-xs uppercase font-bold text-secondary">
                      Zero Surcharge
                    </span>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="pt-2 border-t border-outline-variant/60 flex items-center gap-2">
                      <input
                        type="text"
                        value={upiVpa}
                        onChange={(e) => setUpiVpa(e.target.value)}
                        placeholder="athlete@upi"
                        className="flex-1 h-10 px-3 bg-surface border border-outline-variant font-mono text-sm focus:outline-none focus:border-primary"
                      />
                      <span className="text-xs text-outline font-semibold uppercase">
                        VPA / QR Verified
                      </span>
                    </div>
                  )}
                </label>

                {/* Cards Option */}
                <label
                  onClick={() => setPaymentMethod("cards")}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "cards"
                      ? "border-2 border-primary bg-surface-container-lowest"
                      : "border-outline-variant hover:border-primary bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cards"}
                      onChange={() => setPaymentMethod("cards")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="font-title-md text-title-md font-semibold text-primary">
                      Cards (RuPay / Visa / Mastercard)
                    </span>
                  </div>
                  <span className="text-xs text-outline font-mono">
                    RBI Compliant Tokenization
                  </span>
                </label>

                {/* NetBanking */}
                <label
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "netbanking"
                      ? "border-2 border-primary bg-surface-container-lowest"
                      : "border-outline-variant hover:border-primary bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "netbanking"}
                      onChange={() => setPaymentMethod("netbanking")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="font-title-md text-title-md font-semibold text-primary">
                      NetBanking (58 Indian Scheduled Banks)
                    </span>
                  </div>
                  <span className="text-xs text-outline">HDFC / ICICI / SBI</span>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-2 border-primary bg-surface-container-lowest"
                      : "border-outline-variant hover:border-primary bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="font-title-md text-title-md font-semibold text-primary">
                      Cash on Delivery (OTP Verified at Doorstep)
                    </span>
                  </div>
                  <span className="text-xs text-secondary font-semibold">Available</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Order Review & Pay CTA (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-6 border border-outline-variant space-y-6 sticky top-[140px]">
            <h2 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-3">
              Order Review ({items.reduce((s, i) => s + i.quantity, 0)} Items)
            </h2>

            {/* Line items snippet */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-outline-variant/40">
              {detailedItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-body-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-contain bg-surface-container-low p-1 border border-outline-variant/40"
                    />
                    <div>
                      <span className="font-semibold text-primary block line-clamp-1">
                        {item.product.name}
                      </span>
                      <span className="text-xs text-on-surface-variant block">
                        {item.variant.size} • Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-primary">
                    {formatINR(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Math Breakdown */}
            <div className="space-y-2.5 border-t border-outline-variant/60 pt-4 text-body-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-semibold text-on-surface">
                  {formatINR(subtotal)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-secondary">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold">-{formatINR(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-on-surface-variant">
                <span>Delivery</span>
                <span className="font-semibold text-on-surface">
                  {shipping === 0 ? "FREE" : formatINR(shipping)}
                </span>
              </div>

              <div className="flex justify-between items-baseline text-primary font-title-md font-bold pt-3 border-t border-outline-variant">
                <span>Total</span>
                <span className="font-metric-num text-[30px] text-primary font-bold">
                  {formatINR(total)}
                </span>
              </div>
              <p className="text-[11px] text-outline text-right">
                Includes all applicable taxes (GST 18%)
              </p>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className={`w-full h-14 font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                isSubmitting
                  ? "bg-secondary text-on-secondary cursor-wait"
                  : "bg-primary hover:bg-neutral-800 text-on-primary"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-on-secondary border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    lock
                  </span>
                  <span>Place Order &amp; Pay {formatINR(total)}</span>
                </>
              )}
            </button>

            <div className="pt-2 flex items-center justify-center gap-4 text-[10px] text-outline uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">
                  security
                </span>
                PCI-DSS Aligned
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">
                  ac_unit
                </span>
                Sub-8°C Logistics
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">
                  verified
                </span>
                100% Authentic
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
