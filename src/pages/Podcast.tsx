import { Page, RowHeader, Section, SectionBody } from '../components/Page'
import { T } from '../components/Text'
import { contact, episodes, podcast, press } from '../content'
import './Podcast.css'

function PlayGlyph() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 0 L10 6 L0 12 Z" fill="currentColor" />
    </svg>
  )
}

export function Podcast() {
  return (
    <Page title="Podcast &amp; Media">
      <Section title="The Show">
        <SectionBody>
          <div className="show">
            {/* Cover art is a real asset that does not exist yet. A marked,
                correctly-proportioned reservation is honest; a decorative
                gradient block pretending to be artwork is not. */}
            <div
              className="show__art"
              role="img"
              aria-label="Podcast cover art, not yet supplied"
            >
              <span className="label">[INSERT cover art]</span>
              <span className="label show__art-spec">1400 × 1400</span>
            </div>

            <div className="show__body">
              <h3 className="show__name">
                <T v={podcast.name} />
              </h3>
              <p className="show__tagline">
                <T v={podcast.tagline} />
              </p>
              <p className="show__description measure">
                <T v={podcast.description} />
              </p>
              <p className="entry__sub show__cohost">
                With <T v={podcast.cohost} />
              </p>

              <div className="button-row">
                <span className="label">Subscribe</span>
                <div className="link-cluster">
                  {podcast.subscribe.map((s) => (
                    <a key={s.label} href={s.href}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionBody>
      </Section>

      <Section title="Recent Episodes">
        <ul className="rows">
          <RowHeader cols={['Episode', 'Length', 'Listen']} />
          {episodes.map((ep, i) => (
            <li key={i}>
              <div className="entry">
                {/* Episode numbers are numerals, so they belong in the
                    numbered gutter rather than in a column of their own. */}
                <span className="label entry__gutter episode__n">
                  <T v={ep.number} />
                </span>

                <div>
                  <h3 className="entry__title">
                    <a href={ep.href}>
                      <T v={ep.title} />
                    </a>
                  </h3>
                  <p className="entry__sub episode__blurb">
                    <T v={ep.blurb} />
                  </p>
                </div>

                {/* Its own column, right-aligned, so durations stack on the
                    digit the way a ledger figure should. */}
                <p className="entry__sub entry__sub--track episode__duration tabular">
                  <T v={ep.duration} />
                </p>

                <div className="link-cluster entry__links">
                  <a className="episode__play" href={ep.href}>
                    <PlayGlyph />
                    <span>Listen</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Press &amp; Commentary">
        <ul className="rows">
          <RowHeader cols={['Coverage', 'Outlet', 'Date']} />
          {press.map((item, i) => (
            <li key={i}>
              <div className="entry">
                <div className="entry__gutter" />

                <h3 className="entry__title">
                  <a href={item.href}>
                    <T v={item.title} />
                  </a>
                </h3>

                <p className="entry__sub entry__sub--track press__outlet">
                  <T v={item.outlet} />
                </p>

                <p className="entry__sub entry__sub--track press__date">
                  <T v={item.meta} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Media Inquiries">
        <SectionBody>
          <p className="measure">
            <T v={contact.lede} />
          </p>
          <div className="button-row">
            <a
              className="field-button field-button--solid"
              href={contact.channels[0].href ?? '#'}
            >
              Email for Inquiries
            </a>
            {contact.downloads.map((d) => (
              <a key={d.label} className="field-button" href={d.href}>
                {d.label}
              </a>
            ))}
          </div>
        </SectionBody>
      </Section>
    </Page>
  )
}
