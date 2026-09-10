# Bridgett's Basement Services INC — demo site

Next.js 15 + Tailwind 4, dark mode via `next-themes`. Proof-of-service photos live in `public/proof/` and are tagged by service in `data/proof.ts`.

## Run locally
```
npm install
npm run dev        # http://localhost:3000
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo. Defaults are fine (framework auto-detects as Next.js).
3. Deploy. Every push to `main` redeploys.

## Adding or replacing photos
1. Drop originals (JPEG/HEIC) in a folder, e.g. `~/raw-photos/`.
2. Add each file to `MANIFEST` in `scripts/prep-photos.py` (filename → slug). Add any redaction boxes (house numbers, plates) to `BLUR`.
3. `pip install pillow` once, then `npm run photos -- ~/raw-photos`. Outputs 1600px WebP into `public/proof/` with EXIF/GPS stripped.
4. Add a line for each new photo in `data/proof.ts` — set `service` to one of `irrigation | pump | landscape | lighting`, and `featured: true` to show it on the homepage.

Photos show up automatically on `/work` (filterable), on `/services` under their service, and on the homepage if featured. Reviews in `data/reviews.ts` can point to any proof photo via `photo`.

## Configuration

Both are optional — the site builds and runs without them.

| Variable | Effect when unset | Set it to |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Falls back to Vercel's project URL, then `http://localhost:3000`. Canonical tags, `sitemap.xml`, and JSON-LD use it. | Your custom domain, once attached. |
| `NEXT_PUBLIC_FORMSPREE_ID` | The quote form keeps demo behaviour and says plainly that nothing was sent. | Your Formspree form ID. The form then posts for real — no code change. |

## Turning on before/after pairs

`data/proof.ts` exports `beforeAfterPairs`, which is **empty on purpose**: nothing
in the photo set records which trench photo and which finished photo came from the
same property, so pairing them would claim something unverified.

Add confirmed pairs by slug and the homepage section switches from the
"start to finish" walkthrough to a draggable before/after slider automatically:

```ts
export const beforeAfterPairs = [
  { before: "trench-mainline-01", after: "paver-border-annuals-01", caption: "Boca Raton front yard" },
];
```

## Replacing the lighting illustrations

`/lighting` draws inline SVG placeholders because `data/proof.ts` has no photos
tagged `lighting`. Add rows with `service: "lighting"` (see below) and the page
swaps the drawings for a real gallery with no component edits.

## Where to edit copy
- Business name / phone / hours / service-area cities: `data/site.ts` — single source, used by header, footer, metadata, and JSON-LD
- Nav links: `data/nav.ts` — drives the desktop nav, mobile menu, footer, and should be kept in step with `app/sitemap.ts`
- Services: `data/services.ts`
- Reviews: `data/reviews.ts` — the homepage badge and the `aggregateRating` in structured data are both computed from this array, so don't hardcode a rating anywhere else
- Colors: CSS variables at the top of `app/globals.css` (light + `.dark`)
