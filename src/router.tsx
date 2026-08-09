/**
 * A five-page site does not need a routing library. This is the whole router:
 * History API + popstate, plus a Link that intercepts plain left-clicks and
 * otherwise behaves like the anchor it is (modifier-clicks, middle-clicks, and
 * "open in new tab" all still work).
 *
 * Every route is also prerendered to a real HTML file at build time, so a deep
 * link, a refresh, a crawler, and a link unfurl all get served content without
 * this router running at all. It takes over once React hydrates.
 *
 * The context and the useRouter hook live in ./router-context.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react'
import { RouterContext, useRouter } from './router-context'
import { toHref, toRoutePath } from './base-path'

export function RouterProvider({
  children,
  /** Supplied by the prerender build, where there is no `window`. */
  initialPath,
}: {
  children: ReactNode
  initialPath?: string
}) {
  const [path, setPath] = useState(
    () => initialPath ?? toRoutePath(window.location.pathname),
  )
  const [navCount, setNavCount] = useState(0)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const onPop = () => {
      setPath(toRoutePath(window.location.pathname))
      setNavCount((n) => n + 1)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    if (to === toRoutePath(window.location.pathname)) return
    window.history.pushState({}, '', toHref(to))
    setPath(to)
    setNavCount((n) => n + 1)
  }, [])

  // Land at the top of a new page, but never scroll on first paint.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [path])

  const value = useMemo(
    () => ({ path, navigate, navCount }),
    [path, navigate, navCount],
  )

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  )
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Link({ href, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter()
  const isInternal = href.startsWith('/')

  return (
    <a
      // Routes are authored root-relative; the deployed prefix is added here.
      href={isInternal ? toHref(href) : href}
      onClick={(event) => {
        onClick?.(event)
        if (!isInternal) return
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }
        event.preventDefault()
        navigate(href)
      }}
      {...rest}
    />
  )
}
