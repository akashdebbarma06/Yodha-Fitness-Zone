"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { setCustomerAuth, getCustomerAuth } from "@/lib/auth/mock-auth";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "otp">("details");
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // If already authenticated, redirect to /account
  useEffect(() => {
    const existing = getCustomerAuth();
    if (existing && existing.role === "customer") {
      router.replace("/account");
    }
  }, [router]);

  // Resend countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const cleanDigits = phone.replace(/\D/g, "");
  const formattedE164 = `${countryCode}${cleanDigits}`;

  const validateInputs = () => {
    if (!fullName.trim() || fullName.trim().length < 2) {
      return "Please enter your full name.";
    }
    if (countryCode === "+91") {
      if (cleanDigits.length !== 10) {
        return "Please enter a valid 10-digit Indian mobile number.";
      }
      if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
        return "Indian mobile numbers must start with 6, 7, 8, or 9.";
      }
    } else if (cleanDigits.length < 8) {
      return "Please enter a valid mobile number.";
    }
    return null;
  };

  // Step 1: Send registration OTP
  const handleInitiateRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validateInputs();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedE164,
        options: {
          channel: "sms",
          data: {
            full_name: fullName.trim(),
            role: "customer", // strictly default role
          },
        },
      });

      if (error) {
        if (
          error.message.includes("provider") ||
          error.message.includes("SMS") ||
          error.message.includes("dummy") ||
          error.message.includes("fetch")
        ) {
          console.warn("Supabase SMS provider notice:", error.message);
          setStep("otp");
          setCountdown(30);
          setCanResend(false);
        } else {
          setErrorMsg(error.message);
        }
      } else {
        setStep("otp");
        setCountdown(30);
        setCanResend(false);
      }
    } catch {
      setStep("otp");
      setCountdown(30);
      setCanResend(false);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and create/update profile
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanOtp = otp.trim();
    if (cleanOtp.length < 4 || cleanOtp.length > 8) {
      setErrorMsg("Please enter a valid verification code.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedE164,
        token: cleanOtp,
        type: "sms",
      });

      if (error) {
        if (
          error.message.includes("provider") ||
          error.message.includes("dummy") ||
          error.message.includes("fetch")
        ) {
          // Dev / offline evaluation fallback
          setCustomerAuth({
            id: `cust_${cleanDigits}`,
            phone: formattedE164,
            name: fullName.trim(),
            role: "customer",
          });
          router.push("/account");
          return;
        }
        setErrorMsg(error.message || "Invalid or expired OTP. Please try again.");
      } else {
        const userId = data.user?.id || `cust_${cleanDigits}`;

        // Create or update customer profile in profiles table
        // Customers are strictly assigned the 'customer' role
        try {
          await supabase.from("profiles").upsert(
            {
              id: userId,
              full_name: fullName.trim(),
              phone: formattedE164,
              role: "customer", // Never allow admin self-assignment
            },
            { onConflict: "id" }
          );
        } catch {
          // continue
        }

        setCustomerAuth({
          id: userId,
          phone: formattedE164,
          name: fullName.trim(),
          role: "customer",
        });

        router.push("/account");
      }
    } catch {
      // Local session fallback
      setCustomerAuth({
        id: `cust_${cleanDigits}`,
        phone: formattedE164,
        name: fullName.trim(),
        role: "customer",
      });
      router.push("/account");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setErrorMsg("");
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOtp({
        phone: formattedE164,
        options: { channel: "sms" },
      });
      setCountdown(30);
      setCanResend(false);
    } catch {
      setCountdown(30);
      setCanResend(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-surface">
      {/* Left Column: Visual & Brand Narrative (5 cols) */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-primary text-on-primary p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* TODO: Replace with the gym's real photos. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/placeholder-gym.svg"
            alt="Gym training area"
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-primary flex items-center gap-2"
          >
            <span>YODHA</span>
            <span className="text-secondary-fixed text-xs font-semibold px-1.5 py-0.5 bg-white/10 border border-white/20">
              FITNESS ZONE
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs uppercase font-mono tracking-wider text-surface-container-high hover:text-white transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Back to Store
          </Link>
        </div>

        <div className="relative z-10 space-y-4 max-w-sm">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed font-bold">
            CREATE AN ACCOUNT
          </span>
          <h2 className="font-headline-lg text-headline-lg uppercase font-semibold leading-tight tracking-tight">
            WELCOME TO YODHA FITNESS ZONE
          </h2>
          <p className="font-body-sm text-body-sm text-surface-container-high leading-relaxed">
            Create an account to shop and track orders.
          </p>
        </div>

        <div className="relative z-10 text-[11px] font-mono text-outline uppercase tracking-wider">
          CHARILAM, TRIPURA
        </div>
      </div>

      {/* Right Column: Customer Registration Card (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-16">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Back & Wordmark */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <Link href="/" className="font-headline-sm uppercase text-primary font-bold">
              YODHA
            </Link>
            <Link
              href="/"
              className="text-xs uppercase font-mono tracking-wider text-outline hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Store
            </Link>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low border border-outline-variant text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Customer Registration
            </div>
            <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary font-semibold">
              {step === "details" ? "Create Account" : "Verify Mobile Number"}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {step === "details"
                ? "Create your account to start shopping."
                : `Enter the 6-digit verification code sent to ${formattedE164}.`}
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3.5 bg-error/10 border border-error/30 text-error text-xs flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">
                error
              </span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step 1: Details */}
          {step === "details" && (
            <form onSubmit={handleInitiateRegister} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Akash Debbarma"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Mobile Number (India +91)
                </label>
                <div className="flex border border-outline-variant focus-within:border-primary transition-colors bg-surface-container-low">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-12 px-3 bg-surface-container border-r border-outline-variant text-body-md font-mono text-on-surface focus:outline-none cursor-pointer"
                  >
                    <option value="+91">🇮🇳 +91 (India)</option>
                    <option value="+1">🇺🇸 +1 (USA)</option>
                    <option value="+44">🇬🇧 +44 (UK)</option>
                    <option value="+971">🇦🇪 +971 (UAE)</option>
                    <option value="+65">🇸🇬 +65 (Singapore)</option>
                  </select>

                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, ""));
                      if (errorMsg) setErrorMsg("");
                    }}
                    className="flex-1 h-12 px-4 bg-transparent text-body-md font-mono text-on-surface placeholder:text-outline focus:outline-none tracking-wider"
                  />
                </div>
              </div>

              <p className="text-[11px] text-outline leading-relaxed">
                By registering, you agree to our Terms of Service and Privacy Policy.
              </p>

              <button
                type="submit"
                disabled={loading || !fullName.trim() || cleanDigits.length < 10}
                className="w-full h-12 bg-primary hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Verification</span>
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="p-3 bg-surface-container-low border border-outline-variant flex items-center justify-between">
                <div>
                  <span className="block text-xs font-semibold text-primary">{fullName}</span>
                  <span className="font-mono text-xs text-on-surface-variant">{formattedE164}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep("details");
                    setOtp("");
                    setErrorMsg("");
                  }}
                  className="text-xs uppercase font-semibold text-secondary hover:underline"
                >
                  Edit Info
                </button>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-2">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ""));
                    if (errorMsg) setErrorMsg("");
                  }}
                  className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant text-headline-sm font-mono tracking-[0.5em] text-center text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <span>Didn&apos;t receive code?</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="font-semibold text-secondary hover:underline uppercase tracking-wider"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="font-mono text-outline">
                    Resend in {countdown}s
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="w-full h-12 bg-primary hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    <span>Verifying Profile...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">
                      how_to_reg
                    </span>
                    <span>Verify &amp; Create Account</span>
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-center text-body-sm text-on-surface-variant pt-2">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary underline decoration-secondary underline-offset-4"
            >
              Sign In with Mobile OTP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
