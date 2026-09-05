# Bracket — the Shelf design system site

A native, hand-coded build of the Figma frame `design system website`
(file `snx6xiWnCSSIDJk8nO2AI4`, node `1:2`).

No build step. No dependencies. No framework runtime. Three files do the work:

```
design-system-site/
├─ index.html                 the designed page, as real markup
├─ assets/
│  ├─ css/styles.css          tokens + layout + motion   (~19 KB)
│  ├─ js/app.js               routing, scroll-spy, indicator, drawer  (~9 KB)
│  ├─ js/content.js           page registry
│  ├─ img/shelf-logo.svg      exported from the Figma file
│  └─ fonts/README.md         how to get SF Pro in (read this)
└─ README.md
```

Total over the wire, uncompressed and unminified: **52 KB**, of which 5 KB is
the logo SVG and a good third is comments. Any host's gzip takes it to roughly
13 KB. First paint does not wait on JavaScript — the Introduction page is
in the HTML, and `app.js` lifts it out of the DOM to reuse for routing.

---

## Running it

ES modules will not load over `file://` — the browser blocks them. You need a
server, any server. There is no Node on this machine, so:

```bash
python -m http.server 5173 --directory "D:/Shelf/design-system-site"
```

Then open <http://localhost:5173>.

---

## Why no framework

You asked which one to use. The honest answer for *this* page is none, and the
reasoning is short:

- It is one screen with four sections and nine nav links. React, Vue or Svelte
  would ship 40–90 KB of runtime to manage state that fits in one small object.
- The two interactions that matter — the hover plate and the scroll-spy — are a
  CSS pseudo-element and one scroll listener. A framework does not make either
  smoother; it adds a layer between your code and the scroll event.
- Zero build means zero toolchain drift. This still runs in five years.

