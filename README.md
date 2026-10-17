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

No type is set below **12px**, except the figures on the particulars band,
which are set at 11px. Labels and captions use the 12px floor with wide tracking
rather than going smaller — small letter-spaced caps are what make a poster read
as a poster, and 9px destroys them.

**Arrows are not used as wayfinding.** A 1900s poster never reached for `→` or
`↗`. The tour entries draw a short rule on hover; source entries carry a printed
arrowhead drawn in CSS borders. Nothing on the site points anywhere.

**Nothing is a card.** The tour entries and the six benefits are ruled columns
under a heavy bar — a contents page, not a grid of interface tiles. Boxed cards
with hairline borders were the most web-native objects left on the site.

## The poster

The home page is a **Plakatstil** poster — the German "object poster" style that
Lucian Bernhard opened in 1905, when he won a match-company competition with two
matches on a flat field, the brand name above them, and no other copy at all.
The hero is built to that rule and holds five elements: an eyebrow, the name,
one line, the plate, and the printed frame.

Everything a poster does not need has been taken off the sheet. It once carried
twelve stacked elements — a coordinate line, a running-head banner, a second
credit line, a caption under the drawing, compass letters, and a pair of
call-to-action buttons. The masthead is the navigation; a poster does not argue
its case in the margin.

The hero is sized to `100svh` and centred, so the plate lands above the fold on
a laptop and the margins grow rather than the type on a tall monitor. The three
figures sit on their own printed band immediately below, the way a poster put
its particulars along the bottom edge.

## The header

One masthead row: wordmark left, section index right. It used to be two stacked
bands — the wordmark and then a credit strip — which read as app chrome above a
poster that had only just stopped being a web page. The plate numbers that led
each nav entry went too; five numerals in a row is an index, and the poster has
room for one idea at a time. Every fixed offset (`scroll-padding-top`, the hero
and page-hero padding, the sticky plate) is derived from that single row.

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
