import type { Metadata } from "next";
import Link from "next/link";
import PageMasthead from "@/components/PageMasthead";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "Why Invest",
  description: invention.whyItWins.body,
};

const numerals = ["I", "II", "III", "IV", "V", "VI"];
const benefitColumns = [
  { offset: 0, items: invention.whyItWins.benefits.slice(0, 2) },
  { offset: 2, items: invention.whyItWins.benefits.slice(2) },
];

export default function WhyInvestPage() {
  return (
    <main id="main">
      <PageMasthead
        number="03"
        kicker="Why invest · an ad"
        title="Why I think it's worth investing in."
        deck={invention.whyItWins.body}
        variant="advert"
      />

      <section className="chapter light-chapter invest-chapter">
        <div className="page-width invest-page">
          <div className="advert">
            <div className="advert-top">
              <p className="eyebrow">An ad</p>
              <h2>Six reasons to back this ship</h2>
            </div>

            <div className="advert-grid">
              {benefitColumns.map((column) => (
                <div className="advert-column" key={column.offset}>
                  {column.items.map((benefit, i) => (
                    <article className="benefit-card" key={benefit.title}>
                      <span className="benefit-mark" aria-hidden="true">
                        {numerals[column.offset + i]}
                      </span>
                      <div>
                        <h3>{benefit.title}</h3>
                        <p>{benefit.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>

            <div className="advert-footer">
              <span>A small ship with a long reach.</span>
              <Link href="/pitch">The ask is on Page 04 &rarr;</Link>
            </div>
          </div>

          <div className="invest-dispatch">
            <div className="invest-margin">
              <aside className="invest-note">
                <p className="eyebrow">What I would tell a shark</p>
                <p>
                  The small size is a good thing. It could get into places the big ships could
                  not, and it cost less to send out.
                </p>
              </aside>

              <blockquote className="pull-quote">
                It was the ship of discovery, not the ship of delivery.
                <cite>My conclusion</cite>
              </blockquote>
            </div>

            <div className="voyage-story">
              <h2 className="feature-heading">The voyages these ships made</h2>
              <div className="newspaper-columns">
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
                  coastlines that no other European ship could reach. One source calls it the
                  best sailing ship of its time.
                </p>
              </div>
            </div>
          </div>

          <div className="comparison">
            <h3>{invention.whyItWins.comparison.heading}</h3>
            <div className="comparison-labels" aria-hidden="true">
              <span>The old way</span>
              <span>The caravel way</span>
            </div>
            {invention.whyItWins.comparison.rows.map((row) => (
              <div className="comparison-row" key={row.ours}>
                <p>
                  <span className="visually-hidden">The old way: </span>
                  <span className="mobile-label" aria-hidden="true">The old way</span>
                  {row.old}
                </p>
                <p>
                  <span className="visually-hidden">The caravel way: </span>
                  <span className="mobile-label" aria-hidden="true">The caravel way</span>
                  {row.ours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
