import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Deployed to GitHub Pages as a project site, which serves from
 * https://<user>.github.io/bstomberg/ rather than from a domain root. Every
 * asset URL, every prerendered file, and every internal link is built against
 * this one value, so pointing the site at a custom domain later is a one-line
 * change here (or `BASE_PATH=/` in the environment).
 */
const base = process.env.BASE_PATH ?? '/bstomberg/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
