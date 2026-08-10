import { Page, Section, SectionBody } from '../components/Page'
import { T } from '../components/Text'
import { about, site } from '../content'

export function About() {
  return (
    <Page title="About">
      <Section title="Biography">
        <SectionBody>
          <div className="prose">
            <p className="prose__lede">
              <T v={about.lede} />
            </p>
            {about.body.map((paragraph, i) => (
              <p key={i}>
                <T v={paragraph} />
              </p>
            ))}
          </div>
        </SectionBody>
      </Section>

      <Section title="At a Glance">
        <SectionBody>
          <dl className="facts">
            <div>
              <dt className="label">Position</dt>
              <dd>
                <T v={site.title} />
              </dd>
            </div>
            <div>
              <dt className="label">Appointment</dt>
              <dd>
                <T v={site.school} />, <T v={site.university} />
              </dd>
            </div>
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd>
                  <T v={fact.value} />
                </dd>
              </div>
            ))}
          </dl>
        </SectionBody>
      </Section>
    </Page>
  )
}
