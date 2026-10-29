import type { Metadata } from "next";
import PageMasthead from "@/components/PageMasthead";
import CaravelShip from "@/components/CaravelShip";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "How It Works",
  description: invention.howItWorks.body,
};

const letters = ["A", "B", "C", "D"];

export default function HowItWorksPage() {
  return (
    <main id="main">
      <PageMasthead
        number="02"
        kicker="How it works · the drawing"
        title="What made the caravel different?"
        deck={invention.howItWorks.body}
        variant="diagram"
      />

      <section className="chapter paper-chapter blueprint-chapter">
        <div className="page-width blueprint-page">
          <div className="blueprint-layout">
            <figure className="plate-figure plate-frame">
              <div className="plate-head">
                <span>Drawing 2 — the caravel</span>
                <span>not to scale</span>
              </div>
              <div className="plate-drawing">
                <CaravelShip className="blueprint-ship" showKey />
                <dl className="plate-key">
                  <div><dt>A</dt><dd>lateen sail</dd></div>
                  <div><dt>B</dt><dd>carvel hull</dd></div>
                  <div><dt>C</dt><dd>shallow keel</dd></div>
                  <div><dt>D</dt><dd>centre rudder</dd></div>
                </dl>
              </div>
              <figcaption>
                My drawing, with the parts I kept forgetting.
                <br />
                <span>The lines are a little uneven because I drew them.</span>
              </figcaption>
            </figure>

            <div className="blueprint-notes">
              <p className="eyebrow">The changes that mattered</p>
              <h2 className="feature-heading">Four things I would point out</h2>
              <ol className="feature-list">
                {invention.howItWorks.steps.map((step, i) => (
                  <li key={step.title}>
                    <span className="feature-number" aria-hidden="true">{letters[i]}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <aside className="blueprint-footnote">
                <p className="eyebrow">Something else I learned</p>
                <p>{invention.howItWorks.footnote}</p>
              </aside>
            </div>
          </div>

          <div className="blueprint-appendix">
            <div>
              <h2 className="feature-heading">The two types of caravel</h2>
              <div className="newspaper-columns">
                <p>
                  The earlier type, called the <em>caravela latina</em>, carried lateen sails on
                  every mast. It was the version built for working along a coastline, where
                  being able to turn into the wind mattered more than speed with the wind behind
                  it.
                </p>
                <p>
                  Later came the <em>caravela redonda</em>, which was a smart upgrade. It put
                  square sails on the foremast for speed across open ocean, and kept a lateen
                  sail on the main and mizzen so it could still turn and steer. That combination
                  is what made it one of the best sailing ships of its time.
                </p>
                <p>
                  Columbus used both types on his first voyage in 1492. The <em>Niña</em> and the{" "}
                  <em>Pinta</em> were caravels, while the <em>Santa María</em> was a larger ship.
                  The <em>Niña</em> actually started the voyage with lateen sails but got switched
                  over to square sails at the Canary Islands, because the crew found them easier
                  to handle on a long ocean crossing.
                </p>
              </div>
            </div>

            <aside className="blueprint-memory">
              <p className="eyebrow">The way I remember it</p>
              <p>
                One is all lateen sails. The other mixes square sails with a lateen. That is
                the whole difference, and it took me way too long to get it straight.
              </p>
            </aside>
          </div>

          <div className="spec-block">
            <div className="spec-heading">
              <p className="eyebrow">The measurements</p>
              <h2 className="feature-heading">{invention.specifications.heading}</h2>
              <p className="spec-intro drop-cap">{invention.specifications.body}</p>
            </div>
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
