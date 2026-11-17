"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAdminAuth, getAdminAuth, AdminAuthSession } from "@/lib/auth/mock-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingSession, setExistingSession] = useState<AdminAuthSession | null>(null);

  useEffect(() => {
    setExistingSession(getAdminAuth());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Invalid email or password.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAdminAuth({
        email: email.trim(),
        name: email.split("@")[0] || "Admin",
        role: "owner",
      });
      router.push("/admin/dashboard");
    }, 500);
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

        <div className="flex flex-col items-center">
          <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold leading-none">
            YODHA
          </span>
          <span className="text-[9px] uppercase tracking-[0.22em] text-on-surface-variant font-medium">
            FITNESS ZONE
          </span>
        </div>

        <div className="w-[140px] hidden sm:block" />
      </header>

      {/* Main Center */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-gutter py-12">
        {/* Existing Session Notice */}
        {existingSession && (
          <div className="w-full max-w-[440px] mb-4 p-3 bg-secondary/10 border border-secondary/30 flex items-center justify-between text-xs">
            <span className="text-on-surface">
              Session active: <strong className="font-semibold text-secondary">{existingSession.name || existingSession.email}</strong>
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
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold leading-none">
                YODHA
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-on-surface-variant font-medium">
                FITNESS ZONE
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md tracking-tight text-primary font-semibold">
              Admin Sign In
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Sign in to manage the store.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-error/10 text-error p-3.5 border border-error/30 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
                className="w-full h-12 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-12 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
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
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Bottom Legal Notice */}
          <div className="pt-4 border-t border-outline-variant/60 text-center text-xs text-outline">
            Authorised staff only.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1360px] mx-auto px-gutter py-6 text-center text-xs text-outline">
        © 2026 Yodha Fitness Zone.
      </footer>
    </div>
  );
}
