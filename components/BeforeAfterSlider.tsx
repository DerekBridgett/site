"use client";
import Image from "next/image";
import { useState } from "react";
import type { Proof } from "@/data/proof";

/** Draggable comparison of two photos of the same view. Only used for pairs
 *  confirmed to be the same job — see beforeAfterPairs in data/proof.ts.
 *  Driven by a real range input so it works with keyboard and screen readers,
 *  not just pointer drag. */
export default function BeforeAfterSlider({ before, after, caption }: { before: Proof; after: Proof; caption: string }) {
  const [pos, setPos] = useState(50);
  const tag = "absolute top-3 rounded-full bg-bg/85 px-2.5 py-1 text-xs font-bold backdrop-blur";

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface-2">
        <Image src={after.src} alt={after.alt} fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before.src} alt={before.alt} fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
        </div>

        <span className={`${tag} left-3`}>Before</span>
        <span className={`${tag} right-3`}>After</span>

        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#16211a] shadow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal before or after: ${caption}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm text-ink-2">{caption}</figcaption>
    </figure>
  );
}
