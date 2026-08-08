import { notFoundMeta, pageMeta, site } from './content'

export function routeMeta(path: string) {
  return pageMeta[path] ?? notFoundMeta
}

/** Title as it appears in the browser tab. No em dashes anywhere in copy. */
export function documentTitle(path: string) {
  const meta = routeMeta(path)
  return meta.title ? `${meta.title} · ${site.name}` : site.name
}
