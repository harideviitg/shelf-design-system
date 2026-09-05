/* =============================================================================
   search.js - the top bar search.

   The index is built from the page registry itself, so it never drifts from
   what the site actually contains: every page becomes one entry, every
   `.section[id]` inside a page becomes another, and the prose is folded into
   the page entry's haystack so body text is findable without producing a
   second result for the same page.

   Call initSearch() only AFTER content.js has its Introduction body attached,
   or that page's sections and prose will be missing from the index.
   ========================================================================== */

import { PAGES, renderPage } from './content.js';

const IS_APPLE = /Mac|iPhone|iPad|iPod/i.test(
  navigator.userAgentData?.platform || navigator.platform || navigator.userAgent
);

/* Cmd on Apple hardware, Ctrl everywhere else. */
const SHORTCUT = IS_APPLE ? '⌘K' : 'Ctrl K';

const MAX_HITS = 8;

const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ------------------------------------------------------------------ index */

function buildIndex() {
  const items = [];
  const parser = new DOMParser();

  for (const [slug, page] of Object.entries(PAGES)) {
    const doc = parser.parseFromString(renderPage(slug) || '', 'text/html');

    const prose = [...doc.querySelectorAll('.prose p, .doc__subtitle')]
      .map((n) => n.textContent)
      .join(' ');

    items.push({
      hash: `#/${slug}`,
      title: page.title,
      context: page.group,
      haystack: `${page.title} ${page.group} ${prose}`.toLowerCase(),
    });

    doc.querySelectorAll('.section[id]').forEach((sec) => {
      const title = sec.querySelector('.section__title')?.textContent.trim();
      if (!title) return;
      items.push({
        hash: `#/${slug}#${sec.id}`,
        title,
        context: page.title,
        haystack: `${title} ${page.title}`.toLowerCase(),
      });
    });
  }
  return items;
}

/* ----------------------------------------------------------------- query  */

/* Every whitespace-separated token must appear somewhere in the entry, then
   the ranking is decided by how well the *title* matches - a body-text hit
   should never outrank a page whose name you typed. */
function query(index, raw) {
  const q = raw.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/);

  return index
    .reduce((hits, item) => {
      if (!tokens.every((t) => item.haystack.includes(t))) return hits;

      const title = item.title.toLowerCase();
      let score = 10;                       /* matched on body text only */
      if (title.includes(q)) score = 60;
      if (title.startsWith(q)) score = 80;
      if (title === q) score = 100;
      score -= item.title.length * 0.1;     /* prefer the tighter title */

      hits.push({ ...item, score });
      return hits;
    }, [])
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_HITS);
}

function highlight(text, raw) {
  const q = raw.trim();
  if (!q) return escapeHtml(text);
  const at = text.toLowerCase().indexOf(q.toLowerCase());
  if (at < 0) return escapeHtml(text);
  return escapeHtml(text.slice(0, at)) +
         '<mark>' + escapeHtml(text.slice(at, at + q.length)) + '</mark>' +
         escapeHtml(text.slice(at + q.length));
}

/* -------------------------------------------------------------------- ui  */

export function initSearch() {
  const root  = document.querySelector('[data-role="search"]');
  const input = document.querySelector('[data-role="search-input"]');
  const panel = document.querySelector('[data-role="search-panel"]');
  const kbd   = document.querySelector('[data-role="search-kbd"]');
  if (!root || !input || !panel) return;

  if (kbd) kbd.textContent = SHORTCUT;
  input.setAttribute('aria-keyshortcuts', IS_APPLE ? 'Meta+K' : 'Control+K');

  const index = buildIndex();
  let hits = [];
  let active = -1;

  const close = () => {
    panel.hidden = true;
    panel.innerHTML = '';
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    hits = [];
    active = -1;
  };

  const paintActive = () => {
    [...panel.children].forEach((el, i) => {
      el.setAttribute('aria-selected', String(i === active));
    });
    if (active >= 0) {
      const el = panel.children[active];
      input.setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  };

  const render = () => {
    const raw = input.value;
    hits = query(index, raw);

    if (!raw.trim()) return close();

    panel.innerHTML = hits.length
      ? hits.map((h, i) =>
          `<a class="search__hit" id="search-hit-${i}" role="option" aria-selected="false" href="${escapeHtml(h.hash)}">` +
          `<span class="search__hit-title">${highlight(h.title, raw)}</span>` +
          `<span class="search__hit-context">${escapeHtml(h.context)}</span></a>`
        ).join('')
      : `<p class="search__empty">No matches for &ldquo;${escapeHtml(raw.trim())}&rdquo;</p>`;

    panel.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    active = hits.length ? 0 : -1;
    paintActive();
  };

  const go = (hit) => {
    if (!hit) return;
    close();
    input.value = '';
    input.blur();
    /* Assigning an identical hash fires no hashchange, so nudge the router. */
    if (location.hash === hit.hash) dispatchEvent(new HashChangeEvent('hashchange'));
    else location.hash = hit.hash;
  };

  input.addEventListener('input', render);
  input.addEventListener('focus', () => { if (input.value.trim()) render(); });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (panel.hidden) input.blur(); else close();
      e.preventDefault();
      return;
    }
    if (!hits.length) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      active = (active + step + hits.length) % hits.length;
      paintActive();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(hits[active] ?? hits[0]);
    }
  });

  panel.addEventListener('click', (e) => {
    const el = e.target.closest('.search__hit');
    if (!el) return;
    e.preventDefault();
    go(hits[[...panel.children].indexOf(el)]);
  });

  panel.addEventListener('pointermove', (e) => {
    const el = e.target.closest('.search__hit');
    if (!el) return;
    const i = [...panel.children].indexOf(el);
    if (i !== active) { active = i; paintActive(); }
  });

  /* Cmd/Ctrl+K from anywhere, and "/" when you are not already typing. */
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;

    if (key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      input.focus();
      input.select();
    } else if (key === '/' && !typing) {
      e.preventDefault();
      input.focus();
    }
  });

  document.addEventListener('pointerdown', (e) => {
    if (!panel.hidden && !root.contains(e.target) && !panel.contains(e.target)) close();
  });
}
