/* ──────────────────────────────────────────────
   Yodha — Utility Functions
   ────────────────────────────────────────────── */

/** Merge class names, filtering out falsy values */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format number as ₹ with Indian numbering (lakhs/crores) */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Format date as DD MMM YYYY */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Format datetime as DD MMM YYYY, HH:MM AM/PM IST */
export function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/** Simulate async delay (for mock API latency) */
export function delay(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

/** Generate a mock order ID like #KR-1042 */
export function generateOrderId(): string {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `#KR-${num}`;
}

/** Truncate text to maxLen characters with ellipsis */
export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "…";
}

/** Slugify a string (for product URLs) */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
