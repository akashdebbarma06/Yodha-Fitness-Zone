"use client";

import { useState } from "react";
import Link from "next/link";
import { STORE_SETTINGS } from "@/lib/data/settings";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("order");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && email && message) {
      setSubmitted(true);
    }
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
          <span className="text-primary font-semibold">Contact Us</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-outline-variant/60 pb-6 max-w-3xl">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.14em] text-secondary font-semibold">
            CONTACT & LOCATIONS
          </span>
          <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary font-semibold mt-1">
            Contact Us
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
            Reach out for order support, product questions, or wholesale enquiries. We respond within 4 business hours.
          </p>
        </div>

        {/* 2-Column Grid: Form & Sanctuaries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Intake Form (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-10 border border-outline-variant shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[36px]">
                    check_circle
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary">
                  Message Sent
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                  Thank you, {fullName}. We’ll reply to {email} within 4 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  type="button"
                  className="mt-4 px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md uppercase font-semibold tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary">
                    Contact Form
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Fill in your details and we’ll get back to you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                      Topic
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary uppercase text-xs"
                    >
                      <option value="order">Order Support</option>
                      <option value="product">Product Information</option>
                      <option value="shipping">Shipping &amp; Delivery</option>
                      <option value="wholesale">Wholesale Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="w-full p-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    send
                  </span>
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Physical Facilities & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Gym Location */}
            <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  GYM LOCATION • TRIPURA
                </span>
                <span className="text-xs bg-secondary/15 text-secondary px-2 py-0.5 font-bold">
                  5.0★ (Google)
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-semibold uppercase text-primary">
                Yodha Fitness Zone
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                NH08, near Tripura Gramin Bank, Charilam, Tripura 799103
              </p>
              <div className="pt-2 text-xs font-mono space-y-1.5 text-on-surface">
                <div>HOURS: 5:30 AM – 10:30 PM (Thu Closed)</div>
                <div>PHONE: +91 87987 03787</div>
                <div>INSTAGRAM: @yodhafitnesszone_yfz</div>
                <div>SERVICES: Weight Training, Cardio, Personal Training, Diet Plans</div>
              </div>
            </div>

            {/* Quick Contact & Shipping Notice */}
            <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-3">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                ONLINE STORE &amp; SHIPPING
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                We deliver sports supplements, gym accessories, and fitness merchandise pan-India. Orders are shipped from Charilam, Tripura.
              </p>
              <div className="pt-2 text-xs font-mono space-y-1 text-on-surface">
                <div>SUPPORT EMAIL: {STORE_SETTINGS.supportEmail}</div>
                <div>DISPATCH: Same-day for orders before 2:00 PM</div>
              </div>
            </div>

            {/* Business Details */}
            <div className="p-6 bg-surface-container-low border border-outline-variant space-y-2 text-xs font-mono">
              <span className="font-label-sm text-label-sm uppercase font-bold text-outline block font-sans">
                Business Details
              </span>
              <div className="flex justify-between">
                <span className="text-outline">BUSINESS:</span>
                <span className="font-semibold text-primary">Yodha Fitness Zone</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">LOCATION:</span>
                <span>Charilam, Tripura 799103</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">PHONE:</span>
                <span>+91 87987 03787</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">EMAIL:</span>
                <span>{STORE_SETTINGS.supportEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
