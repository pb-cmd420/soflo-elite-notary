import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import handlebars from 'vite-plugin-handlebars';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://sofloelitenotary.com';

/**
 * Per-page SEO metadata + nav active-state key, injected into the shared
 * head/header partials by vite-plugin-handlebars.
 */
const PAGES = {
  '/index.html': {
    page: 'home',
    title: 'SoFlo Elite Notary & Business Services LLC | Mobile Notary — Miami-Dade & Broward',
    description:
      'Banking-grade mobile notary for South Florida, led by a 19-year banking veteran. Real estate & loan signings, corporate documents, estate planning, and general notarization. We come to you across Miami-Dade & Broward.',
    canonical: SITE + '/',
  },
  '/services/index.html': {
    page: 'services',
    title: 'Notary Services in South Florida | Real Estate, Estate, Business | SoFlo Elite Notary',
    description:
      'The full list of documents we notarize across Miami-Dade & Broward: real estate & loan signings, estate planning & POA, corporate, vehicle titles, healthcare, international and more.',
    canonical: SITE + '/services/',
  },
  '/fees/index.html': {
    page: 'fees',
    title: 'Notary Fees & Mobile Travel Pricing | SoFlo Elite Notary (South Florida)',
    description:
      'Transparent, Florida-compliant notary fees: $10 per notarial act, mobile travel by distance zone, traffic multiplier, after-hours and weekend rates — quoted before your appointment.',
    canonical: SITE + '/fees/',
  },
  '/service-areas/index.html': {
    page: 'areas',
    title: 'Mobile Notary Service Area | Miami-Dade & Broward | SoFlo Elite Notary',
    description:
      'We travel to you across Miami-Dade and Broward — Miami, Coral Gables, Doral, Hialeah, Fort Lauderdale, Hollywood, Pembroke Pines and more. See our full South Florida coverage.',
    canonical: SITE + '/service-areas/',
  },
  '/faq/index.html': {
    page: 'faq',
    title: 'Mobile Notary FAQ | South Florida | SoFlo Elite Notary',
    description:
      'Answers on notary cost, what to bring, real estate closings, wedding ceremonies, hours, apostilles, vehicle titles, and scheduling across Miami-Dade & Broward.',
    canonical: SITE + '/faq/',
  },
  '/about/index.html': {
    page: 'about',
    title: 'About & Founder — Pedro “Pete” Quintero | SoFlo Elite Notary',
    description:
      'Meet founder Pedro “Pete” Quintero — 19+ years in banking and 7+ years a Florida notary. The banking-grade standard behind SoFlo Elite Notary & Business Services LLC.',
    canonical: SITE + '/about/',
  },
  '/legal/index.html': {
    page: 'legal',
    title: 'Legal & Disclosures | SoFlo Elite Notary (Florida)',
    description:
      'Florida notary disclosures: non-attorney notice, fees under Chapter 117, identification requirements, privacy notice, and commission information.',
    canonical: SITE + '/legal/',
  },
};

/** Strict production CSP — injected as <meta> at build time only (keeps dev HMR working). */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

function cspMetaPlugin() {
  return {
    name: 'inject-csp-meta',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(/<head>/i, `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`);
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        const key = '/' + String(pagePath).replace(/^[/\\]+/, '').replace(/\\/g, '/');
        return PAGES[key] ?? {};
      },
      helpers: {
        eq: (a, b) => a === b,
      },
    }),
    cspMetaPlugin(),
  ],
  server: { port: 5173, open: true },
  preview: { port: 4173 },
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: false,
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services/index.html'),
        fees: resolve(__dirname, 'fees/index.html'),
        areas: resolve(__dirname, 'service-areas/index.html'),
        faq: resolve(__dirname, 'faq/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        legal: resolve(__dirname, 'legal/index.html'),
      },
    },
  },
});
