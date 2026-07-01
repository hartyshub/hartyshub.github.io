# Harty College Astro + Keystatic Implementation Plan

This file is a handoff document for an implementation agent. Follow it closely. Do not make large architecture changes unless the user asks for them.

## Project Goal

Build a responsive mock university website named **Harty College**.

The public website is a redesign mockup inspired by the structure and public content patterns of `www.cmkl.ac.th`, but all identifying details must be anonymized.

The public site will be hosted at:

```text
https://hartyshub.github.io/
```

The repo is:

```text
C:\Users\demo\Desktop\Projects\hartyshub.github.io
```

At the time of planning, this repo is nearly empty. It contains only a placeholder `index.html` and a clean `main` branch tracking `origin/main`.

## Important Revision

Yes, the original plan must be revised.

GitHub Pages can host the final static Astro website, but GitHub Pages cannot host a deployed Keystatic admin backend by itself because GitHub Pages is static-only.

Use this split:

1. **Public website**
   - Built with Astro as a static site.
   - Output goes to `dist/`.
   - Deployed to GitHub Pages.

2. **Content editing**
   - Phase 1: Keystatic local mode for development and mockup editing.
   - Phase 2, if non-technical editors need browser access: use Keystatic Cloud or deploy the Keystatic admin to a Node-capable host.

Do not promise that `/keystatic` will work as a production CMS on GitHub Pages alone.

Reference links:

```text
https://keystatic.com/docs/installation-astro
https://keystatic.com/docs/github-mode
https://keystatic.com/docs/cloud
https://docs.astro.build/en/guides/cms/keystatic/
```

## User Requirements

- Use Astro.
- Use Keystatic.
- Store editable content in GitHub as files, mostly `.mdoc`.
- Use actual essential data patterns from CMKL, but anonymize them.
- Rename the institution to **Harty College**.
- Make the design responsive with equal attention to phones, tablets, and desktops.
- Use black, white, and grey as the main colors.
- Use crimson and orange as accents because those are the source university color cues.
- The mock website should eventually be live on `hartyshub.github.io`.

## Non-Negotiable Anonymization Rules

Do not use:

- CMKL logo.
- CMKL name in visible UI.
- Real faculty or staff names.
- Real partner names.
- Real admissions email addresses.
- Real phone numbers.
- Exact real campus address.
- Original copyrighted website images.

Allowed:

- General academic structure.
- AI-focused university positioning.
- Program categories.
- Admissions process shape.
- News and event content types.
- General research and innovation themes.
- Anonymized summaries and fictional names.

Use **Harty College** everywhere in public copy.

## Source Content Patterns To Reuse

Use public CMKL data only as a structural reference. Anonymize all details.

Useful source patterns already identified:

- Homepage includes AI-focused positioning, proof metrics, program links, faculty preview, news, and events.
- Academics include undergraduate, graduate, doctoral, internship, high school, and professional training categories.
- Programs include AI and computer engineering, electrical and computer engineering, technology and creative innovation, and training/institute offerings.
- Admissions has an ordered application process.
- News includes featured story, latest stories, more stories, talks/lectures, and upcoming events.
- About includes a history and milestones timeline.

When writing mock content, change names and details. Example:

```text
CMKL University -> Harty College
Carnegie Mellon University -> a global technology university
KMITL -> a Bangkok-based public technology institute
AiCE -> AI and Computer Engineering
ECE -> Electrical and Computer Engineering
```

## Recommended Architecture

Use:

```text
Astro minimal TypeScript starter
Astro static output
Astro content collections
Markdoc / .mdoc files
Keystatic CMS
GitHub Actions
GitHub Pages
```

Do not use a prebuilt theme. Build custom layouts and components.

Do not add a backend database. This is a static website. Content is file-based.

## Keystatic Access Model

### Local Editing, No Login

During development:

```bash
npm run dev
```

Open:

```text
http://localhost:4321/keystatic
```

In Keystatic local mode:

- No login is needed.
- Keystatic edits local files.
- Files are saved under `src/content/...`.
- The developer commits and pushes the changes.
- GitHub Actions rebuilds the public static site.

### Production Editing, Login Required

