import type { Metadata } from "next";
import { site } from "@/data/site";

/** Builds per-page metadata so every route gets a unique title, description,
 *  canonical URL, and Open Graph/Twitter block from one place.
 *  The OG image itself comes from app/opengraph-image.tsx, which Next applies
 *  to every route under app/ automatically — no need to repeat it here. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const full = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, siteName: site.name, locale: "en_US", type: "website" },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
