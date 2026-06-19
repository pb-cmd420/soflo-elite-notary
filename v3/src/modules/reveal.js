/**
 * reveal.js — staggered scroll-reveal for [data-reveal] elements.
 * Honors prefers-reduced-motion and degrades gracefully without IO support.
 */
export function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );

  items.forEach((el) => observer.observe(el));
}
