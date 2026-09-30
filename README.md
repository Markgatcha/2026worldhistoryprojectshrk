# 2026worldhistoryprojectshrk

A Shark Tank–style pitch website for our Exploration Inventions world history project.
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

Every word on the site lives in one file: [`content/invention.ts`](content/invention.ts).
Swap the invention, copy, stats, and crew there — no component changes needed.

## Deploying to Vercel (free)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. **Import** the `Markgatcha/2026worldhistoryprojectshrk` repository.
3. Keep the defaults (Framework Preset: Next.js, Build Command: `pnpm build`).
4. Click **Deploy**. Every future push to `main` redeploys automatically.
