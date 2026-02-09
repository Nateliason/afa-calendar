import assert from 'node:assert/strict'
import test from 'node:test'

import { calendarEvents } from '../src/data/curriculum.ts'
import { buildYearOverviewSegments, getInclusiveDurationDays } from '../src/yearOverview.ts'

test('inclusive date duration is calculated correctly', () => {
  assert.equal(getInclusiveDurationDays('2026-08-03', '2026-08-07'), 5)
  assert.equal(getInclusiveDurationDays('2026-12-21', '2027-01-01'), 12)
})

test('year overview segments preserve event order and classify breaks/sessions', () => {
  const segments = buildYearOverviewSegments(calendarEvents)

  assert.equal(segments.length, calendarEvents.length)
  assert.deepEqual(
    segments.map((segment) => segment.id),
    calendarEvents.map((event) => event.id),
  )

  assert.equal(segments.find((segment) => segment.id === 'session-1')?.isSession, true)
  assert.equal(segments.find((segment) => segment.id === 'fall-break')?.isBreak, true)
  assert.equal(segments.find((segment) => segment.id === 'session-3')?.durationDays, 87)
})

test('segment widths are proportional and sum to 100%', () => {
  const segments = buildYearOverviewSegments(calendarEvents)
  const totalWidth = segments.reduce((sum, segment) => sum + segment.widthPercent, 0)

  assert.ok(Math.abs(totalWidth - 100) < 1e-8, `expected total width of 100, got ${totalWidth}`)

  const sessionThree = segments.find((segment) => segment.id === 'session-3')
  const fallBreak = segments.find((segment) => segment.id === 'fall-break')

  assert.ok(sessionThree && fallBreak)
  assert.ok(sessionThree.widthPercent > fallBreak.widthPercent)
})
