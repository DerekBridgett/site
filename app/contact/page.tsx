import QuoteForm from "@/components/QuoteForm";
import ServiceArea from "@/components/ServiceArea";
import { pageMeta } from "@/lib/seo";
import { site, areaList } from "@/data/site";

export const metadata = pageMeta({
  title: "Contact",
  description: `Request a free on-site irrigation, pump, or landscape lighting quote in ${areaList}. Call ${site.phone} or send the form and we'll call back within one business day.`,
  path: "/contact",
});

const next = [
  ["We call you back", "Within one business day, usually the same afternoon. We'll ask a couple of questions and book a time."],
  ["We walk the property", "Free. A tech runs every zone, checks the pump, and looks at what you're describing."],
  ["You get a written price", "Before anything is dug or replaced. No deposit to get the number."],
];

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div>
          <h1 className="text-4xl">Get in touch</h1>
          <p className="mt-4 max-w-prose text-lg text-ink-2">
            Tell us what the yard is doing and we&rsquo;ll come look at it, free, anywhere in {areaList}.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <dt className="text-xs font-semibold text-ink-2">Phone</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="text-xl font-bold text-blue">{site.phone}</a>
                <p className="mt-1 text-sm text-ink-2">Fastest way to reach us.</p>
              </dd>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <dt className="text-xs font-semibold text-ink-2">Hours</dt>
              <dd className="mt-1">
                <p className="text-xl font-bold">{site.hours}</p>
                <p className="mt-1 text-sm text-ink-2">Storm damage? Call anyway.</p>
              </dd>
            </div>
          </dl>

          <h2 className="mt-10 text-2xl">What happens next</h2>
          <ol className="mt-5 space-y-4">
            {next.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green text-sm font-bold text-green-ink">{i + 1}</span>
                <div>
                  <h3 className="text-lg">{t}</h3>
                  <p className="mt-1 text-sm text-ink-2">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <QuoteForm
          id="contact-form"
          title="Request a free quote"
          intro="One business day for a callback. We only use this to reach you about the job."
        />
      </section>

      <div className="border-t border-line">
        <ServiceArea heading="Areas we cover" />
      </div>
    </>
  );
}
