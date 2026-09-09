# Improvement plan

Status: **awaiting approval — no site code changed yet.**
Branch: `site-improvements` (off `main`). Nothing pushed.

Baseline verified before writing this: `npm install` clean, `npm run build` passes,
7 static routes, no type errors.

---

## Findings that shape the plan

**1. There is no lighting photo inventory at all.**
`data/proof.ts` has 19 photos: 10 `irrigation`, 4 `pump`, 5 `landscape`, **0 `lighting`**.
The code already knows this — `app/services/page.tsx:33` renders a hardcoded
"photos are on the way" box. So lighting is the one service sold with no evidence
behind it, which is the strongest argument for the `/lighting` page you asked for.

**2. The before/after pairing you want is not supported by the data, and I don't
want to fake it.**
Nothing links a trench photo to a finished photo. The `Proof` type has no pairing
field, and the only shared attribute is `area`. Trench photos are tagged
`irrigation`; finished-lawn photos are tagged `landscape`. Pairing them by `area`
alone would put a Boca Raton trench next to a Boca Raton flowerbed and imply they
are the same yard on the same job — a claim I can't verify and that would be a
false statement about real work on a real business site.

Handling below in Phase 3 — this is the one item where I'm proposing something
different from what you asked, and it needs your input.

**3. Every CTA points at `/#quote`.** Header, homepage hero, services page, and the
closing banner all deep-link to the homepage form anchor. Adding `/contact` means
deciding what those become. Proposal: leave them (an inline form converts better
than a link to a form) and make `/contact` the destination for nav, footer, and
the lighting page only.

**4. `QuoteForm` is a visible demo stub.** `components/QuoteForm.tsx:10`
`preventDefault()`s and shows "Demo: nothing was actually submitted." It's the same
component the contact page should use, so it needs a real target either way.

**5. SEO is close to bare.** Page `metadata` exports are title-only. There is no
`metadataBase`, no `openGraph`/`twitter` blocks, no OG image, no favicon, no
`sitemap.ts`, no `robots.ts`, and no structured data. For a local trades business,
the missing `LocalBusiness` JSON-LD is probably the single biggest organic-search
gap — it's what drives the map/rich results these companies live on.

**6. Nav is duplicated in three places.** `Header.tsx:6-10` (desktop + mobile reuse
one array) and `Footer.tsx:12-16` hardcode their own list. Two new pages means
editing both, and they will drift. Worth extracting to `data/nav.ts`.

**7. Build-time vulnerability, no action recommended.** `npm audit` reports 2
(1 high, 1 moderate) — all `postcss` advisories reached through `next`. The only
fix is `next@16.3.4`, a major breaking upgrade. All four CVEs require
attacker-controlled CSS or source maps at build time; this site's CSS is authored
by you and built on Vercel. **Recommend deferring.** Flagging because it will show
in Vercel logs. Say the word if you want the Next 16 migration as separate work.

---

## Phases

Each phase is one commit. Phases 1–2 are groundwork the rest depends on.

### Phase 1 — Shared plumbing
- `data/nav.ts` — single nav source; `Header` and `Footer` import it.
- `data/site.ts` — business name, phone `(561) 555-0142`, hours, the four cities,
  canonical URL. Currently these strings are copy-pasted across five files.
- Add `metadataBase` to root layout so OG image URLs resolve absolutely.

No visual change. Pure de-duplication, so later phases touch one file, not five.

### Phase 2 — SEO foundation
- Per-page `metadata`: unique `title` + `description` + `openGraph` + `twitter`
  on all pages, existing and new.
- One OG image. Proposal: a static `app/opengraph-image.tsx` rendered by Next's
  built-in ImageResponse — brand green, business name, the four cities, no photo
  dependency. Keeps it in code rather than a binary asset that goes stale.
- `app/icon.svg` favicon reusing the Header's water-drop mark.
- `sitemap.ts` and `robots.ts`.
- `LocalBusiness` JSON-LD in root layout: name, phone, hours, `areaServed` (four
  cities), `aggregateRating` from `data/reviews.ts`.

**One flag on the rating markup:** Google's structured-data policy expects
`aggregateRating` to reflect genuine collected reviews. The homepage already claims
"4.9 from 180+ local reviews" while `reviews.ts` holds 5 fictional entries
averaging 4.8. For a demo site that's fine as on-page text, but emitting it as
JSON-LD is asking search engines to treat invented numbers as real. **Recommend
computing the rating from the 5 actual entries, or omitting `aggregateRating`.**
Tell me which — I'll default to computing from the real array if you don't care.

### Phase 3 — Before/after (needs your input)

I'll build the component either way. The question is what feeds it.

