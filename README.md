# 2026worldhistoryprojectshrk

Mark Gatcha's solo Shark Tank–style caravel pitch website for the Exploration Inventions world history project.
Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4** — deployed free on **Vercel**.

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

## Deploying to Vercel (free)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. **Import** the `Markgatcha/2026worldhistoryprojectshrk` repository.
3. Keep the defaults (Framework Preset: Next.js, Build Command: `pnpm build`).
4. Click **Deploy**. Every future push to `main` redeploys automatically.
