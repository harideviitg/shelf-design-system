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
    subtitle: SUBTITLE,
    stub: pending('Spacing'),
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
