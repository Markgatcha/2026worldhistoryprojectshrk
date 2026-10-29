import type { Metadata } from "next";
import PageMasthead from "@/components/PageMasthead";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "The Ask",
  description: invention.theAsk.body,
};

export default function PitchPage() {
  return (
    <main id="main">
      <PageMasthead
        number="04"
        kicker="The ask · a notice"
        title="Wanted: backers for a fleet."
        deck={invention.theAsk.body}
        variant="notice"
      />

      <section id="ask" className="chapter light-chapter pitch-notice-section">
        <div className="page-width">
          <div className="sheet">
            <div className="notice-box">
              <div className="advert-top">
                <p className="eyebrow">Notice &middot; No. 04</p>
                <h2 className="notice-title">Wanted</h2>
                <p className="notice-sub">Backers for a fleet of caravels</p>
                <p><span className="stamp">For the sharks</span></p>
              </div>

              <div className="notice-layout">
                <div>
                  <p className="eyebrow">What the money does</p>
                  <ul className="funding-list">
                    {invention.theAsk.funding.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="notice-copy">
                    I would build the ships first, then send them down the coast. If the route
                    works, the fleet pays for the next one.
                  </p>
                  <p className="signature">
                    Mark Gatcha
                    <span>The person asking &middot; World History</span>
                  </p>
                </div>

                <div className="investment-card">
                  <p className="eyebrow">What you get</p>
                  <p className="investment-amount">{invention.theAsk.amount.split(" ")[0]}</p>
                  <p className="investment-unit">
                    {invention.theAsk.amount.split(" ").slice(1).join(" ")}
                  </p>
                  <div className="investment-equity">
                    for <strong>{invention.theAsk.equity}</strong>
                  </div>
                  <p className="investment-disclaimer">{invention.theAsk.disclaimer}</p>
                  <p className="investment-closing">{invention.theAsk.closing}</p>
                </div>
              </div>

              <div className="coupon" aria-hidden="true">
                <p className="eyebrow">Cut here</p>
                <p>I, the person signing this, would like to back one (1) fleet of caravels.</p>
                <div className="coupon-lines">
                  <span>Signed</span>
                  <span>Shark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pitch-honest paper-chapter">
        <div className="page-width">
          <div className="sheet">
            <aside className="pitch-honest-note">
              <p className="eyebrow">The honest truth</p>
              <p>{invention.honestCatch.body}</p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
