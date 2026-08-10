/**
 * Normally served from the domain root (bstomberg.com), where a route path
 * and a URL path are the same string and PREFIX is "". A build made with
 * `BASE_PATH=/bstomberg/` (the old GitHub project-page URL) instead serves
 * from a subdirectory, so route paths and URL paths diverge; these two
 * functions are the only places that know about that prefix.
 *
 * BASE_URL comes from vite.config.ts and always has a trailing slash.
 */
const PREFIX = import.meta.env.BASE_URL.replace(/\/+$/, '')

/** Route path to href: "/research" -> PREFIX + "/research" */
export function toHref(path: string) {
  return PREFIX + path
}

/** URL path to route path: PREFIX + "/research/" -> "/research" */
export function toRoutePath(pathname: string) {
  let p = pathname
  if (PREFIX && (p === PREFIX || p.startsWith(PREFIX + '/'))) {
    p = p.slice(PREFIX.length)
  }
  // GitHub Pages serves directory indexes with a trailing slash.
  p = p.replace(/\/+$/, '')
  return p === '' ? '/' : p
}
