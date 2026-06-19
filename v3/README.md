# SoFlo Elite Notary & Business Services — v3

A premium, high-conversion **hybrid multi-page** web app for **SoFlo Elite Notary &
Business Services LLC** — a high-end mobile notary led by a founder with a 19-year
banking background. A converting landing/home page plus dedicated, indexable pages
(Services, Fees, Service Areas, FAQ, About, Legal) for local SEO. Design language:
**"Private Banking Vault"** — deep charcoal, metallic gold, deep crimson, crisp
off-white, with the brand's gold notary seal.

> v3 is a standalone Vite build. The earlier static multi-page site is preserved
> as reference in `../v2`.

---

## Tech stack

| Concern        | Choice                                                        |
| -------------- | ------------------------------------------------------------- |
| Markup         | Semantic HTML5, single-page with anchor navigation            |
| Styling        | Tailwind CSS v3 (utility + `@layer` component classes)        |
| Behavior       | Vanilla ES2020 modules (no framework)                         |
| Build          | Vite 5 (bundling, minification, asset hashing)                |
| Fonts          | Self-hosted via `@fontsource-variable` (Fraunces + Manrope)   |
| Icons          | Inline SVG (no runtime icon dependency)                       |

## Quick start

```bash
npm install      # install dependencies
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally → http://localhost:4173
```

Node **18.18+** (20 recommended).

## Project structure

```
v3/
├─ index.html              # HOME (landing): hero, teasers → sub-pages, booking form
├─ services/index.html     # full document list (9 categories)
├─ fees/index.html         # full fee schedule
├─ service-areas/index.html# Miami-Dade & Broward city coverage
├─ faq/index.html          # full FAQ accordion
├─ about/index.html        # founder + credentials + mission
├─ legal/index.html        # Florida legal disclosures + privacy
├─ vite.config.js          # multi-page entries, Handlebars partials, build CSP
├─ tailwind.config.js      # brand tokens (colors, fonts, shadows, motion)
├─ postcss.config.js
├─ netlify.toml            # deploy config + baseline headers
├─ .env.example            # copy → .env (public-safe VITE_* only)
├─ public/
│  ├─ _headers             # AUTHORITATIVE security headers (incl. full CSP)
│  ├─ favicon.svg          # seal favicon
│  ├─ robots.txt, sitemap.xml
│  └─ founder.jpg, hero-logo.jpg, soflologo.jpg   # hero-logo.jpg = brand seal
└─ src/
   ├─ main.js              # entry: fonts + styles + module bootstrap
   ├─ partials/            # shared Handlebars partials (DRY across pages)
   │  ├─ head.hbs          #   <head>: per-page title/desc/canonical + JSON-LD
   │  ├─ header.hbs        #   nav (real-URL links + active state)
   │  └─ footer.hbs        #   footer, back-to-top, noscript
   ├─ styles/main.css      # Tailwind layers + component classes + atmosphere
   └─ modules/
      ├─ security.js       # validation + sanitization (XSS/injection defense)
      ├─ form.js           # secure booking intake (honeypot, rate-limit, submit)
      ├─ nav.js            # sticky nav, mobile menu, back-to-top
      └─ reveal.js         # scroll-reveal (reduced-motion aware)
```

Per-page SEO (title, description, canonical) lives in the `PAGES` map in
`vite.config.js`; add a page by creating `<name>/index.html`, adding it to
`rollupOptions.input`, and adding its metadata to `PAGES`.

## Design system

Brand tokens are defined once in `tailwind.config.js` and consumed as utilities:

- **Charcoal** `#1E1E1E` (base) · **Gold** `#B8963E` (primary accent) ·
  **Crimson** `#8B1A2B` (action/alert) · **Off-white** `#FCFAF7` (text).
- **Display** font: Fraunces (heritage serif). **Body/UI**: Manrope. **Figures**:
  system monospace with tabular numerals.
- Atmosphere: fixed grain overlay, gold radial vault glow, hairline gold rules,
  and an animated embossed seal.

