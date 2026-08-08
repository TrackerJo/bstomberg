import { Link } from '../router'
import { useRouter } from '../router-context'
import { nav, site } from '../content'
import './Masthead.css'

export function Masthead() {
  const { path } = useRouter()

  return (
    <header className="masthead on-violet">
      <Link className="masthead__name" href="/">
        {site.name}
      </Link>

      <nav className="masthead__nav" aria-label="Primary">
        <ul>
          {nav.map((item) => {
            const current = item.href === path
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="masthead__link"
                  data-current={current || undefined}
                  aria-current={current ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
