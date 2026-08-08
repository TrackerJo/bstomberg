import { Page, Section, SectionBody } from '../components/Page'
import { T } from '../components/Text'
import { contact } from '../content'

export function Contact() {
  return (
    <Page title="Contact" standfirst={contact.lede}>
      <Section n="01" title="Direct">
        <SectionBody>
          <dl className="facts">
            {contact.channels.map((channel) => (
              <div key={channel.label}>
                <dt className="label">{channel.label}</dt>
                <dd>
                  {channel.href ? (
                    <a href={channel.href}>
                      <T v={channel.value} />
                    </a>
                  ) : (
                    <T v={channel.value} />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </SectionBody>
      </Section>

      <Section n="02" title="Downloads">
        <SectionBody>
          <div className="button-row">
            {contact.downloads.map((item) => (
              <a key={item.label} className="field-button" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </SectionBody>
      </Section>
    </Page>
  )
}
