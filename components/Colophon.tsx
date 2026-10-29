import Link from "next/link";
import { Lozenge } from "@/components/Ornament";
import { invention } from "@/content/invention";

const links = [
  { href: "/problem", label: "The Problem" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-invest", label: "Why Invest" },
  { href: "/pitch", label: "The Ask" },
  { href: "/sources", label: "Sources" },
];

/** The bottom of the sheet. */
export default function Colophon() {
  return (
    <footer className="colophon" id="colophon">
      <div className="page-width">
        <div className="colophon-rule" aria-hidden="true" />

        <div className="colophon-top">
          <p className="colophon-mark">
            {invention.name}
            <Lozenge className="brand-mark" />
          </p>
          <nav className="colophon-nav" aria-label="Footer navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="colophon-base">
          <p className="colophon-imprint">
            <span>Made by Mark Gatcha for World History.</span>
          </p>
          <p className="colophon-note">
            The history comes from my research paper. The 50,000 gold coins and 10% equity
            are made up for the pitch.
          </p>
        </div>
      </div>
    </footer>
  );
}
