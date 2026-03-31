# CLAUDE.md -- Project Guide for Claude Code

## Project Overview

**The Trading Playbook** is a single-file HTML trading education PWA served via GitHub Pages. The entire app -- markup, styles, interactive quizzes, trading ledger, and navigation logic -- lives in `tradebook.html` with supporting PWA infrastructure files.

## Repository Structure

```
Trading-Book/
├── index.html          # Redirect entry point for GitHub Pages
├── tradebook.html      # The entire app (HTML + CSS + JS in one file)
├── manifest.json       # PWA web app manifest
├── sw.js               # Service worker for offline caching
├── README.md           # Project documentation
├── CLAUDE.md           # This file -- context for Claude Code
├── CHANGELOG.md        # Version history
└── ARCHITECTURE.md     # Technical architecture documentation
```

## Key Technical Details

- **Single-file architecture**: All CSS, JS, and content live in `tradebook.html`. No build step, no bundler, no framework.
- **42 pages**: Each page is a `<div class="page" data-page="N">` where N ranges from 0 (cover) to 42. Page 0 is the cover, page 1 is the table of contents, pages 2-42 are content chapters.
- **Navigation**: `goTo(n)`, `next()`, `prev()` functions. Supports swipe (horizontal >60px, <500ms), keyboard arrows, and prev/next buttons.
- **Quiz system**: Interactive quizzes embedded in chapter pages. Uses `data-quiz` containers with `data-correct` attributes on answer options. Progress stored in localStorage.
- **Ledger system**: In-app trading journal. Trades stored as JSON arrays in localStorage. Supports stats calculation and CSV export.
- **PWA**: `manifest.json` + `sw.js` enable install and offline use. Service worker uses stale-while-revalidate for HTML and cache-first for other assets. Update notifications via `postMessage`.
- **GitHub Pages**: Served from repo root on `main` branch. `index.html` redirects to `tradebook.html`.

## Development Commands

```bash
# Serve locally
npx serve .
python3 -m http.server 8000

# No build, lint, or test commands -- it's a static HTML file
```

## Conventions

### CSS
- All styling uses CSS custom properties defined in `:root`
- Key variables: `--bg-primary`, `--bg-card`, `--accent` (green), `--red`, `--amber`, `--blue`
- Fonts: `--font-display` (DM Serif Display), `--font-body` (Outfit), `--font-mono` (JetBrains Mono)

### Content Classes
- `.section-label` -- phase/category labels
- `.callout` -- green callout box (tips, key points)
- `.callout-red` -- red callout box (warnings, dangers)
- `.callout-amber` -- amber callout box (cautions)
- `.rule-box` with `.rule-num` -- numbered rule boxes
- `.quiz-container` -- quiz wrapper with questions and answer options
- `.ledger-container` -- trading ledger UI wrapper

### Navigation Functions
- `goTo(n)` -- jump to page N with slide animation
- `next()` / `prev()` -- sequential navigation
- `updateUI()` -- refreshes page indicator, progress bar, button states

## Quiz System

Quizzes are embedded directly in chapter pages. Each quiz container uses `data-quiz` attributes to identify the quiz. Answer options use `data-correct` to mark the right answer. The `initQuizzes()` function wires up click handlers. Results and progress are persisted to localStorage so users retain their scores across sessions.

**localStorage keys**: Quiz-related keys follow the pattern `quiz-{quizId}` storing completion state and scores.

## Ledger System

The trading ledger allows users to log trades directly in the app. Each trade object includes fields for: pair/symbol, direction (long/short), entry price, exit price, stop loss, take profit, position size, result (P&L), date, and notes.

Trades are stored as a JSON array in localStorage. The ledger calculates stats including win rate, average R:R, total P&L, and streak data. Users can export their trade log as CSV.

**localStorage keys**: `tradeLedger` stores the array of trade objects.

## When Editing Content

1. Add new pages by inserting a `<div class="page" data-page="N">` block in the correct position
2. Update the table of contents on page 1 with links to new pages
3. Update the `total` page count referenced in the nav indicator logic
4. Update `sw.js` cache version string (e.g., `trading-book-v2` to `trading-book-v3`) to bust the cache
5. If adding quizzes, follow the existing `data-quiz` pattern and ensure `initQuizzes()` picks them up
6. If modifying the ledger, maintain the trade object schema for backward compatibility with existing user data
