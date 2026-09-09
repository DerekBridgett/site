import type { ServiceId } from "./services";

export type Proof = {
  src: string;          // file in /public/proof
  alt: string;
  caption: string;
  service: ServiceId;
  area: string;
  w: number;
  h: number;
  featured?: boolean;   // shows on the homepage
};

const P = (src: string, service: ServiceId, caption: string, area: string, opts: Partial<Proof> = {}): Proof => ({
  src: `/proof/${src}.webp`,
  alt: caption,
  caption,
  service,
  area,
  w: 1200,
  h: 1600,
  ...opts,
});

export const proof: Proof[] = [
  P("trench-mainline-01", "irrigation", "Mainline trenched along the bed line, sod set aside for reuse", "Boca Raton", { featured: true }),
  P("trench-mainline-02", "irrigation", "Trench routed around the palm root ball, PVC laid before backfill", "Boca Raton"),
  P("trench-mainline-03", "irrigation", "Lateral line run past the coconut palm, ready for heads", "Boca Raton"),
  P("trench-mainline-04", "irrigation", "Driveway-edge trench with lateral in place", "Delray Beach"),
  P("trench-mainline-05", "irrigation", "Corner lot: mainline crossing under the walkway", "Delray Beach", { featured: true }),
  P("trench-mainline-06", "irrigation", "Front-yard run along the sidewalk before backfill", "Delray Beach"),
  P("sprinkler-head-coverage", "irrigation", "Coverage check after head replacement", "Boynton Beach"),
  P("valve-box-service", "irrigation", "Valve box cleaned out and solenoids checked", "Boynton Beach", { w: 1600, h: 1200 }),
  P("fence-line-zone-test-01", "irrigation", "Zone test along a new fence line", "Wellington", { featured: true }),
  P("fence-line-zone-test-02", "irrigation", "Rotor heads reaching the far corner without wetting the fence", "Wellington"),
  P("pump-test-run", "pump", "New pump under load, bleeding air from the discharge", "Boynton Beach", { featured: true }),
  P("everbilt-pump-install", "pump", "Everbilt pump set on a fresh pad, suction side re-plumbed", "Boynton Beach"),
  P("pump-plumbing-detail", "pump", "Discharge loop and check valve on a lake pump", "Delray Beach"),
  P("goulds-pump-rebuild", "pump", "Goulds pump rebuild with new shutoff and bleed valve", "Delray Beach", { featured: true }),
  P("paver-border-annuals-01", "landscape", "Mulch border and pentas along a paver drive", "Boca Raton", { featured: true }),
  P("paver-border-annuals-02", "landscape", "Same border from the street side, freshly planted", "Boca Raton"),
  P("backyard-bed-gravel-01", "landscape", "Gravel and mulch bed between patio and raised planters", "Wellington"),
  P("backyard-bed-gravel-02", "landscape", "Two-tone bed edging around a travertine patio", "Wellington"),
  P("bougainvillea-patio", "landscape", "Bougainvillea and gravel surround at a patio step", "Wellington"),
];

export const featured = proof.filter((p) => p.featured);
export const proofFor = (id: ServiceId) => proof.filter((p) => p.service === id);

/** Look up a photo by its slug (the filename without /proof/ or .webp). */
export const bySlug = (slug: string) => proof.find((p) => p.src === `/proof/${slug}.webp`);

/**
 * Confirmed same-job before/after pairs.
 *
 * EMPTY BY DESIGN. Nothing in the photo set records which trench photo and
 * which finished photo came from the same property — trenches are tagged
 * `irrigation`, finished yards `landscape`, and `area` is only a city, not an
 * address. Pairing on city alone would put a Boca Raton trench beside an
 * unrelated Boca Raton flowerbed and present them as one job.
 *
 * To turn on real before/afters: add entries here using photo slugs. The
 * homepage section switches from the process sequence to a draggable
 * before/after slider automatically as soon as this array is non-empty.
 */
export const beforeAfterPairs: { before: string; after: string; caption: string }[] = [];

export const resolvedPairs = beforeAfterPairs
  .map((p) => ({ before: bySlug(p.before), after: bySlug(p.after), caption: p.caption }))
  .filter((p): p is { before: Proof; after: Proof; caption: string } => Boolean(p.before && p.after));

/**
 * Representative stages of a typical job, shown when no confirmed pairs exist.
 * These are three photos of the same KIND of work from different properties,
 * and the captions say so — they never claim to be one yard over time.
 */
export const jobStages = [
  { slug: "trench-mainline-01", stage: "Trenching", note: "Mainline goes in along the bed line. Sod is cut and set aside so it can go back down." },
  { slug: "fence-line-zone-test-01", stage: "Zone testing", note: "Every zone runs before backfill, so coverage gets tuned while the line is still reachable." },
  { slug: "paver-border-annuals-01", stage: "Put back better", note: "Trenches closed, beds re-edged, fresh mulch and color where the digging was." },
]
  .map((s) => ({ ...s, photo: bySlug(s.slug) }))
  .filter((s): s is typeof s & { photo: Proof } => Boolean(s.photo));

/** Photo counts per service area, used by the service-area section so the
 *  numbers shown are real rather than decorative. */
export const proofByArea = (area: string) => proof.filter((p) => p.area === area);
