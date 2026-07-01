// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

const isProductionBuild = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://hartyshub.github.io',
  integrations: [
    react(),
    markdoc(),
    sitemap(),
    !isProductionBuild && keystatic(),
  ].filter(Boolean),
});
