import ProofGallery from "@/components/ProofGallery";
import { proofFor } from "@/data/proof";
import { services } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { areaList } from "@/data/site";

export const metadata = pageMeta({
  title: "Services",
  description: `Sprinkler install and repair, well and lake pump replacement, mulch and gravel beds, and low-voltage landscape lighting in ${areaList}. Photos from real jobs under every service.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl">Services</h1>
      <p className="mt-3 max-w-prose text-ink-2">Each service below shows photos from jobs of that type, so you can see what to expect.</p>
      <nav className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
        {services.map((s) => <a key={s.id} href={`#${s.id}`} className="rounded-full border border-line bg-surface px-3 py-1.5 hover:text-green">{s.name}</a>)}
      </nav>
      {services.map((s) => {
        const pics = proofFor(s.id);
        return (
          <section key={s.id} id={s.id} className="scroll-mt-20 border-t border-line py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="text-2xl">{s.name}</h2>
                <p className="mt-3 text-ink-2">{s.description}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.includes.map((i) => <li key={i} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />{i}</li>)}
                </ul>
                <a href="/#quote" className="mt-6 inline-block rounded-full bg-green px-5 py-2.5 text-sm font-bold text-green-ink">Get a quote for this</a>
              </div>
              <div>
                {pics.length ? (
                  <ProofGallery items={pics} columns={2} />
                ) : (
                  <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-ink-2">
                    Photos from our first lighting installs are on the way. Ask us to send examples when you request a quote.
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
