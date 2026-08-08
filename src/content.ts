/**
 * Every piece of real-world copy on the site lives here.
 *
 * Anything still reading `[INSERT ...]` is an unfilled placeholder: it renders
 * with a violet highlight so unfinished content is impossible to miss in the
 * browser. Replace the string and the highlight disappears on its own.
 *
 * No facts about a real person are invented anywhere in this file.
 */

export type NavItem = { label: string; href: string }

export type PageMeta = { title: string | null; description: string }

export type Publication = {
  title: string
  journal: string
  meta: string
  links: { label: string; href: string }[]
}

export type Episode = {
  number: string
  title: string
  blurb: string
  duration: string
  href: string
}

export type PressItem = {
  outlet: string
  title: string
  meta: string
  href: string
}

export const site = {
  name: 'Bridget Stomberg, PhD',
  shortName: 'Bridget Stomberg',
  title: '[INSERT full academic title, e.g. Professor of Accounting]',
  chair: '[INSERT named chair or fellowship, if any]',
  school: '[INSERT school, e.g. Kelley School of Business]',
  university: '[INSERT university]',
  location: '[INSERT building, city, state]',
  email: '[INSERT contact email]',
  /**
   * Absolute origin, no trailing slash. Only used to make social-card URLs
   * absolute, which Twitter and some scrapers require. Leave it empty and the
   * build emits root-relative URLs, which Slack and iMessage resolve fine.
   * Can also be supplied at build time as SITE_URL=https://example.com.
   */
  url: '',
  /** Asserts nothing the placeholders above refuse to assert. */
  description: 'Bridget Stomberg, PhD. Accounting research and public tax policy.',
}

/**
 * Per-route title and description. Consumed twice: by the client for
 * `document.title`, and by the prerender build to stamp real <title>,
 * description, and Open Graph tags into each static HTML file. One source of
 * truth, so a browser tab and a Slack unfurl can never disagree.
 */
export const pageMeta: Record<string, PageMeta> = {
  '/': { title: null, description: site.description },
  '/about': {
    title: 'About',
    description: 'Biography, appointment, teaching, and editorial roles.',
  },
  '/research': {
    title: 'Research & Publications',
    description:
      'Peer-reviewed publications and working papers, with abstracts, PDFs, and SSRN links.',
  },
  '/podcast': {
    title: 'Podcast & Media',
    description: 'The podcast, recent episodes, and press commentary.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Email, office, media inquiries, CV, and press kit.',
  },
}

export const notFoundMeta: PageMeta = {
  title: 'Page Not Found',
  description: site.description,
}

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Research', href: '/research' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Contact', href: '/contact' },
]

export const hero = {
  /** Set as three display lines. Edit the words, keep the line count at three. */
  headline: ['Bridging', 'Academic Rigor', 'and Tax Policy'],
  standfirst:
    '[INSERT one or two sentences on what the research is about and why it matters outside the academy]',
  actions: [
    { label: 'Explore Research', href: '/research', solid: true },
    { label: 'Listen to the Podcast', href: '/podcast', solid: false },
    { label: 'About Bridget', href: '/about', solid: false },
  ],
}

/**
 * The four ruled cells across the bottom of the home viewport.
 *
 * These are facts, not credentials. Design Principle 3 says rank is shown
 * through the density of real work on the page, never announced in a cell, so
 * there is deliberately no slot here for a ranking or an honor. The last cell
 * names the public-facing half of the work, which is the thesis the page is
 * making.
 */
export const ledgerStrip: { label: string; value: string }[] = [
  { label: 'Institution', value: '[INSERT university]' },
  { label: 'School', value: '[INSERT school]' },
  { label: 'Field', value: 'Accounting · Taxation' },
  { label: 'Podcast', value: '[INSERT podcast name]' },
]

export const research = {
  intro:
    '[INSERT a short framing sentence for the research page: the through-line across the papers below]',
}

