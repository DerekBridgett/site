import type { Metadata } from "next";
import Image from "next/image";
import Stars from "@/components/Stars";
import { reviews } from "@/data/reviews";
import { serviceById } from "@/data/services";

export const metadata: Metadata = { title: "Customer reviews" };

export default function ReviewsPage() {
  const avg = (reviews.reduce((a, r) => a + r.stars, 0) / reviews.length).toFixed(1);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl">Reviews</h1>
      <p className="mt-3 flex items-center gap-2 text-ink-2"><Stars n={5} /> {avg} average across {reviews.length} recent reviews. Each one is paired with a photo from that customer's job.</p>
      <ul className="mt-10 space-y-6">
        {reviews.map((r) => (
          <li key={r.name} className="grid overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-[260px_1fr]">
            {r.photo && (
              <div className="relative aspect-[4/3] md:aspect-auto bg-surface-2">
                <Image src={r.photo} alt={`Job photo for ${r.name}'s ${serviceById(r.service).name.toLowerCase()}`} fill sizes="(min-width:768px) 260px, 100vw" className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Stars n={r.stars} />
                <span className="rounded-full bg-green-soft px-2.5 py-0.5 text-xs font-semibold text-green">{serviceById(r.service).name}</span>
              </div>
              <blockquote className="mt-3 leading-relaxed">“{r.text}”</blockquote>
              <p className="mt-4 text-sm text-ink-2"><span className="font-semibold text-ink">{r.name}</span> · {r.area}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
