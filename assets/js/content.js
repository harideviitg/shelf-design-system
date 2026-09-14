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
    title: 'Colors and shadows',
    subtitle: 'The palette, the whites, and the shadows a card is allowed to carry.',
    // body sourced from node 34:79 ("some more docs guidelines") - a scratch
    // sheet of swatches and designer notes, not a polished palette frame.
    // Fills are read off each rectangle; the notes are quoted close to verbatim
    // rather than smoothed into something more official than the file is.
    body: `
      <header class="doc__head">
        <div class="doc__titleblock">
          <p class="eyebrow">Foundations</p>
          <div class="doc__titles">
            <h1 class="doc__title">Colors and shadows</h1>
            <p class="doc__subtitle">The palette, the whites, and the shadows a card is allowed to carry.</p>
          </div>
        </div>
        <div class="prose">
          <p>This page comes from a scratch sheet in the Figma file, <code>&quot;some more docs guidelines&quot;</code>, rather than a finished palette frame. It reads more like sticky notes than a spec: a handful of swatches, a few call-outs about when a shadow does or doesn't apply. That is reflected here as-is, not tidied into something the file doesn't actually claim.</p>
        </div>
      </header>

      <section class="section" id="palette">
        <h2 class="section__title">Palette</h2>
        <div class="prose">
          <p>Five swatches, each labelled the way the file labels them, including &quot;primary color actually&quot;, which reads like a correction mid-thought more than a token name.</p>
        </div>
        <div class="sampleset">
          <div class="sample">
            <span class="sample__box" style="background:#000000"></span>
            <span class="sample__label">Almost text colors</span>
            <span class="sample__value">#000000</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:#5f5f5f"></span>
            <span class="sample__label">Primary color actually</span>
            <span class="sample__value">#5f5f5f</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:#efefef; box-shadow: inset 0 0 0 1px #cccccc"></span>
            <span class="sample__label">Empty state color</span>
            <span class="sample__value">#efefef</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:#808080"></span>
            <span class="sample__label">Secondary color</span>
            <span class="sample__value">#808080</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:#cfcfcf"></span>
            <span class="sample__label">Secondary color</span>
            <span class="sample__value">#cfcfcf</span>
          </div>
        </div>
      </section>

      <section class="section" id="types-of-white">
        <h2 class="section__title">Types of white</h2>
        <div class="prose">
          <p>&quot;These things will be used according to the type of card we are showcasing&quot;: the file doesn't say which white goes with which card, only that the choice is deliberate per-card, not one white used everywhere. The note beside it: &quot;some buttons may or maynot have shadows at all.&quot;</p>
        </div>
        <div class="sampleset">
          <div class="sample">
            <span class="sample__box" style="background:#f6f6f6"></span>
            <span class="sample__value">#f6f6f6</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:#fafafa"></span>
            <span class="sample__value">#fafafa</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:#fbfbfb"></span>
            <span class="sample__value">#fbfbfb</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:#ffffff"></span>
            <span class="sample__value">#ffffff</span>
          </div>
        </div>
      </section>

      <section class="section" id="shadows">
        <h2 class="section__title">Shadows</h2>
        <div class="prose">
          <p>Four named presets sit in the file's shadow sheet, each a five-layer drop shadow. &quot;Far&quot; vs &quot;close&quot; is how far the shadow throws; &quot;subtle&quot; vs &quot;harsh&quot; is how dark it gets. The file's own caveat: &quot;if you are unable to replicate this shadow in web, just put the image properly.&quot; These four reproduce cleanly in CSS, so that fallback isn't needed here.</p>
        </div>
        <div class="cards">
          <div class="card" style="box-shadow:0 26px 57px 0 rgba(0,0,0,0.05),0 103px 103px 0 rgba(0,0,0,0.04),0 233px 140px 0 rgba(0,0,0,0.03),0 414px 166px 0 rgba(0,0,0,0.01)"></div>
          <div class="card" style="box-shadow:0 3px 6px 0 rgba(0,0,0,0.04),0 11px 11px 0 rgba(0,0,0,0.03),0 25px 15px 0 rgba(0,0,0,0.02),0 45px 18px 0 rgba(0,0,0,0.01)"></div>
          <div class="card" style="box-shadow:0 2px 4px 0 rgba(0,0,0,0.01),0 8px 8px 0 rgba(0,0,0,0.01),0 17px 10px 0 rgba(0,0,0,0.01)"></div>
          <div class="card" style="box-shadow:0 1px 2px 0 rgba(0,0,0,0.05),0 3px 3px 0 rgba(0,0,0,0.04),0 7px 4px 0 rgba(0,0,0,0.03),0 13px 5px 0 rgba(0,0,0,0.01)"></div>
        </div>
        <ul class="grid-demo__legend">
          <li><span class="tag">Far subtle</span></li>
          <li><span class="tag">Far harsh</span></li>
          <li><span class="tag">Close subtle</span></li>
          <li><span class="tag">Close harsh</span></li>
        </ul>
      </section>

      <section class="section" id="materials">
        <h2 class="section__title">Materials: blur</h2>
        <div class="prose">
          <p>&quot;Shaders: the bottom part where the navdock exists, is blurred and paled out.&quot; The file asked directly for this to be shown rather than described: &quot;I need an image like this also in the site documentation so that people can see about the blur.&quot;</p>
        </div>
        <div class="table-wrap">
          <table class="data-table data-table--media">
            <thead>
              <tr>
                <th scope="col">Reference</th>
                <th scope="col">What it shows</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Reference"><img class="thumb" src="assets/img/navdock-blur.png" alt="Shelf app navigation dock over blurred, paled-out content" width="402" height="245"></td>
                <td data-label="What it shows">The nav dock sits over a frosted, dimmed version of the content behind it, not a flat opaque bar. Everything below the dock stays legible in outline, just paled and softened, so the dock always reads as floating above the page rather than cut into it.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>`,
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
    title: 'Radius and strokes',
    subtitle: 'Stroke widths and corner radii, straight off the same scratch sheet as Colors.',
    // body sourced from node 34:79 ("some more docs guidelines"), the same
    // scratch sheet as the Colors page. "60% apple" is the file's own
    // shorthand and is quoted rather than reinterpreted - it isn't spelled
    // out what the 60% or "apple" refer to.
    body: `
      <header class="doc__head">
        <div class="doc__titleblock">
          <p class="eyebrow">Foundations</p>
          <div class="doc__titles">
            <h1 class="doc__title">Radius and strokes</h1>
            <p class="doc__subtitle">Stroke widths and corner radii, straight off the same scratch sheet as Colors.</p>
          </div>
        </div>
        <div class="prose">
          <p>Same source as the <a href="#/colors">Colors</a> page: the file's &quot;some more docs guidelines&quot; sheet, not a dedicated radius frame. Two groups sit side by side there — stroking and radius — and are kept side by side here.</p>
        </div>
      </header>

      <section class="section" id="stroking">
        <h2 class="section__title">Stroking</h2>
        <div class="prose">
          <p>Two widths, and the file is specific about when each applies.</p>
        </div>
        <div class="sampleset">
          <div class="sample">
            <span class="sample__box" style="background:#ffffff; box-shadow: inset 0 0 0 1px #cfcfcf"></span>
            <span class="sample__label">1px stroke</span>
            <span class="sample__value">very common</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:repeating-conic-gradient(#e9e9e9 0% 25%, #ffffff 0% 50%) 0 0 / 12px 12px; box-shadow: inset 0 0 0 2px #cfcfcf"></span>
            <span class="sample__label">2px stroke</span>
            <span class="sample__value">for media only</span>
          </div>
        </div>
      </section>

      <section class="section" id="radius">
        <h2 class="section__title">Radius</h2>
        <div class="prose">
          <p>Three values, each annotated &quot;60% apple&quot; in the file. That phrase is carried over verbatim rather than guessed at — it isn't defined elsewhere in the file whether it means an opacity, a platform reference, or something else.</p>
        </div>
        <div class="sampleset">
          <div class="sample">
            <span class="sample__box" style="background:#5f5f5f; border-radius:16px 0 0 0"></span>
            <span class="sample__label">16px</span>
            <span class="sample__value">&quot;60% apple&quot;</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:#d9d9d9; border-radius:999px"></span>
            <span class="sample__label">999px</span>
            <span class="sample__value">&quot;60% apple&quot;</span>
          </div>
          <div class="sample">
            <span class="sample__box" style="background:#d9d9d9; border-radius:8px; height:32px"></span>
            <span class="sample__label">8px</span>
            <span class="sample__value">&quot;60% apple&quot;</span>
          </div>
        </div>
      </section>`,
  },

  tokens: {
    group: 'Foundations',
    top: 'Foundation',
    title: 'Tokens',
    subtitle: SUBTITLE,
    stub: pending('Tokens'),
  },

  'button-groups': {
    group: 'Components',
    top: 'Component',
    title: 'Button groups',
    subtitle: 'A live, draggable reference for the button-group component, exactly as the file draws it.',
    // body sourced from node 83:354 ("button-group"), a 3-variant component
    // set keyed on "Property 1". Colors/radius/shadows below are the file's
    // own literal values, not this site's tokens: each is a picture of the
    // real iOS component, so none of them shift with light or dark mode.
    // Re-fetched after the variants were renamed in the file - this is a
    // snapshot, not a live connection, see the prose below.
    body: `
      <header class="doc__head">
        <div class="doc__titleblock">
          <p class="eyebrow">Components</p>
          <div class="doc__titles">
            <h1 class="doc__title">Button groups</h1>
            <p class="doc__subtitle">A live, draggable reference for the button-group component, exactly as the file draws it.</p>
          </div>
        </div>
        <div class="prose">
          <p>The file's <code>button-group</code> component has three variants, switched below by whatever their &quot;Property 1&quot; value is named at the time this page was last pulled from the file: a pill button with a fixed 43px icon button beside it, two pills in a row, and two pills in a column.</p>
          <p>Colors, radius and shadows are the file's literal values, not this site's own tokens: this is a picture of the iOS component, not a restyled copy of it, so it doesn't shift with light or dark mode and it doesn't react to a mouse the way a web button would. Drag the canvas if you like, it always drifts back to center - there's only one thing to look at, so there's nowhere to lose it.</p>
          <p>This is a snapshot, not a live embed: it was pulled from the file once and hand-turned into the HTML/CSS below. Renaming a variant, recoloring a fill, resizing a frame - none of that reaches this page on its own. Someone has to come back and re-pull it, the way this update just did after the variants got renamed.</p>
        </div>
      </header>

      <section class="section" id="button-group">
        <h2 class="section__title">Button group</h2>
        <div class="fig-embed" data-role="fig-embed">
          <div class="fig-embed__toolbar">
            <div class="fig-embed__tabs" role="tablist" aria-label="Button group preview">
              <button class="fig-embed__tab" type="button" role="tab" id="bg-tab-preview" aria-controls="bg-panel-preview" data-tab="preview" aria-selected="true">Preview</button>
              <button class="fig-embed__tab" type="button" role="tab" id="bg-tab-code" aria-controls="bg-panel-code" data-tab="code" aria-selected="false">Code</button>
            </div>
            <label class="fig-embed__property">
              <span class="fig-embed__property-label">Property 1</span>
              <select class="fig-embed__property-select" data-variant-select>
                <option value="combo">button icon-button combo</option>
                <option value="horizontal">horizontal stack</option>
                <option value="vertical">vertical stack</option>
              </select>
            </label>
          </div>
          <div class="fig-embed__canvas" id="bg-panel-preview" role="tabpanel" aria-labelledby="bg-tab-preview" data-panel="preview">
            <div class="fig-embed__stage">
              <div class="btn-group" data-variant-view="combo" aria-hidden="true">
                <span class="btn-group__pill btn-group__pill--neutral">Button</span>
                <span class="btn-group__icon"><img src="assets/img/icon-hex-gear.svg" alt="" width="24" height="24"></span>
              </div>
              <div class="btn-group" data-variant-view="horizontal" hidden aria-hidden="true">
                <span class="btn-group__pill btn-group__pill--dark">Button</span>
                <span class="btn-group__pill btn-group__pill--light">Button</span>
              </div>
              <div class="btn-group btn-group--col" data-variant-view="vertical" hidden aria-hidden="true">
                <span class="btn-group__pill btn-group__pill--dark">Button</span>
                <span class="btn-group__pill btn-group__pill--light">Button</span>
              </div>
            </div>
          </div>
          <div class="fig-embed__code" id="bg-panel-code" role="tabpanel" aria-labelledby="bg-tab-code" data-panel="code" hidden>
            <pre data-variant-view="combo"><code>HStack(spacing: 8) {
    Button("Button") {}
        .font(.system(size: 17))
        .foregroundColor(.black)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color(hex: "FBFBFB"))
        .clipShape(Capsule())
        .overlay(Capsule().stroke(.white, lineWidth: 1))
        .shadow(color: .black.opacity(0.05), radius: 28.5, y: 26)
        .shadow(color: .black.opacity(0.04), radius: 51.5, y: 103)
        .shadow(color: .black.opacity(0.03), radius: 70,   y: 233)
        .shadow(color: .black.opacity(0.01), radius: 83,   y: 414)

    Button {} label: {
        Image(systemName: "hexagon")
            .overlay(
                Circle().stroke(.black, lineWidth: 1.5).frame(width: 9, height: 9)
            )
    }
    .frame(width: 43, height: 43)
    .background(Color(hex: "FBFBFB"))
    .clipShape(Circle())
    .overlay(Circle().stroke(.white, lineWidth: 1))
    .shadow(color: .black.opacity(0.078), radius: 14.7, y: 8)
    .shadow(color: .black.opacity(0.031), radius: 21.5, y: 71)
    .shadow(color: .black.opacity(0.012), radius: 25,   y: 126)
}
.frame(width: 220)</code></pre>
            <pre data-variant-view="horizontal" hidden><code>HStack(spacing: 8) {
    Button("Button") {}
        .font(.system(size: 17, weight: .medium))
        .foregroundColor(.white)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color.black)
        .clipShape(Capsule())
        .overlay(Capsule().stroke(.white, lineWidth: 1))
        .shadow(color: .black.opacity(0.05), radius: 28.5, y: 26)
        .shadow(color: .black.opacity(0.04), radius: 51.5, y: 103)
        .shadow(color: .black.opacity(0.03), radius: 70,   y: 233)
        .shadow(color: .black.opacity(0.01), radius: 83,   y: 414)

    Button("Button") {}
        .font(.system(size: 17))
        .foregroundColor(.black)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color(hex: "EFEFEF"))
        .clipShape(Capsule())
        .overlay(Capsule().stroke(Color(hex: "CFCFCF"), lineWidth: 1))
        .shadow(color: .black.opacity(0.05), radius: 28.5, y: 26)
        .shadow(color: .black.opacity(0.04), radius: 51.5, y: 103)
        .shadow(color: .black.opacity(0.03), radius: 70,   y: 233)
        .shadow(color: .black.opacity(0.01), radius: 83,   y: 414)
}
.frame(width: 220)</code></pre>
            <pre data-variant-view="vertical" hidden><code>VStack(alignment: .leading, spacing: 8) {
    Button("Button") {}
        .font(.system(size: 17, weight: .medium))
        .foregroundColor(.white)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color.black)
        .clipShape(Capsule())
        .overlay(Capsule().stroke(.white, lineWidth: 1))
        .shadow(color: .black.opacity(0.05), radius: 28.5, y: 26)
        .shadow(color: .black.opacity(0.04), radius: 51.5, y: 103)
        .shadow(color: .black.opacity(0.03), radius: 70,   y: 233)
        .shadow(color: .black.opacity(0.01), radius: 83,   y: 414)

    Button("Button") {}
        .font(.system(size: 17))
        .foregroundColor(.black)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color(hex: "EFEFEF"))
        .clipShape(Capsule())
        .overlay(Capsule().stroke(Color(hex: "CFCFCF"), lineWidth: 1))
        .shadow(color: .black.opacity(0.05), radius: 28.5, y: 26)
        .shadow(color: .black.opacity(0.04), radius: 51.5, y: 103)
        .shadow(color: .black.opacity(0.03), radius: 70,   y: 233)
        .shadow(color: .black.opacity(0.01), radius: 83,   y: 414)
}
.frame(width: 220)</code></pre>
          </div>
        </div>
        <div class="prose">
          <p>The pill shadow throughout is the same &quot;far subtle&quot; preset documented on <a class="text-link" href="#/colors#shadows">Colors and shadows</a>. The combo variant's icon button is the one exception: its own tighter stack, four layers instead of five, thrown a shorter distance.</p>
        </div>
      </section>`,
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
