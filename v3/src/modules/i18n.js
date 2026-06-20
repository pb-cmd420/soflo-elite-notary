/**
 * i18n.js — lightweight English/Spanish switcher for a static site.
 *
 * Convention: the HTML ships in English (good for SEO + no-JS). Spanish copy
 * lives alongside it in data-* attributes, and we swap it in on demand:
 *   data-es              → swap textContent (leaf text only)
 *   data-es-html         → swap innerHTML  (text that contains inline markup)
 *   data-es-placeholder  → swap the placeholder attribute
 *   data-es-aria         → swap the aria-label attribute
 *
 * The original English is captured lazily the first time we translate, so the
 * toggle is fully reversible. Choice persists in localStorage; first-time
 * visitors default to Spanish only if their browser is Spanish.
 */
const LANG_KEY = 'soflo_lang';

function getStoredLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch (_) {
    /* localStorage unavailable */
  }
  return null;
}

function detectInitialLang() {
  const saved = getStoredLang();
  if (saved) return saved;
  return (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
}

function persist(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (_) {
    /* ignore */
  }
}

/** Apply a language across the whole document. */
export function applyLang(lang) {
  const es = lang === 'es';
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-es]').forEach((el) => {
    if (el.dataset.i18nEn == null) el.dataset.i18nEn = el.textContent;
    el.textContent = es ? el.dataset.es : el.dataset.i18nEn;
  });

  document.querySelectorAll('[data-es-html]').forEach((el) => {
    if (el.dataset.i18nEnHtml == null) el.dataset.i18nEnHtml = el.innerHTML;
    el.innerHTML = es ? el.dataset.esHtml : el.dataset.i18nEnHtml;
  });

  document.querySelectorAll('[data-es-placeholder]').forEach((el) => {
    if (el.dataset.i18nEnPlaceholder == null) {
      el.dataset.i18nEnPlaceholder = el.getAttribute('placeholder') || '';
    }
    el.setAttribute('placeholder', es ? el.dataset.esPlaceholder : el.dataset.i18nEnPlaceholder);
  });

  document.querySelectorAll('[data-es-aria]').forEach((el) => {
    if (el.dataset.i18nEnAria == null) el.dataset.i18nEnAria = el.getAttribute('aria-label') || '';
    el.setAttribute('aria-label', es ? el.dataset.esAria : el.dataset.i18nEnAria);
  });

  // Reflect state on the toggle buttons.
  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    const active = btn.dataset.langBtn === lang;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

export function setLang(lang) {
  persist(lang);
  applyLang(lang);
}

export function initI18n() {
  applyLang(detectInitialLang());
  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.langBtn));
  });
}
