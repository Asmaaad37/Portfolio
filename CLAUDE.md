# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Guidelines (Karpathy)

- **Think before coding** — state assumptions; if a request has multiple interpretations, surface them instead of picking silently; ask when unclear.
- **Simplicity first** — minimum code that solves the problem; no speculative features, abstractions for single-use code, or unrequested configurability.
- **Surgical changes** — touch only what the task requires; match existing style; don't reformat or refactor adjacent code. Remove only orphans your own change created; mention (don't delete) pre-existing dead code.
- **Goal-driven** — turn tasks into verifiable checks (a failing test, `npm run lint`, `npm run type-check`, `npm run build`) and loop until they pass.

## Repo rules

- Never add `Co-Authored-By` or any AI attribution to commits or PRs. The owner wants to be the sole contributor.
- Copy, project facts and figures come from `public/resume.pdf` only. Don't invent stats. `Designs/Motion-lab.html` is the reference for look and motion.

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

Single test file: `npx vitest run app/__tests__/contact-page.test.tsx`
Single test by name: `npx vitest run -t "<test name substring>"`

On Windows, `npm run build` fails with `EBUSY` if any process (a static server, a shell) has its working directory inside `out/`.

## Architecture

**Next.js App Router, static export** — `next.config.ts` sets `output: 'export'`, `trailingSlash: true`, unoptimized images. No runtime server; everything must be resolvable at build time. `vercel.json` holds permanent redirects (`/projects` → `/work`, `/stats` → `/about`).

**Deployment** — Vercel (Git integration; every push to `main` deploys to https://asmaadsaeed.vercel.app, PRs get preview URLs). Served from the domain root, so `public/` assets are referenced as `/images/...`. Absolute URLs (OG/JSON-LD, sitemap, `public/robots.txt`) use `SITE_URL` from `src/lib/utils.ts`. `NEXT_PUBLIC_GA_TRACKING_ID` is a Vercel environment variable.

**Path alias** — `@/*` → `./src/*`.

**Routes** — `/` (home), `/work` and `/work/[slug]` (case studies, generated from data with `generateStaticParams`), `/about`, `/resume`, `/contact`, `/writing` (hidden from the nav until `content/writing/` has a post; there is no `/writing/[slug]` route yet), plus `feed.xml`, `sitemap.ts` and `icon.tsx`.

**Content** — all content is TypeScript in `src/data/`:

- `caseStudies.ts` — projects in display order (slug, metric, problem/approach/result, stack, links, pipeline figure). Drives the home gallery, `/work`, case-study pages and the sitemap. A project without a confirmed figure has no `metric`.
- `resume.ts` — transcribed from `public/resume.pdf`. When the PDF changes, update this file and `RESUME_UPDATED`.
- `home.ts`, `timeline.ts`, `about.ts`, `site.ts` (email, LinkedIn, GitHub, location, `REVISION`), `routes.ts` (`navRoutes({ hasPosts })`).

Many of these have tests in `src/data/__tests__/` that pin content facts (order, figures, links), so editing data can require updating them.

**Components** — `src/components/Site/` is the site chrome mounted in `app/layout.tsx`: header and glass nav, dot-grid canvas, crosshair cursor, Lenis smooth scroll, progress bar, the shared SVG refraction filter. `Home/` holds the home sections, some reused elsewhere (`Statement` and `Timeline` on About, `ContactBlock` on Contact, `DarkZone` on Work). `ui/` has buttons, chips and inline SVG icons (no icon font). `Template/PageWrapper` provides `<main id="main">` (the skip-link target) and the footer.

**First-load intro** — `src/components/Site/IntroScreen.tsx` ("LOADING" fill + signature). Its CSS and script are inlined in `<head>` by `app/layout.tsx` so it paints before any bundle. The script (which also sets the `js` class) shows it once per tab session via `sessionStorage`, for 1–3 s, by adding `intro-on` then `intro-done` to `<html>`. Without JavaScript it never appears. While it's up, the hero's CSS intro animations are paused (`home.css`) and play as it lifts.

**Motion** — GSAP + ScrollTrigger via `useGSAP` (imported from `src/lib/motion.ts`, which registers the plugins and exports the media queries). Every effect follows the same rules:

- Wrap it in `gsap.matchMedia()` with `MOTION_OK` (and `DESKTOP` / `FINE_POINTER` where it applies) and return `mm.revert()`, so it does nothing under reduced motion and cleans up on unmount and route change.
- Reveals animate transform only, never opacity. Text must stay readable at every moment (Lighthouse/axe audits every element on load) and visible for LCP.
- Canvas loops (`DotGridBackground`, `Waveform`) only run while on screen and while the tab is visible; the dot grid redraws only when something changes.
- The hero intro (M02) is a CSS animation, not GSAP, so the name paints on the first frame. The name stretch (`useStretchName`) keeps fixed letter boxes and moves glyphs with transforms, so it causes no layout shift.
- `DarkZone` toggles `body.is-dark` (the blue field) in every mode, including reduced motion, so text and glass always sit on the right ground. Its cleanup removes the class.
- Below-the-fold home sections are loaded with `next/dynamic` so they hydrate as separate chunks.
- Lenis is created in `SmoothScroll`; use `scrollToElement()` from there for in-page jumps that must clear the fixed header.

**Styling** — Tailwind 4 is imported only for its base reset (preflight). All styles are hand-written in `app/styles/site/`: `tokens.css` (colours from the prototype's `:root`; `body.is-dark` switches the palette), `base.css`, `glass.css`, `controls.css`, `shell.css`, then page files. Fonts are loaded with `next/font/google` as CSS variables (Anybody with the `wdth` axis, Schibsted Grotesk, Martian Mono).

**Liquid glass** — `.glass` is tinted with the page colour (75% on paper, 88% on blue) so text on it passes 4.5:1 whatever scrolls underneath. Refraction (`url(#lg-distort)` in `backdrop-filter`) is added in Chromium only (`html.lg-refract`); other browsers get the frosted blur. The hero's glass buttons only start blurring after the visitor's first interaction (`html.glass-live`), because re-blurring over the drifting glows on every frame is expensive.

## Linting & Formatting

Biome: single quotes, 2-space indent, no CommonJS, no explicit `any`, no unused imports/variables, auto-organized imports. CSS formatting is off in Biome (Prettier handles MD/CSS). Relaxed overrides exist for `*.config.ts` and `vitest.setup.tsx`.

## Testing

Vitest + jsdom + `@testing-library/react`, `globals: false` (import `describe`/`it`/`expect` explicitly). Test order is **shuffled** (`sequence.shuffle`), so tests must not depend on each other. `vitest.setup.tsx` stubs `window.matchMedia` to "no match", so motion components render their static, reduced-motion, touch version in tests. Page-level tests live in `app/__tests__/`; data tests in `src/data/__tests__/`.

Screen-reader-only text after a visible label needs its space outside the span (`Copy{' '}<span className="sr-only">email address</span>`); a leading space inside the span is dropped from the accessible name.
