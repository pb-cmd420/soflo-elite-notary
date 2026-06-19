/**
 * security.js — client-side input validation & sanitization.
 *
 * Defense-in-depth: this is the FIRST line, never the last. The server must
 * re-validate and re-sanitize every field (never trust the client). These
 * helpers (a) block obviously malformed input early for good UX, and
 * (b) neutralize XSS/injection vectors before any value touches the DOM or is
 * serialized into a request/mailto link.
 */

/** Strict whitelist — must stay in sync with the <select> options in index.html. */
export const ALLOWED_SERVICES = Object.freeze([
  'Real Estate & Loan Signing',
  'Corporate & Business Documents',
  'Estate Planning & POA',
  'General Mobile Notary',
  'Wedding Officiant',
  'Other / Not Sure',
]);

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/** Escape HTML-significant characters. Use before inserting untrusted text anywhere. */
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"'`=/]/g, (ch) => HTML_ESCAPES[ch]);
}

/** True for characters we always strip: C0 controls (keep TAB/LF/CR), DEL, C1. */
function isStrippableControl(code) {
  if (code < 32) return code !== 9 && code !== 10 && code !== 13;
  return code === 127 || (code >= 128 && code <= 159);
}

/**
 * Normalize free text: strip control characters, collapse whitespace,
 * trim, and hard-cap length to defeat oversized-payload abuse.
 */
export function sanitizeText(value, { maxLength = 1000, singleLine = true } = {}) {
  const src = String(value ?? '');
  let stripped = '';
  for (let i = 0; i < src.length; i += 1) {
    if (!isStrippableControl(src.charCodeAt(i))) stripped += src[i];
  }
  let s = stripped.replace(/\r\n?/g, '\n');
  if (singleLine) {
    s = s.replace(/\s+/g, ' ');
  } else {
    s = s.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
  }
  s = s.trim();
  if (s.length > maxLength) s = s.slice(0, maxLength);
  return s;
}

/** Keep only digits and a leading +, for phone normalization. */
export function normalizePhone(value) {
  return String(value ?? '').replace(/[^\d+]/g, '');
}

/** Pretty-print a US 10-digit number as (XXX) XXX-XXXX; otherwise return input. */
export function formatPhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return value;
}

// --- Field patterns -------------------------------------------------------
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}'.\- ]{1,79}$/u;
const EMAIL_RE = /^[^\s@<>"]{1,64}@[^\s@<>"]{1,255}\.[^\s@<>".]{2,24}$/;
const LOCATION_RE = /^[\p{L}\p{N}][\p{L}\p{N}\s.,'#/\-]{1,119}$/u;

function isValidEmail(value) {
  const s = String(value ?? '');
  return s.length <= 120 && EMAIL_RE.test(s);
}

function isValidPhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

function isValidDateTime(value) {
  if (!value) return true; // optional
  const t = Date.parse(value);
  if (Number.isNaN(t)) return false;
  // Not more than 1 day in the past; not more than ~2 years out.
  const now = Date.now();
  return t >= now - 864e5 && t <= now + 1000 * 60 * 60 * 24 * 730;
}

/**
 * Validate + sanitize a single field.
 * @returns {{ valid: boolean, message: string, clean: string|boolean }}
 */
export function validateField(name, rawValue) {
  switch (name) {
    case 'full_name': {
      const clean = sanitizeText(rawValue, { maxLength: 80 });
      if (!clean) return { valid: false, message: 'Please enter your full name.', clean };
      if (!NAME_RE.test(clean)) {
        return { valid: false, message: 'Use letters, spaces, hyphens, or apostrophes only.', clean };
      }
      return { valid: true, message: '', clean };
    }
    case 'email': {
      const clean = sanitizeText(rawValue, { maxLength: 120 });
      if (!clean) return { valid: false, message: 'Please enter your email address.', clean };
      if (!isValidEmail(clean)) {
        return { valid: false, message: 'Enter a valid email, e.g. name@example.com.', clean };
      }
      return { valid: true, message: '', clean };
    }
    case 'phone': {
      const clean = sanitizeText(rawValue, { maxLength: 20 });
      if (!clean) return { valid: false, message: 'Please enter a phone number.', clean };
      if (!isValidPhone(clean)) {
        return { valid: false, message: 'Enter a valid 10-digit US phone number.', clean };
      }
      return { valid: true, message: '', clean: formatPhone(clean) };
    }
    case 'service_type': {
      const clean = sanitizeText(rawValue, { maxLength: 60 });
      if (!clean) return { valid: false, message: 'Please choose a service type.', clean };
      if (!ALLOWED_SERVICES.includes(clean)) {
        return { valid: false, message: 'Please choose a valid service from the list.', clean: '' };
      }
      return { valid: true, message: '', clean };
    }
    case 'location': {
      const clean = sanitizeText(rawValue, { maxLength: 120 });
      if (!clean) return { valid: false, message: 'Tell us the city or neighborhood.', clean };
      if (!LOCATION_RE.test(clean)) {
        return { valid: false, message: 'Enter a valid location (letters, numbers, basic punctuation).', clean };
      }
      return { valid: true, message: '', clean };
    }
    case 'preferred_datetime': {
      const clean = sanitizeText(rawValue, { maxLength: 40 });
      if (!isValidDateTime(clean)) {
        return { valid: false, message: 'Choose a valid upcoming date and time.', clean: '' };
      }
      return { valid: true, message: '', clean };
    }
    case 'details': {
      const clean = sanitizeText(rawValue, { maxLength: 1000, singleLine: false });
      return { valid: true, message: '', clean };
    }
    case 'consent': {
      const checked = rawValue === true || rawValue === 'on' || rawValue === 'true';
      if (!checked) {
        return { valid: false, message: 'Please provide consent so we can contact you.', clean: false };
      }
      return { valid: true, message: '', clean: true };
    }
    default:
      return { valid: true, message: '', clean: sanitizeText(rawValue, { maxLength: 500 }) };
  }
}
