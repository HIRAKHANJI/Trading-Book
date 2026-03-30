# CLAUDE.md — AI Contributor Guidelines

## Project Overview

This is **The Trading Playbook**, a single-file PWA trading education book. The entire app lives in `index.html` with supporting PWA files (`manifest.json`, `sw.js`).

## Key Rules

- **No build system.** Everything is vanilla HTML/CSS/JS in one file. Do not introduce npm, webpack, or any tooling.
- **No external JS dependencies.** The only external resources are Google Fonts.
- **Mobile-first.** All changes must work on mobile. Test swipe navigation, scrolling, and readability.
- **Dark theme only.** The design uses a dark palette with green accent (`#00e676`). Do not add light mode.
- **Page structure matters.** Each `.page` div has a `data-page` attribute. The index (page 1) links to pages by number. Adding/removing pages requires updating the index and total count.

## Architecture

- Pages are absolutely positioned divs, shown/hidden with `.active` class
- Navigation: swipe (touch), arrow keys, and prev/next buttons
- CSS custom properties in `:root` control the entire theme
- No framework — DOM manipulation is vanilla JS

## Content Guidelines

- All trading content is research-backed with source tags
- Do not add speculative trading advice or "hot tips"
- Maintain the educational, disciplined tone throughout
- Source attributions use `.source-tag` spans

## File Map

| File | Purpose |
|------|---------|
| `index.html` | The entire app — HTML structure, CSS, JS |
| `manifest.json` | PWA metadata (name, icons, theme) |
| `sw.js` | Service worker for offline caching |
| `CHANGELOG.md` | Version history |
| `ARCHITECTURE.md` | Technical documentation |

## Testing

Open `index.html` in a browser. Verify:
1. Page transitions work (swipe, buttons, keyboard)
2. Progress bar updates correctly
3. Index page links go to correct pages
4. All pages scroll properly on mobile
5. Service worker registers without errors (check DevTools > Application)

## Git Workflow

- Branch from `main` for features
- Commit messages: short, descriptive, present tense
- Push to feature branch, PR to `main`
