import { site, siteUrl, areas } from "@/data/site";
import { reviews, ratingAvg, reviewCount } from "@/data/reviews";
import { services } from "@/data/services";

/** LocalBusiness structured data — what drives rich/map results for a trades
 *  business. Rating and reviews are derived from data/reviews.ts rather than
 *  hardcoded, so the markup always matches what visitors actually see. */
export default function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: site.name,
    description: `Irrigation install and repair, well and lake pump systems, and low-voltage landscape lighting across ${site.region}.`,
    url: siteUrl,
    telephone: site.phone,
    image: `${siteUrl}/opengraph-image`,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
    areaServed: areas.map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "AdministrativeArea", name: "Palm Beach County, FL" } })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.short },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingAvg,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.stars, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
