# Harty College Project Memory

## Goal

Maintain and extend the Harty College mock university website in this repo:

- public site: `https://hartyshub.github.io/`
- stack: Astro + Keystatic
- content model: file-based content in Git tracked files

This project is a redesign mockup derived from the structure of `www.cmkl.ac.th`, but all public-facing content must stay anonymized.

## Current State

- Astro site is implemented and builds successfully.
- GitHub Pages deployment is driven by `.github/workflows/pages.yml`.
- Keystatic is configured for local editing only.
- Local Keystatic works at `/keystatic` in dev mode.
- A dev-only hydration fix is in place for `react-dom/client`.
- Structural listing pages use a wide `PageLayout` mode so desktop cards are not constrained to prose width.
- The news archive is statically paginated: `/news` is page 1 and older archive pages live at `/news/page/{page}`.
- A deliberate stress-test batch of 100 synthetic news entries exists at `src/content/news/stress-test-news-001.mdoc` through `src/content/news/stress-test-news-100.mdoc`.

## Non-Negotiable Rules

- Public name must be `Harty College`.
- Do not use CMKL branding, names, logos, addresses, emails, phone numbers, or copyrighted images.
- Do not use real faculty or staff names.
- Keep the public site static.
- Do not promise GitHub Pages can host a production Keystatic backend by itself.

## Stack

- `astro@6.4.8`
- `@astrojs/react`
- `@astrojs/markdoc`
- `@astrojs/sitemap`
- `@keystatic/core`
- `@keystatic/astro`
- `react@18`
- `react-dom@18`

Astro is pinned to `6.4.8` because `@keystatic/astro@5.1.0` is tied to Astro 6 compatibility.

## Important Files

- [HARTY_COLLEGE_IMPLEMENTATION_PLAN.md](C:/Users/demo/Desktop/Projects/hartyshub.github.io/HARTY_COLLEGE_IMPLEMENTATION_PLAN.md)
  - detailed implementation and editorial plan
- [astro.config.mjs](C:/Users/demo/Desktop/Projects/hartyshub.github.io/astro.config.mjs)
  - Astro config, integrations, and Keystatic dev shim alias
- [keystatic.config.ts](C:/Users/demo/Desktop/Projects/hartyshub.github.io/keystatic.config.ts)
  - editor collections and local storage mode
- [src/content.config.ts](C:/Users/demo/Desktop/Projects/hartyshub.github.io/src/content.config.ts)
  - Astro content schemas
- [src/components/Pagination.astro](C:/Users/demo/Desktop/Projects/hartyshub.github.io/src/components/Pagination.astro)
  - shared static pagination control, currently used by the news archive
- [src/pages/news/page/[page].astro](C:/Users/demo/Desktop/Projects/hartyshub.github.io/src/pages/news/page/[page].astro)
  - static paginated news archive route
- [src/shims/react-dom-client.js](C:/Users/demo/Desktop/Projects/hartyshub.github.io/src/shims/react-dom-client.js)
  - dev shim for Keystatic hydration
- [.github/workflows/pages.yml](C:/Users/demo/Desktop/Projects/hartyshub.github.io/.github/workflows/pages.yml)
  - GitHub Pages build and deploy workflow

## Content Model

Primary editable collections:

- `pages`
- `news`
- `events`
- `faculty`
- `programs`
- `research`

Content lives under `src/content/...` and long-form entries are stored as `.mdoc`.

News archive behavior:

- `/news` shows the featured story plus the first 12 archive stories.
- `/news/page/{page}` shows older archive stories in batches of 12.
- Individual news articles still build as `/news/{slug}/`.
- Synthetic stress-test articles are intentionally anonymized and marked with `Stress Test` and `Synthetic` tags.

## Keystatic Workflow

Current mode:

- `storage: { kind: 'local' }`
- no login required in local development
- editors change files locally through Keystatic
- content changes must still be committed and pushed to deploy

Local access:

```text
http://127.0.0.1:4321/keystatic
```

Run locally:

```bash
npm install
npm run dev
```

## Build and Deploy

Validation:

```bash
npm run check
npm run build
```

Deployment flow:

```text
push to main
-> GitHub Actions workflow runs
-> Astro builds static output
-> GitHub Pages publishes dist/
```

## Known Compatibility Constraint

Keystatic dev hydration needed a workaround because the editor island was resolving `react-dom/client` in a way that failed in-browser.

Current fix:

- alias `react-dom/client` to `src/shims/react-dom-client.js` in `astro.config.mjs`

Do not remove that without re-testing `/keystatic`.

## Design Constraints

Color system:

- black, white, grey as primary colors
- crimson and orange as accents

UX constraints:

- responsive on phone, tablet, and desktop
- accessible keyboard navigation
- visible focus states
- semantic HTML

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
```

## Working Rules For Future Agents

- Prefer updating existing content and components over adding new architecture.
- Keep schema changes conservative and aligned with current collections.
- If adding a new generic content page, prefer using the `pages` collection rather than adding a hardcoded route.
- Before changing deployment behavior, verify the GitHub Pages workflow and repo settings assumptions.
- Before changing Keystatic configuration, verify whether the change is meant for local editing or hosted editing.

## Handoff Pattern

Use this file for durable project memory.

Use separate task files when needed, for example:

- `HARTY_COLLEGE_IMPLEMENTATION_PLAN.md` for full implementation guidance
- `KEYSTATIC_DEBUG_NOTES.md` for an active editor issue
- `DEPLOYMENT_NOTES.md` for GitHub Pages troubleshooting
