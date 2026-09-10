"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { nav } from "@/data/nav";
import { site } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="mr-auto flex items-center gap-2 font-bold leading-tight">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-green text-green-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z"/></svg>
          </span>
          <span className="text-sm sm:text-base lg:whitespace-nowrap">Irrigation Systems<br className="sm:hidden" /> <span className="text-ink-2 font-semibold">&amp; Landscape Lighting</span></span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {nav.map((n) => <Link key={n.href} href={n.href} className="whitespace-nowrap py-2 hover:text-green">{n.label}</Link>)}
        </nav>
        <a href={site.phoneHref} className="hidden whitespace-nowrap py-2 text-sm font-bold text-blue xl:block">{site.phone}</a>
        <a href="/#quote" className="hidden whitespace-nowrap rounded-full bg-green px-4 py-2 text-sm font-bold text-green-ink sm:block">Get a free quote</a>
        <ThemeToggle />
        <button className="lg:hidden h-11 w-11 grid place-items-center" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}/></svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 text-sm font-semibold">
            {nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3">{n.label}</Link>)}
            <a href={site.phoneHref} onClick={() => setOpen(false)} className="flex items-center gap-2 py-3 text-blue">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2z"/></svg>
              Call {site.phone}
            </a>
            <a href="/#quote" onClick={() => setOpen(false)} className="my-2 rounded-full bg-green px-4 py-3 text-center text-green-ink">Get a free quote</a>
          </div>
        </div>
      )}
    </header>
  );
}
