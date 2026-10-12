/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as { version: string }

export default defineConfig({
  define: { __APP_VERSION__: JSON.stringify(version) },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'robots.txt', 'llms.txt'],
      // Tout est statique : on garde aussi la police et les icônes pour un usage complet hors ligne.
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest}'] },
      manifest: {
        name: 'Stardew Helper',
        short_name: 'Stardew',
        lang: 'fr',
        description: 'Compagnon de jeu pour Stardew Valley 1.6',
        theme_color: '#7a4a21',
        background_color: '#f6ecd2',
        display: 'standalone',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
    }),
  ],
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
})
