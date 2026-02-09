# AFA Freshman Year Calendar — PRD

Interactive calendar visualization for the AFA 2026-27 Freshman Year Planning curriculum.
Audience: Nat, Cameron, Joe Liemandt, parents. Presentation-quality but functional.

## Stack
- Vite + React + TypeScript
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- No additional dependencies — keep it lightweight
- Data is pre-structured in `src/data/curriculum.ts`

## Design Vision
A drill-down calendar that lets you see the year at a glance and progressively zoom into detail. Think: timeline meets calendar meets curriculum map.

Color-coded block types:
- 🟡 Workshop (amber)
- 🔵 Business Work (blue)
- 🟢 Media Discussion (green)
- 🟣 Roundtable (purple)
- 🔴 Harkness Circle (red)
- 🟤 Presentation (orange)
- ⚪ Reflection (gray)
- Academics & Fitness shown but muted

## Tasks

- [x] Project scaffolded (Vite + React + TS)
- [x] Data file created (src/data/curriculum.ts)
- [ ] Configure Tailwind CSS v4 with @tailwindcss/vite plugin in vite.config.ts. Import tailwindcss in src/index.css using `@import "tailwindcss"`. Remove default Vite CSS.
- [ ] Create the app layout: clean white background, AFA branding header with "Alpha Founders Academy — 2026-27 Freshman Year" title, and a breadcrumb navigation showing current zoom level (Year > Session 1 > Weeks 1-2 > Week 1 > Day 3)
- [ ] Build the **Year Overview** (default/top level): A horizontal timeline showing all calendar events (Orientation, Session 1, Fall Break, Session 2, Winter Break, Session 3). Each block is color-coded and proportionally sized by duration. Clicking a session zooms into it. Breaks are shown as gray spacers.
- [ ] Build the **Session View**: Shows the session theme, description, revenue target, daily structure table, and the 4 two-week chunks as clickable cards. Each card shows the chunk title, subtitle, and a mini-preview of what happens (e.g., key workshop topics). Clicking a chunk zooms in.
- [ ] Build the **Two-Week Chunk View**: Shows the chunk title, design principles (if any), and two week cards side by side. Each week card shows the week title and a condensed schedule — one row per day showing the day number, day of week, and colored dots/pills for each block type. Clicking a week zooms in. Show the endNote at the bottom if present.
- [ ] Build the **Week View**: Shows the week title and a day-by-day breakdown. Each day is a card showing all blocks in a vertical timeline. Block cards are color-coded by type, showing time, title, and a truncated description. Clicking a day zooms into the full day view.
- [ ] Build the **Day View**: Full detail for one day. Shows all blocks with full descriptions, time ranges, and type badges. This is the leaf node — no further drilling. Nice typography, readable.
- [ ] Add smooth transitions between zoom levels (simple fade or slide, nothing heavy). Back navigation via breadcrumbs and a back button.
- [ ] Add a legend showing block type colors, visible on all views.
- [ ] Make it responsive — works on both desktop (primary) and tablet. Not critical on mobile but shouldn't break.
- [ ] Remove the default Vite boilerplate (counter app, Vite/React logos, etc.)
- [ ] Ensure `npm run build` succeeds with zero errors and zero warnings. Fix any TypeScript or lint issues.
