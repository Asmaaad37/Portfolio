# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Guidelines (Karpathy)

- **Think before coding** — state assumptions; if a request has multiple interpretations, surface them instead of picking silently; ask when unclear.
- **Simplicity first** — minimum code that solves the problem; no speculative features, abstractions for single-use code, or unrequested configurability.
- **Surgical changes** — touch only what the task requires; match existing style; don't reformat or refactor adjacent code. Remove only orphans your own change created; mention (don't delete) pre-existing dead code.
- **Goal-driven** — turn tasks into verifiable checks (a failing test, `npm run lint`, `npm run type-check`, `npm run build`) and loop until they pass.

## Commands

All commands run from `personal-site/` (where `package.json` lives; the parent `W:\PersonalSite` is just a wrapper folder):

```bash
npm run dev            # Dev server on http://localhost:3000 (Turbopack)
npm run build          # Static export to out/
npm run lint           # Biome check
npm run type-check     # tsc --noEmit
npm run format         # Biome (JS/TS) + Prettier (MD/CSS)
npm test               # Vitest single run
npm run test:watch     # Vitest watch mode
npm run test:coverage  # Coverage (v8)
npm run analyze        # Bundle analyzer (ANALYZE=true; POSIX env syntax, use Git Bash on Windows)
```

Single test file: `npx vitest run src/components/__tests__/Template/Hero.test.tsx`
Single test by name: `npx vitest run -t "<test name substring>"`

## Architecture

**Next.js App Router, static export** — `next.config.ts` sets `output: 'export'`, `trailingSlash: true`, unoptimized images. No runtime server; everything must be resolvable at build time.

**Deployment** — Vercel (Git integration; every push to `main` deploys to https://asmaadsaeed.vercel.app, PRs get preview URLs). Served from the domain root, so no basePath; `public/` assets are referenced as `/images/...`. Absolute URLs (OG/JSON-LD, sitemap, `public/robots.txt`) use `SITE_URL`. `NEXT_PUBLIC_GA_TRACKING_ID` is set as a Vercel environment variable (see `.env.example`).

**Path alias** — `@/*` → `./src/*`.

**Content layers**:

- Structured content (resume, projects, stats, about, contact, routes) lives as TypeScript in `src/data/`. No CMS or runtime fetching (except the GitHub API call in `Stats/Site.tsx`).
- Blog posts: `content/writing/*.md`, parsed at build time by `src/lib/posts.ts` via `gray-matter`. Frontmatter: `title`, `date`, `description`, `draft?`; drafts are hidden in production, visible in dev. The directory is currently empty.

**Site constants** — `SITE_URL`, `AUTHOR_NAME`, `TWITTER_HANDLE` in `src/lib/utils.ts`.

**Page metadata** — pages build their `Metadata` via `createPageMetadata()` in `src/lib/metadata.ts`; JSON-LD schemas are in `src/components/Schema/`.

**Navigation** — routes defined in `src/data/routes.ts`, consumed by `src/components/Template/Navigation.tsx`.

**Theming** — dark/light via `data-theme` on `<html>`, persisted in `localStorage`. A `beforeInteractive` script in `app/layout.tsx` sets it before paint to avoid flash. Dark overrides live in `app/styles/dark-mode.css`.

**Styling** — Tailwind CSS 4 (`@tailwindcss/postcss`) plus hand-written CSS in `app/styles/` organized as `tokens/`, `base/`, `layout/`, `components/`, `pages/`.

## Linting & Formatting

Biome: single quotes, 2-space indent, no CommonJS, no explicit `any`, no unused imports/variables, auto-organized imports. CSS formatting is off in Biome (Prettier handles MD/CSS). Relaxed overrides exist for `*.config.ts` and `vitest.setup.tsx`.

## Testing

Vitest + jsdom + `@testing-library/react`, `globals: false` (import `describe`/`it`/`expect` explicitly). Test order is **shuffled** (`sequence.shuffle`), so tests must not depend on each other. Tests live in `__tests__/` directories — either co-located (e.g. `src/components/Schema/__tests__/`) or under `src/components/__tests__/<Area>/`. Many data files in `src/data/` have shape tests in `src/data/__tests__/`, so editing resume/project data may require updating those.

## Personalization Files

- `src/lib/utils.ts` — site constants
- `src/data/about.ts`, `contact.ts`, `projects.ts`, `resume/*.ts`, `stats/*`
- `package.json` — `homepage` and `repository.url`
- `public/images/me.jpg` — single profile photo used for both themes; project screenshots in `public/images/projects/`
