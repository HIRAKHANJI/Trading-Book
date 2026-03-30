# Architecture — The Trading Playbook

## Overview

The Trading Playbook is a single-page application (SPA) built with zero dependencies. The entire app — markup, styles, and logic — lives in one HTML file (`tradebook.html`), supported by PWA infrastructure files for offline capability and installability.

## System Diagram

```
┌─────────────────────────────────────────────────┐
│                  GitHub Pages                     │
│                                                   │
│  index.html ──redirect──► tradebook.html          │
│                              │                    │
│                    ┌─────────┼─────────┐          │
│                    │         │         │          │
│                   CSS       HTML       JS         │
│                (embedded) (30 pages) (embedded)   │
│                                                   │
│  manifest.json ◄── linked from <head>             │
│  sw.js ◄── registered on page load                │
└─────────────────────────────────────────────────┘
```

## File Responsibilities

### `tradebook.html` — The App
The core of the project. Contains:

- **`<style>` block**: All CSS including custom properties, page transitions, navigation bar, cover page, content typography, callout boxes, rule boxes, responsive layout, and scrollbar styling.
- **`<body>` markup**: 30 page `<div>` elements (data-page 0–30), each containing structured trading content. Page 0 is the cover, page 1 is the table of contents, pages 2–30 are content.
- **`<script>` block**: Page navigation system with:
  - `goTo(n)` — transition to page N with directional slide animation
  - `next()` / `prev()` — sequential navigation
  - Touch swipe detection (horizontal swipe > 60px, within 500ms)
  - Keyboard arrow key support
  - Progress bar and page indicator updates

### `index.html` — Entry Point
A minimal redirect page for GitHub Pages. GitHub Pages serves `index.html` by default, so this file redirects visitors to `tradebook.html`.

### `manifest.json` — PWA Manifest
Declares the app as a standalone PWA with:
- App name, short name, description
- Start URL pointing to `tradebook.html`
- Display mode: `standalone`
- Theme and background colors matching the dark UI
- Icon declarations (uses inline SVG data URIs — no external image files needed)

### `sw.js` — Service Worker
Implements offline-first caching:
- **Install**: Pre-caches `tradebook.html`, `manifest.json`, and the Google Fonts CSS
- **Fetch**: Cache-first strategy — serves from cache, falls back to network, then caches the response for future use
- **Activate**: Cleans up old cache versions on update
- Versioned cache name (`trading-book-v1`) for cache busting on updates

## Page Structure

```
Page 0:  Cover (title, start button)
Page 1:  Table of Contents (linked index)
Page 2:  Non-Negotiable Rules (Foundation)
Page 3:  Platform Setup
Pages 4-12:  Phase 1 content (Weeks 1-4) + supplements
Pages 13-19: Phase 2 content (Weeks 5-8) + supplements
Pages 20-24: Phase 3 content (Weeks 9-12) + supplements
Pages 25-29: Reference material
Page 30:  Final warnings / traps
```

## Navigation System

Navigation works through three input methods:

1. **Swipe**: Touch events detect horizontal swipes (>60px delta, <500ms, dominant horizontal movement)
2. **Keyboard**: Arrow keys (left/right and up/down)
3. **Buttons**: Prev/Next buttons in the fixed bottom nav bar
4. **TOC Links**: Direct jump from Table of Contents via `goTo(n)` calls

Page transitions use CSS transforms (`translateX`) with opacity fading, creating a directional slide effect.

## Styling Architecture

All styles use CSS custom properties for consistency:

| Variable | Purpose |
|---|---|
| `--bg-primary` | Main background (#0a0e17) |
| `--bg-card` | Card/callout backgrounds |
| `--accent` | Primary green accent (#00e676) |
| `--red`, `--amber`, `--blue` | Semantic colors |
| `--font-display` | DM Serif Display (headings) |
| `--font-body` | Outfit (body text) |
| `--font-mono` | JetBrains Mono (labels, code) |

## PWA Lifecycle

```
1. User visits index.html
2. Redirect to tradebook.html
3. Page loads, registers service worker (sw.js)
4. SW installs → pre-caches core assets
5. Subsequent visits → served from cache (offline-capable)
6. Browser prompts "Add to Home Screen" (if supported)
7. Installed app opens in standalone mode (no browser chrome)
```

## Design Decisions

- **Single file**: No build tooling, no bundler, no framework. Keeps the project simple and deployable anywhere.
- **No images**: Icons use inline SVG data URIs in the manifest. Zero external image dependencies.
- **Cache-first SW**: Prioritizes speed and offline access over freshness. Version bump in `sw.js` triggers cache refresh.
- **CSS transitions over JS animations**: Page transitions use CSS `transform` and `opacity` for GPU-accelerated 60fps performance.
- **Mobile-first**: Touch events, viewport meta tags, `-webkit-overflow-scrolling`, and responsive `clamp()` font sizes.
