# CLAUDE.md — Project Guide for Claude Code

## Project Overview

This is **The Trading Playbook**, a single-file HTML trading education book served as a PWA via GitHub Pages. The entire app lives in `tradebook.html` with supporting PWA files.

## Repository Structure

```
Trading-Book/
├── index.html          # Redirect entry point for GitHub Pages
├── tradebook.html      # The entire app (HTML + CSS + JS in one file)
├── manifest.json       # PWA web app manifest
├── sw.js               # Service worker for offline caching
├── README.md           # Project documentation
├── CLAUDE.md           # This file — context for Claude Code
├── CHANGELOG.md        # Version history
└── ARCHITECTURE.md     # Technical architecture documentation
```

## Key Technical Details

- **Single-file architecture**: All CSS, JS, and content live in `tradebook.html`. No build step, no bundler, no framework.
- **30 pages**: Each page is a `<div class="page" data-page="N">`. Navigation is swipe-based and keyboard-based.
- **PWA**: `manifest.json` + `sw.js` enable install and offline use. The service worker uses a cache-first strategy.
- **GitHub Pages**: Served from repo root on `main` branch. `index.html` redirects to `tradebook.html`.

## Development Commands

```bash
# Serve locally
npx serve .
python3 -m http.server 8000

# No build, lint, or test commands — it's a static HTML file
```

## Conventions

- All styling uses CSS custom properties defined in `:root`
- Content sections use `.section-label` for phase/category labels
- Callout boxes: `.callout` (green), `.callout-red`, `.callout-amber`
- Rule boxes: `.rule-box` with `.rule-num` for numbered rules
- Navigation: `goTo(n)`, `next()`, `prev()` functions in the `<script>` block
- Fonts: DM Serif Display (headings), Outfit (body), JetBrains Mono (code/labels)

## When Editing Content

- Add new pages by inserting a `<div class="page" data-page="N">` block
- Update the index page (page 1) links when adding/removing pages
- Update `total` page count in the nav indicator
- Update `sw.js` cache version when content changes
