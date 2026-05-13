---
name: Project test framework setup
description: Vitest configuration, file conventions, and mocking patterns established for this Next.js 16 + React 19 + MUI v9 project
type: project
---

Test framework: **Vitest 4.x** (installed 2026-05-11, was not previously configured).

Config files:
- `vitest.config.ts` — root-level, uses `@vitejs/plugin-react`, `jsdom` environment, `globals: true`, `setupFiles: ['./vitest.setup.ts']`, path alias `@` → project root
- `vitest.setup.ts` — imports `@testing-library/jest-dom` for DOM matchers

npm scripts added to `package.json`:
- `test` → `vitest run`
- `test:watch` → `vitest`
- `test:coverage` → `vitest run --coverage`

Installed dev deps: `vitest`, `@vitejs/plugin-react`, `@vitest/coverage-v8`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`

**Why:** No test runner existed; Vitest is the preferred choice for Next.js + Turbopack projects.
**How to apply:** All future tests use Vitest APIs (`vi`, `describe`, `it`, `expect`). Do not introduce Jest.