## Security architecture (2026 hardening)

1. **Content-Security-Policy** — strict, restrictive policy.
   - Authoritative copy: real HTTP headers in `public/_headers`
     (`default-src 'self'`, no `unsafe-inline`/`unsafe-eval`, `frame-ancestors 'none'`,
     `object-src 'none'`, `upgrade-insecure-requests`, …).
   - Defense-in-depth: the same policy is injected as a `<meta>` tag into
     `dist/index.html` **at build time only** (see `vite.config.js`), so the Vite
     dev server's inline HMR is never broken.
   - The build emits **no inline scripts** (`modulePreload.polyfill` is off) and
     **no inline styles** (Tailwind compiles to an external stylesheet), so
     `script-src 'self'` and `style-src 'self'` hold without exceptions.
2. **Input validation & sanitization** (`security.js`) — strict per-field regex,
   service-type whitelist, control-character stripping, length caps, and HTML
   escaping. All DOM writes use `textContent` (never `innerHTML`).
3. **Bot protection** (`form.js`) — hidden honeypot field (`company_website`) plus
   a submission time-trap; both fail seamlessly for real users.
4. **Rate limiting** — client-side cooldown via `localStorage` (UX guard). The
   server endpoint must enforce its own authoritative rate limit.
5. **Transport & headers** — HSTS preload, `X-Content-Type-Options: nosniff`,
   `X-Frame-Options: DENY`, `Referrer-Policy`, restrictive `Permissions-Policy`,
   and cross-origin isolation headers.
6. **Secrets** — only `VITE_*` (public-safe) values reach the client. Real secrets
   live in the backend/serverless environment; `.env` is git-ignored.

### Booking endpoint contract (`/api/booking`)

The form POSTs JSON to `VITE_API_ENDPOINT` (default same-origin `/api/booking`).
If the request fails, it falls back to a prefilled `mailto:` draft so no lead is
lost. Implement the endpoint as a serverless function that:

- accepts `POST` `application/json` from an allowed origin only;
- **re-validates and re-sanitizes** every field server-side (never trust the client);
- enforces server-side rate limiting (e.g. by IP);
- delivers the lead (email/CRM) using secrets from the encrypted env store.

Expected payload:

```json
{
  "full_name": "string", "email": "string", "phone": "string",
  "service_type": "string", "preferred_datetime": "string",
  "location": "string", "details": "string",
  "_meta": { "submitted_at": "ISO", "elapsed_ms": 0, "source": "string" }
}
```

No backend yet? Either point the form at **Netlify Forms** / **Formspree**, or rely
on the built-in `mailto:` fallback.

## Accessibility (WCAG 2.2 AA)

Semantic landmarks, skip link, labeled inputs with `aria-invalid` / `aria-describedby`
and a polite live region for status, `aria-expanded` mobile menu, visible gold
focus rings, AA-compliant contrast, full keyboard operability, and a
`prefers-reduced-motion` path that disables all non-essential motion.

## Performance

Native lazy-loading + `decoding="async"` on non-hero imagery, explicit dimensions
to avoid layout shift, self-hosted subsetted fonts, tree-shaken modules, hashed
immutable assets, and zero third-party/tracking scripts.

## Deployment (Netlify)

1. Push this folder to a repo (or drag-and-drop the built `dist/`).
2. Build command `npm run build`, publish directory `dist` (already in `netlify.toml`).
3. Set environment variables from `.env.example` in the Netlify dashboard.
4. `public/_headers` ships the production security headers automatically.

Any static host works — serve `dist/` and replicate the headers from
`public/_headers`.

## Customization

- **Colors / fonts / motion** → `tailwind.config.js`.
- **Component look** (buttons, cards, fields, seal) → `src/styles/main.css`.
- **Copy / sections / services / fees** → `index.html` (kept in sync with the
  service `<select>` whitelist in `src/modules/security.js`).
- **Credentials** (commission #, expiry, bond, contact) → search `index.html`.
