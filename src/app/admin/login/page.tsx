"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAdminAuth, getAdminAuth, AdminAuthSession } from "@/lib/auth/mock-auth";

type SimState = "default" | "validation-error" | "auth-error" | "loading" | "2fa-success";

export default function AdminLoginPage() {
  const router = useRouter();
  const [simState, setSimState] = useState<SimState>("default");
  const [email, setEmail] = useState("arjun@yodhafitnesszone.com");
  const [password, setPassword] = useState("••••••••••••••••");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingSession, setExistingSession] = useState<AdminAuthSession | null>(null);

  useEffect(() => {
    setExistingSession(getAdminAuth());
  }, []);

  const handleSimChange = (state: SimState) => {
    setSimState(state);
    if (state === "loading") {
      setIsSubmitting(true);
    } else if (state === "2fa-success") {
      setIsSubmitting(false);
      setAdminAuth({
        email: email || "arjun@yodhafitnesszone.com",
        name: "Arjun Sharma",
        role: "owner",
      });
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 700);
    } else {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (simState === "auth-error") return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSimState("2fa-success");
      setAdminAuth({
        email: email || "arjun@yodhafitnesszone.com",
        name: "Arjun Sharma",
        role: "owner",
      });
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 700);
    }, 600);
  };


  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col justify-between selection:bg-secondary/20">
      {/* Top Bar */}
      <header className="w-full max-w-[1360px] mx-auto px-gutter py-6 flex items-center justify-between border-b border-outline-variant/60">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">
            arrow_back
          </span>
          <span>Back to Storefront</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
            YODHA
          </span>
          <span className="font-label-sm text-label-sm uppercase px-2 py-0.5 bg-secondary text-on-secondary font-bold">
            SECURE OPS CONSOLE
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-secondary">
            lock
          </span>
          <span className="hidden sm:inline uppercase tracking-wider text-xs font-mono font-semibold">
            256-Bit Encrypted
          </span>
        </div>
      </header>

      {/* Main Center */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-gutter py-12">
        {/* Interactive State Simulator Bar */}
        <div className="w-full max-w-[720px] mb-8">
          <div className="bg-surface-container-low p-3 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 border border-outline-variant/60">
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[18px] text-secondary">
                tune
              </span>
              <span>State Simulator:</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {(
                [
                  ["default", "Default Live"],
                  ["validation-error", "Validation Error"],
                  ["auth-error", "Auth Failed"],
                  ["loading", "Loading"],
                  ["2fa-success", "2FA / Success"],
                ] as const
              ).map(([state, label]) => (
                <button
                  key={state}
                  onClick={() => handleSimChange(state)}
                  type="button"
                  className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold transition-all ${
                    simState === state
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-high text-on-surface hover:bg-surface-container border border-outline-variant/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Existing Session Notice */}
        {existingSession && (
          <div className="w-full max-w-[440px] mb-4 p-3 bg-secondary/10 border border-secondary/30 flex items-center justify-between text-xs">
            <span className="text-on-surface">
              Session active: <strong className="font-semibold text-secondary">{existingSession.name}</strong>
            </span>
            <Link
              href="/admin/dashboard"
              className="text-secondary font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              <span>Dashboard</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        )}

        {/* 440px Admin Auth Card */}
        <div className="w-full max-w-[440px] bg-surface-container-lowest p-8 sm:p-10 border border-outline-variant shadow-xl space-y-6 relative">
          {/* Card Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-headline-md text-headline-sm uppercase tracking-tight text-primary font-bold">
                  YODHA
                </span>
                <span className="text-on-surface-variant font-label-sm text-label-sm tracking-widest pl-1">
                  / ROOT SECURE
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/15 text-secondary font-label-sm text-label-sm uppercase tracking-wider font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                BLR-NODE-01
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md tracking-tight text-primary font-semibold">
              Console Sign In
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Authenticate root credentials to access warehouse inventory &amp; operations ledger.
            </p>
          </div>

          {/* Validation Error Banner */}
          {simState === "validation-error" && (
            <div className="bg-error/10 text-error p-3.5 border border-error/30 flex items-start gap-2 text-xs">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">
                error
              </span>
              <div>
                <strong className="uppercase tracking-wider font-bold block">
                  Validation Error
                </strong>
                <span>Workstation hardware identifier did not match registered master key.</span>
              </div>
            </div>
          )}

          {/* Auth Failed Banner */}
          {simState === "auth-error" && (
            <div className="bg-error/10 text-error p-3.5 border border-error/30 flex items-start gap-2 text-xs">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">
                warning
              </span>
              <div>
                <strong className="uppercase tracking-wider font-bold block">
                  Authentication Denied
                </strong>
                <span>Invalid administrative signature or unauthorized IP range.</span>
              </div>
            </div>
          )}

          {/* 2FA / Success View */}
          {simState === "2fa-success" ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">
                  verified_user
                </span>
              </div>
              <div>
                <h2 className="font-title-md text-title-md font-semibold text-primary uppercase">
                  Hardware Key Accepted
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Issuing session ticket for operator <strong className="text-primary">Arjun (Owner)</strong>...
                </p>
              </div>
              <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-secondary h-full w-full animate-pulse" />
              </div>
              <Link
                href="/admin/dashboard"
                className="inline-block mt-2 font-label-sm text-label-sm uppercase font-semibold text-secondary hover:underline"
              >
                Proceed to Dashboard Immediately →
              </Link>
            </div>
          ) : (
            /* Auth Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface mb-1">
                  Work Email (Staff / Root Tier)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs uppercase tracking-wider font-semibold text-on-surface">
                    Master Password / Key
                  </label>
                  <span className="text-xs text-secondary hover:underline cursor-pointer">
                    Master Key Recovery
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-3 bg-surface border border-outline-variant text-body-sm font-mono text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-outline accent-primary"
                  />
                  <span>Enforce Hardware FIDO2 2FA</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-12 font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm ${
                  isSubmitting
                    ? "bg-secondary text-on-secondary cursor-wait"
                    : "bg-primary hover:bg-neutral-800 text-on-primary"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-on-secondary border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Hardware Key...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">
                      lock_open
                    </span>
                    <span>Authenticate Console Access</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Compliance & Hardware Footer */}
          <div className="pt-4 border-t border-outline-variant/60 text-center space-y-2 text-[10px] text-outline uppercase tracking-wider">
            <div className="flex items-center justify-center gap-3">
              <span>ISO/IEC 27001 AUDITED</span>
              <span>•</span>
              <span>PCI-DSS LEVEL 1</span>
              <span>•</span>
              <span>NODE: IN-BLR-01</span>
            </div>
            <p>
              Unauthorized access attempts are monitored and recorded under Section 43 of the Indian Information Technology Act.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1360px] mx-auto px-gutter py-6 text-center text-xs text-outline">
        © 2026 Yodha Fitness Zone Operations Deck.
      </footer>
    </div>
  );
}
