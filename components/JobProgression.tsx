import Image from "next/image";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { jobStages, resolvedPairs } from "@/data/proof";

/**
 * Renders confirmed before/after pairs when data/proof.ts has any, and falls
 * back to a stage-by-stage walkthrough when it doesn't.
 *
 * The fallback exists because the photo set records no same-job pairs. Rather
 * than implying three different properties are one yard over time, the stages
 * are labelled as steps in the process and the heading says so.
 */
export default function JobProgression() {
  const hasPairs = resolvedPairs.length > 0;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl">{hasPairs ? "Before and after" : "What a job looks like start to finish"}</h2>
        <p className="mt-2 max-w-prose text-ink-2">
          {hasPairs
            ? "The same yard, before we started and after we finished."
            : "Three stages of the work, photographed on different properties — a trench going in, zones being tuned, and a yard put back together."}
        </p>

        {hasPairs ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {resolvedPairs.map((p) => (
              <BeforeAfterSlider key={p.before.src} before={p.before} after={p.after} caption={p.caption} />
            ))}
          </div>
        ) : (
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {jobStages.map((s, i) => (
              <li key={s.slug}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface-2">
                  <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                  <span className="absolute top-3 left-3 grid h-8 w-8 place-items-center rounded-full bg-green text-sm font-bold text-green-ink">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg">{s.stage}</h3>
                <p className="mt-1 text-sm text-ink-2">{s.note}</p>
                <p className="mt-2 text-xs text-ink-2/80">{s.photo.area}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
