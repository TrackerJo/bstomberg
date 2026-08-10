import { Page, Section, SectionBody } from '../components/Page'
import { site, contact } from '../content'
import './Contact.css'

export function Contact() {
  return (
    <Page title="Contact" standfirst={contact.lede}>
      <Section n="01" title="Direct">
        <SectionBody>
          <form
            className="contact-form"
            action={`mailto:${site.email}`}
            method="post"
            encType="text/plain"
          >
            <div className="field">
              <label className="label" htmlFor="contact-name">
                Name
              </label>
              <input id="contact-name" name="name" type="text" required />
            </div>

            <div className="field">
              <label className="label" htmlFor="contact-email">
                Email
              </label>
              <input id="contact-email" name="email" type="email" required />
            </div>

            <div className="field">
              <label className="label" htmlFor="contact-message">
                Message
              </label>
              <textarea id="contact-message" name="message" rows={6} required />
            </div>

            <div className="button-row">
              <button type="submit" className="field-button field-button--solid">
                Send
              </button>
            </div>
          </form>
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
            <a className="field-button" href={contact.resumeHref} download>
              Download Resume
            </a>
          </div>
        </SectionBody>
      </Section>
    </Page>
  )
}
