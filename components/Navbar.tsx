import Link from "next/link";
import { Lozenge } from "@/components/Ornament";
import { invention } from "@/content/invention";

// Set as a numbered index, the way a periodical's contents page lists its
// sections. The folio is the plate number carried by each route.
const links = [
  { href: "/problem", label: "The Problem", folio: "01" },
  { href: "/how-it-works", label: "How It Works", folio: "02" },
  { href: "/why-invest", label: "Why Invest", folio: "03" },
  { href: "/pitch", label: "The Ask", folio: "04" },
  { href: "/sources", label: "Sources", folio: "05" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="page-width navbar" aria-label="Main navigation">
        <Link href="/" className="brand">
          <Lozenge className="brand-mark" />
          {invention.name}
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="nav-folio">{link.folio}</span>
              {link.label}
            </Link>
          ))}
        </div>
        <details className="mobile-navigation">
          <summary>Menu</summary>
          <div>
            <Link href="/">Home</Link>
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                <span className="nav-folio">{link.folio}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
      {/* The periodical's running head, set INSIDE the header rather than as a
          second fixed bar below it. Two stacked bars read as app chrome; one
          masthead with a gold rule under the wordmark reads as a printed page. */}
      <div className="masthead-strip">
        <div className="page-width masthead-row">
          <span>Mark Gatcha &middot; World History &middot; Shark Tank Project</span>
          <span aria-hidden="true">{invention.tagline}</span>
        </div>
      </div>
    </header>
  );
}