import Link from "next/link";
import { Lozenge } from "@/components/Ornament";
import { invention } from "@/content/invention";

// One masthead row, not two. The credit strip that used to sit under it was a
// second band of small caps stacked above the poster's own eyebrow; with the
// hero reduced to five elements it was the first thing to go. The plate
// numbers that led each entry went with it — five numerals in a row is an
// index, and the poster only has room for one idea at a time.
const links = [
  { href: "/problem", label: "The Problem" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/why-invest", label: "Why Invest" },
  { href: "/pitch", label: "The Ask" },
  { href: "/sources", label: "Sources" },
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
              {link.label}
            </Link>
          ))}
        </div>
        <details className="mobile-navigation">
          <summary>Menu</summary>
          <div>
            <Link href="/">Home</Link>
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
