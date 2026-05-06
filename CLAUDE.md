# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Do not read or analyze these folders

Do not read, index, summarize, search, or analyze the following directories unless I explicitly ask:

- node_modules/
- .next/
- dist/
- build/
- coverage/
- .git/
- vendor/
- package-lock.json
- yarn.lock
- pnpm-lock.yaml

## Commands

```bash
npm run dev      # Start dev server (uses Turbopack by default)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint (note: build no longer auto-lints)
```

To use Webpack instead of Turbopack: `next dev --webpack` or `next build --webpack`.

No test runner is configured in this project.

## Architecture

This is a **Next.js 16** App Router project with **React 19**, **TypeScript**, and **MUI v9** (Material UI with Emotion).

- `app/` — App Router: `layout.tsx` (root layout), `page.tsx` (home route). Add new routes as folders with `page.tsx` files.
- `public/` — Static assets served from `/`

## Key Next.js 16 Breaking Changes

**Before writing any code, read the relevant guide in `node_modules/next/dist/docs/`.** Highlights:

- **`next build` no longer runs linting** — run `npm run lint` separately.
- **`params` is now a Promise** in pages, layouts, and route handlers — always `await params`:
  ```ts
  export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
  }
  ```
- **Turbopack is the default bundler** — `next dev` uses Turbopack; pass `--webpack` to opt out.
- **Route Handlers** (`app/api/route.ts`) replace Pages Router API Routes. Use `GET`, `POST`, etc. exports with Web `Request`/`Response`.
- **`use cache` directive** (opt-in via `cacheComponents: true` in `next.config.ts`) for data/UI-level caching with `cacheLife()`.
- **Server Components are default** — add `'use client'` only for components needing state, event handlers, or browser APIs.
- **`eslint` CLI directly**, not `next lint`. Config lives in `eslint.config.mjs`.
