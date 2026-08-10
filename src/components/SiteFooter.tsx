import { Link } from '../router'
import { contact, footer, nav, podcast, site, social } from '../content'
import { T } from './Text'
import './SiteFooter.css'

/**
 * The last thing a reader sees, so it does more than restate the masthead.
 * The nav stays, because at the bottom of a long publication list it is the
 * only navigation in reach, but it is demoted next to the two things someone
 * leaving this page actually wants: a way to write to her, and the files.
 */
export function SiteFooter() {
  const reachable = contact.channels.filter((c) => c.href)

  return (
    <footer className="footer on-violet">
      <div className="footer__inner">
        <div className="footer__cell footer__cell--name">
          <p className="footer__name">{site.name}</p>
          <p className="footer__colophon label">
            <T v={footer.colophon} />
          </p>
        </div>

        <div className="footer__cell">
          <h2 className="label footer__label">Direct</h2>
          <ul className="footer__list">
            {reachable.map((channel) => (
              <li key={channel.label}>
                <a href={channel.href ?? '#'}>
                  {channel.label}
                  <span className="sr-only">
                    : <T v={channel.value} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__cell">
          <h2 className="label footer__label">Files &amp; Feeds</h2>
          <ul className="footer__list">
            {contact.downloads.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            {podcast.subscribe.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__cell">
          <h2 className="label footer__label">Social</h2>
          <ul className="footer__list">
            {social.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
