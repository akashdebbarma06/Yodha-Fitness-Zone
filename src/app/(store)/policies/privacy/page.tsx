import Link from "next/link";

export default function PrivacyPolicyPage() {
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
          <span className="text-primary font-semibold">Privacy Policy</span>
        </nav>
        <h1 className="font-headline-lg text-headline-lg uppercase font-semibold text-primary">
          Privacy Policy
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          Last updated: November 2026 • Yodha Fitness Zone
        </p>
      </div>

      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant leading-relaxed">
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            1. Overview
          </h2>
          <p>
            Yodha Fitness Zone (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates a unisex fitness facility and sports nutrition store based at NH08 near Tripura Gramin Bank, Charilam, Tripura 799103. This Privacy Policy details how we collect, handle, and protect your personal information when you use our website or purchase supplements.
          </p>
        </section>

        {/* Section 2: Information We Collect */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            2. Information We Collect
          </h2>
          <p>
            We collect only the essential information necessary to provide products, services, and communication:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong>Identity &amp; Contact Details:</strong> Full name, mobile phone number, and email address when you create an account, log in with OTP, or contact us.
            </li>
            <li>
              <strong>Delivery Information:</strong> Shipping address, delivery city, state, and postal pincode required to dispatch your orders.
            </li>
          </ul>
        </section>

        {/* Section 3: Why We Collect Your Information */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            3. Purpose of Processing
          </h2>
          <p>
            Your information is used strictly for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Processing orders, generating shipping labels, and completing parcel deliveries.</li>
            <li>Sending essential service notifications such as order confirmations, tracking numbers, and account OTPs.</li>
            <li>Responding to customer support questions and handling returns or exchanges.</li>
            <li>Complying with statutory accounting and tax regulations in India.</li>
          </ul>
        </section>

        {/* Section 4: Payment Data & Security */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            4. Payment Security (Razorpay)
          </h2>
          <p>
            We take your financial security with utmost seriousness. All online payments on our platform are processed securely via <strong>Razorpay</strong>, an RBI-authorized payment aggregator compliant with PCI-DSS Level 1 standards.
          </p>
          <p>
            <strong>We do not capture, process, or store your credit/debit card numbers, CVVs, netbanking credentials, or UPI MPINs on our servers.</strong> All sensitive financial information is encrypted and transmitted directly to Razorpay during checkout.
          </p>
        </section>

        {/* Section 5: Data Sharing & Protection */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            5. Data Sharing &amp; Non-Disclosure
          </h2>
          <p>
            <strong>We never sell, rent, monetize, or trade your personal information to third parties, data brokers, or advertising networks.</strong>
          </p>
          <p>
            We share relevant customer data only with trusted service providers necessary to operate our business:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong>Logistics &amp; Courier Partners:</strong> Name, delivery address, and contact number shared solely to deliver physical packages.
            </li>
            <li>
              <strong>Payment Gateway (Razorpay):</strong> Transaction totals and order identifiers shared to authenticate payments and process refunds.
            </li>
            <li>
              <strong>Legal Authorities:</strong> Only when strictly mandated by Indian law, court order, or regulatory inquiry.
            </li>
          </ul>
        </section>

        {/* Section 6: Data Retention & Your Rights */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            6. Retention &amp; Customer Rights
          </h2>
          <p>
            We retain transaction records for the duration required by applicable commercial and tax laws. You may request access to, correction of, or deletion of your profile details at any time by calling our team directly.
          </p>
        </section>

        {/* Section 7: Contact Information */}
        <section className="space-y-3 border-t border-outline-variant/60 pt-6">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            7. Contact for Privacy Inquiries
          </h2>
          <p>
            If you have any questions or concerns regarding our privacy practices or your data, please contact us:
          </p>
          <p className="text-primary font-semibold">
            Yodha Fitness Zone<br />
            Phone: +91 87987 03787 (Hours: 5:30 AM – 10:30 PM, Thursday Closed)<br />
            Facility: NH08 near Tripura Gramin Bank, Charilam, Tripura 799103
          </p>
        </section>
      </div>
    </main>
  );
}
