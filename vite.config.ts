import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Deployed to GitHub Pages behind the bstomberg.com custom domain (see
 * public/CNAME), which serves from the domain root, not a /bstomberg/
 * subpath. Every asset URL, every prerendered file, and every internal link
 * is built against this one value, so building for the old project-page URL
 * instead is a one-line change here (or `BASE_PATH=/bstomberg/` in the
 * environment).
 */
const base = process.env.BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
