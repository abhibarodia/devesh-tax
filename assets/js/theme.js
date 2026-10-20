/* ============================================================
   Theme — System / Light / Dark with persistence
   ============================================================ */
(function () {
  const KEY = 'dts-theme';
  const root = document.documentElement;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  function getStored() {
    try { return localStorage.getItem(KEY) || 'system'; } catch { return 'system'; }
  }

  function apply(value) {
    if (value === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', value);

    // Update meta theme-color for mobile browsers
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const isDark = value === 'dark' || (value === 'system' && mq.matches);
      meta.setAttribute('content', isDark ? '#0F1419' : '#FAF7F0');
    }

    // Update segmented control state
    document.querySelectorAll('.theme-toggle button').forEach(btn => {
      const active = btn.dataset.themeValue === value;
      btn.setAttribute('aria-pressed', String(active));
    });

    try { localStorage.setItem(KEY, value); } catch {}
  }

  // Initialise before first paint if possible
  apply(getStored());

  mq.addEventListener('change', () => {
    if (getStored() === 'system') apply('system');
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-toggle button').forEach(btn => {
      btn.addEventListener('click', () => apply(btn.dataset.themeValue));
    });
  });
})();