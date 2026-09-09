import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

/** Keep in sync when adding a route. */
const routes = [
  { path: "", priority: 1.0 },
  { path: "/services", priority: 0.9 },
  { path: "/work", priority: 0.8 },
  { path: "/reviews", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
