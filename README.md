# bstomberg

Personal site for Bridget Stomberg, PhD. React + TypeScript + Vite, prerendered
to static HTML, deployed to GitHub Pages.

Design intent lives in [PRODUCT.md](PRODUCT.md) and [DESIGN.md](DESIGN.md).
Read those before changing anything visual.

## Filling in the content

Every piece of real-world copy is a `[INSERT …]` placeholder in
[`src/content.ts`](src/content.ts). Unfilled placeholders render with a violet
highlight so they are impossible to miss in the browser; the highlight
disappears on its own once a string is replaced. Nothing about a real person is
invented anywhere in that file.

Fill that one file and the whole site populates. When every placeholder is
gone, delete the `.insert` rule at the bottom of `src/styles/base.css`.

## Commands

```bash
npm install
npm run dev       # dev server with HMR
npm run lint
npm run build     # client bundle + SSR bundle + prerender to dist/
npm run preview   # serve the built site
```

`npm run build` produces real HTML for every route:

```
dist/index.html            /
dist/about/index.html      /about
dist/research/index.html   /research
dist/podcast/index.html    /podcast
dist/contact/index.html    /contact
dist/404.html              anything else, with a real 404 status
```

React hydrates on top and handles navigation from there. A pasted link, a
refresh, a crawler, and a link unfurl all get served content without any
JavaScript running.

## Deploying to GitHub Pages

The repo is set up for a **project site** at
`https://<user>.github.io/bstomberg/`.

1. Push to GitHub with the repository named `bstomberg`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
   lints, builds, prerenders, and publishes `dist/`.

Two environment variables control the URLs, both set in the workflow:

| Variable | Value | Notes |
|---|---|---|
| `BASE_PATH` | `/bstomberg/` | Must match the repository name. Trailing slash required. |
| `SITE_URL` | `https://<user>.github.io` | **Scheme and host only.** The build adds `BASE_PATH` itself. |

`SITE_URL` is what makes the Open Graph image and canonical links absolute,
which Twitter and some scrapers require. Leave it unset and those URLs are
emitted root-relative, which is fine for Slack and iMessage but not for
everything.

### Custom domain

Set `BASE_PATH=/` and `SITE_URL=https://yourdomain.com` in the workflow, add
the domain under Settings → Pages, and commit a `public/CNAME` containing it.
Nothing else needs to change: `src/base-path.ts` is the only module that knows
about the path prefix.

### Other hosts

Any static host works. Serve `dist/` as-is with directory indexes enabled and
`404.html` for unmatched paths. There is no SPA catch-all rewrite, and adding
one would break the real 404 status.
