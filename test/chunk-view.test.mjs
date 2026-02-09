import assert from 'node:assert/strict'
import test from 'node:test'

import { getBlockTypePresentation, getBlockTypesInLegendOrder, getDayBlockTypes } from '../src/chunkView.ts'
import { sessions } from '../src/data/curriculum.ts'

test('day block type extraction is ordered and unique for condensed schedule rows', () => {
  const day = {
    dayNumber: 1,
    dayOfWeek: 'Mon',
    blocks: [
      { time: '8:30', title: 'Academics', description: '', type: 'academics' },
      { time: '11:00', title: 'Fitness', description: '', type: 'fitness' },
      { time: '12:00', title: 'Workshop', description: '', type: 'workshop' },
      { time: '12:30', title: 'Another Workshop', description: '', type: 'workshop' },
      { time: '1:00', title: 'Business', description: '', type: 'business' },
      { time: '3:00', title: 'Business Follow-up', description: '', type: 'business' },
    ],
  }

  assert.deepEqual(getDayBlockTypes(day), ['academics', 'fitness', 'workshop', 'business'])
})

test('week cards can build condensed rows from real curriculum data', () => {
  const sessionOne = sessions.find((session) => session.id === 'session-1')
  assert.ok(sessionOne)

  const weekOne = sessionOne.chunks[0].weeks[0]
  const monday = weekOne.days[0]

  assert.deepEqual(getDayBlockTypes(monday), ['academics', 'fitness', 'workshop', 'business'])
})

test('block type presentation returns labels and classes for colored pills', () => {
  assert.deepEqual(getBlockTypePresentation('workshop'), {
    label: 'Workshop',
    shortLabel: 'Work',
    badgeClassName: 'border-amber-200 bg-amber-100 text-amber-800',
  })

  assert.equal(getBlockTypePresentation('business').shortLabel, 'Biz')
  assert.match(getBlockTypePresentation('media').badgeClassName, /bg-green-100/)
  assert.match(getBlockTypePresentation('harkness').badgeClassName, /text-red-800/)
})

test('legend order includes each supported block type exactly once', () => {
  const legendOrder = getBlockTypesInLegendOrder()

  assert.deepEqual(legendOrder, [
    'workshop',
    'business',
    'media',
    'roundtable',
    'harkness',
    'presentation',
    'reflection',
    'fitness',
    'academics',
    'awards',
    'other',
  ])
  assert.equal(new Set(legendOrder).size, legendOrder.length)
})