**When to change your mind.** Move to [Astro](https://astro.build) the day you
want the other eight sidebar pages written as MDX instead of HTML strings. Astro
ships zero JS by default, so `styles.css` and `app.js` port over essentially
unchanged — the layout becomes a `.astro` layout and each page becomes a file.
That is a two-hour migration, and it is the right one to make later rather than
pre-emptively now.

Do **not** reach for Next.js here. There is no server, no data layer and no
auth; you would be adding a React runtime to render static text.

---

## Fidelity to the file

Every measurement came out of the node JSON, not off a render. Verified in the
browser against the file:

| | Figma | Built |
|---|---|---|
| Shell | 1366 × 957, r16, flush to bottom | ✓ |
| Sidebar | 267 wide, nav origin (38, 35) | ✓ |
| Nav item pitch / list / group | 32 / 241 / 364 | ✓ |
| Content column | head 494, title block 298, sections 732 | ✓ |
| Cards | 356 × 198, gap 20, r16, `#f5f5f5` | ✓ |
| Rail block | 95 tall, right inset 39, y = 407 | ✓ |
| Type | 12/14 · 13/16 · 14/17 · 15/21 · 20/24 · 32/38 | ✓ |
| Weights | Light 274, Regular 400, Medium 510 | ✓ |

Line-heights are pinned to explicit pixel values rather than left as `normal`,
because every one of them is confirmed twice over by the node bounding boxes
(a 12px node is 14px tall, a 32px node is 38px tall, and so on). Leaving them to
the font would make the layout drift the moment the typeface substitutes.

### The three rail states are a gradient, not a toggle

The file draws four rail entries in **three** different treatments:

| Entry | Colour | Size | Rule |
|---|---|---|---|
| Whats in there? | `#404040` | 14px | 18px |
| Principles, Getting started | `#909090` | 12px | 12px |
| Who made this | `#d7d7d7` | 12px | 12px |

That is not active-vs-inactive. It is **distance** from what you are reading:
the two neighbours of the active entry are mid-grey and the one two away is
faint. The build reproduces exactly that, via `data-dist="0|1|2"`. Scroll to the
second section and the rail renders byte-for-byte what the Figma frame shows.

A pleasant side effect: because exactly one entry is ever 17px tall and the rest
are 14px, the block's total height stays 95px no matter which is active, so
nothing jumps.

---

## Motion

The reference render on your canvas pins one curve explicitly — *"the sidebar
hover, 300ms `cubic-bezier(0,.93,0,1)`. Every other curve is derived from that
family, so the page moves as one thing."* That is honoured literally:

```css
--ease-pin: cubic-bezier(0, 0.93, 0, 1);        /* sidebar hover, 300ms */
--ease-1:   cubic-bezier(0.12, 0.86, 0.16, 1);  /* rail + indicator, 260ms */
--ease-2:   cubic-bezier(0.22, 0.78, 0.24, 1);  /* drawer, page swap, scrolling */
```

Programmatic scrolling uses `--ease-2` evaluated in JS (there is a small bezier
solver in `app.js`) rather than `scroll-behavior: smooth`, so anchor jumps decay
on the same curve as everything else. Duration scales with distance and clamps
to 320–720ms. Any real input — wheel, touch, keys — cancels an in-flight scroll
immediately.

`prefers-reduced-motion` collapses all of it.

---

## Fonts — the one thing that is not exact everywhere

The design is SF Pro. Apple's licence does not cleanly cover self-hosting it as
a webfont, so nothing is bundled. Right now:

- **Apple devices** render real SF Pro through `-apple-system`. Exact, free.
- **Windows / Android** fall back to Helvetica Neue or Arial. Right tone, wrong
  metrics — paragraph wraps drift by a line.

`assets/fonts/README.md` covers all three ways to resolve this, including the
licence text you should read before picking one. Nothing in the CSS changes:
drop `SF-Pro.woff2` in that folder and it takes over everywhere.

---

## Deploying it

### Recommended: host it yourself, link it from Framer

It is a static folder, so any of these take it as-is with no configuration:

```bash
npx vercel deploy --prod        # or
npx wrangler pages deploy .     # Cloudflare Pages
```

Netlify and GitHub Pages work identically — drag the folder in.

Then point a subdomain at it (`ds.yourdomain.com`) and link to it from the
Framer nav. Framer keeps your marketing site, this keeps its own URLs, real
routing and real SEO. Nothing is nested in an iframe.

### If it must live inside a Framer page

Framer has no static-file hosting — no public folder, no HTML upload, and
redirects rather than path proxying. So it cannot serve these files whatever you
do. Deploy first (above), then embed the deployed URL:

1. New Framer page, e.g. `/design-system`.
2. Insert → **Embed**, type URL, paste the deployed address with `?embed`
   appended: `https://ds.yourdomain.com/?embed`
3. Size the Embed **100vw × 100vh**; set page padding and gaps to 0.

`?embed` is a mode built into this site for exactly that: it drops the top bar,
so Framer's nav is the only nav, and takes the white card edge to edge instead
of leaving it floating in a page inside a page. Below 900px it keeps a 48px bar
holding just the hamburger, because that is the only way into the sidebar at
that size. Without the flag nothing changes — normal hosting is unaffected.

`100dvh` inside an iframe resolves to the iframe's own height, so the shell
fills the embed exactly. No fixed pixel height needed.

What the iframe still costs you, and cannot be worked around: the address bar
never reflects `#/typography`, so no deep links, no back button between
sub-pages, and no indexing past the first screen. If the design system should be
findable, use the subdomain.

### Porting it into a Framer code component

Possible, not advised. You would be rewriting `index.html` as JSX inside a React
component and re-implementing the router against Framer's routing, and Framer's
canvas will fight an app-shell layout that pins itself to the viewport. You lose
the no-build property and gain nothing this page needs.

---

## Adding a page

Open `assets/js/content.js` and give the entry a `body` string instead of a
`stub`:

```js
typography: {
  group: 'Foundations',
  top: 'Foundation',
  title: 'Typography',
  subtitle: 'The type ramp, and where each step is used.',
  body: `
    <header class="doc__head"> … </header>
    <section class="section" id="scale">
      <h2 class="section__title">Scale</h2>
      <div class="cards"><div class="card"></div><div class="card"></div></div>
    </section>`,
},
```

Any `<section class="section" id="…">` you add is picked up automatically: the
right-hand rail rebuilds itself from the sections present, and the scroll
indicator re-measures. There is nothing else to register.

---

## Judgement calls, so you can overrule them

The file only draws one screen at one size. These are mine, not the file's:

1. **The scroll indicator (node `1:42`) is bound to main-content scroll.** The
   file draws a 3px pill with an 89px thumb at the sidebar's right edge, but the
   sidebar's nine items never overflow at desktop height, so bound to the
   sidebar it would be a control that never moves. Set `PROGRESS_TARGET` at the
   top of `app.js` to `'sidebar'` to flip it.
2. **Three sections were added.** The rail names four — Principles, Whats in
   there?, Getting started, Who made this — but only Principles is drawn. The
   other three repeat the Principles pattern exactly (20px Medium heading, 2×2
   grid of empty `#f5f5f5` cards). Without them there is nothing for the rail to
   track. The cards are left empty on purpose.
3. **The current-page state is invented.** Every sidebar item is `#404040` in the
   file, with no active treatment drawn. The build gives the current page the
   hover plate at a slightly stronger tint plus `#1d1d1d` ink at weight 510.
4. **Breakpoints are all derived.** 1440 is the only width in the file; at
   exactly 1440 × 1024 no media query applies and the render is the file. Below
   that: rail narrows at 1400 and 1200, drops at 1060, sidebar becomes a drawer
   at 900, cards go single-column at 720.
5. **`Cark theme` is left as drawn** (node `1:88`). It is a typo for *Dark
   theme*. Fix it in Figma and change the one string in `content.js`.
6. **The empty text layer in the top bar** (node `1:18`, ten blank lines next to
   "Foundation") is not rendered.
