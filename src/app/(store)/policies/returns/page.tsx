import Link from "next/link";

export default function ReturnsPolicyPage() {
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
          <span className="text-primary font-semibold">Refund &amp; Cancellation</span>
        </nav>
        <h1 className="font-headline-lg text-headline-lg uppercase font-semibold text-primary">
          Refund, Return &amp; Cancellation Policy
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          Last updated: November 2026 • Yodha Fitness Zone
        </p>
      </div>

      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant leading-relaxed">
        {/* Section 1: Physical Supplement Returns */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            1. Supplement Returns &amp; Eligibility
          </h2>
          <p>
            Nutritional supplements, protein powders, and consumable fitness formulas are health and safety sensitive goods. To guarantee product hygiene, authenticity, and consumer health, returns are subject to the following conditions:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong>Sealed &amp; Unopened Only:</strong> Supplements are eligible for return only if the outer protective seal, cap seal, batch label, and all original manufacturer packaging remain completely intact, sealed, and untampered.
            </li>
            <li>
              <strong>Return Window:</strong> Eligible return requests must be initiated within [PLACEHOLDER — ask the gym: return request window, e.g. 7 days] from the date of recorded delivery.
            </li>
            <li>
              <strong>Non-Returnable Items:</strong> Any product that has been opened, unsealed, partially consumed, or where the tamper-evident seal is broken or compromised cannot be returned or refunded under any circumstances.
            </li>
          </ul>
        </section>

        {/* Section 2: Damaged, Defective or Wrong Items */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            2. Damaged, Defective, or Incorrect Shipments
          </h2>
          <p>
            We take utmost care in packaging orders. In the rare event that you receive a parcel with visible transit damage, leakage, broken seals, or an incorrect item:
          </p>
          <ol className="list-decimal pl-6 space-y-1.5">
            <li>
              Contact Yodha Fitness Zone within [PLACEHOLDER — ask the gym: damage reporting window, e.g. 48 hours] of receiving the package at +91 87987 03787.
            </li>
            <li>
              Provide your Order ID, along with clear photographs or an unboxing video showing the shipping label and condition of the received goods.
            </li>
            <li>
              Upon verification, we will arrange a reverse pickup or courier replacement at zero additional charge to you. If a replacement unit is out of stock, a full refund will be initiated immediately.
            </li>
          </ol>
        </section>

        {/* Section 3: Order Cancellation */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            3. Order Cancellation
          </h2>
          <p>
            You may request cancellation of a physical product order at any time before the parcel has been dispatched from our facility. Once an order is handed over to the courier partner and an AWB has been generated, cancellation is no longer possible; the standard return guidelines will apply upon receipt.
          </p>
        </section>

        {/* Section 4: Refund Method & Timelines */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            4. Refund Route &amp; Credit Timeline
          </h2>
          <p>
            All approved refunds are routed directly to the original payment source (UPI account, debit/credit card, or netbanking bank account) through our payment partner, Razorpay.
          </p>
          <p>
            Once a return is received and inspected at our Charilam center (or upon cancellation confirmation), the refund is processed within [PLACEHOLDER — ask the gym: refund processing turnaround, e.g. 2–3 business days]. Depending on your bank’s settlement cycle, the funds generally reflect in your account within [PLACEHOLDER — ask the gym: bank settlement window, e.g. 5–7 business days].
          </p>
        </section>

        {/* Section 5: Support Contact */}
        <section className="space-y-3 border-t border-outline-variant/60 pt-6">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            5. How to Request Assistance
          </h2>
          <p>
            To initiate a return, report transit damage, or inquire about a refund, please reach out to us:
          </p>
          <p className="text-primary font-semibold">
            Yodha Fitness Zone<br />
            Phone: +91 87987 03787 (Hours: 5:30 AM – 10:30 PM, Thursday Closed)<br />
            Address: NH08 near Tripura Gramin Bank, Charilam, Tripura 799103
          </p>
        </section>
      </div>
    </main>
  );
}
