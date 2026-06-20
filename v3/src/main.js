/**
 * SoFlo Elite Notary — application entry.
 * Self-hosted fonts (bundled by Vite → CSP font-src 'self'), global styles,
 * then progressive-enhancement modules booted once the DOM is ready.
 */
import '@fontsource-variable/fraunces';
import '@fontsource-variable/manrope';
import './styles/main.css';

import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initBookingForm } from './modules/form.js';
import { initI18n } from './modules/i18n.js';

/** Run a callback as soon as the DOM is parsed. */
function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  }
}

onReady(() => {
  initI18n();
  initNav();
  initReveal();
  initBookingForm();
});