If editors must edit from a deployed browser UI, use one of these:

1. **Keystatic Cloud**
   - Best editor-friendly option.
   - Handles authentication and GitHub connection.
   - Can allow team members without direct GitHub accounts depending on the setup.

2. **Keystatic GitHub mode on a Node-capable host**
   - Editors visit `/keystatic` on that host.
   - Editors log in with GitHub.
   - Editors need write access to the repo.
   - Keystatic commits content changes to GitHub.

Do not try to host the production Keystatic admin only on GitHub Pages.

## SSG Trigger Model

Astro static site generation is triggered by GitHub Actions.

Simple flow:

```text
Editor changes content
-> .mdoc or YAML files are committed to GitHub
-> push to main triggers GitHub Actions
-> GitHub Actions runs npm ci
-> GitHub Actions runs npm run build
-> Astro outputs static files to dist/
-> GitHub Pages publishes dist/
```

Safer editorial flow:

```text
Editor changes content
-> Keystatic saves to a content branch
-> pull request is reviewed
-> merge to main
-> GitHub Actions builds and deploys
```

For the first implementation, use the simple flow unless the user asks for review workflow.

## Design System

Use a neutral-first academic design. It should feel rigorous, modern, and accessible.

Add these CSS tokens globally:

```css
:root {
  --color-black: #0b0b0c;
  --color-charcoal: #1f2023;
  --color-grey-900: #2f3136;
  --color-grey-700: #5b6068;
  --color-grey-300: #d9dce1;
  --color-grey-100: #f4f5f6;
  --color-white: #ffffff;

  --color-crimson: #b5122b;
  --color-crimson-dark: #871022;
  --color-orange: #f26a21;
  --color-orange-dark: #b94712;
  --color-focus: #f26a21;
}
```

Usage rules:

- Use black, white, and grey for most backgrounds, text, cards, borders, and layout.
- Use crimson for primary buttons, active nav states, and high-priority links.
- Use orange for focus rings, date accents, and small highlights.
- Do not use orange for normal body text on white.
- Check contrast for all text and buttons.
- Avoid one-color pages. The site must not become all orange/crimson.

## Responsive Design Requirements

Design mobile first.

Required viewport checks:

```text
390px phone
768px tablet
1024px small laptop
1440px desktop
```

Breakpoints:

```css
/* default: phone */
@media (min-width: 768px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* wide */ }
```

Responsive rules:

- Header must have a usable mobile menu.
- Nav must be keyboard accessible.
- No text overlap at 390px width.
- Buttons must wrap or resize cleanly.
- Card grids should become one column on phone, two columns on tablet, and three or four columns on desktop.
- Images need stable aspect ratios.
- Avoid layout shifts when content is longer than expected.
- Use `max-width` containers for readable text.
- Do not scale font sizes with viewport width.
- Keep letter spacing at `0`.

## Accessibility Requirements

Implement these from the beginning:

- Use semantic HTML.
- Add a skip link before the header.
- Use one visible `h1` per page.
- Keep heading order logical.
- Every image needs meaningful `alt` text or empty alt for decorative images.
- Focus states must be clearly visible.
- Do not rely on color alone.
- All interactive elements must be keyboard reachable.
- Buttons must be real `<button>` elements.
- Links must be real `<a>` elements.
- Use `aria-expanded` and `aria-controls` on mobile nav toggle.
- Respect `prefers-reduced-motion`.
- Test keyboard navigation.
- Target WCAG AA contrast.

## Astro Starter

Use the Astro minimal TypeScript starter.

Recommended command:

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-git
```

If the Astro CLI refuses because the folder is not empty, do not delete the new plan file. Keep `HARTY_COLLEGE_IMPLEMENTATION_PLAN.md`. Replace only the placeholder `index.html` as needed.

Then add integrations and packages:

```bash
npx astro add react markdoc sitemap
npm install @keystatic/core @keystatic/astro
```

Notes:

- React is needed for Keystatic admin UI.
- Markdoc is needed for `.mdoc` content.
- Sitemap is useful for static deployment.

## Astro Config

Create or update `astro.config.mjs`.

Required:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://hartyshub.github.io',
  integrations: [
    react(),
    markdoc(),
    sitemap(),
    keystatic(),
  ],
});
```

