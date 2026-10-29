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
