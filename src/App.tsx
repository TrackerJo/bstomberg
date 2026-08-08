import { useEffect, useRef } from 'react'
import { Masthead } from './components/Masthead'
import { SiteFooter } from './components/SiteFooter'
import { Page } from './components/Page'
import { Home } from './pages/Home'
import { Research } from './pages/Research'
import { Podcast } from './pages/Podcast'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Link } from './router'
import { useRouter } from './router-context'
import { documentTitle, routeMeta } from './meta'
import './App.css'

const elements: Record<string, React.ReactElement> = {
  '/': <Home />,
  '/about': <About />,
  '/research': <Research />,
  '/podcast': <Podcast />,
  '/contact': <Contact />,
}

function NotFound() {
  return (
    <Page title="Page Not Found">
      <div className="row">
        <div className="row__gutter" />
        <div className="row__body" style={{ paddingBottom: 'var(--band)' }}>
          <p className="measure">
            That address does not exist on this site. Start from the{' '}
            <Link href="/">home page</Link>, or go straight to{' '}
            <Link href="/research">research and publications</Link>,{' '}
            <Link href="/podcast">the podcast</Link>, or{' '}
            <Link href="/contact">contact</Link>.
          </p>
        </div>
      </div>
    </Page>
  )
}

export default function App() {
  const { path, navCount } = useRouter()
  const element = elements[path]
  const isHome = path === '/'
  const mainRef = useRef<HTMLElement>(null)

  /**
   * A client-side route change swaps all of <main> while the browser leaves
   * focus on the link that was activated and tells assistive technology
   * nothing at all. The live region below carries the new page name, and
   * focus moves to <main> so the next Tab starts inside the new page.
   *
   * Derived, not stored: empty on first paint, which keeps the region silent
   * for the page the reader actually requested and keeps the server render
   * and the hydrated render identical.
   */
  const announcement =
    navCount === 0 ? '' : `${routeMeta(path).title ?? 'Home'}, page loaded`

  useEffect(() => {
    document.title = documentTitle(path)
  }, [path])

  useEffect(() => {
    if (navCount === 0) return
    mainRef.current?.focus()
  }, [path, navCount])

  return (
    <div className="shell" data-home={isHome || undefined}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Masthead />

      <main id="main" ref={mainRef} tabIndex={-1}>
        {element ?? <NotFound />}
      </main>

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {!isHome && <SiteFooter />}
    </div>
  )
}
