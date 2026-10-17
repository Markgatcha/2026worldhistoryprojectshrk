import Link from "next/link";
import CaravelShip from "@/components/CaravelShip";
import NauticalChart from "@/components/NauticalChart";
import SectionHeading from "@/components/SectionHeading";
import VoyageEffects from "@/components/VoyageEffects";
import FunFact from "@/components/FunFact";
import { CornerOrnament, Lozenge } from "@/components/Ornament";
import { invention } from "@/content/invention";

export default function Home() {
  return (
    // `id="main"` is the skip link's target on every route.
    <main id="main">
      <VoyageEffects />

      {/* ── HERO ── the poster ── */}
      <section className="hero ink-bg">
        {/* The engraved chart, drawn behind the hero copy. */}
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

        <div className="hero-coordinate" aria-hidden="true">Portugal / Atlantic Ocean / XV Century</div>

        {/* The running head: the poster names its subject and its occasion
            before it shows the picture. */}
        <div className="page-width hero-banner">
          <span>Exploration Inventions</span>
          <Lozenge className="hero-banner-mark" />
          <span>Shark Tank &middot; World History</span>
        </div>

        <div className="page-width hero-layout">
          <div className="hero-copy">
            <p className="eyebrow entrance">Est. 1451 &middot; Portugal</p>
            <h1 className="entrance entrance-two">
              A small ship.<br />
              <em>A big deal</em><br />
              for exploration.
            </h1>
            <p className="hero-intro entrance entrance-three">
              Meet <strong>{invention.name}</strong>. {invention.tagline}
            </p>
            <p className="hero-description entrance entrance-three">{invention.heroPitch}</p>
            <div className="button-row entrance entrance-three">
              <Link className="button button-gold" href="/how-it-works">
                Explore the invention
              </Link>
              <Link className="text-link" href="/pitch">
                See my pitch
              </Link>
            </div>
            <p className="hero-credit">
              Mark Gatcha <span>/</span> Solo World History Project <span>/</span> 10th Grade
            </p>
          </div>

          <figure className="ship-scene entrance entrance-two">
            <div className="compass-orbit" aria-hidden="true">
              <span>N</span><span>E</span><span>S</span><span>W</span>
            </div>
            <div className="route-line" aria-hidden="true" />
            <CaravelShip className="hero-ship" variant="poster" />
            <div className="ship-caption">
              <span className="status-dot" /> The Caravel <span>/</span> Built for discovery
            </div>
            <figcaption>It was small, but it could do a lot.</figcaption>
          </figure>
        </div>

        <div className="page-width stat-strip">
          {invention.stats.map((stat, i) => (
            <div key={stat.label} className="stat" data-reveal>
              <span className="stat-index">0{i + 1}</span>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <a className="scroll-cue" href="#quick-tour">
          Quick tour <span aria-hidden="true">&darr;</span>
        </a>
      </section>

      <div className="voyage-strip" aria-hidden="true">
        <span>The ship of discovery</span>
        <Lozenge className="voyage-mark" />
        <span>Not the ship of delivery</span>
        <Lozenge className="voyage-mark" />
        <span>The Caravel</span>
      </div>

      {/* ── QUICK TOUR CARDS ── */}
      <section id="quick-tour" className="chapter light-chapter stock-bg">
        <div className="page-width">
          <div className="masthead" data-reveal>
            <h2>The Caravel</h2>
            <p>The ship that made the Age of Exploration possible</p>
          </div>
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