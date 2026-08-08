/**
 * Turns the SPA build into real HTML files.
 *
 * `vite build` alone ships `<div id="root"></div>`, which means a deep link or
 * a refresh on /research depends entirely on the host having a rewrite rule,
 * a crawler sees an empty page, and a link unfurl has nothing to show. This
 * writes one document per route instead, so /research is a file on disk.
 *
 *   dist/index.html          -> /
 *   dist/about/index.html    -> /about
 *   dist/research/index.html -> /research
 *   dist/podcast/index.html  -> /podcast
 *   dist/contact/index.html  -> /contact
 *   dist/404.html            -> anything else, served with a real 404 status
 *
 * React still hydrates on top and takes over navigation from there.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const { render, pageMeta, notFoundMeta, site } = await import(
  path.join(root, 'dist-ssr', 'entry-server.js')
)

// Trailing slashes here would produce "https://example.com//about".
const origin = (process.env.SITE_URL ?? site.url ?? '').replace(/\/+$/, '')
const absolute = (p) => (origin ? origin + p : p)

const OG_IMAGE = '/social-card.jpg'

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

/**
 * The client build and the SSR build hash assets independently, so the `src`
 * the server render produces can name a file that only exists in dist-ssr.
 * Everything downstream uses the client build's filename, which is the one
 * actually deployed.
 */
async function findClientPortrait() {
  const files = await fs.readdir(path.join(dist, 'assets'))
  return files.find((f) => /^bridget-stomberg-.*\.jpe?g$/.test(f)) ?? null
}

const clientPortrait = await findClientPortrait()

function fixAssetUrls(html) {
  if (!clientPortrait) return html
  return html.replace(
    /\/assets\/bridget-stomberg-[^"']*\.jpe?g/g,
    `/assets/${clientPortrait}`,
  )
}

/** The portrait doubles as the social card. Copied out so its URL is stable. */
async function writeSocialCard() {
  if (!clientPortrait) {
    console.warn('  ! portrait asset not found, skipping social card')
    return false
  }
  await fs.copyFile(
    path.join(dist, 'assets', clientPortrait),
    path.join(dist, OG_IMAGE),
  )
  return true
}

function escapeAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function socialTags({ title, description, url, hasImage }) {
  const tags = [
    ['og:type', 'website'],
    ['og:site_name', site.name],
    ['og:title', title],
    ['og:description', description],
    ['og:locale', 'en_US'],
  ]
  if (url) tags.push(['og:url', url])
  if (hasImage) {
    tags.push(['og:image', absolute(OG_IMAGE)])
    tags.push([
      'og:image:alt',
      'Bridget Stomberg, arms folded, in a lavender herringbone blazer against a window wall of daylight.',
    ])
  }

  const og = tags
    .map((t) => `    <meta property="${t[0]}" content="${escapeAttr(t[1])}" />`)
    .join('\n')

  const twitter = [
    ['twitter:card', hasImage ? 'summary_large_image' : 'summary'],
    ['twitter:title', title],
    ['twitter:description', description],
  ]
    .map((t) => `    <meta name="${t[0]}" content="${escapeAttr(t[1])}" />`)
    .join('\n')

  return `${og}\n${twitter}\n`
}

function buildDocument({ appHtml, title, description, routePath, hasImage }) {
  const url = origin && routePath ? absolute(routePath) : ''

  let out = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeAttr(description)}" />`,
    )

  const head = socialTags({ title, description, url, hasImage })
  const canonical = url
    ? `    <link rel="canonical" href="${escapeAttr(url)}" />\n`
    : ''

  out = out.replace('</head>', `${head}${canonical}  </head>`)
  out = out.replace(
    '<div id="root"></div>',
    `<div id="root">${fixAssetUrls(appHtml)}</div>`,
  )

  if (out.includes('<div id="root"></div>')) {
    throw new Error('prerender: failed to inject markup into #root')
  }
  return out
}

async function writeRoute(routePath, outFile, meta) {
  const { html, title, description } = render(routePath)
  const document = buildDocument({
    appHtml: html,
    title,
    description: meta.description,
    routePath,
    hasImage,
  })
  const target = path.join(dist, outFile)
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.writeFile(target, document, 'utf8')
  console.log(`  ${routePath.padEnd(10)} -> dist/${outFile}`)
}

const hasImage = await writeSocialCard()

console.log('prerendering:')
for (const [routePath, meta] of Object.entries(pageMeta)) {
  const outFile =
    routePath === '/' ? 'index.html' : `${routePath.slice(1)}/index.html`
  await writeRoute(routePath, outFile, meta)
}

// Unmatched paths. Netlify and most static hosts serve this with a real 404
// status, which the old client-side-only 404 could never do.
{
  const missPath = '/404'
  const { html } = render(missPath)
  const title = `${notFoundMeta.title} · ${site.name}`
  const document = buildDocument({
    appHtml: html,
    title,
    description: notFoundMeta.description,
    routePath: '',
    hasImage,
  })
  await fs.writeFile(path.join(dist, '404.html'), document, 'utf8')
  console.log(`  ${'404'.padEnd(10)} -> dist/404.html`)
}

if (!origin) {
  console.log(
    '\n  note: social-card URLs are root-relative. Set SITE_URL, or fill\n' +
      '  site.url in src/content.ts, to emit absolute URLs and a canonical link.',
  )
}
