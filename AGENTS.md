# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Romanian Business Hub — a multilingual (RO/EN/NL) business directory SPA for Romanian businesses in West Flanders, Belgium. Single-package frontend-only project (no monorepo, no Docker, no backend to run locally). The remote Supabase instance provides database, auth, and edge functions.

### Running the app

- `npm run dev` starts the Vite dev server on **port 8080** (configured in `vite.config.ts`).
- The `.env` file ships with the remote Supabase URL and anon key already committed; no extra secrets are needed to start the frontend.

### Key commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Unit tests | `npm test` (vitest) |
| Build | `npm run build` |

### Gotchas

- **`--legacy-peer-deps`** is required when running `npm install` because of peer-dependency conflicts (documented in `scripts/README.md`).
- **`@testing-library/dom`** is not declared in `package.json` but is a required peer dependency of `@testing-library/react`. If tests fail with "Cannot find module '@testing-library/dom'", install it: `npm install --legacy-peer-deps @testing-library/dom`.
- ESLint reports pre-existing errors (`@typescript-eslint/no-explicit-any`) and warnings in the codebase; these are not regressions.
- The `npm run build` step first generates a sitemap by fetching data from Supabase, so it requires network access.
