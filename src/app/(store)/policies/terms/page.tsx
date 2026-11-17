import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-gutter space-y-8">
      {/* Header */}
      <div className="border-b border-outline-variant/60 pb-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-3"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-semibold">Terms of Service</span>
        </nav>
        <h1 className="font-headline-lg text-headline-lg uppercase font-semibold text-primary">
          Terms of Service
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          Last updated: November 2026 • Yodha Fitness Zone
        </p>
      </div>

      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant leading-relaxed">
        {/* Section 1: Business Identity */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            1. Business Identity &amp; Acceptance of Terms
          </h2>
          <p>
            This website is owned and operated by <strong>Yodha Fitness Zone</strong>, a unisex fitness facility and supplement retailer situated at:
          </p>
          <div className="p-4 bg-surface-container-lowest border border-outline-variant font-mono text-sm text-primary">
            Yodha Fitness Zone<br />
            NH08 near Tripura Gramin Bank, Charilam<br />
            Tripura 799103, India<br />
            Phone: +91 87987 03787
          </div>
          <p>
            By accessing our website, browsing our product catalog, or purchasing supplements, you agree to be bound by these Terms of Service and our associated store policies.
          </p>
        </section>

        {/* Section 2: Products & Pricing */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            2. Products, Pricing &amp; Orders
          </h2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong>Currency &amp; Taxes:</strong> All prices shown on our website are stated in Indian Rupees (₹ / INR) and include applicable taxes unless specified otherwise at checkout.
            </li>
            <li>
              <strong>Pricing &amp; Inventory Accuracy:</strong> We endeavor to ensure accurate stock quantities and pricing. In case of an unintentional pricing error or inventory stockout, we reserve the right to cancel the order and provide a full refund.
            </li>
            <li>
              <strong>Payments:</strong> Payments are processed securely via Razorpay. Orders are confirmed only upon successful payment authorization or verified cash on delivery (where available).
            </li>
          </ul>
        </section>

        {/* Section 3: Gym Facility & In-Person Services */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            3. Gym Facility &amp; In-Person Services
          </h2>
          <p>
            Yodha Fitness Zone offers in-facility training disciplines including weight training, cardio, transformation programs, diet guidance, and personal training:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong>Operating Hours:</strong> Facility access is available Friday through Wednesday from 5:30 AM to 10:30 PM. The gym is <strong>closed on Thursdays</strong> for maintenance.
            </li>
            <li>
              <strong>Facility Safety:</strong> Visitors and trainees agree to follow gym etiquette, re-rack weights, maintain personal hygiene, and use gym equipment safely.
            </li>
          </ul>
        </section>

        {/* Section 4: Supplement Disclaimer */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            4. Dietary Supplement Disclaimer
          </h2>
          <p>
            Nutritional supplements, protein powders, and performance products sold through our store are intended for general fitness and nutritional support. They are not medicinal drugs and are not formulated to diagnose, treat, cure, or prevent any illness or disease. Individuals with existing health conditions, pregnant or lactating women, or minors should consult a certified physician before consuming dietary supplements.
          </p>
        </section>

        {/* Section 5: Governing Law & Jurisdiction */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            5. Governing Law &amp; Dispute Resolution
          </h2>
          <p>
            These Terms, all transactions, and any dispute or claim arising out of or related to this website or services shall be governed by and interpreted in accordance with the laws of <strong>India</strong>.
          </p>
          <p>
            Any disputes arising between you and Yodha Fitness Zone shall be subject to the exclusive jurisdiction of the competent courts in <strong>Tripura, India</strong>.
          </p>
        </section>

        {/* Section 6: Contact Information */}
        <section className="space-y-3 border-t border-outline-variant/60 pt-6">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            6. Inquiries &amp; Customer Support
          </h2>
          <p>
            If you have any questions regarding these Terms of Service, please contact our management team:
          </p>
          <p className="text-primary font-semibold">
            Yodha Fitness Zone<br />
            NH08 near Tripura Gramin Bank, Charilam, Tripura 799103<br />
            Phone: +91 87987 03787 (Hours: 5:30 AM – 10:30 PM, Thursday Closed)
          </p>
        </section>
      </div>
    </main>
  );
}
