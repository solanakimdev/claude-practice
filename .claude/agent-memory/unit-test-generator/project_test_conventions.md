---
name: Test file naming and mocking conventions
description: Naming patterns, directory placement, and recurring mock strategies for this codebase's test suite
type: project
---

**File placement:** Test files are colocated next to the source file (e.g., `app/page.tsx` → `app/page.test.tsx`).

**Naming convention:** `*.test.tsx` for component files, `*.test.ts` for plain TypeScript utilities.

**next/font/google mock pattern:**
```ts
vi.mock('next/font/google', () => ({
  Geist: vi.fn(() => ({ variable: '--font-geist-sans', className: 'geist-sans' })),
  Geist_Mono: vi.fn(() => ({ variable: '--font-geist-mono', className: 'geist-mono' })),
}));
```
CSS side-effect imports are suppressed with `vi.mock('./globals.css', () => ({}))`.

**MUI v9:** No CacheProvider wrapper needed for structural/content tests in jsdom — Emotion works without it. Only needed if testing applied styles.

**Server Component testing:** Imported and rendered directly; async components should be awaited if they return a Promise. RootLayout is synchronous despite being a Server Component, so no special async handling was needed.

**Why:** Established during initial test scaffolding for `app/layout.tsx` and `app/page.tsx`.
**How to apply:** Follow these patterns for all future test files in this project.
