# Architecture -- The Trading Playbook

## Overview

The Trading Playbook is a single-page application built with zero dependencies. The entire app -- markup, styles, quizzes, trading ledger, and navigation logic -- lives in one HTML file (`tradebook.html`), supported by PWA infrastructure files for offline capability and installability.

## File Structure

| File | Purpose |
|---|---|
| `tradebook.html` | The entire app: CSS, HTML (42 pages), and JS in one file |
| `index.html` | GitHub Pages entry point, redirects to `tradebook.html` |
| `manifest.json` | PWA manifest (app name, icons, display mode, theme) |
| `sw.js` | Service worker for caching and offline support |

## Page System

Each page is a `<div class="page" data-page="N">` where N is 0-42:

- **Page 0**: Cover page with title and start button
- **Page 1**: Table of contents with `goTo(n)` links to all chapters
- **Pages 2-42**: Content chapters

Only one page is visible at a time. The active page receives the `.active` class which sets `display: flex` and triggers the entry transition. Page transitions use CSS `translateX` transforms with opacity fading for a directional slide effect. The direction (left or right) is determined by comparing the target page number against the current page.

### Navigation Functions

- `goTo(n)` -- Sets the target page active with directional slide animation
- `next()` -- Advances to `currentPage + 1` (clamped to max)
- `prev()` -- Returns to `currentPage - 1` (clamped to 0)
- `updateUI()` -- Refreshes the page indicator text, progress bar width, and prev/next button disabled states

### Input Methods

1. **Swipe**: Touch events detect horizontal swipes (>60px delta, <500ms duration, dominant horizontal movement)
2. **Keyboard**: Left/Up arrows call `prev()`, Right/Down arrows call `next()`
3. **Buttons**: Prev/Next buttons in the fixed bottom navigation bar
4. **TOC links**: Direct jump from table of contents via `onclick="goTo(n)"` calls
5. **Index button**: Fixed button to return to the table of contents (page 1)

## Quiz System

Interactive quizzes are embedded directly in chapter pages to reinforce learning.

### Structure

```html
<div class="quiz-container" data-quiz="quizId">
  <p class="quiz-question">Question text</p>
  <div class="quiz-options">
    <button class="quiz-option" data-correct>Correct answer</button>
    <button class="quiz-option">Wrong answer</button>
    <button class="quiz-option">Wrong answer</button>
  </div>
  <div class="quiz-feedback"></div>
</div>
```

### Flow

1. `initQuizzes()` runs on page load, finds all `.quiz-container` elements
2. Click handlers are attached to each `.quiz-option` button
3. On click: checks for `data-correct` attribute, shows feedback, disables further clicks
4. Completion state and score are saved to localStorage
5. Previously completed quizzes are restored from localStorage on load

### localStorage Keys

Quiz keys follow the pattern `quiz-{quizId}` where the value stores whether the quiz was answered correctly.

## Ledger System

The in-app trading ledger lets users log and analyze trades without leaving the app.

### Trade Object Schema

```json
{
  "id": "timestamp-based unique ID",
  "pair": "BTC/USDT",
  "direction": "long|short",
  "entry": 45000,
  "exit": 46500,
  "stopLoss": 44200,
  "takeProfit": 47000,
  "size": 0.1,
  "pnl": 150,
  "date": "2026-03-31",
  "notes": "Clean breakout from consolidation"
}
```

### Features

- **Stats calculation**: Win rate, average R:R, total P&L, best/worst trade, current and max win/loss streaks
- **CSV export**: Downloads all trades as a CSV file for external analysis
- **Persistent storage**: Trades stored as a JSON array under the `tradeLedger` localStorage key

## PWA Architecture

### Service Worker Strategy

The service worker (`sw.js`) uses a dual caching strategy:

**HTML files (stale-while-revalidate)**:
1. Serve the cached version immediately for instant load
2. Fetch a fresh copy from the network in the background
3. Update the cache with the fresh copy
4. Notify the client via `postMessage({ type: 'CONTENT_UPDATED' })` so the UI can prompt a reload

**All other assets (cache-first)**:
1. Check the cache first
2. If not cached, fetch from network and cache the response
3. If both fail, return null

### Update Notification

When the service worker activates a new version, it sends `postMessage({ type: 'SW_UPDATED' })` to all open clients. The app listens for this message and can display a notification banner prompting the user to reload.

### Offline Fallback

If a navigation request has no cache and the network is unavailable, the service worker returns a styled offline page (inline HTML, no external dependencies).

### Pre-cached Assets

On install, the service worker pre-caches:
- `./` (root)
- `./index.html`
- `./tradebook.html`
- `./manifest.json`
- Google Fonts CSS URL

### Manifest Configuration

- Display: `standalone` (no browser chrome)
- Orientation: `portrait-primary`
- Theme/background: `#0a0e17` (dark)
- Icons: Inline SVG data URIs (no external image files)

## Styling Architecture

### CSS Custom Properties

| Variable | Purpose |
|---|---|
| `--bg-primary` | Main background (`#0a0e17`) |
| `--bg-card` | Card and callout backgrounds |
| `--accent` | Primary green accent (`#00e676`) |
| `--red` | Danger/warning red |
| `--amber` | Caution amber |
| `--blue` | Informational blue |
| `--font-display` | DM Serif Display (headings) |
| `--font-body` | Outfit (body text) |
| `--font-mono` | JetBrains Mono (labels, code) |

### Component Classes

| Class | Usage |
|---|---|
| `.page` | Page container, full-viewport |
| `.section-label` | Phase/category label |
| `.callout` | Green tip/key-point box |
| `.callout-red` | Red warning box |
| `.callout-amber` | Amber caution box |
| `.rule-box` + `.rule-num` | Numbered rule boxes |
| `.quiz-container` | Quiz wrapper |
| `.quiz-option` | Quiz answer button |
| `.ledger-container` | Trading ledger UI |

### Responsive Design

- Mobile-first approach with `clamp()` font sizes
- Touch-optimized with `-webkit-overflow-scrolling: touch`
- Viewport meta tag prevents zoom issues on mobile

## Data Model

All persistent data uses the browser's localStorage API.

| Key | Type | Description |
|---|---|---|
| `quiz-{quizId}` | String | Completion state and correctness for each quiz |
| `tradeLedger` | JSON Array | Array of trade objects logged in the ledger |

## Performance

- **Single-file advantage**: One network request loads the entire app -- no waterfall of CSS, JS, and HTML files
- **GPU-accelerated transitions**: Page slides use CSS `transform: translateX()` and `opacity`, which are composited on the GPU for 60fps performance
- **No framework overhead**: Zero runtime library cost, minimal JS footprint
- **Pre-caching**: Service worker caches all assets on first visit, making subsequent loads instantaneous
- **Inline SVG icons**: Manifest icons use data URIs, eliminating image requests
