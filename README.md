# Irrigation Systems & Landscape Lighting — demo site

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

## Where to edit copy
- Business name / phone: `components/Header.tsx`, `components/Footer.tsx`, `app/page.tsx`
- Services: `data/services.ts`
- Reviews: `data/reviews.ts`
- Colors: CSS variables at the top of `app/globals.css` (light + `.dark`)
