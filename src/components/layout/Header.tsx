"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useAuth } from "@/hooks/useAuth";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Memberships", path: "/memberships" },
  { label: "About Gym", path: "/about" },
  { label: "Track Order", path: "/track" },
  { label: "Contact", path: "/contact" },
];

export function Header() {
  const { itemCount, toggleCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Announcement Bar */}
      <div className="bg-primary-container text-surface-bright border-b border-primary py-space-xs px-gutter">
        <div className="max-w-[1360px] mx-auto flex items-center justify-center text-center">
          <p className="font-body text-label-sm tracking-[0.1em] uppercase font-semibold text-surface-container-high">
            PAN-INDIA DELIVERY
          </p>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="h-20 bg-surface/90 backdrop-blur-md border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto h-full px-gutter flex items-center justify-between gap-space-lg">
          {/* Logo */}
          <div className="flex items-center gap-space-md shrink-0">
            <Link href="/" className="flex flex-col">
              <span className="font-heading text-headline-sm uppercase tracking-tight text-on-surface font-semibold leading-none">
                YODHA
              </span>
              <span className="text-[9px] font-label-sm uppercase tracking-[0.22em] text-secondary font-bold">
                FITNESS ZONE
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-space-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.path}
                className="font-body text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
            {/* Search Link */}
            <Link
              href="/search"
              className="hidden md:flex items-center gap-space-xs bg-surface-container-low border border-outline-variant px-space-sm py-1.5 text-on-surface-variant cursor-pointer hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="font-body text-body-sm text-outline pr-space-md select-none">
                Search supplements...
              </span>
            </Link>

            {/* Currency Badge */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-surface-container-low border border-outline-variant text-on-surface">
              <span className="font-body text-label-sm font-semibold tracking-wider">₹ INR</span>
            </div>

            {/* Account: /account if authenticated, /login if unauthenticated */}
            <Link
              href={isAuthenticated ? "/account" : "/login"}
              className="w-9 h-9 flex items-center justify-center border border-outline-variant hover:border-primary transition-colors text-on-surface relative"
              title={isAuthenticated ? (user?.fullName || "Account") : "Sign In"}
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              {isAuthenticated && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary ring-1 ring-surface" title="Active Session" />
              )}
            </Link>

            {/* Cart / Bag */}
            <button
              onClick={toggleCart}
              className="h-9 px-3 flex items-center gap-2 bg-surface-container-lowest border border-outline-variant hover:border-primary transition-colors text-on-surface"
            >
              <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
              <span className="font-body text-label-sm font-semibold">BAG</span>
              {itemCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 bg-secondary text-on-secondary text-[11px] font-semibold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 flex items-center justify-center border border-outline-variant"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface border-b border-outline-variant shadow-lg">
          <nav className="max-w-[1360px] mx-auto px-gutter py-space-lg flex flex-col gap-space-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="font-body text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface py-2 transition-colors border-b border-hairline"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="font-body text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface py-2 transition-colors border-b border-hairline flex items-center justify-between"
            >
              <span>Track Order</span>
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </Link>

            <Link
              href={isAuthenticated ? "/account" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="font-body text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface py-2 transition-colors border-b border-hairline flex items-center justify-between"
            >
              <span>{isAuthenticated ? (user?.fullName || "My Account") : "Sign In"}</span>
              <span className="material-symbols-outlined text-[18px]">person</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
