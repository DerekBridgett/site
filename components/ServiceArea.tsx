import Image from "next/image";
import { proofByArea } from "@/data/proof";
import { areas, site } from "@/data/site";
import { serviceById } from "@/data/services";

/** The four cities we cover. Job counts are derived from data/proof.ts rather
 *  than written by hand, so they can't drift from the gallery. */
export default function ServiceArea({ heading = "Where we work" }: { heading?: string }) {
  const cities = areas.map((name) => {
    const items = proofByArea(name);
    return {
      name,
      count: items.length,
      kinds: [...new Set(items.map((i) => i.service))],
      photo: items[0],
    };
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl">{heading}</h2>
          <p className="mt-2 max-w-prose text-ink-2">
            Four cities across {site.region}. Every count below is photographed work, not a coverage claim.
          </p>
        </div>
        <p className="text-sm text-ink-2">
          Outside these? <a href={site.phoneHref} className="py-1.5 font-semibold text-blue">Call {site.phone}</a> — we travel for larger jobs.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((c) => (
          <li key={c.name} className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="relative aspect-[16/10] bg-surface-2">
              {c.photo && (
                <Image src={c.photo.src} alt={c.photo.alt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg">{c.name}</h3>
              <p className="mt-1 text-sm font-semibold text-blue">
                {c.count} {c.count === 1 ? "job" : "jobs"} photographed
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {c.kinds.map((k) => (
                  <li key={k} className="rounded-full bg-green-soft px-2 py-0.5 text-xs font-semibold text-green">
                    {serviceById(k).name.split(/[\s,]/)[0]}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
