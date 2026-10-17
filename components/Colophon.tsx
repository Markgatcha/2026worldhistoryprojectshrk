import Link from "next/link";
import MotionToggle from "@/components/MotionToggle";
import { Lozenge } from "@/components/Ornament";
import { invention } from "@/content/invention";

const links = [
  { href: "/problem", label: "The Problem" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-invest", label: "Why Invest" },
  { href: "/pitch", label: "The Ask" },
  { href: "/sources", label: "Sources" },
];

/**
 * The colophon.
 *
 * Every printed sheet of the period ended with the printer's imprint — who
 * it was set for, in what faces, and by whom. Without one the interior pages
 * simply ran out of words and stopped, which is the one place the design
 * dropped its own metaphor. The imprint also gives the motion control a
 * home, so it no longer has to float over the page as app chrome.
 */
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
          <p className="colophon-folio" aria-hidden="true">Fin.</p>
        </div>

        <div className="colophon-base">
          <p className="colophon-imprint">
            <span>Set in Abril Fatface, Goudy Bookletter 1911 &amp; EB Garamond</span>
            <span>Printed for Mark Gatcha &middot; World History &middot; Shark Tank Project &middot; MMXXVI</span>
          </p>
          <MotionToggle />
        </div>
      </div>
    </footer>
  );
}
