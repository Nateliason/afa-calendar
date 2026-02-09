import assert from 'node:assert/strict'
import test from 'node:test'

import { sessions } from '../src/data/curriculum.ts'
import { buildChunkPreview, getChunkWorkshopTopics, getWeekWorkshopTopics } from '../src/sessionView.ts'

const sessionOne = sessions.find((session) => session.id === 'session-1')

test('session one exposes four two-week chunks for session view cards', () => {
  assert.ok(sessionOne)
  assert.equal(sessionOne.chunks.length, 4)
  assert.deepEqual(
    sessionOne.chunks.map((chunk) => chunk.id),
    ['weeks-1-2', 'weeks-3-4', 'weeks-5-6', 'weeks-7-8'],
  )
})

test('chunk workshop topic extraction is ordered, unique, and capped', () => {
  assert.ok(sessionOne)
  const firstChunk = sessionOne.chunks[0]

  assert.deepEqual(getChunkWorkshopTopics(firstChunk, 3), [
    'Session 1 Kick-Off',
    'Opportunity Recognition',
    'Competitive Analysis 101',
  ])
})

test('chunk preview summarizes workshop topics for clickable cards', () => {
  assert.ok(sessionOne)
  const firstChunk = sessionOne.chunks[0]

  assert.equal(
    buildChunkPreview(firstChunk, 2),
    'Key topics: Session 1 Kick-Off | Opportunity Recognition',
  )
})

test('week workshop previews expose mini-topic lists for chunk zoom view', () => {
  assert.ok(sessionOne)
  const weekSeven = sessionOne.chunks[3].weeks[0]

  assert.deepEqual(getWeekWorkshopTopics(weekSeven, 4), [
    'The 4-Year Math',
    'Scaling Levers',
    'Competitive Moats',
  ])
})
