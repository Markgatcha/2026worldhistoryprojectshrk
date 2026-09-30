import { invention } from "@/content/invention";

const links = [
  { href: "#problem", label: "The Problem" },
  { href: "#how", label: "How It Works" },
  { href: "#why", label: "Why It Wins" },
  { href: "#ask", label: "The Ask" },
  { href: "#crew", label: "Crew" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className="font-display text-lg font-bold tracking-wide text-goldlight">
          {invention.name}
        </a>
        <div className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-parchment/80 transition-colors hover:text-goldlight"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#ask"
          className="rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-ink transition-colors hover:bg-goldlight"
        >
          Make an offer
        </a>
      </nav>
    </header>
  );
}
