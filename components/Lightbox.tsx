"use client";
import Image from "next/image";
import { useEffect } from "react";
import type { Proof } from "@/data/proof";
import { serviceById } from "@/data/services";

export default function Lightbox({ items, index, onClose, onMove }: { items: Proof[]; index: number; onClose: () => void; onMove: (i: number) => void }) {
  const item = items[index];
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove((index + 1) % items.length);
      if (e.key === "ArrowLeft") onMove((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [index, items.length, onClose, onMove]);

  return (
    <div role="dialog" aria-modal="true" aria-label={item.caption} className="fixed inset-0 z-50 flex flex-col bg-black/90 text-white" onClick={onClose}>
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span>{index + 1} / {items.length}</span>
        <button onClick={onClose} className="rounded-full px-3 py-1 hover:bg-white/10" aria-label="Close">Close ✕</button>
      </div>
      <div className="relative flex-1 min-h-0" onClick={(e) => e.stopPropagation()}>
        <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" priority />
        <button onClick={() => onMove((index - 1 + items.length) % items.length)} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/50 hover:bg-black/70">‹</button>
        <button onClick={() => onMove((index + 1) % items.length)} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/50 hover:bg-black/70">›</button>
      </div>
      <div className="px-4 py-4 text-sm" onClick={(e) => e.stopPropagation()}>
        <p className="font-semibold">{item.caption}</p>
        <p className="text-white/70">{serviceById(item.service).name} · {item.area}</p>
      </div>
    </div>
  );
}
