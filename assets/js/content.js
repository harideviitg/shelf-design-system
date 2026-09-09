/* =============================================================================
   content.js - the page registry.

   "Introduction" is NOT in here. It is authored as real markup in index.html so
   the designed page paints before a single byte of JS runs; app.js lifts it out
   of the DOM on boot and treats it like any other entry.

   Every other route below is a page the Figma file names in the sidebar but
   never draws. Rather than invent a layout for it, each one renders the head
   block the file *does* define plus an explicit note about what is missing.
   That is the page's own stated rule: where the file is silent, say so.

   To ship a real page, replace `stub` with `body` - an HTML string using the
   same primitives the Introduction page uses:

     <section class="section" id="slug">
       <h2 class="section__title">Title</h2>
       <div class="cards"><div class="card"></div><div class="card"></div></div>
     </section>

   Any `.section[id]` you add is picked up automatically by the right-hand rail
   and by the scroll indicator. No other wiring is needed.
   ========================================================================== */

const SUBTITLE = 'A small sub heading or explanation about this tab';

/** Pages the file lists but does not draw. */
function pending(name) {
  return `Nothing in <strong>snx6xiWnCSSIDJk8nO2AI4</strong> describes the
    ${name} page yet - the sidebar names it, but no frame defines it. This page
    is a placeholder on purpose rather than a guess. Add a <code>body</code>
    string for <code>${name.toLowerCase()}</code> in
    <code>assets/js/content.js</code> to fill it in.`;
}

