"use client";
import { useId, useRef, useState } from "react";
import { services } from "@/data/services";
import { site } from "@/data/site";

/**
 * Quote request form, used on the homepage and /contact.
 *
 * Submission target is set by NEXT_PUBLIC_FORMSPREE_ID. Unset (the default),
 * the form keeps the original demo behaviour and says so plainly rather than
 * pretending a request was sent. Set it in Vercel and the same form posts for
 * real — no code change needed.
 *
 * mailto: was the alternative, but it hands the visitor off to a mail client
 * they may not have configured and drops most mobile users entirely.
 */
const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const endpoint = formspreeId ? `https://formspree.io/f/${formspreeId}` : null;

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm({
  id = "quote",
  title = "Get a free on-site quote",
  intro = "Tell us what's going on and we'll come look. No charge, no pressure.",
}: {
  id?: string;
  title?: string;
  intro?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const uid = useId();
  const confirmation = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people leave this empty. Silently accept so bots get no signal.
    if (data.get("_gotcha")) {
      setStatus("sent");
      return;
    }

    if (!endpoint) {
      setStatus("sent");
      queueMicrotask(() => confirmation.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus("sent");
      form.reset();
      queueMicrotask(() => confirmation.current?.focus());
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div ref={confirmation} tabIndex={-1} role="status" className="rounded-2xl bg-green-soft p-6">
        <p className="font-bold">Request sent.</p>
        <p className="mt-1 text-sm text-ink-2">
          We&rsquo;ll call you within one business day to set up a visit.
          {!endpoint && " (Demo: this form has no submission endpoint configured, so nothing was actually sent.)"}
        </p>
      </div>
    );
  }

  const field = "w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-base placeholder:text-ink-2/60";
  const labelCls = "block text-xs font-semibold text-ink-2";
  const sending = status === "sending";

  return (
    <form id={id} onSubmit={handleSubmit} className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
      <h2 className="text-xl">{title}</h2>
      <p className="mt-1 text-sm text-ink-2">{intro}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={`${uid}-first`}>First name</label>
          <input id={`${uid}-first`} name="firstName" required autoComplete="given-name" className={`mt-1 ${field}`} />
        </div>
        <div>
          <label className={labelCls} htmlFor={`${uid}-last`}>Last name</label>
          <input id={`${uid}-last`} name="lastName" required autoComplete="family-name" className={`mt-1 ${field}`} />
        </div>
        <div>
          <label className={labelCls} htmlFor={`${uid}-phone`}>Phone</label>
          <input id={`${uid}-phone`} name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={`mt-1 ${field}`} />
        </div>
        <div>
          <label className={labelCls} htmlFor={`${uid}-zip`}>ZIP code</label>
          <input id={`${uid}-zip`} name="zip" required autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}" className={`mt-1 ${field}`} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`${uid}-email`}>Email <span className="font-normal">(optional)</span></label>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" className={`mt-1 ${field}`} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`${uid}-service`}>What do you need?</label>
          <select id={`${uid}-service`} name="service" defaultValue="" className={`mt-1 ${field}`}>
            <option value="" disabled>Choose one</option>
            {services.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
            <option value="Not sure">Not sure / something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`${uid}-notes`}>Anything we should know?</label>
          <textarea id={`${uid}-notes`} name="notes" rows={3} className={`mt-1 ${field}`} placeholder="Dry spots, low pressure, pump won't prime…" />
        </div>
      </div>

      {/* Spam trap — hidden from people, tempting to bots. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-lg border border-line bg-bg p-3 text-sm">
          That didn&rsquo;t go through. Please try again, or call us at{" "}
          <a href={site.phoneHref} className="font-semibold text-blue">{site.phone}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-4 w-full rounded-full bg-green px-5 py-3 font-bold text-green-ink disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Sending…" : "Request my free quote"}
      </button>
    </form>
  );
}
