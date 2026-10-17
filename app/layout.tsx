import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Colophon from "@/components/Colophon";
import { invention } from "@/content/invention";
import "./globals.css";

const siteUrl = "https://2026worldhistoryprojectshrk.vercel.app";

export const metadata: Metadata = {
  // Base metadata. Each page exports its own `metadata`, which Next merges
  // over this, so the title and description follow the route.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${invention.name} — My Shark Tank Project`,
    template: `%s · ${invention.name}`,
  },
  description: invention.tagline,
  applicationName: invention.name,
  authors: [{ name: "Mark Gatcha" }],
  keywords: ["caravel", "Age of Exploration", "Shark Tank", "world history"],
  openGraph: {
    type: "website",
    siteName: invention.name,
    title: `${invention.name} — My Shark Tank Project`,
    description: invention.tagline,
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: `${invention.name} — My Shark Tank Project`,
    description: invention.tagline,
  },
  // The poster's own spot colours, so browser chrome matches the print.
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* First tab stop: lets keyboard users bypass the five nav links. */}
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="print-grain" aria-hidden="true" />
        <Navbar />
        {children}
        <Colophon />
      </body>
    </html>
  );
}
