import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolveDeployTarget } from './deploy-targets.mjs'

/**
 * Deployed to GitHub Pages, normally behind the bstomberg.com custom domain
 * (see public/CNAME), which serves from the domain root rather than a
 * /bstomberg/ subpath. Every asset URL, every prerendered file, and every
 * internal link is built against this one value.
 *
 * `npm run build:github` flips this (and the site origin used for canonical
 * URLs) to the old https://trackerjo.github.io/bstomberg/ project-page URL in
 * one step — see deploy-targets.mjs. BASE_PATH still works as a direct
 * override for a one-off build that doesn't match either named target.
 */
const base = process.env.BASE_PATH ?? resolveDeployTarget().base

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
