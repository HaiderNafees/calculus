# CalculusLearn

A free, open-source, interactive calculus learning platform. 126 skills across
6 modules — from limits and continuity through differential equations and
applications of integration — with lessons, interactive graphs, and adaptive
practice. No account required: progress is stored locally in your browser.

![Angular](https://img.shields.io/badge/Angular-17+-dd0031) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Student Dashboard** — overall progress ring, module completion cards, continue-learning shortcut, daily streak counter, ECharts mastery chart
- **Skill Explorer** — searchable, filterable grid of all 126 skills with mastery indicators
- **Practice Arena** — parameterized problem generator (fresh numbers every time), math input with live LaTeX preview and symbol keyboard, progressive hints, step-by-step solutions, mastery scoring (New → Learning → Practiced → Mastered)
- **Interactive visualizations** — JSXGraph function graphs, draggable limit visualizer, Riemann sum explorer
- **Lesson Viewer** — key concepts, worked examples, common mistakes, curated Khan Academy videos (Module 1 written; more coming)  - **Responsive** — mobile-first, works on phones, tablets, desktops

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Angular 17+ (standalone components, signals) |
| Styling | Tailwind CSS 3 |
| Math rendering | MathJax 3 |
| Interactive graphs | JSXGraph 1.10 |
| Charts | ECharts 5 |
| Progress storage | LocalStorage (no backend) |
| Hosting | Vercel |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
ng serve
# → http://localhost:4200

# 3. Production build
ng build --configuration production
```

## Deploy to Vercel (free)

1. **Push to GitHub** — create a repository and push this project (keep `vercel.json` in the root).
2. **Import to Vercel** — sign up at [vercel.com](https://vercel.com) with GitHub, click *Import Project*, select the repo.
3. **Deploy** — Vercel auto-detects Angular. In ~60 seconds your app is live on a free `*.vercel.app` domain.

Or from the CLI:

```bash
npm i -g vercel
vercel          # first deploy
vercel --prod   # production deploy
```

SPA rewrites and asset caching are pre-configured in `vercel.json`.

## Project structure

```
src/app/
├── components/
│   ├── graphs/        # JSXGraph visualizers (function, limit, Riemann)
│   ├── layout/        # Header, sidebar, footer
│   └── shared/        # Progress ring, skill card, math formula/input, badges
├── data/
│   ├── curriculum.ts      # 126 skills, 23 categories, 6 modules (typed)
│   ├── problem-engine.ts  # Problem interfaces + math helpers
│   ├── problem-templates.ts # Parameterized templates (Categories A-E)
│   └── lessons.ts         # Lesson content + LessonService
├── pages/
│   ├── dashboard/     # Progress overview
│   ├── skills/        # Skill explorer
│   ├── practice/      # Practice arena
│   ├── lesson/        # Lesson viewer
│   ├── about/         # About
│   └── not-found/     # 404
├── pipes/             # Trusted YouTube embed pipe
└── services/
    ├── curriculum.service.ts
    ├── progress.service.ts    # LocalStorage mastery + streaks
    ├── problem-generator.service.ts    ├── mathjax.service.ts
    └── jsxgraph.service.ts
    ```

## License

MIT — see [LICENSE](LICENSE). Attributions in [CREDITS.md](CREDITS.md).
