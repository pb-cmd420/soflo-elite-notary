/**
 * form.js — secure booking intake.
 *
 * Layered protection:
 *   1. Honeypot field (company_website) — silently drops bots.
 *   2. Time-trap — rejects sub-human submissions.
 *   3. Per-field validation + sanitization (see security.js).
 *   4. Client-side rate limiting (cooldown via localStorage).
 *   5. Resilient submit — POSTs JSON to a configurable same-origin endpoint,
 *      and falls back to a prefilled mailto: draft so a lead is never lost.
 *
 * The server endpoint MUST re-validate, re-sanitize, and enforce its own
 * rate limiting + origin checks. Client checks are UX + first-line defense.
 */
import { validateField } from './security.js';

const RATE_LIMIT_MS = 60_000;
const MIN_FILL_MS = 3000;
const STORAGE_KEY = 'soflo_last_submit';
const DEFAULT_LABEL = 'Request Secure Appointment';

const FIELD_NAMES = [
  'full_name',
  'email',
  'phone',
  'service_type',
  'preferred_datetime',
  'location',
  'details',
  'consent',
];

function readEnv(key, fallback) {
  try {
    const env = import.meta.env;
    if (env && env[key]) return String(env[key]);
  } catch (_) {
    /* import.meta.env unavailable — use fallback */
  }
  return fallback;
}

const getEndpoint = () => readEnv('VITE_API_ENDPOINT', '/api/booking');
const getContactEmail = () => readEnv('VITE_CONTACT_EMAIL', 'SOFLOELITENOTARY@proton.me');

/** Pick a string by the page's current language (set by the i18n module). */
function t(en, es) {
  return (document.documentElement.lang || '').toLowerCase().startsWith('es') ? es : en;
}

export function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');
  const submitBtn = form.querySelector('[data-submit]');
  const submitLabel = form.querySelector('[data-submit-label]');
  const renderedAt = Date.now();

  // Wire the thank-you modal's dismiss controls once.
  const modal = document.getElementById('thankyou-modal');
  if (modal) {
    const closeBtn = modal.querySelector('[data-thankyou-close]');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close(); // click on backdrop
    });
  }

  // Clear a field's error state as the user corrects it.
  FIELD_NAMES.forEach((name) => {
    const input = form.elements[name];
    if (!input) return;
    const evt = input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(evt, () => clearFieldError(form, name));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus(statusEl, '', '');

    // 1. Honeypot — accept-and-ignore so the bot believes it succeeded.
    const honey = form.elements.company_website;
    if (honey && honey.value.trim() !== '') {
      fakeSuccess(form, statusEl);
      return;
    }

    // 2. Time-trap — no human fills this form in under MIN_FILL_MS.
    if (Date.now() - renderedAt < MIN_FILL_MS) {
      fakeSuccess(form, statusEl);
      return;
    }

    // 3. Client-side rate limit.
    const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (last && Date.now() - last < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - (Date.now() - last)) / 1000);
      setStatus(
        statusEl,
        'error',
        t(`Please wait ${wait}s before sending another request.`, `Espere ${wait}s antes de enviar otra solicitud.`),
      );
      return;
    }

    // 4. Validate + sanitize every field.
    const data = {};
    const invalid = [];
    for (const name of FIELD_NAMES) {
      const input = form.elements[name];
      if (!input) continue;
      const raw = input.type === 'checkbox' ? input.checked : input.value;
      const result = validateField(name, raw);
      if (!result.valid) {
        invalid.push(name);
        showFieldError(form, name, result.message);
      } else {
        clearFieldError(form, name);
        data[name] = result.clean;
      }
    }

    if (invalid.length) {
      const s = invalid.length > 1 ? 's' : '';
      setStatus(
        statusEl,
        'error',
        t(
          `Please review the ${invalid.length} highlighted field${s}.`,
          `Revise ${invalid.length} campo${s} resaltado${s}.`,
        ),
      );
      focusField(form, invalid[0]);
      return;
    }

    // 5. Submit.
    setLoading(submitBtn, submitLabel, true);
    const payload = {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      service_type: data.service_type,
      preferred_datetime: data.preferred_datetime || '',
      location: data.location,
      details: data.details || '',
      _meta: {
        submitted_at: new Date().toISOString(),
        elapsed_ms: Date.now() - renderedAt,
        source: 'sofloelitenotary.com/v3',
      },
    };

    try {
      const encoded = new URLSearchParams({
        'form-name': 'booking-form',
        full_name: payload.full_name,
        email: payload.email,
        phone: payload.phone,
        service_type: payload.service_type,
        preferred_datetime: payload.preferred_datetime,
        location: payload.location,
        details: payload.details,
      });
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
      clearAllErrors(form);
      form.reset();
      setStatus(
        statusEl,
        'success',
        t(
          'Thank you — your request was received. We will confirm your appointment and quote shortly, typically the same day.',
          'Gracias — recibimos su solicitud. Confirmaremos su cita y cotización en breve, normalmente el mismo día.',
        ),
      );
      showThankYouModal();
    } catch (_) {
      // Resilient fallback: never lose the lead.
      const mailto = buildMailto(getContactEmail(), data);
      setStatusWithLink(
        statusEl,
        'error',
        t('We could not reach the booking service just now. ', 'No pudimos contactar el servicio de reservas en este momento. '),
        { label: t('Email your request instead →', 'Envíe su solicitud por correo →'), href: mailto },
      );
    } finally {
      setLoading(submitBtn, submitLabel, false);
    }
  });
}

