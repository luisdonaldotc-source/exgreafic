// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio definitivo: definir SITE_URL al construir (ej. SITE_URL=https://www.midominio.mx npm run build).
const SITE_URL = process.env.SITE_URL ?? 'https://example.com';

// Páginas que existen pero no deben indexarse.
const NOINDEX = ['/aviso-de-privacidad/', '/creditos/'];

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX.some((path) => page.endsWith(path)),
      i18n: undefined,
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Satoshi',
      cssVariable: '--font-sans',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/satoshi-variable.woff2'], weight: '300 900', style: 'normal' }],
      },
    },
  ],
});
