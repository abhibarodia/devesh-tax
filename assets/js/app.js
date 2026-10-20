/* ============================================================
   App — placeholder injection, segmented switching, snackbar
   ============================================================ */
(function () {
  // ---- Placeholder injection ----
  function interpolate(str) {
    return str.replace(/\{\{(\w+)\}\}/g, (m, k) => (CONFIG[k] !== undefined ? CONFIG[k] : m));
  }

  function applyConfig() {
    // Text nodes
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(node => { node.nodeValue = interpolate(node.nodeValue); });

    // Attributes
    ['href', 'src', 'alt', 'title', 'aria-label', 'placeholder', 'content'].forEach(attr => {
      document.querySelectorAll(`[${attr}]`).forEach(el => {
        const v = el.getAttribute(attr);
        if (v && v.includes('{{')) el.setAttribute(attr, interpolate(v));
      });
    });

    // Hide optional external links if not configured
    if (!CONFIG.BOOKING_URL) document.querySelectorAll('[data-optional="booking"]').forEach(el => el.remove());
    if (!CONFIG.LINKEDIN_URL) document.querySelectorAll('[data-optional="linkedin"]').forEach(el => el.remove());
  }

  // ---- Segmented switching on submit.html ----
  function initFormSwitch() {
    const tabs = document.querySelectorAll('[data-form-tab]');
    if (!tabs.length) return;
    const panels = document.querySelectorAll('[data-form-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
        tab.setAttribute('aria-selected', 'true');
        panels.forEach(p => {
          p.hidden = p.dataset.formPanel !== tab.dataset.formTab;
        });
      });
    });
  }

  // ---- Form embeds ----
  function initFormEmbeds() {
    const map = [
      { iframe: 'newClientIframe', fallback: 'newClientFallback', url: CONFIG.NEW_CLIENT_FORM_EMBED },
      { iframe: 'returningClientIframe', fallback: 'returningClientFallback', url: CONFIG.RETURNING_CLIENT_FORM_EMBED }
    ];
    map.forEach(({ iframe, fallback, url }) => {
      const iframeEl = document.getElementById(iframe);
      const fallbackEl = document.getElementById(fallback);
      if (!iframeEl) return;
      const configured = url && !url.startsWith('YOUR_');
      if (configured) {
        iframeEl.src = url;
        iframeEl.style.display = 'block';
        if (fallbackEl) fallbackEl.style.display = 'none';
      } else {
        iframeEl.style.display = 'none';
        if (fallbackEl) fallbackEl.style.display = 'block';
      }
    });
  }

  // ---- Snackbar ----
  let snackbarTimer = null;
  function showSnackbar(message) {
    let el = document.getElementById('snackbar');
    if (!el) {
      el = document.createElement('div');
      el.id = 'snackbar';
      el.className = 'snackbar';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(snackbarTimer);
    snackbarTimer = setTimeout(() => el.classList.remove('is-visible'), 2600);
  }

  // ---- Copy-to-clipboard ----
  function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const value = btn.dataset.copy;
        try {
          await navigator.clipboard.writeText(value);
          showSnackbar('Copied: ' + value);
        } catch {
          showSnackbar('Copy failed — please copy manually.');
        }
      });
    });
  }

  // ---- Documents page: filter chips ----
  function initDocFilters() {
    const chips = document.querySelectorAll('[data-doc-filter]');
    if (!chips.length) return;
    const groups = document.querySelectorAll('[data-doc-group]');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        const filter = chip.dataset.docFilter;
        groups.forEach(g => {
          g.hidden = filter !== 'all' && g.dataset.docGroup !== filter;
        });
      });
    });
  }

  // ---- Page-aware init ----
  document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
    initFormSwitch();
    initFormEmbeds();
    initCopyButtons();
    initDocFilters();
  });

  // Expose for inline use
  window.dtsShowSnackbar = showSnackbar;
})();