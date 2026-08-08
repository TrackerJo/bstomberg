# Product

## Register

brand

## Users

Three audiences arrive with different questions, and the site has to answer all three without splitting into three sites.

- **Academic peers and PhD students.** Coauthors, seminar organizers, and doctoral students who already know the work and want the paper. Their context is a browser tab opened between meetings. Success is reaching a PDF, an SSRN link, or an abstract in one click, with the journal and status legible without reading prose.
- **Podcast listeners and the general public.** People who found her through *Taxes for the Rest of Us* and want to understand tax policy without a degree in it. They arrive curious, not credentialed. Success is finding an episode and feeling that the expertise is approachable rather than gated.
- **Deans, donors, and recruiters.** Institutional readers evaluating standing. They rarely read the papers. Success is that the site itself signals seriousness within the first three seconds, before any content is parsed.

The hero page carries the whole weight for the third audience and sets expectations for the other two.

## Product Purpose

A personal site for Bridget Stomberg, PhD, accounting researcher at the Kelley School of Business, Indiana University. It exists to make one person's body of work findable and legible: peer-reviewed publications, working papers, a public-facing podcast, and press commentary, plus a route to contact her.

The site is not a CV rendered in HTML. A CV lists; this site argues. The argument is in the title: rigorous research and public tax policy are the same project, not two hobbies.

Success looks like a journalist, a dean, and a listener all leaving with what they came for, and all three coming away with the same impression of the person.

## Brand Personality

**Exacting. Plainspoken. Warm.**

The voice is a researcher who refuses to hide behind jargon. Confident about the work, uninterested in performing prestige. Comfortable saying "here is what we actually found" and equally comfortable saying "here is why that is complicated."

Emotionally, a visitor should feel that this person is *precise* and *reachable* at the same time. Not austere. Not chatty. The feeling of a well-made document: everything in its place, nothing shouting.

Copy should read like her: short declaratives, no throat-clearing, no adjectives doing work that facts should do.

## Anti-references

- **The stock faculty page.** Navy header bar, cream body, Playfair or Cormorant display serif, three identical icon-topped cards. This is the default for academic personal sites and it renders every professor interchangeable.
- **The editorial-magazine affectation.** Display serif italic headlines, tiny tracked-out uppercase labels above every section, ruled three-column broadsheet grids, no imagery. A well-worn lane that signals "designed" without being specific to her.
- **LinkedIn-thought-leader energy.** Gradient accents, hero metrics ("50+ publications"), stock imagery of handshakes or skylines, testimonial carousels.
- **University CMS output.** Dense breadcrumb navigation, sidebar link stacks, generic institutional chrome that makes an individual look like a department subpage.

## Design Principles

1. **The document is the metaphor.** Her work product is papers, forms, and tables. The interface borrows their structure honestly: a visible rule system, gutter numbering, tabular figures, real margins. Structure is the decoration.

2. **Bridge the two halves visibly.** "Academic rigor" and "tax policy" are the thesis. The typography enacts it: a book serif for argument, a civic form sans for data and labels. Two voices, one page.

3. **Rank is shown, not announced.** Standing comes through the care in the craft and the density of real work on the page, never through a badge or a hero metric.

4. **One idea per viewport.** The home page is a hero and nothing else. Interior pages pace one section at a time. Long scroll over crowded folds.

5. **Findable beats impressive.** When a visual choice and a peer's ability to reach a PDF conflict, the PDF wins. Every publication row exposes its links without a hover, a click, or an expansion.

## Accessibility & Inclusion

- **WCAG 2.2 AA.** Body text at 4.5:1 minimum against its background, large text and UI at 3:1. The violet ink is specified dark enough to clear AA on paper at body sizes.
- Full keyboard navigation with a visible, high-contrast focus ring that is never removed. Skip-to-content link on every page.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, headings in order.
- `prefers-reduced-motion: reduce` disables all entrance animation, transforms, and transitions. The reduced-motion state is a complete, finished design, not a degraded one.
- No information carried by color alone. Rules, position, and labels do the work; violet is emphasis, never meaning.
- The hero headshot is decorative in context but captioned in alt text; no text is baked into imagery.
- Target sizes of at least 24×24 CSS pixels for all interactive elements, with spacing between adjacent link rows.
