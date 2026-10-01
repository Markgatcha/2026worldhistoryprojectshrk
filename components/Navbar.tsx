import { invention } from "@/content/invention";

const links = [
  { href: "#problem", label: "The challenge" },
  { href: "#how", label: "The invention" },
  { href: "#why", label: "Why invest" },
  { href: "#crew", label: "Presenter" },
  { href: "#sources", label: "Sources" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="page-width navbar" aria-label="Main navigation">
        <a href="#top" className="brand"><span className="brand-icon" aria-hidden="true">✧</span>{invention.name}</a>
        <div className="nav-links">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
        <a href="#ask" className="nav-cta">The proposal ↗</a>
        <details className="mobile-navigation"><summary>Menu +</summary><div>{[...links, { href: "#ask", label: "The proposal" }].map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</div></details>
      </nav>
    </header>
  );
}
