import Link from "next/link";

const SHOP_CATEGORIES = [
  "Whey Protein",
  "Creatine Monohydrate",
  "Clean Mass Gainers",
  "Electrolytes & Hydration",
  "Recovery Supplements",
];

const TRAINING_LINKS = [
  "Weight Training",
  "Cardio Zone",
  "Personal Training",
  "Transformation Programs",
  "Diet Guidance",
];

const CUSTOMER_LINKS = [
  { label: "Shipping Policy", href: "/policies/shipping" },
  { label: "Quality & Testing", href: "/about" },
  { label: "Track Your Order", href: "/track" },
  { label: "Terms of Service", href: "/policies/terms" },
  { label: "Privacy Policy", href: "/policies/privacy" },
];

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-hairline">
      {/* Main Footer Grid */}
      <div className="max-w-[1360px] mx-auto px-gutter py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-space-md mb-4">
              <span className="font-heading text-headline-sm uppercase tracking-tight text-on-surface font-semibold">
                YODHA FITNESS ZONE
              </span>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant leading-relaxed mb-6">
              Unisex gym, training programs, and sports nutrition in Charilam, Tripura. Delivering supplements India-wide.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-surface-container border border-outline-variant text-label-sm uppercase tracking-wider font-semibold text-on-surface-variant">
                5.0★ RATED GYM
              </span>
              <span className="px-2 py-1 bg-surface-container border border-outline-variant text-label-sm uppercase tracking-wider font-semibold text-on-surface-variant">
                PAN-INDIA DELIVERY
              </span>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
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

          {/* Training Club & Gym */}
          <div>
            <h3 className="font-heading text-title-md font-semibold uppercase tracking-wider text-on-surface mb-4">
              Training Club & Gym
            </h3>
            <ul className="space-y-2">
              {TRAINING_LINKS.map((item) => (
                <li key={item}>
                  <Link
                    href="/about"
                    className="font-body text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care & Legal */}
          <div>
            <h3 className="font-heading text-title-md font-semibold uppercase tracking-wider text-on-surface mb-4">
              Customer Care & Legal
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
        <div className="max-w-[1360px] mx-auto px-gutter py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-label-sm text-outline uppercase tracking-wider text-center sm:text-left">
            © 2026 YODHA FITNESS ZONE ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
            {["UPI", "RAZORPAY", "RUPAY", "VISA", "MASTERCARD"].map((badge) => (
              <span
                key={badge}
                className="px-2 py-1 bg-surface-container border border-outline-variant text-label-sm uppercase tracking-wider font-semibold text-on-surface-variant"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
