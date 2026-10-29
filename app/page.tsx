import Link from "next/link";
import CaravelShip from "@/components/CaravelShip";
import FunFact from "@/components/FunFact";
import { CompassBezel, CompassRose, CornerOrnament, RhumbWeb } from "@/components/Ornament";
import { invention } from "@/content/invention";

export default function Home() {
  return (
    <main id="main">
      {/* The cover of the pamphlet. */}
      <section className="hero ink-bg">
        <div className="hero-chart" aria-hidden="true">
          <RhumbWeb className="hero-chart-web" />
        </div>

        <div className="hero-compass" aria-hidden="true">
          <CompassRose />
          <CompassBezel className="hero-bezel" />
        </div>

        <div className="hero-frame" aria-hidden="true">
          <CornerOrnament corner="tl" />
          <CornerOrnament corner="tr" />
          <CornerOrnament corner="br" />
          <CornerOrnament corner="bl" />
        </div>

        <div className="page-width hero-poster">
          <p className="eyebrow">My Shark Tank pitch</p>
          <h1>{invention.name}</h1>
          <p className="hero-tagline">
            A small ship. <em>A big deal</em> for exploration.
          </p>

          <figure className="hero-plate">
            <CaravelShip className="hero-ship" variant="poster" />
          </figure>
        </div>
      </section>

      {/* Contents and the cover particulars. */}
      <section id="quick-tour" className="chapter light-chapter home-contents">
        <div className="page-width home-contents-layout">
          <div className="home-index">
            <div className="contents-head">
              <h2>What&apos;s in here</h2>
              <p>Four pages, in the order I&apos;d pitch them.</p>
            </div>
            <div className="tour-list">
              {[
                {
                  href: "/problem",
                  num: "01",
                  title: "The Problem",
                  desc: "Why the old ships kept losing to wind, shallow water and currents.",
                },
                {
                  href: "/how-it-works",
                  num: "02",
                  title: "How It Works",
                  desc: "The four changes I would point to on the drawing.",
                },
                {
                  href: "/why-invest",
                  num: "03",
                  title: "Why Invest",
                  desc: "The voyages it made possible, and what it cost to build.",
                },
                {
                  href: "/pitch",
                  num: "04",
                  title: "The Ask",
                  desc: "50,000 gold coins for a fleet of caravels.",
                },
              ].map((card) => (
                <Link key={card.href} href={card.href} className="tour-entry">
                  <span className="tour-num">{card.num}</span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <span className="tour-arrow" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <aside className="home-particulars" aria-label="Key figures">
            <div className="home-stats">
              {invention.stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Things my research turned up. */}
      <section className="chapter paper-chapter home-notebook">
        <div className="page-width">
          <div className="home-surprises">
            <div className="contents-head">
              <h2>Things that surprised me</h2>
              <p>Details from my paper I did not expect.</p>
            </div>
            <FunFact />
          </div>
        </div>
      </section>

      <section className="home-honest deep-chapter">
        <div className="page-width honest-layout">
          <div>
            <p className="eyebrow">It&apos;s not perfect (be honest)</p>
            <h2>{invention.honestCatch.heading}</h2>
          </div>
          <p>{invention.honestCatch.body}</p>
        </div>
      </section>
    </main>
  );
}
