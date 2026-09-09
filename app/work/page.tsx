import ProofGallery from "@/components/ProofGallery";
import { proof } from "@/data/proof";
import { pageMeta } from "@/lib/seo";
import { areaList } from "@/data/site";

export const metadata = pageMeta({
  title: "Our work",
  description: `${proof.length} photos from real irrigation, pump, and landscape jobs in ${areaList} — taken on site by the crew that did the work.`,
  path: "/work",
});

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl">Our work</h1>
      <p className="mt-3 max-w-prose text-ink-2">Every photo here was taken on a real job by our crew. Filter by the kind of work you need.</p>
      <div className="mt-8"><ProofGallery items={proof} filters columns={3} /></div>
    </section>
  );
}
