# Design

## Theme

**Light only, deliberately.** The scene: a dean opens a tab on a bright office monitor mid-morning; a PhD student scans a publication list in a lit library; a listener finds an episode on a phone outdoors. Every use is daylight use, and the governing metaphor is a printed working paper. Paper has no dark mode. `color-scheme: light` is declared explicitly so form controls and scrollbars do not invert.

There is no theme toggle. Adding one would break the paper metaphor and halve the care spent on the single state that matters.

## Concept

**The ledger.** Her work product is papers, forms, and tables, so the interface borrows their structure honestly rather than decorating around it: a visible vertical rule system, a numbered gutter column, hairline row separators, tabular figures, real margins. Structure is the ornament. There is no other ornament.

The headshot is printed *onto* the ledger rather than placed on top of it: the rules layer sits beneath the image, and the image composites with `mix-blend-mode: multiply`. Because the photograph is high-key on near-white, its background dissolves into the paper and the rules read straight through it, occluded only by the subject. This is the single most important visual mechanic on the site. Do not replace it with a card, a border, or a rounded frame.

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

- Home is exactly one viewport: `100dvh` flex column of masthead (auto) + hero (`1fr`) + ledger strip (auto). It does not scroll on desktop.
- Interior pages scroll normally: masthead, `main` with sectioned bands, footer.
- Section rhythm varies on purpose. Band padding runs `clamp(3.5rem, 8vw, 7rem)` at major breaks and tightens to `1.25rem` between rows inside a list. Publication rows are separated by hairlines, not gaps.
- Publications and episodes are **ruled rows, not cards.** Cards were the comp's answer and they are the lazy one; a hairline-separated list is both the truer document form and the faster scan for a peer hunting a PDF.
- Buttons are ruled rectangles with square corners, styled as form fields rather than pills. `--radius: 0`, sitewide. Paper does not have rounded corners.

## Motion

One orchestrated page-load on Home and nothing else. No scroll-triggered effects, no hover choreography beyond a state change.

- Easing is `--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)` everywhere. No bounce, no elastic.
- The ledger rules draw in first via `transform: scaleY()` (0 → 1, staggered 60ms apart), then headline lines rise with `translateY` + `opacity`, then the photograph fades. Total ~1.1s.
- Only `transform`, `opacity`, and `filter` are animated. No layout properties.
- `prefers-reduced-motion: reduce` sets every animation and transition to `0.01ms` and pins final states. The reduced-motion page is the finished design, not a stripped one.

## Components

- **Masthead** — `--violet-deep` drench, full bleed, name at left in Literata small caps, nav at right in Public Sans label style. Current page marked with an underline rule *and* `aria-current`, never color alone.
- **Ledger frame** — the rule overlay. Absolutely positioned hairline columns at fixed percentages plus the numbered gutter. Sits at `z-index: 0`, beneath content and beneath the hero photograph.
- **Ledger strip** — the bottom row on Home. Four cells divided by vertical rules, each a Public Sans label. Institutional facts, tabular.
- **Publication row** — title (Literata), journal (Literata italic), status, and a link cluster (`Abstract` / `PDF` / `SSRN`) always visible, never hover-revealed.
- **Episode row** — number, title, duration in tabular figures, and a play control. Duration column right-aligned on the digit.
- **Site footer** — `--violet-deep` band matching the masthead, closing the page in the same ink.

## Content

Every piece of real-world copy is a `[INSERT …]` placeholder centralized in `src/content.ts`. Nothing about a real person is invented. Fill that one file and the whole site populates.
