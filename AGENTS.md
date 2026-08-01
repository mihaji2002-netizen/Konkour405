# AGENTS.md

## Cursor Cloud specific instructions

This is a single, client-only **Vite + React + TypeScript** SPA (`konkur-1405`), a Persian/RTL study-planning web app. There is no backend, database, or environment variables — all user progress is saved in the browser's `localStorage`. Package manager is **npm** (`package-lock.json`).

### Services

Only one service is needed to run and test the app end to end: the Vite dev server.

- Run dev server: `npm run dev` (serves at `http://localhost:5173`). The app is fully functional client-side; no other services required.

### Lint / build / commands

Standard scripts live in `package.json`:

- Lint: `npm run lint` (oxlint, config in `.oxlintrc.json`).
- Build (type-check + production bundle): `npm run build` (`tsc -b && vite build`).
- Preview a production build: `npm run preview`.
- Deploy (GitHub Pages): `npm run deploy` — only run when intentionally publishing.

### Notes / gotchas

- App state (selected group, checked-off study blocks) persists in `localStorage`; to test from a clean state, clear site data or use a fresh/incognito browser profile.
- `vite.config.ts` sets `base: './'` for static hosting on GitHub Pages; keep this when testing the production `preview` build.
