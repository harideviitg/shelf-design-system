/* =============================================================================
   app.js - routing, scroll-spy, scroll indicator, drawer.

   No dependencies. ~7 KB unminified. Everything animates off one easing family
   so the page decelerates as a single object:

     --ease-pin  cubic-bezier(0, .93, 0, 1)        sidebar hover  (pinned)
     --ease-1    cubic-bezier(.12, .86, .16, 1)    rail + indicator
     --ease-2    cubic-bezier(.22, .78, .24, 1)    drawer, page swap, scrolling
   ========================================================================== */

import { PAGES, DEFAULT_PAGE, renderPage } from './content.js';

/* Which scroller the drawn indicator (Figma node 1:42) reports on.
   'main'    - main-content scroll progress (default: it is the only region on
               the designed page that actually scrolls)
   'sidebar' - the sidebar's own scroll position */
const PROGRESS_TARGET = 'main';

/* Where in the viewport a section counts as "the one you are reading". */
const READ_LINE = 0.30;

/* Offset applied when scrolling to a section, so it is not flush to the edge. */
const ANCHOR_OFFSET = 28;

/* ---------------------------------------------------------------- helpers */

const q  = (sel, root = document) => root.querySelector(sel);
const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const drawerMQ     = matchMedia('(max-width: 899px)');

/** Evaluate a CSS cubic-bezier as a JS easing function. */
function bezier(x1, y1, x2, y2) {
  const A = (a, b) => 1 - 3 * b + 3 * a;
  const B = (a, b) => 3 * b - 6 * a;
  const C = (a) => 3 * a;
  const calc  = (t, a, b) => ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
  const slope = (t, a, b) => 3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);

  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const d = slope(t, x1, x2);
      if (Math.abs(d) < 1e-6) break;
      t -= (calc(t, x1, x2) - x) / d;
    }
    let lo = 0, hi = 1;
    t = Math.min(1, Math.max(0, t));
    for (let i = 0; i < 12 && Math.abs(calc(t, x1, x2) - x) > 1e-5; i++) {
      if (calc(t, x1, x2) < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return calc(t, y1, y2);
  };
}

const easeScroll = bezier(0.22, 0.78, 0.24, 1);   /* --ease-2 */

const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ------------------------------------------------------------------- refs */

const el = {
  sidebar:   q('#sidebar'),
  navItems:  qa('.sidenav__item'),
  main:      q('[data-role="scroller"]'),
  doc:       q('#doc'),
  rail:      q('.rail'),
  toc:       q('.toc'),
  progress:  q('[data-role="sidebar-progress"]'),
  thumb:     q('[data-role="sidebar-progress"] > i'),
  menuBtn:   q('.menu-btn'),
  scrim:     q('[data-role="scrim"]'),
  topLabel:  q('[data-role="group-label"]'),
  topLinks:  qa('.topnav__link'),
};

/* The designed page ships as real markup. Lift it into the registry so every
   route renders through the same path and nothing is duplicated. */
PAGES[DEFAULT_PAGE].body = el.doc.innerHTML;

const state = {
  slug: DEFAULT_PAGE,
  sections: [],
  tocItems: [],
  active: -1,
  /* Layout reads are cached here and refreshed only on measure(). Reading
     scrollHeight/clientHeight inside the scroll handler would force a synchronous
     layout on every frame. */
  m: { viewH: 0, range: 0, trackH: 0, pView: 0, pContent: 0, pRange: 0, pEl: null },
};

/* ------------------------------------------------------------- scroll-spy */

/** Cache each section's scrollTop-at-top.
    `.main` is position:relative, so it is the offsetParent and offsetTop is a
    pure layout value: unaffected by the current scroll position and by the
    entry animation's transform. It is exactly the scrollTop that puts the
    section flush with the top of the scroller. */
function measure() {
  state.sections = qa('.section[id]', el.doc).map((node) => ({
    id: node.id,
    top: node.offsetTop,
  }));

  const p = PROGRESS_TARGET === 'sidebar' ? el.sidebar : el.main;
  state.m = {
    viewH:    el.main.clientHeight,
    range:    Math.max(0, el.main.scrollHeight - el.main.clientHeight),
    trackH:   el.progress ? el.progress.clientHeight : 0,
    pView:    p.clientHeight,
    pContent: p.scrollHeight,
    pRange:   Math.max(0, p.scrollHeight - p.clientHeight),
    pEl:      p,
  };
}

function activeIndex() {
  const n = state.sections.length;
  if (!n) return -1;

  const { viewH, range } = state.m;
  const top = el.main.scrollTop;

  /* Bottomed out: the last section wins even if its top never crossed the
     read line. Without this the final entry can never become active. */
  if (range > 0 && top >= range - 2) return n - 1;

  const line = top + viewH * READ_LINE;
  let idx = 0;
  for (let i = 0; i < n; i++) if (state.sections[i].top <= line) idx = i;
  return idx;
}

