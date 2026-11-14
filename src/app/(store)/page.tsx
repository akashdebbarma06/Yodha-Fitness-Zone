"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/store/ProductCard";
import { useCart } from "@/components/providers/CartProvider";

const FILTER_TABS = ["All Bestsellers", "Protein", "Strength", "Recovery"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

export default function FlagshipHomepage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All Bestsellers");
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { applyCoupon, openCart } = useCart();

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "Protein":
        return PRODUCTS.filter((p) => p.category === "Native Whey Isolates");
      case "Strength":
        return PRODUCTS.filter((p) => p.category === "Cellular ATP & Creatine");
      case "Recovery":
        return PRODUCTS.filter(
          (p) =>
            p.category === "Mineral Hydration & Electrolytes" ||
            p.category === "Recovery & Adaptogens"
        );
      case "All Bestsellers":
      default:
        return PRODUCTS.slice(0, 4);
    }
  }, [activeTab]);

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText("YODHA15");
    applyCoupon("YODHA15");
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* ──────────────────────────────────────────────
          Top Trust & Status Ribbon
          ────────────────────────────────────────────── */}
      <div className="w-full bg-surface-container-high py-2.5 px-gutter border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest text-[11px]">
          <div className="flex items-center gap-space-md flex-wrap">
            <span className="flex items-center gap-1.5 font-semibold text-on-surface">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              BATCH TESTED
            </span>
            <span className="hidden md:inline text-outline-variant">/</span>
            <span className="hidden md:inline">
              TRANSPARENT LABELS
            </span>
          </div>
          <div className="flex items-center gap-space-md flex-wrap">
            <span>PAN-INDIA SHIPPING</span>
            <span className="text-outline-variant">/</span>
            <span className="font-semibold text-secondary">
              ORDERS BEFORE 2 PM SHIP SAME DAY
            </span>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          1. HERO SECTION
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface py-12 lg:py-20 px-gutter border-b border-outline-variant/40">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-surface-container-low px-3.5 py-1.5 rounded-full w-fit border border-outline-variant/50">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                verified
              </span>
              <span className="font-label-sm text-label-sm uppercase font-semibold text-secondary tracking-widest">
                Sports Nutrition
              </span>
            </div>

            <h1 className="font-display-xl text-display-xl text-primary font-semibold tracking-tighter uppercase leading-[1.04]">
              CLEAN NUTRITION.
              <br />
              <span className="text-secondary">REAL</span> TRAINING.
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Sports supplements, fitness essentials, and training at Yodha Fitness Zone in Charilam, Tripura.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-2">
              <Link
                href="/shop"
                className="h-12 px-8 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-widest font-semibold flex items-center justify-center transition-colors shadow-sm"
              >
                SHOP SUPPLEMENTS
              </Link>
              <Link
                href="/about"
                className="h-12 px-8 bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md uppercase tracking-widest font-semibold flex items-center justify-center transition-colors border border-outline-variant"
              >
                EXPLORE TRAINING CLUB
              </Link>
            </div>

            {/* Quick Specs Matrix Ribbon */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 bg-surface-container-lowest border border-outline-variant/60 flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  PROTEIN
                </span>
                <span className="font-title-md text-title-md font-semibold text-on-surface">
                  100% Grass-Fed
                </span>
              </div>
              <div className="p-3.5 bg-surface-container-lowest border border-outline-variant/60 flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  SWEETENERS
                </span>
                <span className="font-title-md text-title-md font-semibold text-on-surface">
                  Zero Sucralose
                </span>
              </div>
              <div className="p-3.5 bg-surface-container-lowest border border-outline-variant/60 flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  QUALITY
                </span>
                <span className="font-title-md text-title-md font-semibold text-on-surface">
                  Lab Tested
                </span>
              </div>
              <div className="p-3.5 bg-surface-container-lowest border border-outline-variant/60 flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  DELIVERY
                </span>
                <span className="font-title-md text-title-md font-semibold text-on-surface">
                  Express Courier
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden shadow-2xl border border-outline-variant">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Yodha Fitness Zone training facility"
                className="w-full h-full object-cover grayscale-[15%] contrast-105 hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGzbfhHC72ZBAr0QV_yU9DhJBkvpQWJXJPghHkF5Ik6IH77KUbLbxCq6l-J4IsWGBLurlggDdGzdKE4xAZzu_1T-AM0oRaqKZ_aC0iIZ5A78DGkOW0HrRH14rX9TlPXRV2iMLmwgJTgDMVG4419NClP3g1mcSrc6RjKXymi4PH8bUDq62uGuWuM1pAhrCLiTgpBAQmJlVVQo4G1kkz_FnQgPMirnR5K_WFA37YcYnE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

              {/* Floated Badge */}
              <div className="absolute top-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md px-3.5 py-2 shadow-sm flex items-center gap-2 border border-outline-variant/40">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-on-surface">
                  LAB TESTED
                </span>
              </div>

              {/* Bottom Image Label */}
              <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                <p className="font-label-sm text-label-sm uppercase tracking-widest text-surface-container-high mb-1">
                  CHARILAM • TRIPURA
                </p>
                <p className="font-headline-sm text-headline-sm font-semibold tracking-tight">
                  YODHA FITNESS ZONE
                </p>
              </div>
            </div>

            {/* Overlapping Micro-Spec Tag */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-primary text-on-primary p-4 shadow-xl max-w-xs border border-white/10">
              <span className="material-symbols-outlined text-[28px] text-secondary-fixed">
                biotech
              </span>
              <div>
                <div className="font-label-sm text-label-sm uppercase text-surface-container-high tracking-wider font-semibold">
                  LAB TESTED
                </div>
                <div className="font-body-sm text-body-sm font-medium">
                  Third-party batch verification
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ──────────────────────────────────────────────
          2. THREE CATEGORY CARDS SECTION
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-gutter">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-space-md">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
                CATEGORIES
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-semibold tracking-tight mt-1">
                Shop by Category
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Clean formulas with no fillers, no artificial sweeteners, and lab-verified purity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Category Card 1 */}
            <div className="group bg-surface-container-lowest p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-outline-variant/40">
              <div>
                <div className="w-full aspect-[4/3] bg-surface-container-low overflow-hidden mb-6 flex items-center justify-center p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Whey Protein Isolate"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMrVEnASILElR4hZ9mcGWtZG6Ey8DlnSQPxu8p_EqfDfwamv-CDnwt3Wb3bNwVL8mNNmHavFDlfMNksqtzWywExUaHeZGT8oH027GfQIi76-7peuhFQgmg4gGmykxNleEKn8k0hHPhmmKpk5C2KkWi01OFsbwG0aA5wqdjfTErIlHTip2gO6oggQgW95_zE04B66kWqzI_6jljXgLYJPLdumburO8xptfZXyVWLq-S"
                  />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider bg-surface-container-low text-secondary font-semibold px-2.5 py-1">
                    28g Protein / 0g Sugar
                  </span>
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                    FORMULA 01
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mb-2">
                  WHEY PROTEIN
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Grass-fed whey isolate, cold-filtered for maximum protein retention.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/40">
                <Link
                  href="/shop?category=Native+Whey+Isolates"
                  className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider font-semibold text-primary group-hover:text-secondary transition-colors"
                >
                  <span>Explore Whey</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            {/* Category Card 2 */}
            <div className="group bg-surface-container-lowest p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-outline-variant/40">
              <div>
                <div className="w-full aspect-[4/3] bg-surface-container-low overflow-hidden mb-6 flex items-center justify-center p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Micronized Creatine Monohydrate"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJd1ts64Gg57cxposALffxqiPfpKFiRdwHktNe_IGdKBmOQm101wdspdatsCAjENeobvD0kkixVqvXxSc-PZVCk-ixjQTImpPTtXgbW1HSpZ9Kg1VlI-Hit_SMkF1SItME_Tk3xG5rFJwDY4FiAzWuaau1NOF-NOn3js2Fynhfvt9n5j_B3aAvL56LTfsEw3aLCzf1xfXqZJGDM71c96HGEal67Ff3W3HaQfREn-rr"
                  />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider bg-surface-container-low text-secondary font-semibold px-2.5 py-1">
                    100% Creapure® Pure
                  </span>
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                    FORMULA 02
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mb-2">
                  CREATINE MONOHYDRATE
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Micronized Creapure® creatine for strength, power, and muscle recovery.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/40">
                <Link
                  href="/shop?category=Cellular+ATP+%26+Creatine"
                  className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider font-semibold text-primary group-hover:text-secondary transition-colors"
                >
                  <span>Explore Creatine</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            {/* Category Card 3 */}
            <div className="group bg-surface-container-lowest p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-outline-variant/40">
              <div>
                <div className="w-full aspect-[4/3] bg-surface-container-low overflow-hidden mb-6 flex items-center justify-center p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Mass Gainer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJd1ts64Gg57cxposALffxqiPfpKFiRdwHktNe_IGdKBmOQm101wdspdatsCAjENeobvD0kkixVqvXxSc-PZVCk-ixjQTImpPTtXgbW1HSpZ9Kg1VlI-Hit_SMkF1SItME_Tk3xG5rFJwDY4FiAzWuaau1NOF-NOn3js2Fynhfvt9n5j_B3aAvL56LTfsEw3aLCzf1xfXqZJGDM71c96HGEal67Ff3W3HaQfREn-rr"
                  />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider bg-surface-container-low text-secondary font-semibold px-2.5 py-1">
                    65g Carbs / 30g Protein
                  </span>
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                    FORMULA 03
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mb-2">
                  CLEAN MASS GAINERS
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  High-calorie blend with whole oats, sweet potato, and quality protein for lean gains.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/40">
                <Link
                  href="/shop?category=Recovery+%26+Adaptogens"
                  className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider font-semibold text-primary group-hover:text-secondary transition-colors"
                >
                  <span>Explore Gainers</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3. BEST-SELLING PRODUCTS
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface py-16 lg:py-24 px-gutter">
        <div className="max-w-[1360px] mx-auto">
          {/* Section Header with Category Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-space-lg">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
                TOP SELLERS
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-semibold tracking-tight mt-1">
                Best Sellers
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors ${
                    activeTab === tab
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-lowest text-on-surface-variant hover:text-primary border border-outline-variant/50"
                  }`}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md uppercase tracking-widest font-semibold transition-all border border-outline-variant shadow-sm"
            >
              <span>View All Products</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          4. PROMOTIONAL SEASON BANNER
          ────────────────────────────────────────────── */}
      <section className="w-full bg-[#171717] py-14 px-gutter text-surface-bright relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-xl">
          <div className="flex flex-col gap-space-sm text-center lg:text-left max-w-2xl">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2.5 h-2.5 bg-secondary-fixed" />
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed font-semibold">
                LIMITED TIME OFFER
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-surface-bright uppercase">
              15% OFF SUBSCRIPTIONS + FREE STEEL SHAKER
            </h2>
            <p className="font-body-md text-body-md text-surface-container-high leading-relaxed">
              Use code{" "}
              <span className="text-surface-bright font-semibold underline decoration-secondary underline-offset-4 tracking-wider">
                YODHA15
              </span>{" "}
              at checkout for 15% off your first order with free shipping.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-space-md shrink-0">
            <button
              onClick={handleCopyCoupon}
              className="px-5 py-3 bg-neutral-900 border border-neutral-700 hover:border-secondary transition-colors text-center group cursor-pointer"
              title="Click to copy and apply code"
              type="button"
            >
              <span className="font-label-sm text-label-sm uppercase text-outline tracking-widest block">
                {copiedCoupon ? "APPLIED TO BAG!" : "CLICK TO APPLY CODE"}
              </span>
              <span className="font-title-md text-title-md tracking-widest text-surface-bright font-mono font-bold group-hover:text-secondary-fixed transition-colors">
                YODHA15
              </span>
            </button>
            <button
              onClick={() => {
                applyCoupon("YODHA15");
                openCart();
              }}
              className="h-12 px-8 bg-surface-container-lowest hover:bg-surface text-primary font-label-md text-label-md uppercase tracking-widest font-semibold flex items-center justify-center transition-colors shadow-lg"
              type="button"
            >
              Apply & Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          5. BRAND TRUST & PURITY SECTION
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface py-16 lg:py-24 px-gutter">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
              QUALITY STANDARDS
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-semibold tracking-tight mt-1">
              WHY YODHA
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3">
              Every batch is independently tested. We use clean ingredients with full label transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="p-6 bg-surface-container-lowest flex flex-col justify-between border border-outline-variant/50">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-[24px]">
                    qr_code_scanner
                  </span>
                </div>
                <h3 className="font-title-md text-title-md font-semibold text-primary uppercase mb-2">
                  Batch COA Certified
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Each container has a QR code linking to its third-party lab test report.
                </p>
              </div>
              <div className="pt-4 mt-4 font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold border-t border-outline-variant/30">
                Lab Verified
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-surface-container-lowest flex flex-col justify-between border border-outline-variant/50">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-[24px]">
                    verified_user
                  </span>
                </div>
                <h3 className="font-title-md text-title-md font-semibold text-primary uppercase mb-2">
                  FSSAI &amp; Informed-Sport
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  FSSAI licensed and tested for banned substances under Informed-Sport standards.
                </p>
              </div>
              <div className="pt-4 mt-4 font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold border-t border-outline-variant/30">
                Zero Contaminants
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-surface-container-lowest flex flex-col justify-between border border-outline-variant/50">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-[24px]">
                    ac_unit
                  </span>
                </div>
                <h3 className="font-title-md text-title-md font-semibold text-primary uppercase mb-2">
                  Cold-Filtered Native
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Processed at low temperatures to preserve protein quality and nutrients.
                </p>
              </div>
              <div className="pt-4 mt-4 font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold border-t border-outline-variant/30">
                Sub-4°C Processing
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 bg-surface-container-lowest flex flex-col justify-between border border-outline-variant/50">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-[24px]">
                    recycling
                  </span>
                </div>
                <h3 className="font-title-md text-title-md font-semibold text-primary uppercase mb-2">
                  Eco-Refill Architecture
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Packaged in recyclable aluminum containers and eco-friendly bags.
                </p>
              </div>
              <div className="pt-4 mt-4 font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold border-t border-outline-variant/30">
                Eco-Friendly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          6. GYM & TRAINING CLUB INTRODUCTION
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-gutter border-y border-outline-variant/40">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Media Split (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden shadow-xl border border-outline-variant">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Brutalist Yodha Fitness Zone interior"
                className="w-full h-full object-cover grayscale-[10%]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGzbfhHC72ZBAr0QV_yU9DhJBkvpQWJXJPghHkF5Ik6IH77KUbLbxCq6l-J4IsWGBLurlggDdGzdKE4xAZzu_1T-AM0oRaqKZ_aC0iIZ5A78DGkOW0HrRH14rX9TlPXRV2iMLmwgJTgDMVG4419NClP3g1mcSrc6RjKXymi4PH8bUDq62uGuWuM1pAhrCLiTgpBAQmJlVVQo4G1kkz_FnQgPMirnR5K_WFA37YcYnE"
              />
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm p-4 border border-outline-variant/40">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-primary block">
                  FACILITY CAPACITY
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Strict Limit of 40 Active Members Per Slot
                </span>
              </div>
            </div>
          </div>

          {/* Content Split (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
              UNISEX GYM • CHARILAM, TRIPURA
            </span>
            <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-primary uppercase">
              YODHA FITNESS ZONE
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Equipped gym with weight training, cardio, transformation programs, and personal coaching.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                  fitness_center
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Movement Analysis
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Form coaching and technique assessment for safe, effective training.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                  thermostat
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Cold Plunge &amp; Sauna
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Cold plunge tubs and dry saunas for post-workout recovery.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                  science
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Nutrition Guidance
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    On-site nutrition consultations and supplement sampling.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest font-semibold text-primary hover:text-secondary transition-colors"
              >
                <span>Learn More</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          6.5 MEMBERSHIP PLANS & PASSES
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface-container-high/40 py-16 lg:py-24 px-gutter border-b border-outline-variant/40">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-space-md">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
                MEMBERSHIP PLANS
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-semibold tracking-tight mt-1">
                Train at Yodha
              </h2>
            </div>
            <Link
              href="/memberships"
              className="inline-flex items-center gap-1.5 font-label-md text-label-md uppercase tracking-wider font-semibold text-primary hover:text-secondary transition-colors"
            >
              <span>View All Plans &amp; Details</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Monthly */}
            <div className="bg-surface-container-lowest p-6 flex flex-col justify-between border border-outline-variant/40">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  1 MONTH
                </span>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mt-1 mb-3">
                  Monthly Pass
                </h3>
                <div className="mb-4">
                  <span className="font-mono text-3xl font-bold text-primary">₹1,200</span>
                  <span className="text-xs text-on-surface-variant font-body-sm"> / month</span>
                </div>
                <ul className="space-y-2 text-xs text-on-surface">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    <span>Weight Training &amp; Cardio floor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    <span>General trainer assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    <span>Locker &amp; changing room access</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/40">
                <Link
                  href="/memberships"
                  className="w-full h-11 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center transition-colors"
                >
                  Join Monthly
                </Link>
              </div>
            </div>

            {/* Quarterly (Most Popular) */}
            <div className="bg-surface-container-lowest p-6 flex flex-col justify-between border border-secondary ring-1 ring-secondary relative shadow-md">
              <span className="absolute -top-3 left-6 px-3 py-0.5 bg-secondary text-on-secondary font-label-sm text-[10px] uppercase font-bold tracking-widest">
                MOST POPULAR
              </span>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                  3 MONTHS
                </span>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mt-1 mb-3">
                  Quarterly Plan
                </h3>
                <div className="mb-4">
                  <span className="font-mono text-3xl font-bold text-primary">₹3,200</span>
                  <span className="text-xs text-secondary font-semibold font-mono ml-2">₹1,067/mo</span>
                </div>
                <ul className="space-y-2 text-xs text-on-surface">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    <span>All Monthly Pass privileges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    <span>Basic diet chart &amp; macro guidance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    <span>Monthly body composition checks</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/40">
                <Link
                  href="/memberships"
                  className="w-full h-11 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center transition-colors"
                >
                  Join Quarterly
                </Link>
              </div>
            </div>

            {/* Annual */}
            <div className="bg-surface-container-lowest p-6 flex flex-col justify-between border border-outline-variant/40">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  12 MONTHS
                </span>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mt-1 mb-3">
                  Annual Pass
                </h3>
                <div className="mb-4">
                  <span className="font-mono text-3xl font-bold text-primary">₹9,999</span>
                  <span className="text-xs text-secondary font-semibold font-mono ml-2">₹833/mo</span>
                </div>
                <ul className="space-y-2 text-xs text-on-surface">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    <span>365-day complete gym pass</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    <span>15% storewide supplement discount</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    <span>Free Yodha training tee &amp; shaker</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/40">
                <Link
                  href="/memberships"
                  className="w-full h-11 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center transition-colors"
                >
                  Join Annual
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          7. TESTIMONIALS / REVIEWS SECTION
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface py-16 lg:py-24 px-gutter">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-space-md">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
                REVIEWS
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-semibold tracking-tight mt-1">
                WHAT CUSTOMERS SAY
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-on-surface">
                4.9 / 5.0 RATING
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Review 1 */}
            <div className="p-8 bg-surface-container-lowest flex flex-col justify-between shadow-sm border border-outline-variant/50">
              <div>
                <div className="flex items-center gap-1 text-[#C59B27] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface italic leading-relaxed mb-6">
                  “Clean whey, no bloating, mixes easily. Lab reports are transparent.”
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container">
                <h4 className="font-title-md text-title-md font-semibold text-primary">
                  Dr. Rohit Sen
                </h4>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  Sports Nutritionist
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-8 bg-surface-container-lowest flex flex-col justify-between shadow-sm border border-outline-variant/50">
              <div>
                <div className="flex items-center gap-1 text-[#C59B27] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface italic leading-relaxed mb-6">
                  “Great creatine quality and fast delivery across India.”
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container">
                <h4 className="font-title-md text-title-md font-semibold text-primary">
                  Ananya Rao
                </h4>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  Powerlifter
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-8 bg-surface-container-lowest flex flex-col justify-between shadow-sm border border-outline-variant/50">
              <div>
                <div className="flex items-center gap-1 text-[#C59B27] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface italic leading-relaxed mb-6">
                  “Clean ingredients, great taste, and good energy throughout the day.”
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container">
                <h4 className="font-title-md text-title-md font-semibold text-primary">
                  Vikram Malhotra
                </h4>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  Runner
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          8. NEWSLETTER SUBSCRIPTION
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface-container-high py-16 lg:py-20 px-gutter border-t border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto text-center max-w-xl">
          <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold block mb-2">
            NEWSLETTER
          </span>
          <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-primary uppercase">
            STAY UPDATED
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
            New products, training tips, and exclusive offers. No spam.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              disabled={subscribed}
              className="w-full h-12 px-4 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm border border-outline-variant"
            />
            <button
              type="submit"
              disabled={subscribed}
              className={`w-full sm:w-auto h-12 px-8 font-label-md text-label-md uppercase tracking-wider font-semibold shrink-0 transition-colors ${
                subscribed
                  ? "bg-secondary text-on-secondary cursor-default"
                  : "bg-primary hover:bg-neutral-800 text-on-primary"
              }`}
            >
              {subscribed ? "SUBSCRIBED" : "Subscribe"}
            </button>
          </form>

          <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mt-4">
            Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}
