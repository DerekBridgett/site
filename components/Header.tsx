"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our work" },
  { href: "/reviews", label: "Reviews" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold leading-tight">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-green text-green-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z"/></svg>
          </span>
          <span className="text-sm sm:text-base">Irrigation Systems<br className="sm:hidden" /> <span className="text-ink-2 font-semibold">&amp; Landscape Lighting</span></span>
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-sm font-semibold md:flex">
          {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-green">{n.label}</Link>)}
        </nav>
        <a href="tel:5615550142" className="hidden text-sm font-bold text-blue lg:block">(561) 555-0142</a>
        <a href="/#quote" className="hidden rounded-full bg-green px-4 py-2 text-sm font-bold text-green-ink md:block">Get a free quote</a>
        <ThemeToggle />
        <button className="md:hidden h-9 w-9 grid place-items-center" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}/></svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-surface md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 text-sm font-semibold">
            {nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3">{n.label}</Link>)}
            <a href="/#quote" onClick={() => setOpen(false)} className="my-2 rounded-full bg-green px-4 py-3 text-center text-green-ink">Get a free quote</a>
          </div>
        </div>
      )}
    </header>
  );
}
