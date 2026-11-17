"use client";

import Link from "next/link";
import { useState } from "react";
import { PRODUCTS } from "@/lib/data/products";
import { formatINR } from "@/lib/utils";
import { ProductCard } from "@/components/store/ProductCard";

export default function FlagshipHomepage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
              YODHA FITNESS ZONE
            </span>
            <span className="text-outline-variant">/</span>
            <span>CHARILAM, TRIPURA</span>
          </div>
          <div className="flex items-center gap-space-md flex-wrap">
            <span>PAN-INDIA SHIPPING</span>
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
                fitness_center
              </span>
              <span className="font-label-sm text-label-sm uppercase font-semibold text-secondary tracking-widest">
                Charilam, Tripura
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
            </div>
          </div>

          {/* Right Visual (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden shadow-2xl border border-outline-variant">
              {/* TODO: Replace with the gym's real photos. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Gym training area"
                className="w-full h-full object-cover grayscale-[15%] contrast-105 hover:scale-105 transition-transform duration-700 ease-out"
                src="/images/placeholder-gym.svg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

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
              Sports supplements and fitness essentials available for pan-India delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Category Card 1 */}
            <div className="group bg-surface-container-lowest p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-outline-variant/40">
              <div>
                <div className="w-full aspect-[4/3] bg-surface-container-low overflow-hidden mb-6 flex items-center justify-center p-4">
                  {/* TODO: Replace with the gym's real photos. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Gym training area"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    src="/images/placeholder-gym.svg"
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mb-2">
                  PROTEIN
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Protein supplements to support daily recovery and strength training.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/40">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider font-semibold text-primary group-hover:text-secondary transition-colors"
                >
                  <span>Explore Products</span>
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
                  {/* TODO: Replace with the gym's real photos. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Gym training area"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    src="/images/placeholder-gym.svg"
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mb-2">
                  STRENGTH &amp; PERFORMANCE
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Pre-workout and creatine supplements designed for endurance and workout performance.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/40">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider font-semibold text-primary group-hover:text-secondary transition-colors"
                >
                  <span>Explore Products</span>
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
                  {/* TODO: Replace with the gym's real photos. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Gym training area"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    src="/images/placeholder-gym.svg"
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mb-2">
                  FITNESS ESSENTIALS
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Accessories, shakers, and training gear for your fitness routine.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/40">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider font-semibold text-primary group-hover:text-secondary transition-colors"
                >
                  <span>Explore Products</span>
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
          3. FEATURED PRODUCTS
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface py-16 lg:py-24 px-gutter">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-space-lg">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
                PRODUCTS
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-semibold tracking-tight mt-1">
                Featured Products
              </h2>
            </div>
          </div>

          {/* Product Cards Grid */}
          {PRODUCTS.filter((p) => p.status === "active").length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.filter((p) => p.status === "active").map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-surface-container-lowest border border-outline-variant space-y-3">
              <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary">
                Storefront Catalog Launching Soon
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                Supplements and fitness gear catalog is currently being prepared. Check back shortly or visit us at Charilam.
              </p>
            </div>
          )}

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
          4. GYM FACILITY & TRAINING INTRODUCTION
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-gutter border-y border-outline-variant/40">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Media Split (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden shadow-xl border border-outline-variant">
              {/* TODO: Replace with the gym's real photos. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Gym training area"
                className="w-full h-full object-cover grayscale-[10%]"
                src="/images/placeholder-gym.svg"
              />
              <div className="absolute inset-0 bg-primary/20" />
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
              Unisex gym in Charilam, Tripura. Weight training, cardio workouts, transformation programs, diet guidance, and personal training for men and women, beginner-friendly.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                  fitness_center
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Weight Training
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Dedicated free weights and strength equipment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                  directions_run
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Cardio Workouts
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Cardio equipment for endurance and conditioning.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                  trending_up
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Transformation Programs
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Structured plans designed for body composition and fitness goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                  restaurant
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Diet Guidance
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Practical nutrition and meal planning aligned with your targets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">
                  sports_martial_arts
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Personal Training
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    One-on-one coaching for technique, motivation, and results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          5. REVIEWS / GOOGLE RATING SECTION
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface py-12 px-gutter border-b border-outline-variant/40">
        <div className="max-w-[1360px] mx-auto text-center">
          <p className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant font-semibold">
            Rated 5.0★ on Google (12 reviews)
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          6. NEWSLETTER SUBSCRIPTION
          ────────────────────────────────────────────── */}
      <section className="w-full bg-surface-container-high py-16 lg:py-20 px-gutter">
        <div className="max-w-[1360px] mx-auto text-center max-w-xl">
          <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold block mb-2">
            NEWSLETTER
          </span>
          <h2 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-primary uppercase">
            STAY UPDATED
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
            Updates on products, training, and gym announcements.
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
