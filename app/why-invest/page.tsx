import type { Metadata } from "next";
import VoyageEffects from "@/components/VoyageEffects";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "Why Invest",
  description: invention.whyItWins.body,
};

export default function WhyInvestPage() {
  return (
    <main id="main">
      <VoyageEffects />
      <section className="chapter light-chapter page-hero">
        <div className="page-width">
          <span className="section-number" aria-hidden="true">03</span>
          <p className="eyebrow entrance">Why invest</p>
          <h1 className="entrance entrance-two">Why I think it's worth investing in.</h1>
          <p className="page-hero-body entrance entrance-three">{invention.whyItWins.body}</p>
        </div>
      </section>

      <section className="chapter light-chapter chapter-flush">
        <div className="page-width">
          {/* h2 so the six benefit cards below nest at h3. */}
          <h2 className="column-span-all" data-reveal>Six reasons it worked</h2>
          <div className="benefit-grid">
            {invention.whyItWins.benefits.map((benefit, i) => (
              <article className="benefit-card" key={benefit.title} data-reveal>
                <span className="benefit-mark" aria-hidden="true">{["I", "II", "III", "IV", "V", "VI"][i]}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>

          <blockquote className="pull-quote" data-reveal>
            It was the ship of discovery, not the ship of delivery.
            <cite>My conclusion</cite>
          </blockquote>

          {/* The voyages, set in newspaper columns. */}
          <h2 className="column-span-all" data-reveal>The voyages these ships made</h2>
          <div className="newspaper-columns" data-reveal>
            <p>
              These ships carried Portuguese explorers like Diogo Cão and Bartolomeu Dias
              down the coast of Africa. Dias rounded the Cape of Good Hope in 1488, which
              proved you could sail from Europe to Asia around Africa.
            </p>
            <p>
              Vasco da Gama used caravels on the voyage that opened the sea route to India.
              The exploration done with caravels is what made the Portuguese and Spanish
              spice trade possible.
            </p>
            <p>
              The caravel was small, which was actually an advantage. It was cheaper to build
              than a huge ship, it needed a smaller crew, and it could explore rivers and
              coastlines that no other European ship could reach. It was, in the words of one
              source, the best sailing vessel of its time.
            </p>
          </div>

          <div className="comparison" data-reveal>
            <h3>{invention.whyItWins.comparison.heading}</h3>
            <div className="comparison-labels" aria-hidden="true">
              <span>THE OLD WAY</span>
              <span>THE CARAVEL WAY</span>
            </div>
            {invention.whyItWins.comparison.rows.map((row) => (
              <div className="comparison-row" key={row.ours}>
                {/* The header row is aria-hidden (it is a visual label only), so
                    each cell carries its own accessible name for screen
                    readers and for the narrow layout where the header hides. */}
                <p><span className="visually-hidden">The old way: </span><span className="mobile-label" aria-hidden="true">The old way</span>{row.old}</p>
                <p><span className="visually-hidden">The caravel way: </span><span className="mobile-label" aria-hidden="true">The caravel way</span>{row.ours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
