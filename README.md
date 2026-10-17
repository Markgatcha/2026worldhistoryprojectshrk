# 2026worldhistoryprojectshrk

Mark Gatcha's solo Shark Tank–style caravel pitch website for the Exploration Inventions world history project.
Built with **Next.js 16.4**, **React 19**, **TypeScript 7**, and **Tailwind CSS v4** — deployed free on **Vercel**.

## Run it locally

Requires [pnpm](https://pnpm.io) (pinned via `packageManager` in `package.json`).

```sh
pnpm install
pnpm dev      # http://localhost:3000
```

## Other commands

```sh
pnpm build    # production build (also runs in CI)
pnpm start    # serve the production build
pnpm lint     # oxlint (fast, no config needed beyond .oxlintrc.json)
```

## Editing the pitch content

Research and pitch content lives in [`content/invention.ts`](content/invention.ts).
Edit the invention, copy, stats, presenter, and source links there. Interface labels live in the page and navigation components.

## Assignment checklist (solo project)

- Record the mandatory **2-minute video presentation pitch** separately; the website does not replace it.
- Submit **one promotional item** in addition to the video. This website is intended as that item, but confirm teacher approval because the directions specify Google Sites.
- Submit the video and promotional item through Schoology as accessible links or attachments.
- Confirm the current deadline with the teachers: the supplied 2025 assignment sheet lists Sunday 9/21, while the research paper is dated September 2026.

Historical claims are drawn from Mark's supplied research paper, not independently fact-checked. The **50,000 gold cruzados / 10% equity** offer is a fictional classroom proposal, not a historical cost or valuation.

## Accessibility and colour contrast

The poster palette was tuned against WCAG 2.1 AA, measured rather than eyeballed.
Every text role clears its threshold on every surface it appears on:

| Role | Surfaces | Measured |
| --- | --- | --- |
| Body / headings (ink) | all three stocks | 12.7:1 – 15.0:1 |
| Secondary text (`--muted`) | stock, stock-dark, stock-deep | 5.8:1 – 6.8:1 |
| Tertiary text (`--ink-faint`) | stock, stock-dark, stock-deep | 5.3:1 – 6.3:1 |
| Accent (`--vermillion`) | stock, stock-dark, stock-deep | 5.3:1 – 6.3:1 |
| Dark-surface body (`--text-body`) | prussian, prussian-deep | 6.9:1 – 8.9:1 |
| Dark-surface faint (`--text-faint`) | prussian, prussian-deep | 4.6:1 – 5.9:1 |
| Hairline rules | all three stocks | 3.2:1 – 3.7:1 (3:1 UI threshold) |

Earlier values failed: `#cf3b1e` measured 3.10:1 on the deep stock and `#6f7883`
measured 2.84:1, both below the 4.5:1 body threshold. The tokens were darkened
and the deep stock lightened rather than the text being enlarged.

Other accessibility work:

- A **skip link** is the first tab stop on every route, targeting `#main`.
- Every route carries exactly one `<h1>`, and no `<h3>` appears before an `<h2>`.
  The `/sources` route previously opened at `<h2>` with no `<h1>` at all.
- The comparison table's header row is `aria-hidden`, so each cell also carries a
  visually-hidden label — otherwise the column names are lost on narrow viewports
  where the header row is hidden.
- Per-route `<title>` and `<meta name="description">`, plus OpenGraph and Twitter
  card tags, come from each page's own `metadata` export.
- `prefers-reduced-motion` detaches the scroll timelines rather than only pausing
  the animations, so reduced-motion users do not keep getting scroll-scrubbed motion.

## Design system

`app/globals.css` documents the token set at the top of the file. The palette is
five inks on aged poster stock, and the type is three self-hosted faces:

- **Abril Fatface** — the display face, for headlines and the large numerals.
- **Goudy Bookletter 1911** — the label face, for eyebrows, navigation and
  captions. Frederic Goudy drew the original in 1911, so the label register is
  the one a printer was actually setting in the poster's own year. It replaced
  a thin geometric sans, which was the last thing on the site still reading as
  a modern web page rather than as printed matter.
- **EB Garamond** — the reading face, roman and italic.

Fonts are self-hosted from `app/fonts/` so the build stays offline-safe and
deterministic. Only the three faces above are shipped; unused faces are removed
rather than left in the tree.

No type is set below **12px**, except the plate numerals leading each nav entry,
which are set at 10px beside a 12.5px label.

**Arrows are not used as wayfinding.** A 1900s poster never reached for `→` or
`↗`. Calls to action are plain set type; the tour entries draw a short rule on
hover instead; source entries carry a printed arrowhead drawn in CSS borders.
The one surviving arrow is the scroll cue's `↓`, which is a genuine affordance
rather than decoration. Labels and captions use the 12px floor with wide
tracking rather than going smaller — small letter-spaced caps are what make a
poster read as a poster, and 9px destroys them.

**Nothing is a card.** The tour entries and the six benefits are ruled columns
under a heavy bar — a contents page, not a grid of interface tiles. Boxed cards
with hairline borders were the most web-native objects left on the site.

## The header

One masthead, not two stacked bars. The wordmark row and the credit strip sit
inside a single fixed header, separated by a gold hairline. Two stacked fixed
bars read as app chrome; one masthead reads as a printed page. Every fixed
offset (`scroll-padding-top`, the hero and page-hero padding, the sticky plate)
is derived from that single header height.

## The colophon

Every printed sheet ends with the printer's imprint, so every route ends with
one: a double rule, the wordmark, the section index, and a set-in line naming
the three faces and the occasion. Before this, interior pages simply ran out of
words and stopped, which was the one place the design dropped its own metaphor.

The motion control lives there too, set as a printed note. It used to be a pill
fixed to the bottom-right of the viewport, alongside a reading-progress bar
under the masthead — both were interface furniture rather than print, and both
have been removed.


## Deploying to Vercel (free)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. **Import** the `Markgatcha/2026worldhistoryprojectshrk` repository.
3. Keep the defaults (Framework Preset: Next.js, Build Command: `pnpm build`).
4. Click **Deploy**. Every future push to `main` redeploys automatically.
