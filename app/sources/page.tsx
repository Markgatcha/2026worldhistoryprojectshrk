import type { Metadata } from "next";
import Link from "next/link";
import PageMasthead from "@/components/PageMasthead";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "Sources",
  description: invention.footer.sourcesNote,
};

export default function SourcesPage() {
  return (
    <main id="main">
      <PageMasthead
        number="05"
        kicker="Sources · what I used"
        title="Where I got this."
        deck={invention.footer.sourcesNote}
        variant="folio"
      />

      <section id="sources" className="sources-backmatter light-chapter">
        <div className="page-width">
          <div className="sources-column">
            <div className="sources-heading">
              <p className="eyebrow">Sources I used</p>
              <h2>My sources</h2>
              <p className="folio">I looked at these on 23 September 2026</p>
            </div>

            <ol className="works-list">
              {invention.footer.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                    <small>{source.publisher}</small>
                  </a>
                  <span aria-hidden="true" className="source-mark" />
                </li>
              ))}
            </ol>

            <aside className="sources-note">
              <p className="eyebrow">How I used these</p>
              <p>
                I used these for the ship details and the voyages. If a fact was not in my
                paper, I did not put it on the site.
              </p>
            </aside>

            <p className="sources-return">
              <Link href="/pitch" className="pencil">Back to the ask</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
