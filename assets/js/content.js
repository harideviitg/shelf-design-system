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

  installation: {
    group: 'Foundations',
    top: 'Foundation',
    title: 'Installation',
    subtitle: SUBTITLE,
    stub: pending('Installation'),
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

  'dark-theme': {
    group: 'Foundations',
    top: 'Foundation',
    // Label kept exactly as it reads in the file (node 1:88). It is a typo for
    // "Dark theme" - fix it in Figma and this follows.
    title: 'Cark theme',
    subtitle: SUBTITLE,
    stub: pending('Dark theme'),
  },

  spacing: {
    group: 'Foundations',
    top: 'Foundation',
    title: 'Spacing',
    subtitle: 'The base unit, the scale, and the grid every layout on Shelf is built from.',
    // body sourced from node 31:18 ("foundations - spacing and shit") - the
    // scale, the minimum-use annotation, and the phone layout grid all read
    // directly off that frame rather than measured off the screenshot.
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
          <p>The scale, the minimum-spacing rule, and the phone layout grid below come straight out of the Figma file’s spacing frame. Where it leaves something open, this page says so instead of inventing a number.</p>
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

      <section class="section" id="minimum-spacing">
        <h2 class="section__title">Minimum spacing</h2>
        <div class="prose">
          <p>The file marks 20px as the floor: the smallest gap you should reach for between two sections or components. 16 and 24 sit either side of it for exactly this reason — the scale wants you at 20 by default, not drifting a few pixels off it.</p>
        </div>
        <div class="scale-mini">
          <div class="scale-mini__row">
            <div class="scale__item" data-tier="secondary"><span class="scale__swatch" style="--sw:16px"></span><span class="scale__label">16px</span></div>
            <div class="scale__item" data-tier="core"><span class="scale__swatch" style="--sw:20px"></span><span class="scale__label">20px</span></div>
            <div class="scale__item" data-tier="secondary"><span class="scale__swatch" style="--sw:24px"></span><span class="scale__label">24px</span></div>
          </div>
          <div class="scale-mini__rule"></div>
          <div class="scale-mini__tick"></div>
          <p class="scale-mini__caption">Minimum use</p>
        </div>
        <div class="cards">
          <div class="card card--content">
            <div class="principle">
              <p class="principle__title">Below the floor: micro spacing</p>
              <hr class="principle__rule">
              <p class="principle__body">4, 8 and 12px. Inline only — the space inside a chip, between an icon and its label. Never the gap between two components.</p>
            </div>
          </div>
          <div class="card card--content">
            <div class="principle">
              <p class="principle__title">At the floor and above: layout spacing</p>
              <hr class="principle__rule">
              <p class="principle__body">20, 28 and 32px. For laying out sections, components and page padding. 20 is the default — climb the scale before reaching for a one-off value.</p>
            </div>
          </div>
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
              <tr><td data-label="Property">Margin</td><td data-label="Value">24px</td><td data-label="Notes">--grid-margin · same value as the secondary --s-24 token above</td></tr>
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
--s-20: 20px;  <span class="tok-com">/* minimum */</span>
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
    static let s20: CGFloat = 20  <span class="tok-com">// minimum</span>
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
