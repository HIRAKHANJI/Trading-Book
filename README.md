# The Trading Playbook

A complete professional trading education built as an installable Progressive Web App. 42 chapters covering leveraged crypto and forex trading from absolute beginner to live execution. Interactive quizzes, built-in trade journal, and a structured 12-week curriculum.

**[Open The Trading Playbook](https://hirakhanji.github.io/Trading-Book/)**

Install it on your phone or desktop as a PWA for offline access.

---

## What's Inside

### Foundation (3 chapters)
Non-negotiable trading rules, platform setup (TradingView, Bybit Testnet, Naga Demo, SMRT Algo), and a complete trading glossary.

### Phase 1 -- Weeks 1-4 (9 chapters)
Markets and leverage, order types, liquidation mechanics, candlestick patterns, chart patterns, support and resistance, Fibonacci retracements, technical indicators, and session analysis.

### Phase 2 -- Weeks 5-8 (11 chapters)
Risk management and position sizing, multiple timeframe analysis, strategy building, volume profile, funding rates, Iman's categorical trading method, trading psychology, SMC/ICT concepts and Judas Swing, Wyckoff method, backtesting methodology, and macro/fundamental analysis.

### Phase 3 -- Weeks 9-12 (9 chapters)
Live crypto demo execution, trade management (trailing stops, scaling, partial TPs), order book and tape reading, social discovery workflow, strategy refinement, correlation analysis, on-chain analysis, forex demo trading, and Go/No-Go live trading evaluation.

### Reference (10 chapters)
How to vet sources, prop firm guide, leverage reality table, free resources master list, backtesting checklist, formal trading plan template, tax and record-keeping, common traps and warnings, automation basics, and the in-app trading ledger.

---

## Key Features

- **Interactive quizzes** embedded throughout chapters with progress tracking
- **In-app trading ledger** with performance stats (win rate, average R:R, P&L, streaks) and CSV export
- **Swipe and keyboard navigation** between pages
- **Table of contents** with quick jump to any chapter
- **PWA** -- installable on any device, works fully offline
- **Single HTML file** -- zero dependencies, instant load
- **Dark theme** designed for mobile-first reading
- **Progress bar** tracking your position through the book

---

## Tech Stack

- Pure HTML, CSS, and JavaScript -- no frameworks, no build step
- localStorage for quiz progress and trade journal data
- Service worker with stale-while-revalidate caching and update notifications
- Google Fonts: DM Serif Display (headings), Outfit (body), JetBrains Mono (code/labels)
- Web App Manifest for standalone PWA install

---

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

---

## Deployment

The app is deployed via **GitHub Pages** from the `main` branch root. Any push to `main` automatically updates the live site.

---

## Sources

Content draws on established trading education from: CME Group, Steve Nison (*Japanese Candlestick Charting Techniques*), Mark Douglas (*Trading in the Zone*), Alexander Elder (*Trading for a Living*), Richard Wyckoff, ICT/Inner Circle Trader, ImanTrading, BabyPips, and Bybit Learn.

---

## License

This project is for personal educational use.
