# Fourth & AI

A blog that popularizes two scholarly articles about real-time, explainable AI in
American football — translating the research for fans who follow the analytics layer.
Hand-coded static site, no build step, hosted on GitHub Pages.

## Structure

```
index.html                 Homepage (featured lead + second story + about teaser)
about.html                 About the project + author
posts/play-prediction.html Post 1 — popularizes scholarly article 1
posts/explainable-ai.html  Post 2 — popularizes scholarly article 2
assets/css/styles.css      Design system (single stylesheet)
assets/js/progress.js      Field scroll-progress bar (post pages)
.nojekyll                  Serve files as-is on GitHub Pages
```

## Adding content

Every spot that needs real content is marked with an HTML comment:

```html
<!-- INSERT: Post 1 title -->
```

Search the project for `INSERT:` to find them all — post titles, deks, body copy,
inline source links (`#INSERT-source-url`), the stat-card numbers, the "Game Notes"
citations, the author name, and `[contact@email]`. Replace the bracketed
placeholders (`[Author Name]`, `[Scholarly Article 1]`, …) with the real text.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Deploy (GitHub Pages)

1. Commit and push to `main`.
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**,
   select `main` / `root`, save.
3. Site goes live at `https://hreinv.github.io/FourthAndAI/`.

All asset and page links are relative, so the site works correctly under the
`/FourthAndAI/` project-pages subpath.
