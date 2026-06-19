/**
 * nav.js — sticky header behavior, mobile menu, scroll-spy, back-to-top.
 * All progressive enhancement: the page is fully usable without it.
 */
export function initNav() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');
  const toTop = document.querySelector('[data-to-top]');
  const yearEl = document.querySelector('[data-year]');

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Sticky-nav contrast + back-to-top visibility.
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset || 0;
    if (nav) nav.classList.toggle('is-scrolled', y > 8);
    if (toTop) toTop.hidden = y < 600;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu open/close.
  const closeMenu = () => {
    if (!menu || !toggle) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };
  const openMenu = () => {
    if (!menu || !toggle) return;
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  };

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu();
      else openMenu();
    });
  }
  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  // Close the mobile menu when expanding to desktop.
  const desktop = window.matchMedia('(min-width: 1024px)');
  const handleBreakpoint = () => {
    if (desktop.matches) closeMenu();
  };
  if (typeof desktop.addEventListener === 'function') {
    desktop.addEventListener('change', handleBreakpoint);
  } else if (typeof desktop.addListener === 'function') {
    desktop.addListener(handleBreakpoint);
  }

  // Back to top.
  if (toTop) {
    toTop.addEventListener('click', () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  initScrollSpy();
}

/** Highlight the nav link for the section currently in view. */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const linkBySection = new Map();
  links.forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    const section = id && document.getElementById(id);
    if (section) linkBySection.set(section, link);
  });
  if (!linkBySection.size) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove('is-active'));
        const active = linkBySection.get(entry.target);
        if (active) active.classList.add('is-active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  );

  linkBySection.forEach((_, section) => observer.observe(section));
}
