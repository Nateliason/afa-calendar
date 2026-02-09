import assert from 'node:assert/strict'
import test from 'node:test'

import { getBlockCardClassName, truncateBlockDescription } from '../src/weekView.ts'

test('truncateBlockDescription returns fallback for blank descriptions', () => {
  assert.equal(truncateBlockDescription('   '), 'No additional details.')
})

test('truncateBlockDescription keeps short text and truncates long text', () => {
  const short = 'Build a repeatable process.'
  const long = 'A'.repeat(140)

  assert.equal(truncateBlockDescription(short, 50), short)
  assert.equal(truncateBlockDescription(long, 12), 'AAAAAAAAA...')
})

test('truncateBlockDescription normalizes invalid maxLength inputs', () => {
  const long = 'B'.repeat(140)

  assert.equal(truncateBlockDescription(long, Number.POSITIVE_INFINITY), `${'B'.repeat(107)}...`)
  assert.equal(truncateBlockDescription(long, 3.8), 'B...')
})

test('block card class names map to block types used in week and day cards', () => {
  assert.equal(getBlockCardClassName('workshop'), 'border-amber-200 bg-amber-50')
  assert.equal(getBlockCardClassName('business'), 'border-blue-200 bg-blue-50')
  assert.equal(getBlockCardClassName('media'), 'border-green-200 bg-green-50')
  assert.equal(getBlockCardClassName('reflection'), 'border-slate-300 bg-slate-100')
})
