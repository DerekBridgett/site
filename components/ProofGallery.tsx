"use client";
import Image from "next/image";
import { useState } from "react";
import type { Proof } from "@/data/proof";
import { services, type ServiceId } from "@/data/services";
import Lightbox from "./Lightbox";

export default function ProofGallery({ items, filters = false, columns = 3 }: { items: Proof[]; filters?: boolean; columns?: 2 | 3 | 4 }) {
  const [filter, setFilter] = useState<ServiceId | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = filter === "all" ? items : items.filter((p) => p.service === filter);
  const counts = Object.fromEntries(services.map((s) => [s.id, items.filter((p) => p.service === s.id).length]));
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];

  return (
    <div>
      {filters && (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by service">
          {[{ id: "all" as const, name: "All", n: items.length }, ...services.map((s) => ({ id: s.id, name: s.name, n: counts[s.id] }))]
            .filter((f) => f.n > 0)
            .map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)} aria-pressed={filter === f.id}
                className={`rounded-full border px-3.5 py-2.5 text-sm font-semibold ${filter === f.id ? "border-green bg-green text-green-ink" : "border-line bg-surface text-ink-2 hover:text-ink"}`}>
                {f.name} <span className="opacity-60">{f.n}</span>
              </button>
            ))}
        </div>
      )}
      <ul className={`grid grid-cols-1 gap-3 ${cols}`}>
        {shown.map((p, i) => (
          <li key={p.src}>
            <button onClick={() => setOpen(i)} className="group block w-full overflow-hidden rounded-xl bg-surface-2 text-left">
              <div className="relative aspect-[4/3]">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex items-start justify-between gap-3 px-3 py-2.5">
                <p className="text-sm font-medium leading-snug line-clamp-2">{p.caption}</p>
                <span className="shrink-0 text-xs text-ink-2">{p.area}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox items={shown} index={open} onClose={() => setOpen(null)} onMove={setOpen} />}
    </div>
  );
}
