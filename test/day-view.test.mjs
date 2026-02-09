import assert from 'node:assert/strict'
import test from 'node:test'

import { sessions } from '../src/data/curriculum.ts'
import { getBlockDescription, getDayHeading } from '../src/dayView.ts'

test('day heading matches week/day breadcrumb format', () => {
  assert.equal(getDayHeading({ dayOfWeek: 'Mon', dayNumber: 1 }), 'Mon · Day 1')
})

test('day block descriptions stay full-length and fallback when blank', () => {
  const longDescription =
    'Teams present picks, debate, lock in business by 2pm. Hit the field — drive around Austin neighborhoods scouting competitors.'

  assert.equal(getBlockDescription(longDescription), longDescription)
  assert.equal(getBlockDescription('   '), 'No additional details.')
})

test('real curriculum day includes detailed time ranges and multiple block types', () => {
  const sessionOne = sessions.find((session) => session.id === 'session-1')
  assert.ok(sessionOne)

  const firstDay = sessionOne.chunks[0].weeks[0].days[0]
  assert.deepEqual(
    firstDay.blocks.map((block) => block.time),
    ['8:30–11:00', '11:00–12:00', '12:00–12:45', '12:45–5:00'],
  )
  assert.deepEqual(
    firstDay.blocks.map((block) => block.type),
    ['academics', 'fitness', 'workshop', 'business'],
  )
})
