import { Page, RowHeader, Section } from '../components/Page'
import { T } from '../components/Text'
import {
  publications,
  research,
  workingPapers,
  type Publication,
} from '../content'

/**
 * One ruled row across the page columns: an empty gutter cell, the title and
 * its journal, the details track, and the links track. The title is a link to
 * the primary destination, because that is what everyone reaches for first;
 * the cluster stays visible beside it so a peer hunting a specific format
 * never has to hover or expand anything.
 */
function Entry({ item }: { item: Publication }) {
  const primary = item.links[0]

  return (
    <li>
      <div className="entry">
        <div className="entry__gutter" />

        <div>
          <h3 className="entry__title">
            {primary ? (
              <a href={primary.href}>
                <T v={item.title} />
              </a>
            ) : (
              <T v={item.title} />
            )}
          </h3>
          <p className="entry__meta">
            <T v={item.journal} />
          </p>
        </div>

        <p className="entry__sub entry__sub--track">
          <T v={item.meta} />
        </p>

        <div className="link-cluster entry__links">
          {item.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </li>
  )
}

export function Research() {
  return (
    <Page title="Research &amp; Publications" standfirst={research.intro}>
      <Section title="Selected Journal Publications">
        <ul className="rows">
          <RowHeader cols={['Publication', 'Year & Coauthors', 'Read']} />
          {publications.map((item, i) => (
            <Entry key={i} item={item} />
          ))}
        </ul>
      </Section>

      <Section title="Working Papers">
        <ul className="rows">
          <RowHeader cols={['Working Paper', 'Coauthors & Date', 'Read']} />
          {workingPapers.map((item, i) => (
            <Entry key={i} item={item} />
          ))}
        </ul>
      </Section>
    </Page>
  )
}
