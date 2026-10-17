import Link from "next/link";
import CaravelShip from "@/components/CaravelShip";
import NauticalChart from "@/components/NauticalChart";
import SectionHeading from "@/components/SectionHeading";
import VoyageEffects from "@/components/VoyageEffects";
import FunFact from "@/components/FunFact";
import { CornerOrnament } from "@/components/Ornament";
import { invention } from "@/content/invention";

export default function Home() {
  return (
    // `id="main"` is the skip link's target on every route.
    <main id="main">
      <VoyageEffects />

      {/* ── HERO ── the poster ── */}
      <section className="hero ink-bg">
        {/* The engraved chart, drawn behind the plate. */}
        <div className="chart-layer">
          <NauticalChart className="chart-canvas" />
        </div>

        {/* The printed border: four Art Nouveau corners. */}
        <div className="hero-frame" aria-hidden="true">
          <CornerOrnament corner="tl" />
          <CornerOrnament corner="tr" />
          <CornerOrnament corner="br" />
          <CornerOrnament corner="bl" />
        </div>

        {/* Plakatstil, the German object poster of 1905: a flat field, the
            object, its name, one line. Bernhard's Priester poster carried two
            matches, the brand name and nothing else, and it is the reason a
            poster can hold a whole argument in five elements. Everything this
            sheet does not need — coordinates, a second credit line, a caption
            under the drawing, a pair of call-to-action buttons — has been
            taken off it. */}
        <div className="page-width hero-poster">
          <p className="eyebrow entrance">A Shark Tank proposition</p>
          <h1 className="entrance entrance-two">{invention.name}</h1>
          <p className="hero-tagline entrance entrance-three">
            A small ship. <em>A big deal</em> for exploration.
          </p>

          <figure className="hero-plate entrance entrance-two">
            <CaravelShip className="hero-ship" variant="poster" />
          </figure>
        </div>
      </section>

      {/* The particulars: three figures on a printed band, the way a poster
          carried its small print along the bottom edge. They used to sit
          inside the hero, which is what pushed the plate off a laptop screen. */}
      <section className="stat-band" aria-label="Key figures">
        <div className="page-width stat-strip">
          {invention.stats.map((stat) => (
            <div key={stat.label} className="stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUICK TOUR ── */}
      <section id="quick-tour" className="chapter light-chapter stock-bg">
        <div className="page-width">
          <SectionHeading
            eyebrow="The quick tour"
            title="What's on this site"
            body="Four sections, in the order I'd walk you through them."
          />
          <div className="tour-grid">
            {[
              { href: "/problem", num: "01", title: "The Problem", desc: "Why Portugal's existing ships could not handle the voyage down the African coast." },
              { href: "/how-it-works", num: "02", title: "How It Works", desc: "The four design changes that made the caravel different from what came before." },
              { href: "/why-invest", num: "03", title: "Why Invest", desc: "The voyages it made possible, and what it cost to build and crew." },
              { href: "/pitch", num: "04", title: "The Ask", desc: "50,000 gold cruzados for a fleet of caravels." },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="tour-card" data-reveal>
                <span className="tour-num">{card.num}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className="tour-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUN FACT ── */}
      <section className="chapter light-chapter">
        <div className="page-width">
          <SectionHeading
            eyebrow="From my research"
            title="Things that surprised me"
            body="Details from my paper that I did not expect when I started reading."
          />
          <FunFact />
        </div>
      </section>

      {/* ── HONEST TEASER ── */}
      <section className="chapter honest-chapter">
        <div className="page-width honest-layout" data-reveal>
          <div>
            <p className="eyebrow">It's not perfect (be honest)</p>
            <h2>{invention.honestCatch.heading}</h2>
          </div>
          <p>{invention.honestCatch.body}</p>
        </div>
      </section>
    </main>
  );
}
