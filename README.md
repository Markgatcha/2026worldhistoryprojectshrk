# 2026worldhistoryprojectshrk

My Shark Tank project for World History: a pitch for the caravel, built as a
1900s poster instead of a normal website.

Next.js 16, React 19, TypeScript and Tailwind v4. Pushing to `main` redeploys it.

## Running it

```sh
pnpm install
pnpm dev
```

`pnpm build` makes a production build, `pnpm start` serves it, `pnpm lint` runs
oxlint.

## Editing the pitch

All the writing is in [`content/invention.ts`](content/invention.ts): the pitch,
the stats, the specifications, the funding list and the sources. Page structure
is in `app/`, shared pieces in `components/`.

## The design

Five flat inks on aged poster stock. No gradients, no drop shadows, no rounded
corners, no cards.

Three typefaces, all self-hosted in `app/fonts`:

- **Abril Fatface** for headlines
- **Goudy Bookletter 1911** for labels and navigation
- **EB Garamond** for reading

The home page is a Plakatstil poster, the German object-poster style from 1905:
one object, its name, and one line of copy. The rest of the argument is in the
pages behind it.

## Notes

Historical claims come from my research paper. I did not check them against
anything else. The 50,000 gold cruzados and 10% equity are made up for the
pitch and are not historical prices.
