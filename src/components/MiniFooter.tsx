import { social } from '../content'
import './MiniFooter.css'

/**
 * Home carries no <SiteFooter> (App.tsx withholds it to protect the
 * one-viewport composition), so the only way off the hero to anywhere but the
 * masthead nav is this ruled strip: the three places to follow, nothing else.
 */
export function MiniFooter() {
  return (
    <footer className="mini-footer">
      <div className="mini-footer__inner">
        <span className="label mini-footer__label">Follow</span>
        <ul className="mini-footer__list">
          {social.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
