# The Trading Playbook

A comprehensive, mobile-first trading education book built as a Progressive Web App (PWA). Covers everything from market fundamentals to advanced strategies across a structured 12-week curriculum.

## Live App

**[Open The Trading Playbook](https://hirakhanji.github.io/Trading-Book/)**

Install it on your phone or desktop as a PWA for offline access.

## What's Inside

A 30-page interactive book covering:

- **Foundation** — Non-negotiable trading rules and platform setup (TradingView, Bybit Testnet, Naga Demo, SMRT Algo)
- **Phase 1 (Weeks 1-4)** — Markets & leverage, candlestick patterns, price action, support/resistance, market structure, Fibonacci, indicators, session analysis
- **Phase 2 (Weeks 5-8)** — Risk management, strategy building, trading psychology, journaling, liquidity & smart money concepts, Wyckoff method, backtesting, macro analysis
- **Phase 3 (Weeks 9-12)** — Live demo execution, advanced trade management, strategy refinement, correlation analysis, go/no-go evaluation
- **Reference** — Leverage reality table, free resources, backtesting methodology, formal trading plan template, Obsidian ledger setup

## Features

- Swipe and keyboard navigation between pages
- Table of contents with quick jump
- Mobile-first dark theme design
- PWA — installable, works offline
- Single HTML file — zero dependencies, instant load
- Progress bar tracking

## Tech Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- CSS custom properties for theming
- Google Fonts (DM Serif Display, Outfit, JetBrains Mono)
- Service Worker for offline caching
- Web App Manifest for PWA install

## Local Development

```bash
# Clone the repo
git clone https://github.com/hirakhanji/Trading-Book.git
cd Trading-Book

# Serve locally (any static server works)
npx serve .
# or
python3 -m http.server 8000
```

Open `tradebook.html` in your browser, or `index.html` which redirects to it.

## Deployment

The app is deployed via **GitHub Pages** from the `main` branch root. Any push to `main` automatically updates the live site.

## License

This project is for personal educational use.
