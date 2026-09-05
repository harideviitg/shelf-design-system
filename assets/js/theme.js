/* Light/dark toggle - top bar, rightmost group.
   The actual theme is already set pre-paint by the inline script in
   index.html <head>; this just wires the button and persists changes. */

const root = document.documentElement;
const btn = document.querySelector('[data-role="theme-toggle"]');

function apply(theme) {
  root.dataset.theme = theme;
  btn?.setAttribute('aria-pressed', String(theme === 'dark'));
  btn?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

apply(root.dataset.theme || 'light');

btn?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  apply(next);
  try { localStorage.setItem('bracket-theme', next); } catch (e) {}
});
