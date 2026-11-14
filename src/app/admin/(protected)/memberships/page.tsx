"use client";

import { useState, useMemo } from "react";
import { INITIAL_MEMBERSHIPS, MEMBERSHIP_PLANS } from "@/lib/data/memberships";
import { formatINR } from "@/lib/utils";
import type { UserMembership, MembershipStatus } from "@/types";

export default function AdminMembershipsPage() {
  const [members, setMembers] = useState<UserMembership[]>(INITIAL_MEMBERSHIPS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MembershipStatus>("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "online" | "walk_in">("all");
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);

  // New Walk-in Form State
  const [newMember, setNewMember] = useState({
    userName: "",
    userPhone: "",
    userEmail: "",
    planId: "plan-monthly",
    paymentMethod: "cash" as "cash" | "upi",
    notes: "",
  });

  // KPI Calculations
  const stats = useMemo(() => {
    const total = members.length;
    const active = members.filter((m) => m.status === "active").length;
    const expiringSoon = members.filter((m) => m.status === "expiring_soon").length;
    const expired = members.filter((m) => m.status === "expired").length;
    const totalRevenue = members.reduce((sum, m) => sum + m.amountPaid, 0);

    return { total, active, expiringSoon, expired, totalRevenue };
  }, [members]);

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.userName.toLowerCase().includes(q) ||
        m.userPhone.includes(q) ||
        m.membershipNumber.toLowerCase().includes(q) ||
        m.planName.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "all" || m.status === statusFilter;
      const matchesSource = sourceFilter === "all" || m.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [members, searchQuery, statusFilter, sourceFilter]);

  const handleAddWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.userName || !newMember.userPhone) return;

    const selectedPlan = MEMBERSHIP_PLANS.find((p) => p.id === newMember.planId) || MEMBERSHIP_PLANS[0];
    const today = new Date();
    const expiry = new Date();
    expiry.setMonth(today.getMonth() + selectedPlan.durationMonths);

    const created: UserMembership = {
      id: `mem-${Date.now()}`,
      membershipNumber: `YFZ-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: `walkin-${Date.now()}`,
      userName: newMember.userName,
      userPhone: newMember.userPhone,
      userEmail: newMember.userEmail || undefined,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      startDate: today.toISOString().split("T")[0],
      expiryDate: expiry.toISOString().split("T")[0],
      status: "active",
      amountPaid: selectedPlan.price,
      paymentMethod: newMember.paymentMethod,
      paymentStatus: "paid",
      source: "walk_in",
      notes: newMember.notes || "Walk-in registration recorded by admin",
    };

    setMembers([created, ...members]);
    setShowWalkInModal(false);
    setNewMember({
      userName: "",
      userPhone: "",
      userEmail: "",
      planId: "plan-monthly",
      paymentMethod: "cash",
      notes: "",
    });
  };

  const handleSendReminders = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            FACILITY &amp; ATHLETE OPERATIONS
          </span>
          <h1 className="font-headline-lg text-headline-lg uppercase font-bold text-primary mt-1">
            Memberships Management
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Manage gym members, track validity periods, record front-desk walk-ins, and dispatch renewal notices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSendReminders}
            className="h-10 px-4 bg-surface-container-low hover:bg-surface-container border border-outline-variant font-label-md text-label-md uppercase tracking-wider font-semibold text-primary flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>{reminderSent ? "Reminders Dispatched!" : "Send Reminders"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowWalkInModal(true)}
            className="h-10 px-4 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Record Walk-in</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface-container-lowest border border-outline-variant/60">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
            ACTIVE MEMBERS
          </span>
          <span className="text-3xl font-mono font-bold text-primary mt-2 block">
            {stats.active}
          </span>
          <span className="text-xs text-secondary mt-1 block">In good standing</span>
        </div>

        <div className="p-5 bg-surface-container-lowest border border-outline-variant/60">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
            EXPIRING SOON
          </span>
          <span className="text-3xl font-mono font-bold text-[#C59B27] mt-2 block">
            {stats.expiringSoon}
          </span>
          <span className="text-xs text-on-surface-variant mt-1 block">Within next 7 days</span>
        </div>

        <div className="p-5 bg-surface-container-lowest border border-outline-variant/60">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
            EXPIRED
          </span>
          <span className="text-3xl font-mono font-bold text-rose-600 mt-2 block">
            {stats.expired}
          </span>
          <span className="text-xs text-rose-600 mt-1 block">Needs renewal follow-up</span>
        </div>

        <div className="p-5 bg-surface-container-lowest border border-outline-variant/60">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block">
            MEMBERSHIP REVENUE
          </span>
          <span className="text-3xl font-mono font-bold text-primary mt-2 block">
            {formatINR(stats.totalRevenue)}
          </span>
          <span className="text-xs text-secondary mt-1 block">YFZ gym ledger</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-surface-container-lowest border border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-outline">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member name, phone, or ID..."
            className="w-full h-10 pl-10 pr-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="h-10 px-3 bg-surface border border-outline-variant text-xs font-semibold uppercase focus:outline-none focus:border-primary"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="expiring_soon">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as any)}
            className="h-10 px-3 bg-surface border border-outline-variant text-xs font-semibold uppercase focus:outline-none focus:border-primary"
          >
            <option value="all">All Sources</option>
            <option value="online">Online Web</option>
            <option value="walk_in">Walk-in Desk</option>
          </select>
        </div>
      </div>

      {/* Members Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low text-[11px] font-mono uppercase tracking-wider text-outline">
              <th className="p-4">Member ID</th>
              <th className="p-4">Member Name</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Validity Period</th>
              <th className="p-4">Source</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/60 text-body-sm font-body-sm">
            {filteredMembers.map((member) => (
              <tr key={member.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-mono font-bold text-xs text-primary">
                  {member.membershipNumber}
                </td>
                <td className="p-4">
                  <span className="font-semibold text-primary block">{member.userName}</span>
                  <span className="font-mono text-xs text-outline">{member.userPhone}</span>
                </td>
                <td className="p-4">
                  <span className="font-medium text-primary block">{member.planName}</span>
                  <span className="font-mono text-xs text-secondary font-semibold">
                    {formatINR(member.amountPaid)}
                  </span>
                </td>
                <td className="p-4 font-mono text-xs text-on-surface-variant">
                  <div>FROM: {member.startDate}</div>
                  <div className="font-semibold text-primary">UNTIL: {member.expiryDate}</div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                      member.source === "online"
                        ? "bg-secondary/15 text-secondary"
                        : "bg-surface-container-high text-on-surface"
                    }`}
                  >
                    {member.source === "online" ? "Online Web" : "Walk-in Desk"}
                  </span>
                </td>
                <td className="p-4 font-mono text-xs uppercase">
                  <span className="text-secondary font-semibold">{member.paymentStatus}</span>
                  <span className="text-outline block">({member.paymentMethod})</span>
                </td>
                <td className="p-4">
                  {member.status === "active" && (
                    <span className="px-2.5 py-1 bg-secondary/15 text-secondary text-xs uppercase font-bold">
                      Active
                    </span>
                  )}
                  {member.status === "expiring_soon" && (
                    <span className="px-2.5 py-1 bg-[#C59B27]/15 text-[#C59B27] text-xs uppercase font-bold">
                      Expiring
                    </span>
                  )}
                  {member.status === "expired" && (
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-600 text-xs uppercase font-bold">
                      Expired
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      // Toggle renew
                      const updated = members.map((m) => {
                        if (m.id === member.id) {
                          const today = new Date();
                          const nextExpiry = new Date();
                          nextExpiry.setMonth(today.getMonth() + 1);
                          return {
                            ...m,
                            status: "active" as MembershipStatus,
                            expiryDate: nextExpiry.toISOString().split("T")[0],
                          };
                        }
                        return m;
                      });
                      setMembers(updated);
                    }}
                    className="px-3 py-1 bg-surface-container-low hover:bg-surface-container border border-outline-variant font-label-sm text-xs uppercase font-semibold text-primary transition-colors"
                  >
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMembers.length === 0 && (
          <div className="p-12 text-center text-outline font-body-sm">
            No gym members found matching the selected filters.
          </div>
        )}
      </div>

      {/* ── Walk-in Registration Modal ── */}
      {showWalkInModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-4">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  DESK REGISTRATION
                </span>
                <h3 className="font-headline-sm text-headline-sm uppercase font-semibold text-primary mt-0.5">
                  Record Walk-in Member
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowWalkInModal(false)}
                className="text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddWalkIn} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Athlete Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newMember.userName}
                  onChange={(e) => setNewMember({ ...newMember, userName: e.target.value })}
                  placeholder="e.g. Rahul Deb"
                  className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newMember.userPhone}
                    onChange={(e) => setNewMember({ ...newMember, userPhone: e.target.value })}
                    placeholder="+91 87980 12345"
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={newMember.userEmail}
                    onChange={(e) => setNewMember({ ...newMember, userEmail: e.target.value })}
                    placeholder="athlete@example.com"
                    className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Membership Tier
                </label>
                <select
                  value={newMember.planId}
                  onChange={(e) => setNewMember({ ...newMember, planId: e.target.value })}
                  className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                >
                  {MEMBERSHIP_PLANS.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} — {formatINR(plan.price)} ({plan.duration.replace("_", " ")})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewMember({ ...newMember, paymentMethod: "cash" })}
                    className={`h-11 border text-xs font-semibold uppercase flex items-center justify-center gap-1.5 transition-colors ${
                      newMember.paymentMethod === "cash"
                        ? "border-primary bg-primary text-on-primary"
                        : "border-outline-variant bg-surface"
                    }`}
                  >
                    <span>Cash at Desk</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewMember({ ...newMember, paymentMethod: "upi" })}
                    className={`h-11 border text-xs font-semibold uppercase flex items-center justify-center gap-1.5 transition-colors ${
                      newMember.paymentMethod === "upi"
                        ? "border-primary bg-primary text-on-primary"
                        : "border-outline-variant bg-surface"
                    }`}
                  >
                    <span>UPI Scan</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Staff Notes
                </label>
                <textarea
                  rows={2}
                  value={newMember.notes}
                  onChange={(e) => setNewMember({ ...newMember, notes: e.target.value })}
                  placeholder="Locker assigned, training slot preferences, etc."
                  className="w-full p-2.5 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 h-12 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Record &amp; Issue Pass</span>
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowWalkInModal(false)}
                  className="px-5 h-12 bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
