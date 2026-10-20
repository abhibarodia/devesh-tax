/* ============================================================
   Navigation — mobile drawer, sticky app bar shadow
   ============================================================ */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('navDrawer');
    const backdrop = document.getElementById('navBackdrop');
    const openBtn = document.getElementById('openDrawer');
    const closeBtn = document.getElementById('closeDrawer');

    if (openBtn && drawer && backdrop) {
      const open = () => {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn?.focus();
      };
      const close = () => {
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        openBtn.focus();
      };

      openBtn.addEventListener('click', open);
      closeBtn?.addEventListener('click', close);
      backdrop.addEventListener('click', close);
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
      });
    }

    // Sticky app bar shadow on scroll
    const bar = document.querySelector('.app-bar');
    if (bar) {
      const onScroll = () => bar.classList.toggle('is-scrolled', window.scrollY > 4);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  });
})();