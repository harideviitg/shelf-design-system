# Shelf — Design System

This is the design system behind **Shelf**, an iOS app. It's built to sit next to the app itself as the single source of truth for how Shelf looks and feels — colors, type, spacing, components, motion — documented as a real website instead of a stale Notion page or a PDF nobody opens.

No framework, no build step, no dependencies. Just HTML, CSS, and vanilla JS, deployed as static files.

## Why it exists

Shelf is a native iOS app, so the "real" design system lives in Swift/SwiftUI and in Figma. This site is the bridge between the two: a place designers and future-me can check a token or a rule without opening Xcode or hunting through Figma layers. It's meant to be read like documentation, not like marketing.

## Stack

- **Plain HTML/CSS/JS** — no React, no Vue, no bundler. The whole site is a handful of files under `assets/`.
- **CSS custom properties** as the token layer — colors, easing curves, and spacing are all `--variables` in `styles.css`, mirroring how the tokens are defined on the iOS side.
- **Client-side routing** via a small hash router in `app.js`, with a page registry in `content.js` so adding a new page is just adding an entry, not wiring up a new route.
- **A real search**, not a decorative one — `⌘K` / `Ctrl K` or `/` opens a command-palette-style search that indexes every page and section, built at boot from the same content registry.

I went back and forth on Astro/Next for this, but the site is small enough that a framework would just be overhead — a few sections, one scroll-spy, one hover state. If it grows into a lot of MDX-style pages later, Astro is the natural next step since it ships zero JS by default and the CSS/JS here would port over mostly unchanged.

## Colors

The palette is intentionally restrained — mostly neutrals, with contrast doing the work instead of hue:

| Token | Value | Used for |
|---|---|---|
| `--c-shell` | `#ffffff` | page background |
| `--c-sidebar` | `#f7f7f7` | sidebar background |
| `--c-card` | `#f5f5f5` | cards |
| `--c-divider` | `#ebebeb` | hairlines |
| `--c-item` | `#404040` | active nav / primary text |
| `--c-heading` | `#484848` | headings |
| `--c-subtitle` | `#575757` | subtitles |
| `--c-eyebrow` | `#898989` | eyebrow labels |
| `--c-toc-near` | `#909090` | nav item, one away from active |
| `--c-toc-far` | `#d7d7d7` | nav item, two away from active |

That last pair is the one rule worth calling out: the sidebar nav doesn't treat items as just "active" or "inactive" — it fades by *distance* from whatever section you're reading. The item right next to the active one is mid-grey, the one after that is barely there. It reads as one continuous strip instead of a toggle switch.

## Typography

SF Pro, matching the iOS app. Sizes and weights are pinned to explicit values rather than left to the browser default, so line-heights don't drift if the font falls back:

- Sizes: `12/14`, `13/16`, `14/17`, `15/21`, `20/24`, `32/38`
- Weights: Light (274), Regular (400), Medium (510)

On Apple devices this renders as real SF Pro via `-apple-system`. Elsewhere it falls back gracefully — see `assets/fonts/` if you want to self-host it for pixel-perfect rendering everywhere.

## Motion

Everything animates on one family of easing curves so the page feels like a single object rather than a pile of separately-tuned transitions:

```css
--ease-pin: cubic-bezier(0, 0.93, 0, 1);        /* sidebar hover */
--ease-1:   cubic-bezier(0.12, 0.86, 0.16, 1);  /* rail + indicator */
--ease-2:   cubic-bezier(0.22, 0.78, 0.24, 1);  /* drawer, page transitions, scroll */
```

Scrolling is animated manually on `--ease-2` (there's a small bezier solver in `app.js`) instead of relying on `scroll-behavior: smooth`, so anchor jumps decay the same way everything else does. Any real scroll input cancels it instantly, and `prefers-reduced-motion` turns all of it off.

## Structure

```
design-system-site/
├─ index.html              the page shell
├─ assets/
│  ├─ css/styles.css       tokens, layout, motion
│  ├─ js/app.js            routing, scroll-spy, search, drawer
│  ├─ js/content.js        page registry (add a page here)
│  ├─ js/search.js         the ⌘K search
│  ├─ img/shelf-logo.svg
│  └─ fonts/               notes on self-hosting SF Pro
└─ README.md
```

## Running it locally

ES modules need an actual server, not `file://`:

```bash
python -m http.server 5173
```

Then open `http://localhost:5173`.

## Deploying

It's a static folder, so it deploys as-is to Vercel, Cloudflare Pages, Netlify, or GitHub Pages — no config needed. There's also an `?embed` mode built in for dropping it into an iframe on a marketing site without a duplicate nav bar.
