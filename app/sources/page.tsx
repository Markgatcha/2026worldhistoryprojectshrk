import type { Metadata } from "next";
import VoyageEffects from "@/components/VoyageEffects";
import { invention } from "@/content/invention";

export const metadata: Metadata = {
  title: "Sources",
  description: invention.footer.sourcesNote,
};

export default function SourcesPage() {
  return (
    <main id="main">
      <VoyageEffects />
      <section id="sources" className="sources-footer page-hero">
        <div className="page-width">
          <p className="eyebrow entrance">Works cited &middot; accessed 23 September 2026</p>
          {/* This route's h1. Every other route opens with an h1 in its page
              hero; this one opened straight into an h2, which left the page
              with no top-level heading at all. */}
          <h1 className="entrance entrance-two">My sources</h1>
          <p className="page-hero-body entrance entrance-three">{invention.footer.sourcesNote}</p>
          <div className="footer-heading footer-heading-flush">
            <p className="folio">05</p>
          </div>
          <ul className="source-list">
            {invention.footer.sources.map((source, i) => (
              <li key={source.url}>
                <span>0{i + 1}</span>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title}
                  <small>{source.publisher}</small>
                </a>
                <span aria-hidden="true" className="source-mark" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
