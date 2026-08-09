/**
 * The site is served from a subdirectory on GitHub Pages
 * (https://<user>.github.io/bstomberg/), so a route path and a URL path are
 * not the same string. Routes are always written root-relative ("/research");
 * these two functions are the only places that know about the prefix.
 *
 * BASE_URL comes from vite.config.ts and always has a trailing slash.
 */
const PREFIX = import.meta.env.BASE_URL.replace(/\/+$/, '')

/** Route path to href: "/research" -> "/bstomberg/research" */
export function toHref(path: string) {
  return PREFIX + path
}

/** URL path to route path: "/bstomberg/research/" -> "/research" */
export function toRoutePath(pathname: string) {
  let p = pathname
  if (PREFIX && (p === PREFIX || p.startsWith(PREFIX + '/'))) {
    p = p.slice(PREFIX.length)
  }
  // GitHub Pages serves directory indexes with a trailing slash.
  p = p.replace(/\/+$/, '')
  return p === '' ? '/' : p
}
