import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col bg-surface">
      {/* ── Header ── */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-gutter border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-surface-container-high px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-secondary border border-outline-variant/60">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            About Us
          </div>
          <h1 className="font-display-xl text-display-xl uppercase tracking-tighter text-primary font-semibold leading-[1.05]">
            Yodha Fitness Zone
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            A unisex gym in Charilam, Tripura — offering weight training, cardio, transformation programs, personal training, and sports supplements delivered across India.
          </p>
        </div>
      </section>

      {/* ── 1. Facility ── */}
      <section className="w-full py-16 lg:py-24 px-gutter border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
              OUR GYM
            </span>
            <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary font-semibold">
              Training Facility
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Fully equipped gym with dedicated zones for weight training, cardio, and functional fitness.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-surface-container-lowest border border-outline-variant flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">
                  fitness_center
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Weight Training
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Free weights, machines, and dedicated lifting area.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-surface-container-lowest border border-outline-variant flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">
                  cardiology
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Cardio Zone
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Treadmills, cycles, and cardio equipment for endurance training.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-surface-container-lowest border border-outline-variant flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">
                  restaurant
                </span>
                <div>
                  <h4 className="font-title-md text-title-md font-semibold text-primary">
                    Diet Guidance
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Personalized diet plans and nutrition advice for your fitness goals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-surface-container-low overflow-hidden shadow-2xl border border-outline-variant">
              {/* TODO: Replace with the gym's real photos. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/placeholder-gym.jpg"
                alt="Gym training area"
                className="w-full h-full object-cover grayscale-[10%]"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur p-4 border border-outline-variant/60 flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
                    LOCATION
                  </span>
                  <span className="font-title-md text-title-md font-semibold text-primary">
                    NH08, Charilam, Tripura 799103
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-secondary text-on-secondary text-xs uppercase font-bold">
                  5:30 AM – 10:30 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Services & Info ── */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-gutter border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
              SERVICES
            </span>
            <h2 className="font-headline-lg text-headline-lg uppercase text-primary font-semibold tracking-tight mt-1">
              What We Offer
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3">
              Training programs, personal coaching, and quality sports supplements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden flex items-center justify-center p-8">
                <span className="material-symbols-outlined text-[64px] text-secondary">
                  fitness_center
                </span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  Training
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mt-0.5">
                  Transformation Programs
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  Structured programs for weight loss, muscle gain, and overall fitness improvement.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden flex items-center justify-center p-8">
                <span className="material-symbols-outlined text-[64px] text-secondary">
                  person
                </span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  Coaching
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mt-0.5">
                  Personal Training
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  One-on-one coaching sessions with guided workouts and progress tracking.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden flex items-center justify-center p-8">
                <span className="material-symbols-outlined text-[64px] text-secondary">
                  shopping_bag
                </span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  Store
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mt-0.5">
                  Sports Supplements
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  Protein, creatine, and recovery supplements available online with India-wide delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Gym Details ── */}
      <section className="w-full py-16 lg:py-24 px-gutter border-b border-outline-variant/60">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-md text-label-md uppercase tracking-[0.14em] text-secondary font-semibold">
              DETAILS
            </span>
            <h2 className="font-headline-lg text-headline-lg uppercase text-primary font-semibold tracking-tight mt-1">
              Visit Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-surface-container-lowest border border-outline-variant text-center">
              <span className="material-symbols-outlined text-secondary text-[28px] mb-3">
                location_on
              </span>
              <h4 className="font-title-md text-title-md font-semibold text-primary mb-1">Address</h4>
              <p className="text-sm text-on-surface-variant">
                NH08, near Tripura Gramin Bank<br />
                Charilam, Tripura 799103
              </p>
            </div>

            <div className="p-6 bg-surface-container-lowest border border-outline-variant text-center">
              <span className="material-symbols-outlined text-secondary text-[28px] mb-3">
                schedule
              </span>
              <h4 className="font-title-md text-title-md font-semibold text-primary mb-1">Hours</h4>
              <p className="text-sm text-on-surface-variant">
                Mon–Wed, Fri–Sun: 5:30 AM – 10:30 PM<br />
                Thursday: Closed
              </p>
            </div>

            <div className="p-6 bg-surface-container-lowest border border-outline-variant text-center">
              <span className="material-symbols-outlined text-secondary text-[28px] mb-3">
                call
              </span>
              <h4 className="font-title-md text-title-md font-semibold text-primary mb-1">Contact</h4>
              <p className="text-sm text-on-surface-variant">
                +91 87987 03787<br />
                @yodhafitnesszone_yfz
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Bottom CTA ── */}
      <section className="w-full py-16 px-gutter text-center bg-surface">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="font-headline-lg text-headline-lg uppercase font-semibold text-primary">
            Start Training
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Visit the gym or shop supplements online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto h-12 px-8 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center transition-colors border border-outline-variant"
            >
              Shop Supplements
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
