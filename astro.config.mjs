// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

const isProductionBuild = process.env.NODE_ENV === 'production';
const reactDomClientShim = fileURLToPath(new URL('./src/shims/react-dom-client.js', import.meta.url));

export default defineConfig({
  site: 'https://hartyshub.github.io',
  vite: {
    resolve: {
      alias: {
        'react-dom/client': reactDomClientShim,
      },
    },
    optimizeDeps: {
      include: ['react-dom'],
    },
  },
  integrations: [
    react(),
    markdoc(),
    sitemap(),
    !isProductionBuild && keystatic(),
  ].filter(Boolean),
});
