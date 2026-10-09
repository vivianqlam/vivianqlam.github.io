# Vivian Que Lam Portfolio

This repository is a root-level Jekyll site for `vivianqlam.github.io`. It is designed to publish directly through GitHub Pages from the `main` branch and the repository root.

## Site structure

- `index.md`, `about.md`, `work.md`, `contact.md` — page content in Markdown with YAML front matter
- `_layouts/default.html` — shared page shell
- `_includes/` — reusable head, navigation, and footer partials
- `assets/css/style.css` — responsive design and light/dark theme tokens
- `assets/js/theme.js` — minimal theme preference toggle
- `assets/images/favicon.svg` — inline SVG favicon
- `_config.yml` — Jekyll and GitHub Pages settings
- `sitemap.xml`, `robots.txt` — crawl metadata

## Update the site

1. Edit the Markdown page that owns the content.
2. Keep page front matter at the top of each Markdown file.
3. Update shared navigation or metadata in `_includes/`.
4. Update visual styling in `assets/css/style.css`.
5. Keep `baseurl` empty because this is a GitHub user site.

Personal contact details are intentionally not displayed until Vivian approves publishing a public `mailto` link.

## Preview locally

Install Ruby and Jekyll if they are not already available, then run:

```bash
jekyll serve --livereload
```

Open `http://127.0.0.1:4000/`. Jekyll will rebuild the Markdown pages when files change.

To perform a production-style build without serving:

```bash
jekyll build
```

The generated site is written to `_site/`.

## GitHub Pages

In the repository settings, choose **Deploy from a branch**, select `main`, and select `/ (root)` as the folder. GitHub Pages will build the site using `_config.yml`; no manual build output or nested website folder is required.

## Lighthouse

With the local site running, use Chrome DevTools Lighthouse in an incognito window and test both:

- mobile at 375px wide
- desktop at 1280px wide

Run Performance, Accessibility, Best Practices, and SEO audits. The site avoids external fonts, trackers, large media, and unnecessary JavaScript to keep those scores high.