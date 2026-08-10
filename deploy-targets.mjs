/**
 * The two places this site gets built for: the custom domain (root-served)
 * and the GitHub Pages project URL (served from a /bstomberg/ subpath).
 * `DEPLOY_TARGET` is the one switch that picks between them; vite.config.ts
 * and scripts/prerender.mjs both read it through this file, so a build's
 * base path and its absolute site origin can never point at different
 * targets by accident.
 *
 * BASE_PATH and SITE_URL still work as direct overrides underneath this, for
 * a one-off build that doesn't match either named target.
 */
export const DEPLOY_TARGETS = {
  custom: {
    base: '/',
    siteUrl: 'https://bstomberg.com',
  },
  github: {
    base: '/bstomberg/',
    siteUrl: 'https://trackerjo.github.io',
  },
}

export function resolveDeployTarget(name = process.env.DEPLOY_TARGET) {
  const key = name ?? 'custom'
  const target = DEPLOY_TARGETS[key]
  if (!target) {
    const known = Object.keys(DEPLOY_TARGETS).join(', ')
    throw new Error(`Unknown DEPLOY_TARGET "${key}". Expected one of: ${known}`)
  }
  return target
}
