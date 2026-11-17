"use client";

import { useState } from "react";
import { STORE_SETTINGS } from "@/lib/data/settings";
import type { StoreSettings } from "@/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(STORE_SETTINGS);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
            Store &amp; Operational Compliance Settings
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Maintain corporate GSTIN, FSSAI licenses, origin PIN for carrier calculations, and webhook integrations.
          </p>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="h-10 px-6 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Save Configuration</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-secondary/15 border border-secondary/30 text-secondary flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Configuration saved and propagated across store nodes.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Business & Tax Compliance */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 shadow-sm">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-2">
            01. Corporate Entity &amp; Statutory Licenses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Storefront Name
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Corporate GSTIN (India)
              </label>
              <input
                type="text"
                value={settings.gstin}
                onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono font-bold focus:outline-none focus:border-primary uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                FSSAI Central License
              </label>
              <input
                type="text"
                value={settings.fssaiLicense}
                onChange={(e) => setSettings({ ...settings, fssaiLicense: e.target.value })}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Origin Dispatch PIN Code
              </label>
              <input
                type="text"
                value={settings.originPin}
                onChange={(e) => setSettings({ ...settings, originPin: e.target.value })}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Origin Hub City
              </label>
              <input
                type="text"
                value={settings.originCity}
                onChange={(e) => setSettings({ ...settings, originCity: e.target.value })}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Logistics & Threshold Rules */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 shadow-sm">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-2">
            02. Logistics &amp; Inventory Thresholds
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Complimentary Shipping Threshold (₹ INR)
              </label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })
                }
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono font-bold focus:outline-none focus:border-primary"
              />
              <span className="text-[11px] text-outline mt-1 block">
                Orders above this amount unlock free shipping.
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Critical Low Stock Alert Trigger (Units)
              </label>
              <input
                type="number"
                value={settings.lowStockAlert}
                onChange={(e) =>
                  setSettings({ ...settings, lowStockAlert: Number(e.target.value) })
                }
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono font-bold focus:outline-none focus:border-primary"
              />
              <span className="text-[11px] text-outline mt-1 block">
                SKUs with inventory below this number trigger alert flags.
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Payment Gateways & Aggregators */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 shadow-sm">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-2">
            03. Payment Gateway &amp; Logistics Aggregation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Razorpay Key ID
              </label>
              <input
                type="text"
                value={settings.razorpayKeyId}
                onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Shiprocket Logistics Token
              </label>
              <input
                type="password"
                value={settings.shiprocketToken}
                onChange={(e) => setSettings({ ...settings, shiprocketToken: e.target.value })}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Security & Notification Matrix */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 shadow-sm">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-2">
            04. Notification Matrix &amp; Operational 2FA
          </h2>

          <div className="space-y-3 text-body-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.orderConfirmation}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      orderConfirmation: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 accent-primary"
              />
              <span>Send automated order confirmation and tracking details to customers via SMS / Email</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.lowStock}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      lowStock: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 accent-primary"
              />
              <span>Notify store owner when SKUs fall below 25 units</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
