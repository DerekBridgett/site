"use client";
import { useState } from "react";
import { services } from "@/data/services";

export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="rounded-2xl bg-green-soft p-6"><p className="font-bold">Request sent.</p><p className="mt-1 text-sm text-ink-2">We'll call you within one business day to set up a visit. (Demo: nothing was actually submitted.)</p></div>;
  const field = "w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm placeholder:text-ink-2/60";
  return (
    <form id="quote" onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-sm">
      <h2 className="text-xl">Get a free on-site quote</h2>
      <p className="mt-1 text-sm text-ink-2">Tell us what's going on and we'll come look. No charge, no pressure.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input required className={field} placeholder="First name" autoComplete="given-name" />
        <input required className={field} placeholder="Last name" autoComplete="family-name" />
        <input required type="tel" className={field} placeholder="Phone" autoComplete="tel" />
        <input required className={field} placeholder="ZIP code" inputMode="numeric" autoComplete="postal-code" />
        <select className={`${field} sm:col-span-2`} defaultValue="">
          <option value="" disabled>What do you need?</option>
          {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          <option value="other">Not sure / something else</option>
        </select>
        <textarea className={`${field} sm:col-span-2`} rows={3} placeholder="Anything we should know? (dry spots, low pressure, pump won't prime…)" />
      </div>
      <button className="mt-4 w-full rounded-full bg-green px-5 py-3 font-bold text-green-ink sm:w-auto">Request my free quote</button>
    </form>
  );
}