// --- DOM helpers (all text via textContent — never innerHTML) -------------

function errorEl(form, name) {
  return form.querySelector(`[data-error-for="${name}"]`);
}

function showFieldError(form, name, message) {
  const input = form.elements[name];
  const el = errorEl(form, name);
  if (input && input.setAttribute) input.setAttribute('aria-invalid', 'true');
  if (el) {
    el.textContent = message;
    el.hidden = false;
  }
}

function clearFieldError(form, name) {
  const input = form.elements[name];
  const el = errorEl(form, name);
  if (input && input.removeAttribute) input.removeAttribute('aria-invalid');
  if (el) {
    el.textContent = '';
    el.hidden = true;
  }
}

function clearAllErrors(form) {
  FIELD_NAMES.forEach((name) => clearFieldError(form, name));
}

function focusField(form, name) {
  const input = form.elements[name];
  if (input && typeof input.focus === 'function') input.focus();
}

function setStatus(el, kind, message) {
  if (!el) return;
  el.className = 'form-status' + (kind ? ` is-${kind}` : '');
  el.textContent = message || '';
}

function setStatusWithLink(el, kind, message, link) {
  if (!el) return;
  el.className = 'form-status' + (kind ? ` is-${kind}` : '');
  el.textContent = message || '';
  if (link && link.href) {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    a.className = 'link-gold-inline';
    el.appendChild(a);
  }
}

function setLoading(btn, label, loading) {
  if (!btn) return;
  btn.disabled = loading;
  btn.setAttribute('aria-busy', loading ? 'true' : 'false');
  if (label) label.textContent = loading ? t('Sending…', 'Enviando…') : t(DEFAULT_LABEL, 'Solicitar Cita Segura');
}

function fakeSuccess(form, statusEl) {
  clearAllErrors(form);
  form.reset();
  setStatus(
    statusEl,
    'success',
    t(
      'Thank you — your request was received. We will be in touch shortly.',
      'Gracias — recibimos su solicitud. Nos pondremos en contacto en breve.',
    ),
  );
  showThankYouModal();
}

// True when the page (or, if the page declares no language, the visitor's
// browser) is Spanish. Drives the "Gracias" vs "Thank you" copy.
function isSpanish() {
  const pageLang = (document.documentElement.lang || '').toLowerCase();
  if (pageLang.startsWith('es')) return true;
  if (pageLang.startsWith('en')) return false;
  return (navigator.language || '').toLowerCase().startsWith('es');
}

// Populate the modal with the right language and open it.
function showThankYouModal() {
  const modal = document.getElementById('thankyou-modal');
  if (!modal || typeof modal.showModal !== 'function') return;
  const lang = isSpanish() ? 'es' : 'en';
  modal.querySelectorAll(`[data-${lang}]`).forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text != null) el.textContent = text;
  });
  if (!modal.open) modal.showModal();
}

function buildMailto(email, data) {
  const lines = [
    'New booking request — SoFlo Elite Notary',
    '',
    `Name: ${data.full_name || ''}`,
    `Email: ${data.email || ''}`,
    `Phone: ${data.phone || ''}`,
    `Service: ${data.service_type || ''}`,
    `Preferred: ${data.preferred_datetime || 'Flexible'}`,
    `Location: ${data.location || ''}`,
    '',
    'Details:',
    data.details || '(none provided)',
  ];
  const subject = `Booking request — ${data.service_type || 'Mobile Notary'}`;
  const body = lines.join('\n');
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
