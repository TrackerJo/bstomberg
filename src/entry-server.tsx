/**
 * Build-time entry point. Never shipped to the browser.
 *
 * `scripts/prerender.mjs` imports this once per route and writes the result
 * into a real HTML file, so /research is a document on disk rather than a
 * client-side guess. It is the reason a pasted link, a refresh, a crawler, and
 * a Slack unfurl all see content.
 */

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { RouterProvider } from './router'
import App from './App'
import { documentTitle } from './meta'
import { notFoundMeta, pageMeta, site } from './content'

export { pageMeta, notFoundMeta, site }

export function render(path: string) {
  const html = renderToString(
    <StrictMode>
      <RouterProvider initialPath={path}>
        <App />
      </RouterProvider>
    </StrictMode>,
  )

  const meta = pageMeta[path] ?? notFoundMeta

  return { html, title: documentTitle(path), description: meta.description }
}
