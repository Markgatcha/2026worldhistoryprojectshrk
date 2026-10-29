import type { Metadata } from "next";
import PageMasthead from "@/components/PageMasthead";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "The Problem",
  description: invention.problem.body,
};

export default function ProblemPage() {
  return (
    <main id="main">
      <PageMasthead
        number="01"
        kicker="The problem · one page"
        title="Trouble at sea."
        deck={invention.problem.body}
        variant="broadside"
      />

      <section className="chapter light-chapter problem-broadside">
        <div className="page-width problem-broadside-grid">
          <div className="problem-intro">
            <p className="eyebrow">The short version</p>
            <h2 className="feature-heading">Three things stood in the way</h2>
            <p className="spec-intro">
              Portugal wanted to sail south. The ships it had were not built for that trip.
            </p>
          </div>

          <aside className="problem-note">
            <p className="eyebrow">My note</p>
            <p>
              I used to think explorers just picked a direction and went. The wind decides
              a lot more than that.
            </p>
          </aside>

          <div className="problem-grid">
            {invention.problem.cards.map((card, i) => (
              <article className="editorial-card" key={card.title}>
                <span className="card-number">0{i + 1}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <blockquote className="paper-extract">
            <p>
              Ships like the barge and the barinel had one mast with a square sail. Strong
              winds, shallow areas called shoals, and ocean currents made their trips south
              really difficult.
            </p>
            <cite>From my research paper</cite>
          </blockquote>

          <aside className="problem-conclusion">
            <p className="eyebrow">Why this matters</p>
            <p>
              Without a better ship, Portugal&apos;s plan to explore down the coast of Africa
              was stuck. The caravel was the fix, and that is why I picked it for my Shark
              Tank project.
            </p>
          </aside>
        </div>
      </section>

      <section className="chapter paper-chapter problem-research">
        <div className="page-width problem-research-layout">
          <h2 className="feature-heading">What my research says about the problem</h2>
          <div className="newspaper-columns">
            <p className="drop-cap">
              Until the 1400s, Europeans were pretty much stuck sailing close to the coast
              because their ships were not built for the open ocean. They used old cargo
              ships like the barge and the barinel, which had one mast with a single square
              sail.
            </p>
            <p>
              These ships were fragile, and the strong winds, shallow water and ocean
              currents made it really hard for them to sail south.
            </p>
            <p>
              Portugal wanted to explore down the coast of West Africa, but they needed a
              ship that could actually survive the trip. That is where Prince Henry the
              Navigator comes in. Around 1451, with his support, Portuguese shipbuilders
              took existing fishing boats and redesigned them into something brand new: the
              caravel.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
