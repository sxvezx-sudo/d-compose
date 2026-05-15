# Migration Path

## Stage 1 — Component extraction (current)

Nav/footer are in `components/` and injected via `fetch()`. CSS tokens
and shared rules are in `css/styles.css`. Page-specific styles live in
each HTML file's `<style>` block.

## Stage 2 — Astro + Vite + Decap CMS

Migrate when one of these triggers hit:
- Content management becomes painful (editing markdown by hand,
  duplicating project data across pages)
- The site grows beyond ~10 pages
- Non-technical team members need to edit content

What changes:
- `components/navbar.html` / `components/footer.html` → `.astro` components
- HTML pages → `src/pages/*.astro` using a shared `BaseLayout.astro`
- Project/service content → Decap-managed markdown in `src/content/`
- `js/components.js` is removed (Astro injects components at build time)
- `js/main.js` interactions and GSAP animations move to `src/scripts/`
- CSS stays as plain CSS (split into `tokens.css`, `reset.css`,
  `globals.css` under `src/styles/`)

Stack:
- **Astro** — static site generator with component support
- **Vite** — built into Astro, handles HMR and bundling
- **Plain CSS + PostCSS** — keep current token system and conventions
- **Vanilla JS + GSAP** — no TypeScript needed at this stage
- **Decap CMS** — git-based CMS, editor UI at `/admin`
- **Netlify** — hosting with built-in Decap OAuth support

Output remains 100% static HTML — no client-side framework runtime.

## Stage 3 (optional) — TypeScript

Only warranted if:
- JS logic grows beyond DOM manipulation and GSAP timelines
- The project integrates external APIs with complex data shapes
- The team grows to 4+ developers needing type contracts

Skip React/Vue entirely. Astro covers component needs for a portfolio
site of this scale.

**Do not migrate ahead of the triggers above.** The current stack's
simplicity is a feature, not a limitation.