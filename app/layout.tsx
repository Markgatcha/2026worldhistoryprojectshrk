import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Colophon from "@/components/Colophon";
import { invention } from "@/content/invention";
import "./globals.css";

const siteUrl = "https://2026worldhistoryprojectshrk.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0b2431",
  colorScheme: "light",
};

export const metadata: Metadata = {
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
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        {/* First tab stop. */}
        <a className="skip-link" href="#main">Skip to content</a>
        <Navbar />
        {children}
        <Colophon />
      </body>
    </html>
  );
}
