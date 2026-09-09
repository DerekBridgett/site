import Link from "next/link";
import ProofGallery from "@/components/ProofGallery";
import LightingIllustration, { type LightingScene } from "@/components/LightingIllustration";
import { pageMeta } from "@/lib/seo";
import { site, areaList } from "@/data/site";
import { serviceById } from "@/data/services";
import { proofFor } from "@/data/proof";

export const metadata = pageMeta({
  title: "Landscape lighting",
  description: `Low-voltage LED path lights, palm and tree uplighting, and entry lighting in ${areaList}. Installed on a timer or photocell, wired to last through storm season.`,
  path: "/lighting",
});

const scenes: { scene: LightingScene; title: string; body: string }[] = [
  {
    scene: "uplight",
    title: "Palm and tree uplighting",
    body: "A fixture set at the base, aimed up the trunk. Palms take one; a spreading oak usually takes two or three from different angles so the canopy does not flatten out.",
  },
  {
    scene: "path",
    title: "Path and step lights",
    body: "Spaced to overlap pools of light rather than dot the walk with bright spots, and set back from the mower line so they survive the lawn crew.",
  },
  {
    scene: "facade",
    title: "Entry and facade wash",
    body: "Wide flood fixtures grazing the wall to bring out texture on stucco or stone, with the entry lit enough to find a keyhole without glare in your eyes.",
  },
];

const details = [
  {
    title: "Low voltage, not line voltage",
    body: "A transformer steps 120V down to 12V at the wall, so the cable running through your beds is safe to bury shallow and safe to cut into later. It also means adding a fixture next season is an afternoon, not a permit.",
  },
  {
    title: "Timer or photocell, your choice",
    body: "An astronomic timer tracks sunset through the year so the lights do not creep out of sync in December. A photocell is simpler and cheaper. Either way, you should never be flipping a switch.",
  },
  {
    title: "Fixtures that survive salt air",
    body: "Near the coast, cheap aluminum fixtures chalk and seize within a couple of seasons. We fit brass or composite bodies with replaceable LED lamps, so a failure is a lamp swap and not a dig.",
  },
];

export default function LightingPage() {
  const service = serviceById("lighting");
  // Empty today. Adding rows to data/proof.ts with service: "lighting" swaps the
  // illustrations below for a real gallery, with no edits to this page.
  const photos = proofFor("lighting");

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-soft px-3 py-1 text-sm font-semibold text-blue">
            Low-voltage LED
          </p>
          <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">Lighting that still works in year three.</h1>
          <p className="mt-5 max-w-prose text-lg text-ink-2">{service.description}</p>
          <p className="mt-3 max-w-prose text-ink-2">
            We install across {areaList}, usually alongside irrigation work while the beds are already open.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/#quote" className="rounded-full bg-green px-5 py-3 font-bold text-green-ink">Get a lighting quote</a>
            <a href={site.phoneHref} className="rounded-full border border-line bg-surface px-5 py-3 font-bold">Call {site.phone}</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-line">
          <LightingIllustration scene="uplight" className="block aspect-[4/3] w-full" />
        </div>
      </section>

      <section className="border-y border-line bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl">What we install</h2>
          {photos.length ? (
            <>
              <p className="mt-2 max-w-prose text-ink-2">Photographed on real jobs by the crew that did them.</p>
              <div className="mt-8"><ProofGallery items={photos} columns={3} /></div>
            </>
          ) : (
            <>
              <p className="mt-2 max-w-prose text-ink-2">
                The drawings below show the three setups we fit most often.
              </p>
              <p className="mt-4 flex max-w-prose gap-2 rounded-xl border border-dashed border-line bg-bg p-4 text-sm text-ink-2">
                <span aria-hidden="true">✏️</span>
                <span>
                  <strong className="text-ink">These are illustrations, not photographs of our work.</strong> Our lighting
                  installs are newer than our habit of photographing them. Ask us for examples when you request a quote,
                  and real job photos will replace these drawings here as we shoot them.
                </span>
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {scenes.map((s) => (
                  <article key={s.scene} className="overflow-hidden rounded-2xl border border-line bg-bg">
                    <LightingIllustration scene={s.scene} className="block aspect-[4/3] w-full" />
                    <div className="p-5">
                      <h3 className="text-lg">{s.title}</h3>
                      <p className="mt-2 text-sm text-ink-2">{s.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-3xl">Every lighting job includes</h2>
            <ul className="mt-6 space-y-2.5 text-sm">
              {service.includes.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                  {i}
                </li>
              ))}
            </ul>
            <Link href="/services" className="mt-6 inline-block font-semibold text-blue">
              See all services
            </Link>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.title} className="rounded-2xl border border-line bg-surface p-5">
                <dt className="text-lg font-bold">{d.title}</dt>
                <dd className="mt-2 text-sm text-ink-2">{d.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-3xl bg-green px-6 py-10 text-green-ink sm:px-10 sm:py-14">
          <h2 className="text-3xl">Want to see the yard after dark?</h2>
          <p className="mt-3 max-w-prose opacity-90">
            We will walk the property at dusk, show you where fixtures would go, and price it before anything is dug.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/#quote" className="rounded-full bg-bg px-5 py-3 font-bold text-ink">Get a free quote</a>
            <a href={site.phoneHref} className="rounded-full border border-current px-5 py-3 font-bold">Call {site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