- **Option A — you confirm real pairs (best).** I add an optional
  `pair?: { with: string; role: "before" | "after" }` to the `Proof` type and a
  `beforeAfter()` selector. You tell me which photos are genuinely the same job.
  My guess from captions and `area`: `trench-mainline-01` (Boca, "sod set aside for
  reuse") with `paver-border-annuals-01/02` (Boca, paver drive) — but that is a
  guess and I won't ship it as fact.
- **Option B — honest reframe (my recommendation if you can't confirm).** Ship the
  same slider as a **"How a job goes"** sequence: trench → backfill → finished,
  captioned as representative stages of our process rather than one address. Reads
  nearly as well, claims nothing false, and upgrades to Option A for free once you
  confirm pairs — the component doesn't change, only the data does.

I'll implement the schema + component so either option drops in. **Default if you
don't reply: Option B.**

### Phase 4 — `/lighting`
- Hero, the four `includes` from `services.ts`, a fixture-type explainer
  (path / uplight / step / transformer + timer), and a lighting-specific CTA.
- Placeholder illustrations: inline SVG in the site's own token colors — a night
  scene with uplit palm, path lights, a wash on a facade. Inline SVG over stock
  imagery because it can't be mistaken for a photo of work we've done, it themes
  correctly in dark mode, and it costs no bytes.
- Every placeholder labeled *"Illustration — photos from our first installs coming
  soon."* Same honesty rule as Phase 3: nothing that reads as a finished job we did.
- Swap path documented so real photos replace illustrations by adding rows to
  `proof.ts` with `service: "lighting"`, no component edits.

### Phase 5 — Service area
- Section on `/` and `/contact` with the four cities: Boca Raton, Delray Beach,
  Boynton Beach, Wellington.
- Each city gets a real job count pulled from `proof.ts` `area` counts
  (Boca 5, Delray 5, Boynton 4, Wellington 5) — genuine numbers, not decoration.
- Plain CSS/SVG map-ish panel, no map library, no API key, no external tiles.

### Phase 6 — `/contact`
- Reuses `QuoteForm` rather than duplicating it, plus phone, hours, service area.
- **Submission target — recommend Formspree.** A `mailto:` handoff dumps the user
  into a mail client, loses everyone without a configured desktop client, and drops
  mobile users entirely; it converts badly. Formspree posts real data and needs no
  backend on Vercel.
- Implementation: read the endpoint from `NEXT_PUBLIC_FORMSPREE_ID`. Unset (today)
  → form keeps current demo behavior with the honest "demo" notice. Set → posts for
  real, with loading/error states and a graceful failure message. That way it ships
  working now and goes live by adding one Vercel env var, no code change.
- Real form semantics on the way through: `<label>`s (currently placeholder-only,
  which screen readers don't announce reliably), `name` attributes, `aria-invalid`,
  focus management on submit, honeypot spam field.

### Phase 7 — Mobile pass on every page
Not a code phase up front — an audit I run against the built site, then fix what it
finds in a follow-up commit. I'll check `/`, `/services`, `/work`, `/reviews`,
`/lighting`, `/contact` at 320 / 375 / 414 / 768 px for horizontal overflow, tap
targets under 44px, and text under 16px.

Specific suspects already spotted, to confirm rather than assume:
- `Header.tsx:16-31` — logo, theme toggle, and hamburger share one flex row; the
  brand uses a `<br className="sm:hidden">` to wrap. Likely tight at 320px.
- The mobile menu has nav links and a quote button but **no phone number**, while
  the desktop header shows it at `lg`. Calling is the primary action for this
  business and it's missing exactly where the caller is holding a phone.
- `page.tsx:20` hero grid and `reviews/page.tsx:17` `260px` image column.
- `app/page.tsx:50` renders `See all {featured.length ? "our work" : ""}` — leaves
  a dangling "See all " if nothing is featured. Trivial, will fix in passing.

I'll report findings with the fixes rather than silently restyling.

---

## Deliberately out of scope
Next 16 upgrade (Finding 7) · replacing photos or the photo pipeline · analytics ·
CMS · booking/scheduling · copy rewrite beyond the new pages · pushing to GitHub.

## Sequencing
Phases 1 → 2 → 3 → 4 → 5 → 6 → 7, `npm run build` green at each commit.

## Open questions
1. **Before/after (Phase 3)** — Option A with confirmed pairs, or Option B?
   *Default: B.*
2. **`aggregateRating` (Phase 2)** — compute from the 5 real reviews, or omit?
   *Default: compute from the real array.*
3. **Formspree vs mailto (Phase 6)** — *Default: Formspree behind an env var.*
4. **Contact vs `/#quote` (Finding 3)** — leave existing CTAs on the homepage
   anchor? *Default: yes, leave them.*

Approve as-is and I'll take every default above.
