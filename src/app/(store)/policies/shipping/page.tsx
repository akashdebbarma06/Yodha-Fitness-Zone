import Link from "next/link";

export default function ShippingPolicyPage() {
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
          <span className="text-primary font-semibold">Shipping Policy</span>
        </nav>
        <h1 className="font-headline-lg text-headline-lg uppercase font-semibold text-primary">
          Shipping &amp; Delivery Policy
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          Last updated: November 2026 • Yodha Fitness Zone
        </p>
      </div>

      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant leading-relaxed">
        {/* Section 1: Dispatch Origin & Coverage */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            1. Dispatch Origin &amp; Service Coverage
          </h2>
          <p>
            All physical orders placed on the Yodha Fitness Zone storefront are packed and dispatched directly from our facility located at:
          </p>
          <div className="p-4 bg-surface-container-lowest border border-outline-variant font-mono text-sm text-primary">
            Yodha Fitness Zone<br />
            NH08 near Tripura Gramin Bank, Charilam<br />
            Tripura 799103, India<br />
            Contact: +91 87987 03787
          </div>
          <p>
            We provide pan-India delivery across serviceable pin codes through authorized domestic courier and postal partners.
          </p>
        </section>

        {/* Section 2: Order Processing & Dispatch Timelines */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            2. Processing &amp; Dispatch Timeline
          </h2>
          <p>
            Orders are reviewed and packed once payment is successfully confirmed. Standard dispatch takes place within [PLACEHOLDER — ask the gym: dispatch timeline, e.g. 1–2 business days] of order placement.
          </p>
          <p>
            Please note that our physical facility operates Friday through Wednesday (5:30 AM to 10:30 PM) and is <strong>closed on Thursdays</strong>. Orders placed on Thursdays or national public holidays are scheduled for dispatch on the following business day.
          </p>
        </section>

        {/* Section 3: Estimated Delivery Timelines */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            3. Estimated Delivery Timelines
          </h2>
          <p>
            Estimated transit and delivery times depend on the destination pincode:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong>Tripura &amp; Northeast Region:</strong> Typically delivered within [PLACEHOLDER — ask the gym: local/regional delivery timeline, e.g. 2–4 business days] from dispatch.
            </li>
            <li>
              <strong>Metro &amp; Rest of India:</strong> Typically delivered within [PLACEHOLDER — ask the gym: national delivery timeline, e.g. 4–7 business days] from dispatch.
            </li>
            <li>
              <strong>Remote or Special Service Locations:</strong> Deliveries may require additional transit time depending on courier linehaul schedules.
            </li>
          </ul>
        </section>

        {/* Section 4: Shipping Charges */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            4. Shipping Charges
          </h2>
          <p>
            Applicable shipping charges are calculated during checkout based on the total order weight, volume, and destination pincode. Any active promotional shipping offers will be displayed prior to payment confirmation.
          </p>
        </section>

        {/* Section 5: Order Tracking */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            5. Order Tracking
          </h2>
          <p>
            As soon as your shipment is handed over to the courier partner, an Air Waybill (AWB) number and tracking link will be shared with you via SMS or email. You can also monitor your shipment status anytime via our website tracking page using your Order ID.
          </p>
        </section>

        {/* Section 6: Delivery Attempts & Address Accuracy */}
        <section className="space-y-3">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            6. Delivery Attempts &amp; Address Verification
          </h2>
          <p>
            The assigned courier partner will attempt delivery up to [PLACEHOLDER — ask the gym: maximum delivery attempts, e.g. 3 attempts] before returning the parcel to our Charilam center. Customers are requested to ensure accurate address details and a reachable mobile contact number during checkout to prevent delivery delays.
          </p>
        </section>

        {/* Section 7: Inquiries & Support */}
        <section className="space-y-3 border-t border-outline-variant/60 pt-6">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary">
            7. Contact for Shipping Queries
          </h2>
          <p>
            For any questions regarding shipping status, dispatch, or address corrections, please contact us directly:
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
