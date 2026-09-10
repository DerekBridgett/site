import Image from "next/image";
import Link from "next/link";
import ProofGallery from "@/components/ProofGallery";
import JobProgression from "@/components/JobProgression";
import ServiceArea from "@/components/ServiceArea";
import QuoteForm from "@/components/QuoteForm";
import Stars from "@/components/Stars";
import { featured, proofFor } from "@/data/proof";
import { services } from "@/data/services";
import { reviews, ratingAvg, reviewCount } from "@/data/reviews";
import { site, areaList } from "@/data/site";

const steps = [
  ["Tell us what's wrong", "Call or send the form. Dry patch, low pressure, a pump that won't prime — a sentence is enough."],
  ["We come look, free", "A tech walks the property, runs every zone, and checks the pump. You get a written price before any work."],
  ["We do the work", "Trenching, plumbing, heads, pump, lighting — one crew, usually one visit for repairs."],
  ["We test it in front of you", "Every zone runs before we leave, and you get the photos so you can see what was done."],
];

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-soft px-3 py-1 text-sm font-semibold text-blue">
            <Stars n={5} /> {ratingAvg} average from {reviewCount} local reviews
          </p>
          <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">
            Irrigation that reaches every corner, and lights that show it off.
          </h1>
          <p className="mt-5 max-w-prose text-lg text-ink-2">
            Sprinkler install and repair, well and lake pump systems, and low-voltage landscape lighting for {areaList}. Every job photographed, so you see exactly what was done.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#quote" className="rounded-full bg-green px-5 py-3 font-bold text-green-ink">Get a free quote</a>
            <a href={site.phoneHref} className="rounded-full border border-line bg-surface px-5 py-3 font-bold">Call {site.phone}</a>
          </div>
          <ul className="mt-8 grid gap-2 text-sm text-ink-2 sm:grid-cols-2">
            {["Free on-site evaluation", "Written price before work starts", "Photos of every job", "Licensed and insured"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green" />{t}</li>
            ))}
          </ul>
        </div>
        <QuoteForm />
      </section>

      {/* Solid blue band directly under the hero. Text colour is set per
          element rather than on the section, so it can't inherit into the
          gallery tiles, which are light cards with their own dark captions. */}
      <section className="bg-blue-band py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl text-blue-band-ink">Proof of service</h2>
              <p className="mt-2 max-w-prose text-blue-band-ink/90">Real jobs, photographed by the crew that did them. Tap any photo to see the full shot.</p>
            </div>
            <Link href="/work" className="font-semibold text-blue-band-ink underline underline-offset-4 hover:opacity-80">See all our work</Link>
          </div>
          <div className="mt-6">
            <ProofGallery items={featured} columns={3} />
          </div>
        </div>
      </section>

      <JobProgression />

      <section className="border-y border-line bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl">What we do</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {services.map((s) => {
              const pic = proofFor(s.id)[0];
              return (
                <Link key={s.id} href={`/services#${s.id}`} className="group grid overflow-hidden rounded-2xl border border-line bg-bg sm:grid-cols-[180px_1fr]">
                  <div className="relative aspect-[4/3] sm:aspect-auto bg-surface-2">
                    {pic ? (
                      <Image src={pic.src} alt={pic.alt} fill sizes="(min-width:640px) 180px, 100vw" className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-ink-2">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.3V16h6v-.2c0-.9.4-1.7 1-2.3A6 6 0 0 0 12 3z"/></svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg group-hover:text-green">{s.name}</h3>
                    <p className="mt-1 text-sm text-ink-2">{s.short}</p>
                    <p className="mt-3 text-sm font-semibold text-blue">{proofFor(s.id).length ? `${proofFor(s.id).length} job photos` : "Photos coming soon"}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl">How it works</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="relative rounded-2xl border border-line bg-surface p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-green text-sm font-bold text-green-ink">{i + 1}</span>
              <h3 className="mt-4 text-lg">{t}</h3>
              <p className="mt-2 text-sm text-ink-2">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <ServiceArea />

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl">What customers say</h2>
          <Link href="/reviews" className="font-semibold text-blue">All reviews</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <figure key={r.name} className="rounded-2xl border border-line bg-surface p-5">
              <Stars n={r.stars} />
              <blockquote className="mt-3 text-sm leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-ink-2"><span className="font-semibold text-ink">{r.name}</span> · {r.area}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl bg-green px-6 py-10 text-green-ink sm:px-10 sm:py-14">
          <h2 className="text-3xl">Dry spots? Pump won't prime? We'll come take a look.</h2>
          <p className="mt-3 max-w-prose opacity-90">Free evaluation anywhere in {site.region}. Most repairs done the same visit.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#quote" className="rounded-full bg-bg px-5 py-3 font-bold text-ink">Get a free quote</a>
            <a href={site.phoneHref} className="rounded-full border border-current px-5 py-3 font-bold">Call {site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
