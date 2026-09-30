import CaravelShip from "@/components/CaravelShip";
import SectionHeading from "@/components/SectionHeading";
import { invention } from "@/content/invention";

export default function Home() {
  return (
    <main id="top" className="bg-ink text-parchment">
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0d2240_0%,#081426_65%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">
              {invention.eyebrow}
            </p>
            <h1 className="font-display text-5xl font-black leading-tight text-parchment md:text-6xl">
              {invention.name}
            </h1>
            <p className="mt-3 font-display text-2xl italic text-goldlight">{invention.tagline}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/80">
              {invention.heroPitch}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#ask"
                className="rounded-full bg-gold px-7 py-3 font-bold text-ink transition-colors hover:bg-goldlight"
              >
                Hear our ask
              </a>
              <a
                href="#how"
                className="rounded-full border border-gold/50 px-7 py-3 font-bold text-goldlight transition-colors hover:border-goldlight hover:text-parchment"
              >
                How it works
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <CaravelShip className="w-full max-w-md drop-shadow-[0_0_60px_rgba(201,162,39,0.25)]" />
          </div>
        </div>
        <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
          {invention.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-gold/20 bg-deep/60 p-6 text-center">
              <p className="font-display text-4xl font-black text-goldlight">{s.value}</p>
              <p className="mt-2 text-sm text-parchment/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PROBLEM ---------- */}
      <section id="problem" className="scroll-mt-20 bg-parchment py-24 text-ink">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Act I — The Problem"
            title={invention.problem.heading}
            body={invention.problem.body}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {invention.problem.cards.map((c) => (
              <article key={c.title} className="rounded-2xl border border-ink/10 bg-white/60 p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section id="how" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Act II — The Invention"
            title={invention.howItWorks.heading}
            body={invention.howItWorks.body}
          />
          <ol className="grid gap-6 md:grid-cols-2">
            {invention.howItWorks.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-gold/20 bg-deep/60 p-8 pl-20">
                <span className="absolute left-6 top-7 font-display text-4xl font-black text-gold/60">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-goldlight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-parchment/75">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- WHY IT WINS ---------- */}
      <section id="why" className="scroll-mt-20 bg-parchment py-24 text-ink">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Act III — The Payoff"
            title={invention.whyItWins.heading}
            body={invention.whyItWins.body}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {invention.whyItWins.benefits.map((b) => (
              <article key={b.title} className="rounded-2xl bg-ink p-8 text-parchment shadow-md">
                <h3 className="font-display text-lg font-bold text-goldlight">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-parchment/75">{b.body}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <h3 className="mb-6 text-center font-display text-2xl font-bold">
              {invention.whyItWins.comparison.heading}
            </h3>
            <div className="overflow-hidden rounded-2xl border border-ink/10">
              {invention.whyItWins.comparison.rows.map((r, i) => (
                <div
                  key={r.ours}
                  className={`grid md:grid-cols-2 ${i % 2 === 0 ? "bg-white/60" : "bg-sand/60"}`}
                >
                  <p className="border-b border-ink/10 p-5 text-ink/60 line-through decoration-red-800/50 md:border-b-0 md:border-r">
                    {r.old}
                  </p>
                  <p className="p-5 font-semibold text-ink">{r.ours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- THE ASK ---------- */}
      <section id="ask" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="The Moment of Truth" title={invention.theAsk.heading} />
          <div className="rounded-3xl border border-gold/30 bg-gradient-to-b from-deep to-ink p-10 text-center shadow-2xl md:p-14">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">We are seeking</p>
            <p className="mt-2 font-display text-5xl font-black text-parchment">
              {invention.theAsk.amount}
            </p>
            <p className="mt-2 font-display text-2xl italic text-goldlight">
              for {invention.theAsk.equity}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-parchment/80">
              {invention.theAsk.body}
            </p>
            <ul className="mx-auto mt-8 max-w-xl space-y-3 text-left">
              {invention.theAsk.funding.map((u) => (
                <li key={u} className="flex gap-3 text-parchment/85">
                  <span className="font-bold text-gold">✓</span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 font-display text-xl italic text-parchment/70">
              So, sharks… who wants to never get lost again?
            </p>
          </div>
        </div>
      </section>

      {/* ---------- CREW ---------- */}
      <section id="crew" className="scroll-mt-20 border-t border-gold/10 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="The Team"
            title={invention.crew.heading}
            body={invention.crew.body}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {invention.crew.members.map((m) => (
              <div key={m.name} className="rounded-2xl border border-gold/20 bg-deep/60 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 font-display text-2xl font-bold text-goldlight">
                  {m.name.charAt(0)}
                </div>
                <h3 className="font-bold text-parchment">{m.name}</h3>
                <p className="mt-1 text-sm text-parchment/60">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-gold/10 py-10">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-parchment/50">
          <p className="font-display text-lg text-goldlight">{invention.name}</p>
          <p className="mt-2">{invention.footer.note}</p>
          <p className="mt-1 text-xs">{invention.footer.sources}</p>
        </div>
      </footer>
    </main>
  );
}