/* Distance-based states, exactly as the file draws them (nodes 1:44-1:55):
   0 = reading it, 1 = next to it, 2+ = far away. */
function paintToc(idx) {
  if (idx === state.active) return;
  state.active = idx;
  state.tocItems.forEach((a, i) => {
    a.dataset.dist = String(Math.min(2, Math.abs(i - idx)));
    if (i === idx) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
}

/* ------------------------------------------------------- scroll indicator */

function paintProgress() {
  if (!el.progress) return;
  const { trackH, pView, pContent, pRange, pEl } = state.m;

  const live = pRange > 4 && trackH > 0;
  el.progress.classList.toggle('is-live', live);
  if (!live) return;

  const h = Math.max(28, Math.min(trackH, trackH * (pView / pContent)));
  const y = (trackH - h) * (pEl.scrollTop / pRange);
  el.thumb.style.height = `${h}px`;
  el.thumb.style.transform = `translate3d(0, ${y}px, 0)`;
}

/* -------------------------------------------------------------- the frame */

let frame = 0;

function update() {
  paintToc(activeIndex());
  paintProgress();
}

/* Coalesce scroll events to one paint per frame.
   The frame id is the latch, not a boolean: a background tab never runs its
   rAF callback, so a boolean set on the way in would stay set forever and the
   indicator would silently die after the first tab switch. Holding the id lets
   the visibilitychange handler below cancel it and start clean. */
function onScroll() {
  if (frame) return;
  frame = requestAnimationFrame(() => { frame = 0; update(); });
}

/* --------------------------------------------------------- smooth scroll  */

let raf = null;

function cancelScroll() {
  if (raf) { cancelAnimationFrame(raf); raf = null; }
}

function scrollToTop(top) {
  const max = el.main.scrollHeight - el.main.clientHeight;
  const to = Math.max(0, Math.min(max, top));
  const from = el.main.scrollTop;
  const delta = to - from;

  cancelScroll();
  if (Math.abs(delta) < 1) return;

  if (reduceMotion.matches) {
    el.main.scrollTop = to;
    update();
    return;
  }

  /* Distance-proportional, clamped, so short hops stay snappy and long ones
     do not feel like a drag race. */
  const dur = Math.min(720, Math.max(320, Math.abs(delta) * 0.45));
  const t0 = performance.now();

  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    el.main.scrollTop = from + delta * easeScroll(p);
    update();
    raf = p < 1 ? requestAnimationFrame(step) : null;
  };
  raf = requestAnimationFrame(step);
}

function scrollToSection(id) {
  const hit = state.sections.find((s) => s.id === id);
  if (!hit) return false;
  scrollToTop(hit.top - ANCHOR_OFFSET);
  return true;
}

/* --------------------------------------------------------------- the rail */

/** Rebuild "on this page" from whatever sections the current page has. */
function buildToc() {
  if (!el.toc) return;
  state.active = -1;

  if (!state.sections.length) {
    el.toc.hidden = true;
    el.toc.innerHTML = '';        /* do not leave the previous page's entries behind */
    state.tocItems = [];
    return;
  }

  el.toc.hidden = false;
  el.toc.innerHTML = state.sections.map(({ id }) => {
    const label = q(`#${CSS.escape(id)} .section__title`, el.doc)?.textContent ?? id;
    return `<a class="toc__item" href="#${escapeHtml(id)}" data-dist="2">` +
           `<span class="toc__label">${escapeHtml(label)}</span>` +
           `<i class="toc__dash"></i></a>`;
  }).join('');

  state.tocItems = qa('.toc__item', el.toc);
}

/* ------------------------------------------------------------------ pages */

function syncSidebar(slug) {
  el.navItems.forEach((a) => {
    const match = a.getAttribute('href') === `#/${slug}`;
    if (match) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  el.topLinks.forEach((a) => {
    a.classList.toggle('is-current', a.getAttribute('href') === `#/${slug}`);
  });
}

function restartAnimation(node) {
  if (reduceMotion.matches) return;
  node.style.animation = 'none';
  void node.offsetWidth;          /* force reflow so the animation re-runs */
  node.style.animation = '';
}

function setPage(slug, { rerender = true } = {}) {
  const page = PAGES[slug];
  if (!page) return false;

  if (rerender) {
    const html = renderPage(slug);
    if (html == null) return false;
    el.doc.innerHTML = html;
    restartAnimation(el.doc);
    el.main.scrollTop = 0;
  }

  state.slug = slug;
  document.title = `${page.title} - Bracket, the Shelf design system`;
  if (el.topLabel) el.topLabel.textContent = page.top ?? page.group;

  syncSidebar(slug);
  measure();
  buildToc();
  update();
  return true;
}

/* ----------------------------------------------------------------- router */

function parseHash() {
  const raw = decodeURIComponent(location.hash.slice(1));
  if (!raw) return { slug: null, anchor: null };
  if (raw.startsWith('/')) {
    const [slug, anchor] = raw.slice(1).split('#');
    return { slug: slug || DEFAULT_PAGE, anchor: anchor || null };
  }
  return { slug: null, anchor: raw };   /* bare "#principles" */
}

function route() {
  const { slug, anchor } = parseHash();
  const target = slug && PAGES[slug] ? slug : (slug ? DEFAULT_PAGE : state.slug);

  if (target !== state.slug) setPage(target);

  if (anchor) {
    /* If the anchor is not on this page, fall back to the page that has it. */
    if (!state.sections.some((s) => s.id === anchor) && target !== DEFAULT_PAGE) {
      setPage(DEFAULT_PAGE);
    }
    requestAnimationFrame(() => scrollToSection(anchor));
  }
}

/* ----------------------------------------------------------------- drawer */

let drawerReturn = null;
let scrimTimer = 0;

function setDrawer(open) {
  if (!el.sidebar || !el.menuBtn) return;

  el.menuBtn.setAttribute('aria-expanded', String(open));
  el.sidebar.classList.toggle('is-open', open);

  if (open) {
    drawerReturn = document.activeElement;
    clearTimeout(scrimTimer);
    el.scrim.hidden = false;
    void el.scrim.offsetWidth;      /* reflow gives the fade a start value.
                                       A rAF would work too, until the tab is
                                       backgrounded and the callback never runs. */
    el.scrim.classList.add('is-open');
    q('.sidenav__item', el.sidebar)?.focus({ preventScroll: true });
  } else {
    el.scrim.classList.remove('is-open');
    /* A timer, not transitionend: that event never fires if the fade is
       interrupted or the tab is backgrounded mid-close, which would strand a
       transparent full-shell overlay on top of the page. The CSS also drops
       pointer-events unless .is-open, so a stuck scrim still cannot eat clicks. */
    clearTimeout(scrimTimer);
    scrimTimer = setTimeout(() => { el.scrim.hidden = true; },
                            reduceMotion.matches ? 0 : 460);
    if (drawerReturn && document.contains(drawerReturn)) {
      drawerReturn.focus({ preventScroll: true });
    }
    drawerReturn = null;
  }
}

const drawerOpen = () => el.sidebar?.classList.contains('is-open') === true;

/* ------------------------------------------------------------------ wire  */

el.main.addEventListener('scroll', onScroll, { passive: true });

/* Any real user input outranks an in-flight programmatic scroll. */
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((evt) =>
  el.main.addEventListener(evt, cancelScroll, { passive: true }));

/* Rail clicks scroll, they do not jump. */
el.rail?.addEventListener('click', (e) => {
  const a = e.target.closest('.toc__item');
  if (!a) return;
  e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  if (scrollToSection(id)) {
    history.replaceState(null, '', `#/${state.slug}#${id}`);
  }
});

/* Top-bar anchors behave the same, and bounce to the page that owns them. */
document.querySelector('.topnav')?.addEventListener('click', (e) => {
  const a = e.target.closest('.topnav__link');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('#/')) return;                 /* page link: let it route */
  e.preventDefault();
  const id = href.slice(1);
  if (!state.sections.some((s) => s.id === id)) setPage(DEFAULT_PAGE);
  requestAnimationFrame(() => {
    if (scrollToSection(id)) history.replaceState(null, '', `#/${state.slug}#${id}`);
  });
});

/* Sidebar: block the dead entry, and close the drawer after a real pick. */
el.sidebar?.addEventListener('click', (e) => {
  const a = e.target.closest('.sidenav__item');
  if (!a) return;
  if (a.classList.contains('is-disabled')) { e.preventDefault(); return; }
  if (drawerOpen()) setDrawer(false);
});

el.menuBtn?.addEventListener('click', () => setDrawer(!drawerOpen()));
el.scrim?.addEventListener('click', () => setDrawer(false));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawerOpen()) { setDrawer(false); e.preventDefault(); }
});

drawerMQ.addEventListener('change', (e) => { if (!e.matches) setDrawer(false); });

window.addEventListener('hashchange', route);

/* Re-measure whenever the box changes underneath us: viewport resize, the doc
   growing, or the webfont landing and reflowing every paragraph. */
const remeasure = () => {
  if (frame) { cancelAnimationFrame(frame); frame = 0; }
  measure();
  state.active = -1;
  update();
};

window.addEventListener('resize', remeasure, { passive: true });

/* Coming back to a backgrounded tab: drop any rAF that was queued and never
   ran, then re-sync from scratch. */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') remeasure();
});

if (PROGRESS_TARGET === 'sidebar') {
  el.sidebar?.addEventListener('scroll', onScroll, { passive: true });
}
if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(el.doc);
document.fonts?.ready.then(remeasure);

/* ------------------------------------------------------------------ boot  */

setPage(DEFAULT_PAGE, { rerender: false });
route();
