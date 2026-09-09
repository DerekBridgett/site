import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import { site, siteUrl, areaList } from "@/data/site";

const homeTitle = `${site.name} — South Florida`;
const homeDescription = `Irrigation install and repair, well and lake pump systems, and low-voltage landscape lighting for ${areaList}. Every job photographed, so you see exactly what was done.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Child pages set a short title; this appends the business name to it.
  title: { default: homeTitle, template: `%s — ${site.name}` },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: { title: homeTitle, description: homeDescription, url: "/", siteName: site.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: homeTitle, description: homeDescription },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LocalBusinessJsonLd />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
