import type { Metadata } from "next";
import VoyageEffects from "@/components/VoyageEffects";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "The Problem",
  description: invention.problem.body,
};

export default function ProblemPage() {
  return (
    <main id="main">
      <VoyageEffects />
      <section className="chapter light-chapter page-hero">
        <div className="page-width">
          <span className="section-number" aria-hidden="true">01</span>
          <p className="eyebrow entrance">The problem</p>
          <h1 className="entrance entrance-two">Stuck at the shoreline.</h1>
          <p className="page-hero-body entrance entrance-three">{invention.problem.body}</p>
        </div>
      </section>

      <section className="chapter light-chapter chapter-flush">
        <div className="page-width">
          {/* h2, so the three cards below sit at h3 rather than opening the
              page's outline at level three. */}
          <h2 className="column-span-all" data-reveal>Three things stood in the way</h2>
          <div className="problem-grid">
            {invention.problem.cards.map((card, i) => (
              <article className="editorial-card" data-reveal key={card.title}>
                <span className="card-number">0{i + 1}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <blockquote className="pull-quote" data-reveal>
            These ships could not overcome the navigational difficulties of southward
            oceanic exploration, as the strong winds, shoals and strong ocean currents
            easily overwhelmed their abilities.
            <cite>From my research paper</cite>
          </blockquote>
        </div>
      </section>

      <section className="chapter honest-chapter">
        <div className="page-width" data-reveal>
          <div className="field-note">
            <p className="eyebrow">Why this matters</p>
            <p>Without a better ship, Portugal's plan to explore down the coast of Africa was stuck. The caravel was the fix, and that is why I picked it for my Shark Tank project.</p>
          </div>
        </div>
      </section>

      {/* The paper's own account of the problem, set in newspaper columns. */}
      <section className="chapter light-chapter">
        <div className="page-width">
          <h2 className="column-span-all" data-reveal>What my research says about the problem</h2>
          <div className="newspaper-columns" data-reveal>
            <p>
              Until the 1400s, Europeans were pretty much stuck with coastal navigation
              because their ships were not built for the open ocean. They used old cargo
              vessels like the barge and the barinel, which had one mast with a single
              square sail.
            </p>
            <p>
              These ships were fragile, and they could not overcome the navigational
              difficulties of southward oceanic exploration, as the strong winds, shoals
              and strong ocean currents easily overwhelmed their abilities.
            </p>
            <p>
              Portugal wanted to explore down the coast of West Africa, but they needed a
              ship that could actually survive the trip. That is where Prince Henry the
              Navigator comes in. Around 1451, under his sponsorship, Portuguese
              shipbuilders took existing fishing boats and redesigned them into something
              brand new: the caravel.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