export const publications: Publication[] = [
  {
    title: '[INSERT publication title]',
    journal: '[INSERT journal name]',
    meta: '[INSERT year, volume, coauthors]',
    links: [
      { label: 'Abstract', href: '#' },
      { label: 'PDF', href: '#' },
      { label: 'SSRN', href: '#' },
    ],
  },
  {
    title: '[INSERT publication title]',
    journal: '[INSERT journal name]',
    meta: '[INSERT year, volume, coauthors]',
    links: [
      { label: 'Abstract', href: '#' },
      { label: 'PDF', href: '#' },
      { label: 'SSRN', href: '#' },
    ],
  },
  {
    title: '[INSERT publication title]',
    journal: '[INSERT journal name]',
    meta: '[INSERT year, volume, coauthors]',
    links: [
      { label: 'Abstract', href: '#' },
      { label: 'PDF', href: '#' },
      { label: 'SSRN', href: '#' },
    ],
  },
]

export const workingPapers: Publication[] = [
  {
    title: '[INSERT working paper title]',
    journal: '[INSERT status, e.g. under review]',
    meta: '[INSERT coauthors and date]',
    links: [
      { label: 'Request Draft', href: '#' },
      { label: 'SSRN', href: '#' },
    ],
  },
  {
    title: '[INSERT working paper title]',
    journal: '[INSERT status]',
    meta: '[INSERT coauthors and date]',
    links: [{ label: 'Download Draft', href: '#' }],
  },
]

export const podcast = {
  name: '[INSERT podcast name]',
  tagline: '[INSERT one-line description of the show]',
  description:
    '[INSERT two or three sentences on who the show is for and what it covers]',
  cohost: '[INSERT cohost name and affiliation, if any]',
  subscribe: [
    { label: 'Apple Podcasts', href: '#' },
    { label: 'Spotify', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'RSS', href: '#' },
  ],
}

export const episodes: Episode[] = [
  {
    number: '[INSERT ##]',
    title: '[INSERT episode title]',
    blurb: '[INSERT one-line episode summary]',
    duration: '[INSERT 00:00]',
    href: '#',
  },
  {
    number: '[INSERT ##]',
    title: '[INSERT episode title]',
    blurb: '[INSERT one-line episode summary]',
    duration: '[INSERT 00:00]',
    href: '#',
  },
  {
    number: '[INSERT ##]',
    title: '[INSERT episode title]',
    blurb: '[INSERT one-line episode summary]',
    duration: '[INSERT 00:00]',
    href: '#',
  },
]

export const press: PressItem[] = [
  {
    outlet: '[INSERT outlet]',
    title: '[INSERT headline or quote context]',
    meta: '[INSERT date]',
    href: '#',
  },
  {
    outlet: '[INSERT outlet]',
    title: '[INSERT headline or quote context]',
    meta: '[INSERT date]',
    href: '#',
  },
]

export const about = {
  lede: '[INSERT the opening paragraph of the bio, written in her voice]',
  body: [
    '[INSERT paragraph on research focus and method]',
    '[INSERT paragraph on teaching, service, and editorial roles]',
    '[INSERT paragraph on public-facing work: podcast, press, policy engagement]',
  ],
  facts: [
    { label: 'PhD', value: '[INSERT institution and year]' },
    { label: 'Teaching', value: '[INSERT courses taught]' },
    { label: 'Editorial', value: '[INSERT editorial or association roles]' },
    { label: 'Awards', value: '[INSERT selected honors]' },
  ],
}

export const contact = {
  lede: '[INSERT a sentence on the best way to reach her and what to expect]',
  channels: [
    { label: 'Email', value: '[INSERT contact email]', href: '#' },
    { label: 'Office', value: '[INSERT building, room, city]', href: null },
    { label: 'Media inquiries', value: '[INSERT press contact]', href: '#' },
  ],
  downloads: [
    { label: 'Curriculum Vitae', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
}

export const footer = {
  colophon: '[INSERT university, school, building, city, state]',
}
