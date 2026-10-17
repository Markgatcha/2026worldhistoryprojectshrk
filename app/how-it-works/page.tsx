import type { Metadata } from "next";
import CaravelShip from "@/components/CaravelShip";
import VoyageEffects from "@/components/VoyageEffects";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "How It Works",
  description: invention.howItWorks.body,
};

export default function HowItWorksPage() {
  return (
    <main id="main">
      <VoyageEffects />
      <section className="chapter blueprint-chapter page-hero">
        <div className="page-width">
          <span className="section-number" aria-hidden="true">02</span>
          <p className="eyebrow entrance">How it works</p>
          <h1 className="entrance entrance-two">What made the caravel different?</h1>
          <p className="page-hero-body entrance entrance-three">{invention.howItWorks.body}</p>
        </div>
      </section>

      <section className="chapter blueprint-chapter chapter-flush">
        <div className="page-width">
          <div className="blueprint-layout">
            <figure className="blueprint-figure plate-frame" data-reveal>
              <p className="eyebrow">A look at the caravel</p>
              <CaravelShip className="blueprint-ship" />
              <figcaption>SAIL PLAN · HULL · STEERING<br /><span>A simplified drawing I made, not to scale</span></figcaption>
            </figure>
            <div>
              {/* h2 for the four numbered features, so their h3s are nested
                  rather than opening the outline at level three. */}
              <h2 className="feature-heading" data-reveal>The four changes that mattered</h2>
              <ol className="feature-list">
                {invention.howItWorks.steps.map((step, i) => (
                  <li key={step.title} data-reveal>
                    <span className="feature-number">0{i + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <aside className="field-note" data-reveal>
            <p className="eyebrow">Something else I learned</p>
            <p>{invention.howItWorks.footnote}</p>
          </aside>

          {/* The two caravel types, set in newspaper columns. */}
          <h2 className="column-span-all heading-continues" data-reveal>The two types of caravel</h2>
          <div className="newspaper-columns" data-reveal>
            <p>
              The earlier type, called the <em>caravela latina</em>, carried lateen sails on
              every mast. It was the version built for working along a coastline, where
              being able to turn into the wind mattered more than raw speed downwind.
            </p>
            <p>
              Later came the <em>caravela redonda</em>, which was a smart upgrade. It put
              square sails on the foremast for speed across open ocean, and kept a lateen
              sail on the main and mizzen for maneuverability. That combination is what made
              it one of the best sailing ships of its time.
            </p>
            <p>
              Columbus used both types on his first voyage in 1492. The <em>Niña</em> and the{" "}
              <em>Pinta</em> were caravels, while the <em>Santa María</em> was a larger ship.
              The <em>Niña</em> actually started the voyage with lateen sails but got switched
              over to square sails at the Canary Islands, because the crew found them easier
              to handle on a long ocean crossing.
            </p>
          </div>

          {/* Specifications, set as a plate table. */}
          <div className="spec-block" data-reveal>
            <div className="ornament-rule"><span>{invention.specifications.heading}</span></div>
            <p className="spec-intro drop-cap">{invention.specifications.body}</p>
            <dl className="spec-table">
              {invention.specifications.rows.map((row) => (
                <div className="spec-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
