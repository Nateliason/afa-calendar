import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

test('app does not render default Vite counter boilerplate', () => {
  const appTsx = readFileSync('src/App.tsx', 'utf8')

  assert.doesNotMatch(appTsx, /count is \d+/)
  assert.doesNotMatch(appTsx, /Click on the Vite and React logos/)
})

test('default Vite logo assets are removed', () => {
  assert.equal(existsSync('public/vite.svg'), false)
  assert.equal(existsSync('src/assets/react.svg'), false)
})

test('document shell and readme are not Vite template defaults', () => {
  const indexHtml = readFileSync('index.html', 'utf8')
  const readme = readFileSync('README.md', 'utf8')

  assert.doesNotMatch(indexHtml, /href="\/vite\.svg"/)
  assert.doesNotMatch(readme, /^# React \+ TypeScript \+ Vite/m)
  assert.doesNotMatch(readme, /This template provides a minimal setup to get React working in Vite/)
})
