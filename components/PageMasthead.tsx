import type { ReactNode } from "react";
import { SeaRule } from "@/components/Ornament";
import { invention } from "@/content/invention";

/** The printed heading at the top of every inside page. */
export default function PageMasthead({
  number,
  kicker,
  title,
  deck,
  variant = "standard",
  children,
}: {
  number: string;
  kicker: string;
  title: ReactNode;
  deck?: string;
  variant?: "standard" | "broadside" | "diagram" | "advert" | "notice" | "folio";
  children?: ReactNode;
}) {
  return (
    <header className={`page-masthead masthead-${variant}`}>
      <div className="page-width masthead-inner">
        <div className="masthead-run">
          <span>{invention.name} &middot; my World History project</span>
          <span>Page {number}</span>
        </div>
        <div className="rule-double" aria-hidden="true" />
        <div className="masthead-heading">
          <p className="eyebrow">{kicker}</p>
          <h1>{title}</h1>
          {deck && <p className="page-hero-body">{deck}</p>}
        </div>
        {variant !== "notice" && variant !== "folio" && (
          <SeaRule className="masthead-wave" />
        )}
        {children}
      </div>
    </header>
  );
}
