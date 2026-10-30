<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project shape

- Single Next.js 16 App Router app (create-next-app scaffold) — not a monorepo. Source lives entirely under `src/`: routes in `src/app/`, components in `src/components/`, helpers in `src/lib/`. Path alias `@/*` → `src/*`.
- No test runner, no CI workflows, no pre-commit hooks exist. Don't invent test commands; `npm run build` prerenders pages and is the real integration check.

## Commands (verified)

- `npm run dev` · `npm run build` · `npm run start` · `npm run lint` (bare `eslint`, flat config in `eslint.config.mjs`).
- No typecheck script — use `npx tsc --noEmit`.
- Order that matters: `npm run lint` → `npx tsc --noEmit` → `npm run build`. `next build` also runs TypeScript plus Cache Components validation, so it catches errors lint/tsc don't.

## Next.js 16 specifics (trust `node_modules/next/dist/docs/` over training data)

- `cacheComponents: true` in `next.config.ts` changes data fetching: route segment configs (`dynamic`, `revalidate`, `fetchCache`) no longer apply. Cache data/UI with `"use cache"` + `cacheLife`, or wrap request-time data in `<Suspense>`; otherwise `next build` reports the route can't prerender. See `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`.
- `reactCompiler: true` (via `babel-plugin-react-compiler`) — components memoize automatically; don't add `React.memo`/`useMemo` churn.
- `partialPrefetching: true` and Turbopack are enabled; there is no webpack/PostCSS config to edit.

## Styling and UI conventions

- Tailwind v4 is CSS-first: there is no `tailwind.config`. Theme tokens are `@theme inline` + CSS variables in `src/app/globals.css`, and Tailwind loads via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add Tailwind/PostCSS config files.
- shadcn runs style `base-nova` (`components.json`) built on **`@base-ui/react`, not Radix** — component APIs differ from most shadcn examples you've seen (e.g. `src/components/ui/button.tsx`).
- `cn` is imported from the `cn` npm package (re-exported by `@/lib/utils`), not defined locally.

## AGENTS.md maintenance

- The `nextjs-agent-rules` block at the top is rewritten by `next dev` from `node_modules/next/dist/server/lib/generate-agent-files.js`. Never remove it; add or edit content only outside its markers.
