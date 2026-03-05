import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Stripped-down vite config for Rabbit R1 — no Sentry, no PWA, no devtools
export default defineConfig({
  plugins: [
    solid({ ssr: false }),
  ],
  base: './',
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
})
