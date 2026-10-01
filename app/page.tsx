import CaravelShip from "@/components/CaravelShip";
import SectionHeading from "@/components/SectionHeading";
import VoyageEffects from "@/components/VoyageEffects";
import { invention } from "@/content/invention";

export default function Home() {
  return (
    <main id="top">
      <VoyageEffects />
      <section className="hero atlas-grid">
        <div className="hero-coordinate" aria-hidden="true">PORTUGAL / ATLANTIC OCEAN / XV CENTURY</div>
        <div className="page-width hero-layout">
          <div className="hero-copy">
            <p className="eyebrow entrance">A new age of exploration</p>
            <h1 className="entrance entrance-two">Small ship.<br /> <em>World-changing</em><br /> possibilities.</h1>
            <p className="hero-intro entrance entrance-three">Meet <strong>{invention.name}</strong>. {invention.tagline}</p>
            <p className="hero-description entrance entrance-three">{invention.heroPitch}</p>
            <div className="button-row entrance entrance-three">
              <a className="button button-gold" href="#how">Explore the invention <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#ask">See my pitch <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-credit">MARK GATCHA <span> / </span> SOLO WORLD HISTORY PROJECT</p>
          </div>
          <figure className="ship-scene entrance entrance-two">
            <div className="compass-orbit" aria-hidden="true"><span>N</span><span>E</span><span>S</span><span>W</span></div>
            <div className="route-line" aria-hidden="true" />
            <CaravelShip className="hero-ship" />
            <div className="ship-caption"><span className="status-dot" /> THE CARAVEL <span> / </span> BUILT FOR DISCOVERY</div>
            <figcaption>Small in size. Boundless in ambition.</figcaption>
          </figure>
        </div>
        <div className="page-width stat-strip">
          {invention.stats.map((stat, i) => <div key={stat.label} className="stat"><span className="stat-index">0{i + 1}</span><strong>{stat.value}</strong><p>{stat.label}</p></div>)}
        </div>
        <a className="scroll-cue" href="#problem">The voyage begins <span aria-hidden="true">↓</span></a>
      </section>

      <div className="voyage-strip" aria-hidden="true"><span>THE SHIP OF DISCOVERY</span><span>✦</span><span>NOT THE SHIP OF DELIVERY</span><span>✦</span><span>THE CARAVEL</span></div>

      <section id="problem" className="chapter light-chapter">
        <div className="page-width">
          <SectionHeading eyebrow="01 / The challenge" title={invention.problem.heading} body={invention.problem.body} />
          <div className="problem-grid">
            {invention.problem.cards.map((card, i) => <article className="editorial-card" data-reveal key={card.title}><span className="card-number">0{i + 1}</span><h3>{card.title}</h3><p>{card.body}</p></article>)}
          </div>
        </div>
      </section>

      <section id="how" className="chapter blueprint-chapter atlas-grid">
        <div className="page-width">
          <SectionHeading eyebrow="02 / The breakthrough" title={invention.howItWorks.heading} body={invention.howItWorks.body} />
          <div className="blueprint-layout">
            <figure className="blueprint-figure" data-reveal>
              <p className="eyebrow">Design study / Caravel</p>
              <CaravelShip className="blueprint-ship" />
              <figcaption>SAIL PLAN · HULL · STEERING<br /><span>Stylized illustration, not to scale</span></figcaption>
            </figure>
            <ol className="feature-list">
              {invention.howItWorks.steps.map((step, i) => <li key={step.title} data-reveal><span className="feature-number">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}
            </ol>
          </div>
          <aside className="field-note" data-reveal><p className="eyebrow">From the shipbuilder's notebook</p><p>{invention.howItWorks.footnote}</p></aside>
        </div>
      </section>

      <section id="why" className="chapter light-chapter">
        <div className="page-width">
          <SectionHeading eyebrow="03 / The opportunity" title={invention.whyItWins.heading} body={invention.whyItWins.body} />
          <div className="benefit-grid">
            {invention.whyItWins.benefits.map((benefit, i) => <article className="benefit-card" key={benefit.title} data-reveal><span className="benefit-mark" aria-hidden="true">{["↗", "✦", "◇", "≈", "➶", "✧"][i]}</span><h3>{benefit.title}</h3><p>{benefit.body}</p></article>)}
          </div>
          <div className="comparison" data-reveal>
            <h3>{invention.whyItWins.comparison.heading}</h3>
            <div className="comparison-labels" aria-hidden="true"><span>THE OLD WAY</span><span>THE CARAVEL WAY</span></div>
            {invention.whyItWins.comparison.rows.map(row => <div className="comparison-row" key={row.ours}><p><span className="mobile-label">The old way</span>{row.old}</p><p><span className="mobile-label">The caravel way</span><span className="comparison-arrow" aria-hidden="true">↗ </span>{row.ours}</p></div>)}
          </div>
        </div>
      </section>

      <section className="chapter honest-chapter">
        <div className="page-width honest-layout" data-reveal><div><p className="eyebrow">04 / Full disclosure</p><h2>{invention.honestCatch.heading}<span className="gold-period">.</span></h2></div><p>{invention.honestCatch.body}</p></div>
      </section>

      <section id="ask" className="chapter ask-chapter atlas-grid">
        <div className="page-width ask-layout">
          <div data-reveal><p className="eyebrow">05 / Your next investment</p><h2>Back the ship.<br /><em>Open the horizon.</em></h2><p className="ask-body">{invention.theAsk.body}</p><ul className="funding-list">{invention.theAsk.funding.map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul></div>
          <div className="investment-card" data-reveal><p className="eyebrow">The proposal / I am seeking</p><p className="investment-amount">{invention.theAsk.amount.split(" ")[0]}</p><p className="investment-unit">{invention.theAsk.amount.split(" ").slice(1).join(" ")}</p><div className="investment-equity">for <strong>{invention.theAsk.equity}</strong></div><p className="investment-disclaimer">{invention.theAsk.disclaimer}</p><p className="investment-closing">{invention.theAsk.closing}</p></div>
        </div>
      </section>

      <section id="crew" className="chapter presenter-chapter">
        <div className="page-width presenter-layout" data-reveal><div className="presenter-monogram" aria-hidden="true">MG</div><div><p className="eyebrow">The person behind the pitch</p><h2>{invention.crew.members[0].name}</h2><p>{invention.crew.body}</p><p className="presenter-role">{invention.crew.members[0].role}</p></div><a className="text-link" href="#sources">Read my sources ↗</a></div>
      </section>

      <footer id="sources" className="sources-footer">
        <div className="page-width"><div className="footer-heading"><h2>Research log<span className="gold-period">.</span></h2><p>{invention.footer.sourcesNote}</p></div><ul className="source-list">{invention.footer.sources.map((source, i) => <li key={source.url}><span>0{i + 1}</span><a href={source.url}>{source.title}<small>{source.publisher}</small></a><span aria-hidden="true">↗</span></li>)}</ul><div className="footer-bottom"><p>{invention.footer.note}</p><a href="#top">Back to the horizon ↑</a></div></div>
      </footer>
    </main>
  );
}