For `hartyshub.github.io`, do not set `base` because this is the root domain for a GitHub Pages user or organization site.

## Target Project Structure

Create this structure:

```text
src/
  assets/
    images/
      faculty/
      general/
      news/
      programs/
      research/
  components/
    EventCard.astro
    FacultyCard.astro
    Footer.astro
    Header.astro
    Hero.astro
    NewsCard.astro
    ProgramCard.astro
    ResponsiveImage.astro
  content/
    config.ts
    events/
    faculty/
    news/
    pages/
    programs/
    research/
  layouts/
    ArticleLayout.astro
    BaseLayout.astro
    PageLayout.astro
    ProgramLayout.astro
  pages/
    [...slug].astro
    index.astro
    admissions.astro
    events/
      [slug].astro
      index.astro
    faculty/
      [slug].astro
      index.astro
    news/
      [slug].astro
      index.astro
    programs/
      [slug].astro
      index.astro
    research/
      index.astro
keystatic.config.ts
astro.config.mjs
.github/
  workflows/
    pages.yml
```

## Content Storage

Use `.mdoc` for editable long-form content:

```text
src/content/news/student-research-showcase.mdoc
src/content/programs/ai-computer-engineering.mdoc
src/content/faculty/maya-sen.mdoc
src/content/pages/student-life.mdoc
src/content/events/ai-open-house.mdoc
```

Use YAML or JSON only for simple global settings if needed:

```text
src/content/settings/site.yaml
src/content/navigation/main.yaml
```

Keystatic should create and edit these files.

## Astro Content Collections

Create `src/content/config.ts`.

Use Zod schemas for validation. Keep schemas simple and strict.

Suggested collection names:

```text
pages
news
events
faculty
programs
research
```

Each collection must have a slug-compatible file name.

## Keystatic Collections

Create `keystatic.config.ts`.

Start with local storage:

```ts
import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    // Add collections here.
  },
});
```

Later, for GitHub mode, change storage to:

```ts
storage: {
  kind: 'github',
  repo: 'OWNER/hartyshub.github.io',
}
```

Do not hardcode secrets in source files.

## Required Collection Schemas

### News

Path:

```text
src/content/news/*
```

Fields:

```text
title
slug generated from title
date
category
summary
heroImage
heroImageAlt
featured
tags
content
```

Purpose:

- Render `/news`.
- Render `/news/[slug]`.
- Feed homepage featured stories.

Example `.mdoc`:

```mdoc
---
title: Student Research Showcase
date: 2026-07-01
category: Research
summary: Harty College students presented applied AI prototypes for health, accessibility, and learning.
featured: true
tags:
  - AI
  - Student Work
---

Harty College students shared prototypes that explore practical uses of AI in community services, education, and assistive technology.
```

### Faculty

Path:

```text
src/content/faculty/*
```

Fields:

```text
name
slug generated from name
title
department
programs
researchAreas
shortBio
portrait
portraitAlt
featured
sortOrder
content
```

Rules:

- Faculty must be fictional.
- Do not copy real faculty names.
- Portraits should be generated, abstract, or omitted.

Purpose:

- Render `/faculty`.
- Render `/faculty/[slug]`.
- Optionally feed homepage faculty preview.

### Programs

Path:

```text
src/content/programs/*
```

Fields:

```text
name
slug generated from name
degreeLevel
area
duration
location
intake
overview
outcomes
requirements
curriculumHighlights
featured
content
```

Recommended program entries:

```text
Bachelor of Engineering in AI and Computer Engineering
Master of Science in AI and Computer Engineering
Doctor of Philosophy in AI and Computer Engineering
Master of Science in Electrical and Computer Engineering
Doctor of Philosophy in Electrical and Computer Engineering
Technology and Creative Innovation
High School AI Summer Program
Professional Training in Software Engineering
Professional Training in AI Engineering
```

Anonymize partner and degree details. If referencing dual-degree style, say "with an international academic partner" instead of naming a real institution.

Purpose:

