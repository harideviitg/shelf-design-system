/* =============================================================================
   fig-embed.js - the small "drag it, it snaps back" component preview used on
   component pages (currently just Button groups).

   Deliberately simple: a Preview/Code tab switch, and a canvas you can drag
   with damped movement that always relaxes back to center on release. There
   is nowhere to pan TO - it exists so the component feels touchable, not so
   people can lose it off-screen.

   Content is injected via innerHTML on every route change, so a <script> tag
   inside that markup would never run. This module is wired from app.js after
   each render instead, and is a no-op on any page without a fig-embed.
   ========================================================================== */

const DAMP = 0.35;              /* fraction of real pointer travel the stage actually moves */

function wire(embed) {
  if (embed.dataset.wired) return;
  embed.dataset.wired = 'true';

  const tabs = Array.from(embed.querySelectorAll('.fig-embed__tab'));
  const panels = Array.from(embed.querySelectorAll('[data-panel]'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
      panels.forEach((p) => { p.hidden = p.dataset.panel !== tab.dataset.tab; });
    });
  });

  /* Property control - a single "Property 1" select, Figma's instance-editor
     shape. Orthogonal to the tabs above: whichever value is picked shows up
     in both the preview stage and the code panel, whichever is visible. */
  const variantSelect = embed.querySelector('[data-variant-select]');
  const variantViews = Array.from(embed.querySelectorAll('[data-variant-view]'));
  if (variantSelect) {
    variantSelect.addEventListener('change', () => {
      variantViews.forEach((v) => { v.hidden = v.dataset.variantView !== variantSelect.value; });
    });
  }

  const canvas = embed.querySelector('.fig-embed__canvas');
  const stage = embed.querySelector('.fig-embed__stage');
  if (!canvas || !stage) return;

  let dragging = false;
  let startX = 0;
  let startY = 0;

  const place = (x, y) => { stage.style.transform = `translate(${x}px, ${y}px)`; };

  const release = () => {
    if (!dragging) return;
    dragging = false;
    stage.classList.add('is-returning');
    place(0, 0);
  };

  canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    stage.classList.remove('is-returning');
    startX = e.clientX;
    startY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    place((e.clientX - startX) * DAMP, (e.clientY - startY) * DAMP);
  });

  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('lostpointercapture', release);
}

/** Wire every fig-embed under `root` (defaults to the whole document). Safe
    to call after every page render - it skips anything already wired, and
    does nothing at all on a page with no fig-embed. */
export function initFigEmbeds(root = document) {
  root.querySelectorAll('[data-role="fig-embed"]').forEach(wire);
}
