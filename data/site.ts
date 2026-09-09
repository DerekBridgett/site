// Single source for business details that used to be copy-pasted across
// Header, Footer, the homepage, and every CTA.

const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);

/** Absolute origin, used for metadataBase, sitemap, and JSON-LD.
 *  Vercel supplies VERCEL_PROJECT_PRODUCTION_URL automatically; set
 *  NEXT_PUBLIC_SITE_URL to override once a custom domain is attached. */
export const siteUrl = fromEnv ?? "http://localhost:3000";

export const site = {
  name: "Irrigation Systems & Landscape Lighting",
  tagline: "Irrigation that reaches every corner, and lights that show it off.",
  phone: "(561) 555-0142",
  phoneHref: "tel:5615550142",
  hours: "Mon–Sat, 7am–6pm",
  region: "southern Palm Beach County",
} as const;

/** The four cities we serve. Order is intentional — matches how they appear in copy. */
export const areas = ["Boca Raton", "Delray Beach", "Boynton Beach", "Wellington"] as const;

/** "Boca Raton, Delray Beach, Boynton Beach, and Wellington" */
export const areaList = `${areas.slice(0, -1).join(", ")}, and ${areas[areas.length - 1]}`;
