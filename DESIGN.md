# Design

## Theme

**Light only, deliberately.** The scene: a dean opens a tab on a bright office monitor mid-morning; a PhD student scans a publication list in a lit library; a listener finds an episode on a phone outdoors. Every use is daylight use, and the governing metaphor is a printed working paper. Paper has no dark mode. `color-scheme: light` is declared explicitly so form controls and scrollbars do not invert.

There is no theme toggle. Adding one would break the paper metaphor and halve the care spent on the single state that matters.

## Concept

**The ledger.** Her work product is papers, forms, and tables, so the interface borrows their structure honestly rather than decorating around it: a visible vertical rule system, a numbered gutter column, hairline row separators, tabular figures, real margins. Structure is the ornament. There is no other ornament.

The headshot is printed *onto* the paper rather than placed on top of it: it composites with `mix-blend-mode: multiply` against an explicit `--paper` ground inside an `isolation: isolate` context. Because the photograph is high-key on near-white, its background dissolves into the stock and the edge of the image disappears. This is the single most important visual mechanic on the site. Do not replace it with a card, a border, or a rounded frame. Never put a `filter` on that element; a filter cancels the blend in Chrome and the portrait vanishes.

**Nothing is ruled across the photograph.** The rules layer is inset so it stops where the image begins: on desktop it ends at the portrait's left edge (`right: 50%`), and in the stacked layout it starts below the portrait band (`top: var(--portrait-band)`). Ruling over her face read as damage to the print, not as ruling under it. The hero therefore carries one rule, the gutter; the full column system lives on the interior pages, where there is data to rule.

### Ledger columns

Interior pages are ruled like a worksheet, and rows sit *in* the columns rather than floating between them:

| Column | Token | Carries |
|---|---|---|
| 1 | `--gutter` | Section numerals, episode numbers |
| 2 | `1fr` | The argument: titles, headings, prose |
| 3 | `--track-2` | Details: coauthors, duration, outlet |
| 4 | `--track-3` | Links and controls |

`--col-2` and `--col-3` are derived from the two track widths, so a vertical hairline always lands exactly on a column boundary instead of near one. Both tracks are `0px` below `60rem`, where the row stacks into column 2. Every band on the page and every row in a ruled list uses this one template.

This is what closes the gap the first critique found: a publication title and its PDF link used to sit roughly 850px apart on a 1440px screen, bound only by a hairline at 1.39:1. They are now adjacent cells in ruled columns under a labelled header.

## Color

**Strategy: Committed.** One saturated violet carries the masthead, the display headline, the footer band, the gutter numerals, and every link. It is not an accent used at 10%; it owns the page's structural furniture. Paper is the ground, violet is the ink.

The hue is pulled from the herringbone lavender of her blazer, then driven far darker and more saturated so it reads as ink rather than pastel. Navy was rejected outright: it is the first reflex for every accounting and finance surface, and it would make the high-key photograph read as a pasted rectangle.

All values are OKLCH. Every neutral is tinted (paper toward warm ochre, rules toward violet). No `#000`, no `#fff`.

| Token | OKLCH | Hex | Role | Contrast on paper |
|---|---|---|---|---|
| `--paper` | `oklch(96.5% 0.013 88)` | `#f7f3ea` | Page ground, warm stock | — |
| `--paper-2` | `oklch(93.5% 0.017 86)` | `#efe9dd` | Recessed wells, table zebra | — |
| `--ink` | `oklch(27% 0.045 288)` | `#25233b` | Body text | 13.75:1 |
| `--ink-muted` | `oklch(46% 0.030 288)` | `#575668` | Secondary text, captions | 6.49:1 |
| `--violet` | `oklch(45% 0.155 293)` | `#5b3da2` | Links, emphasis, focus ring | 7.20:1 |
| `--violet-deep` | `oklch(33% 0.110 292)` | `#382668` | Masthead drench, display headline, footer | 11.50:1 |
| `--violet-soft` | `oklch(90% 0.040 293)` | `#dedaf7` | Tinted fills, hover beds | — |
| `--rule-ui` | `oklch(60% 0.040 291)` | `#807c97` | Interactive borders (buttons, fields) | 3.60:1 |
| `--rule-strong` | `oklch(74% 0.030 290)` | `#aaa8bd` | Emphasized separators | 2.10:1 |
| `--rule` | `oklch(86% 0.018 290)` | `#d0cfdc` | Ledger hairlines | 1.39:1 |

`--rule` and `--rule-strong` are decorative only and never carry meaning or bound an interactive target. Anything clickable uses `--rule-ui` or darker, clearing the 3:1 non-text requirement. Paper on `--violet-deep` is 11.50:1.

**Which rule where.** `--rule-strong` (2.10:1) draws every separator that has structural work to do: the ledger columns, row separators in a list, the top of a `.rows` block, the strip divisions. `--rule` (1.39:1) is reserved for the finest interior ruling, such as the divisions inside a fact list. The original build used `--rule` everywhere and the ornament sat below the threshold of perception, which left four of the five pages with no visual identity beyond the typeface.