- Render `/programs`.
- Render `/programs/[slug]`.
- Feed homepage program cards.

### Events

Path:

```text
src/content/events/*
```

Fields:

```text
title
slug generated from title
date
startTime
endTime
location
category
summary
registrationHref
featured
content
```

Use fictional or generic locations:

```text
Harty College Innovation Hall
Bangkok Learning Studio
Online
```

Purpose:

- Render `/events`.
- Render `/events/[slug]`.
- Feed homepage upcoming events.

### Generic Pages

Path:

```text
src/content/pages/*
```

Fields:

```text
title
slug generated from title
summary
heroImage
heroImageAlt
layoutVariant
showInNavigation
navigationLabel
seoDescription
content
```

Allowed `layoutVariant` values:

```text
standard
landing
resource
```

Purpose:

- Let editors add pages without changing code.
- Render through `src/pages/[...slug].astro`.

Examples:

```text
/student-life
/labs
/visit
/contact
/policies
```

### Research

Path:

```text
src/content/research/*
```

Fields:

```text
title
slug generated from title
summary
focusAreas
impactStatement
featured
content
```

Recommended anonymized research areas:

```text
Responsible AI Systems
Human-Centered Computing
Scalable Computing Infrastructure
Health and Assistive Technology
Learning Technology
Cybersecurity and Trust
```

Purpose:

- Render `/research`.
- Feed homepage research section.

## Required Pages

Build these pages.

### `/`

Homepage sections in this order:

1. Header and navigation.
2. Hero with `Harty College` as the main `h1`.
3. Short AI-focused positioning statement.
4. Four proof metrics.
5. Featured academic programs.
6. Admissions callout.
7. Research and innovation section.
8. Latest news.
9. Upcoming events.
10. Footer.

Hero copy example:

```text
Harty College
AI-focused education, research, and innovation in Bangkok.
```

Use neutral design. Do not make a generic marketing landing page. The first screen should help users understand the college and quickly reach Programs, Admissions, Research, and News.

### `/programs`

List all programs. Add filters or grouped sections:

```text
Undergraduate
Graduate
Doctoral
Pre-college
Professional
```

On mobile, filters should stack or become a simple segmented list.

### `/programs/[slug]`

Program detail page.

Include:

- Program name.
- Degree level.
- Duration.
- Intake.
- Location.
- Overview.
- Outcomes.
- Requirements.
- Curriculum highlights.
- CTA to admissions.

### `/admissions`

Static page is acceptable for first implementation.

Sections:

- Hero.
- Application steps.
- Requirements summary.
- Sample fees note.
- FAQ.
- CTA.

Application steps:

```text
01 Create an application account
02 Choose a program
03 Submit required materials
04 Pay the sample application fee
05 Application review
06 Interview if required
07 Receive decision
08 Confirm enrollment
```

Mark fees as sample mockup values, not official policy.

### `/news`

List news.

Include:

- Featured story.
- Latest stories.
- Category filters if simple.

### `/news/[slug]`

Render article content from `.mdoc`.

### `/events`

List upcoming events first, then past events.

### `/events/[slug]`

Render event detail page.

### `/faculty`

List fictional faculty profiles.

Sort by:

```text
sortOrder ascending
then name ascending
```

### `/faculty/[slug]`

Render individual fictional faculty profile.

### `/research`

List research areas and impact statements.

### `/[...slug]`

Catch-all route for generic pages from `src/content/pages`.

This is required so editors can add pages without code changes.

If a slug is not found, return Astro 404 behavior.

## Navigation

Primary nav:

```text
Programs
Admissions
Research
News
Events
Faculty
About
```

If `pages` entries have `showInNavigation: true`, include them only if there is room. On small screens, they can appear in the mobile menu after primary nav.

Keep nav labels short.

## Components

### `Header.astro`

Requirements:

- Site name links to `/`.
- Desktop nav visible at 1024px and above.
- Mobile menu below 1024px.
- Mobile menu toggle is a real button.
- Use `aria-expanded`.
- Use `aria-controls`.
- Close menu when a nav link is clicked.
- No inaccessible hover-only behavior.

### `Footer.astro`

