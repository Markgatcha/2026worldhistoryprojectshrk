import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { invention } from "@/content/invention";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "900"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-reading",
});

export const metadata: Metadata = {
  title: `${invention.name} — Shark Tank Pitch`,
  description: invention.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
