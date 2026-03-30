# Architecture

## Overview

The Trading Playbook is a single-file Progressive Web App that presents a 31-chapter trading education book with native app-like navigation. It requires no build step, no server, and no dependencies beyond Google Fonts.

## File Structure

```
Trading-Book/
├── index.html          # Complete app (HTML + CSS + JS)
├── manifest.json       # PWA manifest for installability
├── sw.js               # Service worker for offline caching
├── CHANGELOG.md        # Release history
├── ARCHITECTURE.md     # This file
├── CLAUDE.md           # AI contributor guidelines
└── README.md           # Project overview
```

## How It Works

### Page System

The app is a collection of 31 absolutely-positioned `<div class="page">` elements inside a `#book` container. Only one page is visible at a time via the `.active` class.

```
#book
├── .page[data-page="0"]   ← Cover
├── .page[data-page="1"]   ← Table of Contents
├── .page[data-page="2"]   ← Chapter 1: Non-Negotiable Rules
├── ...
└── .page[data-page="30"]  ← Chapter 29: Traps
```

Each page has:
- `position: absolute; top: 0; left: 0; width: 100%; height: 100%`
- `overflow-y: auto` for independent scrolling
- `display: none` by default, `display: block` when active

### Navigation

Three input methods, all calling the same `goTo(n)` function:

1. **Swipe** — `touchstart`/`touchend` listeners calculate horizontal distance, vertical ratio, and timing. Triggers on `dx > 60px`, horizontal dominance > 1.5x, and duration < 500ms.
2. **Keyboard** — Arrow keys (Left/Right/Up/Down) mapped to `prev()`/`next()`.
3. **Buttons** — Fixed bottom nav bar with Prev/Next buttons.

### Page Transitions

```
goTo(n):
  1. Remove .active from current page, add .slide-left or .slide-right
  2. Set new page display:block, add opposite slide class
  3. Double requestAnimationFrame → remove slide class, add .active
  4. setTimeout(400ms) → clean up old page display
  5. setTimeout(450ms) → ensure all non-current pages are hidden
```

CSS transitions handle the animation:
- `.active`: opacity 1, translateX(0)
- `.slide-left`: opacity 0, translateX(-40px)
- `.slide-right`: opacity 0, translateX(40px)
- Transition: 0.35s ease on opacity and transform

### Styling Architecture

All colors, fonts, and spacing are controlled via CSS custom properties in `:root`:

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | `#0a0e17` | Page background |
| `--bg-card` | `#111827` | Card/callout backgrounds |
| `--accent` | `#00e676` | Primary green accent |
| `--red` | `#ff5252` | Warning/danger callouts |
| `--amber` | `#ffc107` | Caution callouts |
| `--font-display` | DM Serif Display | Headings |
| `--font-body` | Outfit | Body text |
| `--font-mono` | JetBrains Mono | Code, labels, numbers |

### Content Components

| Class | Purpose |
|-------|---------|
| `.cover` | Full-viewport centered cover page |
| `.index-list` | Table of contents with chapter links |
| `.rule-box` | Numbered rule/check cards |
| `.callout` | Green-bordered info boxes |
| `.callout-red` | Red-bordered warning boxes |
| `.callout-amber` | Amber-bordered caution boxes |
| `.formula` | Monospace formula display blocks |
| `.checkpoint` | End-of-week verification boxes |
| `.source-tag` | Small citation badges |
| `.section-label` | Uppercase mono phase/section labels |

### PWA Setup

**manifest.json** declares:
- App name, short name, description
- `display: standalone` for native app feel
- Theme color matching `--bg-primary`
- Start URL pointing to `index.html`

**sw.js** implements:
- Cache-first strategy for app shell (HTML, fonts)
- Network-first for external resources
- Offline fallback to cached version

### GitHub Pages Deployment

The app deploys via GitHub Pages from the `main` branch root. The entry point is `index.html`. No build step required — GitHub serves the static files directly.

To enable:
1. Repository Settings → Pages
2. Source: Deploy from branch
3. Branch: `main`, folder: `/ (root)`

The PWA is then accessible at `https://<username>.github.io/Trading-Book/`.

## Design Decisions

**Why single-file?** — Eliminates build complexity. The entire app is one HTML file that opens in any browser. Easy to share, easy to modify, easy to host.

**Why no framework?** — 31 static pages with simple transitions don't need React/Vue. Vanilla JS keeps the bundle at zero and load time instant.

**Why absolute positioning for pages?** — Each page needs independent scroll position. Absolute positioning with overflow-y:auto gives each page its own scroll context without interfering with others.

**Why double requestAnimationFrame?** — Single rAF can batch with the display:block change, causing the browser to skip the transition. Double rAF ensures the initial state is painted before the final state is applied.