export const PAGES = {
  introduction: {
    group: 'Foundations',
    top: 'Foundation',
    title: 'Introduction',
    subtitle: SUBTITLE,
    // body is hydrated from index.html at boot
  },

  typography: {
    group: 'Foundations',
    top: 'Foundation',
    title: 'Typography',
    subtitle: SUBTITLE,
    stub: pending('Typography'),
  },

  colors: {
    group: 'Foundations',
    top: 'Foundation',
    title: 'Colors',
    subtitle: SUBTITLE,
    stub: pending('Colors'),
  },

  spacing: {
    group: 'Foundations',
    top: 'Foundation',
    title: 'Spacing',
    subtitle: 'The base unit, the scale, and the grid every layout on Shelf is built from.',
    // body sourced from node 31:18 ("foundations - spacing and shit") - the
    // scale and the phone layout grid read directly off that frame. The
    // Exceptions section documents a clarification given in conversation,
    // not something drawn in the frame itself: the "minimum use" annotation
    // there is not a spacing floor, it is about the margin's own tolerance.
    body: `
      <header class="doc__head">
        <div class="doc__titleblock">
          <p class="eyebrow">Foundations</p>
          <div class="doc__titles">
            <h1 class="doc__title">Spacing</h1>
            <p class="doc__subtitle">The base unit, the scale, and the grid every layout on Shelf is built from.</p>
          </div>
        </div>
        <div class="prose">
          <p>Every distance in Shelf — padding, gaps, margins, the space between an icon and its label — comes from one 4px unit. Eight steps cover it, and nothing should measure a value outside them.</p>
          <p>The scale, the phone layout grid, and its exceptions below come straight out of the Figma file’s spacing frame. Where it leaves something open, this page says so instead of inventing a number.</p>
        </div>
      </header>

      <section class="section" id="scale">
        <h2 class="section__title">The scale</h2>
        <div class="prose">
          <p>Six values are the default reach. Two of them, 16 and 24, are marked secondary in the file itself — kept in the scale for the case between tiers, never the first choice.</p>
        </div>
        <div class="scale">
          <div class="scale__item" data-tier="core"><span class="scale__swatch" style="--sw:4px"></span><span class="scale__label">4px</span></div>
          <div class="scale__item" data-tier="core"><span class="scale__swatch" style="--sw:8px"></span><span class="scale__label">8px</span></div>
          <div class="scale__item" data-tier="core"><span class="scale__swatch" style="--sw:12px"></span><span class="scale__label">12px</span></div>
          <div class="scale__item" data-tier="secondary"><span class="scale__swatch" style="--sw:16px"></span><span class="scale__label">16px</span></div>
          <div class="scale__item" data-tier="core"><span class="scale__swatch" style="--sw:20px"></span><span class="scale__label">20px</span></div>
          <div class="scale__item" data-tier="secondary"><span class="scale__swatch" style="--sw:24px"></span><span class="scale__label">24px</span></div>
          <div class="scale__item" data-tier="core"><span class="scale__swatch" style="--sw:28px"></span><span class="scale__label">28px</span></div>
          <div class="scale__item" data-tier="core"><span class="scale__swatch" style="--sw:32px"></span><span class="scale__label">32px</span></div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Token</th>
                <th scope="col">Value</th>
                <th scope="col">Tier</th>
                <th scope="col">Typical use</th>
              </tr>
            </thead>
            <tbody>
              <tr><td data-label="Token">--s-4</td><td data-label="Value">4px</td><td data-label="Tier"><span class="tag">Micro</span></td><td data-label="Typical use">Icon-to-label gap, tight inline spacing</td></tr>
              <tr><td data-label="Token">--s-8</td><td data-label="Value">8px</td><td data-label="Tier"><span class="tag">Micro</span></td><td data-label="Typical use">Chip and tag internal padding</td></tr>
              <tr><td data-label="Token">--s-12</td><td data-label="Value">12px</td><td data-label="Tier"><span class="tag">Micro</span></td><td data-label="Typical use">Dense list rows, the grid gutter (below)</td></tr>
              <tr><td data-label="Token">--s-16</td><td data-label="Value">16px</td><td data-label="Tier"><span class="tag tag--dim">Secondary</span></td><td data-label="Typical use">Rare in-between; reach for --s-12 or --s-20 first</td></tr>
              <tr><td data-label="Token">--s-20</td><td data-label="Value">20px</td><td data-label="Tier"><span class="tag">Layout</span></td><td data-label="Typical use">Default minimum gap between sections and components</td></tr>
              <tr><td data-label="Token">--s-24</td><td data-label="Value">24px</td><td data-label="Tier"><span class="tag tag--dim">Secondary</span></td><td data-label="Typical use">Reserved for the grid margin (below), not general spacing</td></tr>
              <tr><td data-label="Token">--s-28</td><td data-label="Value">28px</td><td data-label="Tier"><span class="tag">Layout</span></td><td data-label="Typical use">Generous component spacing</td></tr>
              <tr><td data-label="Token">--s-32</td><td data-label="Value">32px</td><td data-label="Tier"><span class="tag">Layout</span></td><td data-label="Typical use">Section-level spacing, page padding</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section" id="layout-grid">
        <h2 class="section__title">Layout grid</h2>
        <div class="prose">
          <p>The mobile layout runs a 4-column grid: 24px margins on each side, 12px gutters between columns, measured against the iPhone 16 &amp; 17 Pro’s 402×874pt viewport.</p>
        </div>
        <div class="grid-demo">
          <div class="grid-demo__margin"></div>
          <div class="grid-demo__col"></div>
          <div class="grid-demo__gutter"></div>
          <div class="grid-demo__col"></div>
          <div class="grid-demo__gutter"></div>
          <div class="grid-demo__col"></div>
          <div class="grid-demo__gutter"></div>
          <div class="grid-demo__col"></div>
          <div class="grid-demo__margin"></div>
        </div>
        <ul class="grid-demo__legend">
          <li><span class="grid-demo__swatch grid-demo__swatch--margin"></span>Margin — 24px</li>
          <li><span class="grid-demo__swatch grid-demo__swatch--col"></span>Column — ≈79.5pt</li>
          <li><span class="grid-demo__swatch grid-demo__swatch--gutter"></span>Gutter — 12px</li>
        </ul>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Property</th>
                <th scope="col">Value</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td data-label="Property">Margin</td><td data-label="Value">24px</td><td data-label="Notes">--grid-margin · same value as the secondary --s-24 token above · flexes 1–2px beside rounded elements, see Exceptions below</td></tr>
              <tr><td data-label="Property">Gutter</td><td data-label="Value">12px</td><td data-label="Notes">--grid-gutter · same value as --s-12</td></tr>
              <tr><td data-label="Property">Columns</td><td data-label="Value">4</td><td data-label="Notes">--grid-columns</td></tr>
              <tr><td data-label="Property">Column width</td><td data-label="Value">≈79.5pt</td><td data-label="Notes">Derived: (402 − 2×24 − 3×12) ÷ 4</td></tr>
              <tr><td data-label="Property">Reference viewport</td><td data-label="Value">402×874pt</td><td data-label="Notes">iPhone 16 &amp; 17 Pro logical size</td></tr>
            </tbody>
          </table>
        </div>
        <div class="prose">
          <p>Only this breakpoint is defined so far. Wider viewports — web, iPad — inherit the same margin/gutter/column relationship until the file specifies otherwise.</p>
        </div>
      </section>

      <section class="section" id="exceptions">
        <h2 class="section__title">Exceptions</h2>
        <div class="prose">
          <p>Not every margin lands on 24px exactly. Rounded elements — the search bar is the clearest case — sit slightly inside the token: 23px from the edge on each side, sometimes 22px. A rounded corner carries less visual weight than a sharp one, so a strict 24px gap next to it reads as too generous. Pulling it in a pixel or two makes it read as even.</p>
          <p>This is an accepted, deliberate exception — not a bug to fix and not a new token to add. It only applies where a rounded edge sits flush against the margin. Everything else still measures 24px on the nose.</p>
        </div>
        <div class="optical-demo">
          <div class="optical-demo__frame">
            <div class="optical-demo__guide"></div>
            <div class="optical-demo__guide optical-demo__guide--right"></div>
            <div class="optical-demo__pill"></div>
          </div>
          <ul class="optical-demo__legend">
            <li><span class="optical-demo__swatch"></span>24px — the margin token</li>
            <li><span class="optical-demo__swatch optical-demo__swatch--pill"></span>22–23px — effective gap beside a rounded element</li>
          </ul>
        </div>
        <div class="cards">
          <div class="card card--content">
            <div class="principle">
              <p class="principle__title">Reach for it</p>
              <hr class="principle__rule">
              <p class="principle__body">A rounded pill or button sits flush against the margin — the search bar, a floating action button, a heavily rounded card. Nudge it in a pixel or two until it looks even, never more.</p>
            </div>
          </div>
          <div class="card card--content">
            <div class="principle">
              <p class="principle__title">Don’t reach for it</p>
              <hr class="principle__rule">
              <p class="principle__body">Sharp-edged content — text, a table, a straight-edged card. These hold 24px exactly. If one needs nudging, the element is the problem, not the margin.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="in-code">
        <h2 class="section__title">In code</h2>
        <div class="prose">
          <p>Same tokens, two languages. Neither is the source of truth over the other — the scale above is.</p>
        </div>
        <div class="code-grid">
          <div class="code-panel">
            <p class="code-panel__label">CSS · assets/css/styles.css</p>
            <pre><code>--s-4:   4px;
--s-8:   8px;
--s-12: 12px;
--s-16: 16px;  <span class="tok-com">/* secondary */</span>
--s-20: 20px;
--s-24: 24px;  <span class="tok-com">/* secondary, = grid margin */</span>
--s-28: 28px;
--s-32: 32px;

--grid-margin:  24px;
--grid-gutter:  12px;
--grid-columns: 4;</code></pre>
          </div>
          <div class="code-panel">
            <p class="code-panel__label">Swift · Spacing.swift</p>
            <pre><code>enum Spacing {
    static let s4:  CGFloat = 4
    static let s8:  CGFloat = 8
    static let s12: CGFloat = 12
    static let s16: CGFloat = 16  <span class="tok-com">// secondary</span>
    static let s20: CGFloat = 20
    static let s24: CGFloat = 24  <span class="tok-com">// secondary</span>
    static let s28: CGFloat = 28
    static let s32: CGFloat = 32
}

enum Grid {
    static let margin: CGFloat = 24
    static let gutter: CGFloat = 12
    static let columns = 4
}</code></pre>
          </div>
        </div>
      </section>`,
  },

  radius: {
    group: 'Foundations',
    top: 'Foundation',
    title: 'Radius',
    subtitle: SUBTITLE,
    stub: pending('Radius'),
  },

  tokens: {
    group: 'Foundations',
    top: 'Foundation',
    title: 'Tokens',
    subtitle: SUBTITLE,
    stub: pending('Tokens'),
  },

  'coming-soon': {
    group: 'Actions',
    title: 'Coming soon',
    subtitle: SUBTITLE,
    stub: pending('Actions'),
  },

  'get-app': {
    group: 'Shelf',
    title: 'Get app',
    subtitle: SUBTITLE,
    stub: pending('Get app'),
  },
};

export const DEFAULT_PAGE = 'introduction';

/** Build the markup for a registry entry. */
export function renderPage(slug) {
  const page = PAGES[slug];
  if (!page) return null;
  if (page.body) return page.body;

  return `
    <header class="doc__head">
      <div class="doc__titleblock">
        <p class="eyebrow">${page.group}</p>
        <div class="doc__titles">
          <h1 class="doc__title">${page.title}</h1>
          <p class="doc__subtitle">${page.subtitle}</p>
        </div>
      </div>
      <div class="prose"><p class="stub">${page.stub}</p></div>
    </header>`;
}