Text on the violet band is `--paper` (11.53:1) for column headings and `--violet-soft` (9.41:1) for secondary runs. Note that `.label` sets `--ink-muted` for use on paper; anything carrying `.label` on the violet band must override it with a scoped selector, or it wins on stylesheet order and reads as mud.

## Typography

**Two families, and the pairing is the thesis.** "Academic rigor" and "tax policy" are the two halves the site argues are one project, so one family speaks for each.

- **Literata** — display and long-form. A sturdy, warm book serif with real weight at large sizes and none of the Playfair/Cormorant costume. Carries argument: headlines, publication titles, abstracts, prose.
- **Public Sans** — labels, navigation, data, figures. The typeface of the U.S. Web Design System, drawn for federal forms. Its lineage is literally the tax form. Carries structure: nav, kickers, gutter numerals, episode durations, table headers, buttons.

Both are variable and loaded from Google Fonts with `display=swap`. Public Sans supplies tabular figures via `font-variant-numeric: tabular-nums`, applied to every numeric column so ledger rows align on the digit.

*Rejected by reflex-check:* Inter, IBM Plex, Newsreader, Fraunces, Cormorant, Playfair. The first three were my own reflex picks; all six are training-data defaults.

### Scale

Fluid `clamp()`, ratio ≥1.25 between steps, no flat intervals.

