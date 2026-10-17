import type { Metadata } from "next";
import VoyageEffects from "@/components/VoyageEffects";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "The Ask",
  description: invention.theAsk.body,
};

export default function PitchPage() {
  return (
    <main id="main">
      <VoyageEffects />
      <section id="ask" className="chapter ask-chapter page-hero">
        <div className="page-width">
          <span className="section-number" aria-hidden="true">04</span>
          <p className="eyebrow entrance">What I'm asking for</p>
          <h1 className="entrance entrance-two">Why should you<br /><em>back my pitch?</em></h1>
          <p className="page-hero-body entrance entrance-three">{invention.theAsk.body}</p>
        </div>
      </section>

      <section className="chapter ask-chapter chapter-flush">
        <div className="page-width ask-layout">
          <div data-reveal>
            {/* This block used to restate the ask in a headline and repeat the
                hero's paragraph word for word. The card opposite already says
                the number; this column now says only what the money buys. */}
            <h2>What the money does</h2>
            <ul className="funding-list">
              {invention.theAsk.funding.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="investment-card" data-reveal>
            <p className="investment-amount">{invention.theAsk.amount.split(" ")[0]}</p>
            <p className="investment-unit">{invention.theAsk.amount.split(" ").slice(1).join(" ")}</p>
            <div className="investment-equity">for <strong>{invention.theAsk.equity}</strong></div>
            <p className="investment-disclaimer">{invention.theAsk.disclaimer}</p>
            <p className="investment-closing">{invention.theAsk.closing}</p>
          </div>
        </div>
      </section>

      <section className="chapter honest-chapter">
        <div className="page-width" data-reveal>
          <div className="field-note">
            <p className="eyebrow">The honest truth</p>
            <p>{invention.honestCatch.body}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