Include:

- Harty College.
- Short description.
- Quick links.
- Mock contact line with anonymized email, for example `hello@harty.example`.
- Copyright.
- Privacy/Policies links can point to generic pages.

### Card Components

Use separate components:

```text
ProgramCard.astro
NewsCard.astro
EventCard.astro
FacultyCard.astro
```

Rules:

- Cards use 8px radius or less.
- No cards inside cards.
- Cards must not break when text is long.
- Whole card can link only if implemented accessibly.

## Image Guidance

Do not reuse CMKL images.

Options:

- Use generated abstract campus and research imagery.
- Use simple checked-in placeholder images.
- Use CSS blocks for non-critical decorative areas.

Every meaningful image must have alt text.

For card images, use stable aspect ratios:

```css
aspect-ratio: 16 / 9;
object-fit: cover;
```

For faculty portraits:

```css
aspect-ratio: 1 / 1;
object-fit: cover;
```

## Content Examples To Seed

Seed enough content for the mockup to feel real.

Minimum:

```text
6 programs
6 faculty profiles
6 news stories
4 events
5 research areas
3 generic pages
```

Suggested generic pages:

```text
Student Life
Labs and Facilities
Visit Harty College
```

Suggested fictional faculty names:

```text
Dr. Maya Sen
Dr. Arun Voss
Prof. Lina Hart
Dr. Theo Kwan
Dr. Mira Chai
Prof. Daniel Rowe
```

These are fictional. If any name conflicts with a real person from the source site, change it.

## GitHub Pages Workflow

Create:

```text
.github/workflows/pages.yml
```

Use GitHub Pages Actions deployment.

Workflow:

```yaml
name: Deploy Astro site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

GitHub repo settings must have Pages source set to GitHub Actions.

## Package Scripts

Ensure `package.json` has:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

If `astro check` is not available, install the needed Astro checker dependency when prompted.

## Implementation Order

Follow this order exactly.

1. Check current git status.
2. Scaffold Astro minimal TypeScript project.
3. Add React, Markdoc, Sitemap, Keystatic.
4. Configure Astro.
5. Create design tokens and global CSS.
6. Create content collection schemas.
7. Create Keystatic config.
8. Add seed `.mdoc` content.
9. Build layouts.
10. Build shared components.
11. Build index/list/detail pages.
12. Build generic catch-all page route.
13. Add GitHub Pages workflow.
14. Run checks and build.
15. Fix all errors.
16. Confirm responsive behavior manually.
17. Commit and push only if the user asks for a commit or deployment.

## Validation Checklist

Run:

```bash
npm run check
npm run build
```

Manual checks:

- Homepage renders.
- `/programs` renders.
- `/programs/[slug]` renders for every program.
- `/news` renders.
- `/news/[slug]` renders for every article.
- `/events` renders.
- `/faculty` renders.
- `/research` renders.
- Generic page route works, for example `/student-life`.
- Mobile menu works at 390px width.
- Tablet layout works at 768px width.
- Desktop layout works at 1024px and 1440px.
- Keyboard navigation reaches all links and buttons.
- Focus rings are visible.
- No text overlaps.
- All meaningful images have alt text.
- Build output exists in `dist/`.

## Common Mistakes To Avoid

- Do not use CMKL branding in public UI.
- Do not copy real faculty profiles.
- Do not copy exact news articles.
- Do not use GitHub Pages as a production Keystatic backend.
- Do not store secrets in the repo.
- Do not introduce a database.
- Do not add a heavy frontend framework for normal static pages.
- Do not make the homepage only a hero page.
- Do not ignore mobile and tablet layouts.
- Do not use inaccessible custom buttons or links.
- Do not create cards inside cards.
- Do not use orange body text on white.

## Final Handoff Notes

The intended first version is:

```text
Astro static public site on GitHub Pages
Keystatic local editing during development
Content stored as .mdoc files in GitHub
GitHub Actions rebuild on push to main
```

If the user later asks for non-technical browser editing, add:

```text
Keystatic Cloud
or
Keystatic GitHub mode hosted on a Node-capable platform
```

Keep the public `hartyshub.github.io` site static.
