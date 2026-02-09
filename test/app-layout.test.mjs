import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const appTsx = readFileSync('src/App.tsx', 'utf8')

test('app uses a clean white background shell', () => {
  assert.match(appTsx, /className="[^"]*min-h-screen[^"]*bg-white[^"]*"/)
})

test('app header includes AFA branding and title', () => {
  assert.match(appTsx, /<p[^>]*>AFA<\/p>/)
  assert.match(appTsx, /Alpha Founders Academy — 2026-27 Freshman Year/)
})

test('app shows clickable breadcrumbs and global back navigation between zoom levels', () => {
  assert.match(appTsx, /<nav aria-label="Current zoom level">/)
  assert.match(appTsx, /const breadcrumbs: BreadcrumbItem\[] = \[/)
  assert.match(appTsx, /\{ label: 'Year', level: 'year' \}/)
  assert.match(appTsx, /<span aria-hidden="true">&gt;<\/span>/)
  assert.match(appTsx, /onClick=\{\(\) => goToZoomLevel\(crumb\.level\)\}/)
  assert.match(appTsx, /const goBackOneLevel = \(\) => \{/)
  assert.match(appTsx, /if \(currentZoomLevel === 'day'\) \{\s*goToZoomLevel\('week'\)/s)
  assert.match(appTsx, /if \(currentZoomLevel === 'session'\) \{\s*goToZoomLevel\('year'\)/s)
  assert.match(appTsx, /onClick=\{goBackOneLevel\}/)
  assert.match(appTsx, /disabled=\{currentZoomLevel === 'year'\}/)
  assert.match(appTsx, />\s*Back\s*<\/button>/)
})

test('app renders a global block type legend that stays visible across zoom levels', () => {
  assert.match(appTsx, /getBlockTypesInLegendOrder/)
  assert.match(appTsx, /const blockTypeLegend = useMemo/)
  assert.match(appTsx, /<section aria-label="Block type legend"/)
  assert.match(appTsx, /Block Type Legend/)
  assert.match(appTsx, /blockTypeLegend\.map\(\(\{ blockType, presentation \}\) =>/)
  assert.match(appTsx, /presentation\.badgeClassName/)
  assert.match(appTsx, /\{presentation\.label\}/)
})

test('app adds lightweight fade-slide transitions when zoom level changes', () => {
  assert.match(appTsx, /const zoomTransitionKey = /)
  assert.match(appTsx, /@keyframes zoomLayerIn/)
  assert.match(appTsx, /key=\{zoomTransitionKey\}/)
  assert.match(appTsx, /style=\{\{ animation: 'zoomLayerIn 200ms ease-out' \}\}/)
  assert.match(appTsx, /className="mt-8 space-y-8 motion-reduce:animate-none"/)
})

test('app renders a year overview timeline from curriculum data', () => {
  assert.match(appTsx, /import \{ calendarEvents, sessions \} from '\.\/data\/curriculum'/)
  assert.match(appTsx, /buildYearOverviewSegments\(calendarEvents\)/)
  assert.match(appTsx, /<section aria-label="Year overview timeline"/)
  assert.match(appTsx, /Click a session block to zoom in/)
})

test('app wires session click zoom, chunk/week/day reset, and gray break spacers', () => {
  assert.match(appTsx, /if \(segment\.isSession\)/)
  assert.match(
    appTsx,
    /onClick=\{\(\) => \{\s*setSelectedSessionId\(segment\.id\)\s*setSelectedChunkId\(null\)\s*setSelectedWeekNumber\(null\)\s*setSelectedDayNumber\(null\)\s*\}\}/s,
  )
  assert.match(appTsx, /aria-pressed=\{selectedSessionId === segment\.id\}/)
  assert.match(appTsx, /segment\.isBreak \? 'bg-slate-300 text-slate-700' : 'text-white'/)
  assert.match(appTsx, /Back to Year/)
})

test('session view includes theme, revenue target, daily structure table, and chunk cards', () => {
  assert.match(appTsx, /<section aria-label="Session view"/)
  assert.match(appTsx, /onClick=\{\(\) => goToZoomLevel\('year'\)\}/)
  assert.match(appTsx, /\{selectedSession\.theme\}/)
  assert.match(appTsx, /\{selectedSession\.description\}/)
  assert.match(appTsx, /\{selectedSession\.revenueTarget \?\? 'TBD'\}/)
  assert.match(appTsx, /selectedSession\.dailyStructure\.map\(\(row\) =>/)
  assert.match(appTsx, /selectedSession\.chunks\.map\(\(chunk\) =>/)
  assert.match(
    appTsx,
    /onClick=\{\(\) => \{\s*setSelectedChunkId\(chunk\.id\)\s*setSelectedWeekNumber\(null\)\s*setSelectedDayNumber\(null\)\s*\}\}/s,
  )
  assert.match(appTsx, /buildChunkPreview\(chunk\)/)
})

test('chunk zoom renders design principles, condensed week schedules, and end notes', () => {
  assert.match(appTsx, /const selectedChunk = useMemo/)
  assert.match(appTsx, /const selectedWeek = useMemo/)
  assert.match(appTsx, /<section aria-label="Selected two-week chunk"/)
  assert.match(appTsx, /onClick=\{\(\) => goToZoomLevel\('session'\)\}/)
  assert.match(appTsx, /Design Principles/)
  assert.match(appTsx, /selectedChunk\.designPrinciples\.map\(\(principle\) =>/)
  assert.match(appTsx, /Two-Week Schedule/)
  assert.match(appTsx, /selectedChunk\.weeks\.map\(\(week\) =>/)
  assert.match(appTsx, /week\.days\.map\(\(day\) =>/)
  assert.match(appTsx, /getDayBlockTypes\(day\)\.map\(\(blockType\) =>/)
  assert.match(appTsx, /setSelectedWeekNumber\(week\.weekNumber\)/)
  assert.match(appTsx, /setSelectedDayNumber\(null\)/)
  assert.match(appTsx, /Zoomed to Week \{selectedWeek\.weekNumber\}/)
  assert.match(appTsx, /<section aria-label="Week view"/)
  assert.match(appTsx, /selectedWeek\.days\.map\(\(day\) =>/)
  assert.match(appTsx, /day\.blocks\.map\(\(block, index\) =>/)
  assert.match(appTsx, /truncateBlockDescription\(block\.description\)/)
  assert.match(appTsx, /onClick=\{\(\) => setSelectedDayNumber\(day\.dayNumber\)\}/)
  assert.match(appTsx, /onClick=\{\(\) => goToZoomLevel\('week'\)\}/)
  assert.match(appTsx, /<section\s+aria-label="Day view"/)
  assert.match(appTsx, /Day View · Leaf Node/)
  assert.match(appTsx, /getDayHeading\(selectedDay\)/)
  assert.match(appTsx, /Time Range/)
  assert.match(appTsx, /selectedDay\.blocks\.map\(\(block\) =>/)
  assert.match(appTsx, /const presentation = getBlockTypePresentation\(block\.type\)/)
  assert.match(appTsx, /\{presentation\.label\}/)
  assert.match(appTsx, /getBlockDescription\(block\.description\)/)
  assert.doesNotMatch(appTsx, /block\.description\.trim\(\)\.length > 0 \? block\.description : 'No additional details\.'/)
  assert.match(appTsx, /selectedChunk\.endNote/)
})
