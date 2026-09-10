import Link from "next/link";
import { nav } from "@/data/nav";
import { site, areaList } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-bold">{site.name}</p>
          <p className="mt-2 text-sm text-ink-2">Locally owned. Serving {areaList}.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Pages</p>
          <ul className="mt-2 text-ink-2">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="block py-1.5 hover:text-ink">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Contact</p>
          <p className="mt-2 text-ink-2"><a href={site.phoneHref} className="inline-block py-1.5 text-blue font-semibold">{site.phone}</a><br />{site.hours}</p>
        </div>
      </div>
      <p className="border-t border-line px-4 py-4 text-center text-xs text-ink-2">© {new Date().getFullYear()} {site.name}. Demo site.</p>
    </footer>
  );
}
