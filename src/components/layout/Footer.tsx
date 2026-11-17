import Link from "next/link";

const SHOP_CATEGORIES = [
  "Whey Protein",
  "Creatine Monohydrate",
  "Clean Mass Gainers",
  "Electrolytes & Hydration",
  "Recovery Supplements",
];

const CUSTOMER_LINKS = [
  { label: "Shipping Policy", href: "/policies/shipping" },
  { label: "Refund & Cancellation", href: "/policies/returns" },
  { label: "Track Your Order", href: "/track" },
  { label: "Terms of Service", href: "/policies/terms" },
  { label: "Privacy Policy", href: "/policies/privacy" },
];

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-hairline">
      {/* Main Footer Grid */}
      <div className="max-w-[1360px] mx-auto px-gutter py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-heading text-headline-sm uppercase tracking-tight text-on-surface font-semibold leading-none">
                YODHA
              </span>
              <span className="text-[9px] font-label-sm uppercase tracking-[0.22em] text-on-surface-variant font-medium">
                FITNESS ZONE
              </span>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
              Unisex gym, training programs, and sports nutrition in Charilam, Tripura. Delivering supplements India-wide.
            </p>
            <p className="text-xs text-on-surface-variant font-light">
              Rated 5.0★ on Google (12 reviews) · Delivering supplements across India.
            </p>
          </div>

          {/* Shop Categories (3 cols) */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-heading text-title-md font-semibold uppercase tracking-wider text-on-surface mb-4">
              Shop Categories
            </h3>
            <ul className="space-y-2">
              {SHOP_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href="/shop"
                    className="font-body text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care & Legal (4 cols) */}
          <div className="md:col-span-3 lg:col-span-4">
            <h3 className="font-heading text-title-md font-semibold uppercase tracking-wider text-on-surface mb-4">
              Customer Care &amp; Legal
            </h3>
            <ul className="space-y-2">
              {CUSTOMER_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-body text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-hairline">
        <div className="max-w-[1360px] mx-auto px-gutter py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-label-sm text-outline uppercase tracking-wider text-center sm:text-left">
            © 2026 YODHA FITNESS ZONE ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
