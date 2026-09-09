import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-bold">Irrigation Systems &amp; Landscape Lighting</p>
          <p className="mt-2 text-sm text-ink-2">Locally owned. Serving Boca Raton, Delray Beach, Boynton Beach, and Wellington.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Pages</p>
          <ul className="mt-2 space-y-1 text-ink-2">
            <li><Link href="/services" className="hover:text-ink">Services</Link></li>
            <li><Link href="/work" className="hover:text-ink">Our work</Link></li>
            <li><Link href="/reviews" className="hover:text-ink">Reviews</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Contact</p>
          <p className="mt-2 text-ink-2"><a href="tel:5615550142" className="text-blue font-semibold">(561) 555-0142</a><br />Mon–Sat, 7am–6pm</p>
        </div>
      </div>
      <p className="border-t border-line px-4 py-4 text-center text-xs text-ink-2">© {new Date().getFullYear()} Irrigation Systems &amp; Landscape Lighting. Demo site.</p>
    </footer>
  );
}