| Token | Size | Family / treatment |
|---|---|---|
| `--fs-display` | `clamp(3rem, 1rem + 7.2vw, 8.25rem)` | Literata 600, `line-height: 0.92`, `letter-spacing: -0.028em` |
| `--fs-h1` | `clamp(2.25rem, 1.3rem + 3.4vw, 4.25rem)` | Literata 600, `line-height: 1.02` |
| `--fs-h2` | `clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem)` | Literata 600, `line-height: 1.12` |
| `--fs-h3` | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` | Literata 600 |
| `--fs-body` | `clamp(1rem, 0.96rem + 0.22vw, 1.125rem)` | Literata 400, `line-height: 1.6` |
| `--fs-sm` | `0.9375rem` | Public Sans 400 |
| `--fs-label` | `0.75rem` | Public Sans 650, uppercase, `letter-spacing: 0.14em` |

Body measure capped at `68ch`. Abstracts and prose blocks never exceed it.

Uppercase is reserved for the label token and the ledger strip. It never appears in body copy.

## Layout

**A visible grid is the voice.** Not asymmetric-editorial, not a centered stack. The page is ruled like a worksheet: a fixed narrow gutter column on the left carrying a two-digit section numeral, a main content column, and full-bleed hairlines that cross every band.

- **Home is one viewport, and the vertical rhythm is measured in `vh` to keep it that way.** `100dvh` flex column of masthead (auto) + hero (`1fr`) + ledger strip (auto). `--hero-band` and the `vh` term in `--fs-display` are what make the promise true: the first build sized everything in `vw` and overflowed by 82 to 137px at *every* viewport tested, clipping the strip. Verified at 0px overflow from 1024×624 up through 2560×1440.
  - The hero is `flex: 1 1 auto; min-height: 0` and the strip is `flex: 0 0 auto`. The hero gives back its centred whitespace when the sheet runs short; the strip never shrinks.
  - The one-sheet composition is gated on **height as well as width**: `(min-width: 60rem) and (min-height: 39rem)`. A 600px-tall window has no room for a three-line display headline and nothing to gain from a 44% portrait column, so it takes the stacked layout and scrolls on purpose.
- **Stacked layout is not a squeezed desktop.** Below the gate, the portrait comes *first*, directly under the masthead, as a band of `--portrait-band` that dissolves downward into the paper the headline sits on. Stacked underneath the copy it landed near y=695 on a 390×780 phone, which put the site's entire visual argument below the fold. One viewport is not the promise on a phone; her face and the first line of the headline in the first screen is.
- Interior pages scroll normally: masthead, `main` with sectioned bands, footer. `.page` fills the remaining height so the ruling runs all the way down to the footer band instead of stopping in mid-air above it.
- Section rhythm varies on purpose. Band padding runs `clamp(3.5rem, 8vw, 7rem)` at major breaks and tightens to `1.25rem` between rows inside a list. Publication rows are separated by hairlines, not gaps.
- Publications and episodes are **ruled rows, not cards.** Cards were the comp's answer and they are the lazy one; a hairline-separated list is both the truer document form and the faster scan for a peer hunting a PDF. Rows only beat cards if the ruling is actually visible and the columns actually bind title to link, which is what the `--rule-strong` promotion and the column template are for.
- Buttons are ruled rectangles with square corners, styled as form fields rather than pills. `--radius: 0`, sitewide. Paper does not have rounded corners.

## Motion

One orchestrated page-load on Home and nothing else. No scroll-triggered effects, no hover choreography beyond a state change.

- Easing is `--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)` everywhere. No bounce, no elastic.
- The gutter rule draws in via `transform: scaleY()`, then headline lines rise with `translateY`, then the photograph fades. Total ~1.1s.
- **First load means first load.** The whole sequence is gated on `[data-animate]`, which Home sets only when `navCount === 0`. It played again on every return to Home before that, and the fourth replay in a session is not an entrance. `navCount` is zero in both the server render and the hydrated render, so the gate never causes a mismatch.
- **Entrance states fill `backwards`, never `forwards` from a hidden base.** A rule whose resting style is `scaleY(0)`, animating forwards, is invisible forever on any client where the animation does not run. The resting state is always the finished one.
- The ledger strip fades without a rise. A 12px entrance translate on an element sitting on the bottom edge of the sheet opens a scrollbar for the length of the animation, on the one page whose whole point is that it does not scroll.
- Only `transform` and `opacity` are animated. No layout properties, and no `filter` on the blended portrait.
- `prefers-reduced-motion: reduce` sets every animation and transition to `0.01ms` and pins final states. The reduced-motion page is the finished design, not a stripped one.

## Components

- **Masthead** — `--violet-deep` drench, full bleed, name at left in Literata small caps, nav at right in Public Sans label style. Current page marked with an underline rule *and* `aria-current`, never color alone. Padding-block is measured in `vh`: on a short laptop the band is what Home can least afford.
- **Ledger frame** — the rule overlay, absolutely positioned hairlines at the gutter and the two column boundaries, at `z-index: 0` beneath content. Inset on Home so it never crosses the photograph.
- **Ledger strip** — the bottom row on Home. Four cells divided by vertical rules, each a Public Sans label. Facts, not credentials: there is deliberately no cell for a ranking or an honor, because Design Principle 3 says rank is shown through the density of real work, never announced. The fourth cell names the podcast, which is the thesis the page is making.
- **Row header** — the column headings above a ruled list (`Publication / Year & Coauthors / Read`). A worksheet labels its columns. Rendered only at widths where the columns exist, and `aria-hidden`, since the row markup already carries its own semantics.
- **Publication row** — title (Literata) and journal (Literata italic) in column 2, year and coauthors in column 3, the link cluster (`Abstract` / `PDF` / `SSRN`) in column 4, always visible, never hover-revealed.
- **Episode row** — number in the gutter (episode numbers are numerals, so they belong in the numbered column), title and blurb in column 2, duration right-aligned in column 3 so figures stack on the digit, listen control in column 4.
- **Press row** — headline in column 2, outlet in column 3, date in column 4.
- **One link grammar.** In every ruled list the title is the link to the primary destination, because that is what everyone reaches for first. Secondary destinations sit in the links column beside it. Three list types previously used three different models.
- **Site footer** — `--violet-deep` band matching the masthead. Three ruled columns: identity and colophon, `Direct` (the ways to write to her), and `Files & Feeds` (CV, press kit, podcast subscribe). The nav survives, demoted below a hairline, because at the bottom of a long publication list it is the only navigation in reach. It used to be *only* a verbatim copy of the masthead, which made the last thing a reader saw a repeat of the first.

## Content

Every piece of real-world copy is a `[INSERT …]` placeholder centralized in `src/content.ts`. Nothing about a real person is invented. Fill that one file and the whole site populates.

`pageMeta` in the same file drives both `document.title` and the per-route `<title>`, description, and Open Graph tags stamped into each prerendered file, so a browser tab and a Slack unfurl can never disagree. Titles join with a middot; there are no em dashes anywhere in copy.

## Build and deployment

The site ships as **static HTML, one file per route**, not as a client-side SPA that guesses. `npm run build` runs three steps: the client bundle, an SSR bundle of `src/entry-server.tsx`, and `scripts/prerender.mjs`, which renders each route and writes `dist/research/index.html` and friends, plus `dist/404.html` for anything unmatched. React hydrates on top and takes over navigation from there.

This is not an optimisation. Without it, a pasted link or a refresh on `/research` depends entirely on the host having a rewrite rule, a crawler sees `<div id="root"></div>`, a link unfurl has nothing to show, and the reader whose first three seconds decide everything spends them on a blank screen. Every arrival path this site is built for is a deep link.

- **Target: GitHub Pages, project site.** `BASE_PATH` (default `/bstomberg/`) flows from `vite.config.ts` through `src/base-path.ts`, which is the only module that knows about the prefix. Routes are always authored root-relative; `toHref` adds the prefix on the way out and `toRoutePath` strips it on the way in, including the trailing slash GitHub Pages adds to directory indexes.
- `SITE_URL` is **scheme and host only** (`https://user.github.io`). The prerender adds `BASE_PATH` itself; passing the full base produces `/bstomberg/bstomberg/`. The script warns and uses the origin if a path is supplied.
- `dist/.nojekyll` is written every build. `dist/social-card.jpg` is copied from the built portrait so the Open Graph image has a stable URL.
- Deployed by `.github/workflows/deploy.yml` on push to `main`.

**Route changes are announced.** A client-side navigation swaps all of `<main>` while the browser leaves focus on the activated link and tells assistive technology nothing. Focus moves to `<main>` (already `tabIndex={-1}`) and a visually hidden `role="status"` region carries the new page name. The announcement is derived from `navCount`, not stored in state, so it is empty on first paint and the server and hydrated renders agree.
