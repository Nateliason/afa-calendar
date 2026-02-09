import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

test('vite config includes tailwindcss plugin', () => {
  const viteConfig = readFileSync('vite.config.ts', 'utf8')

  assert.match(viteConfig, /import tailwindcss from ['"]@tailwindcss\/vite['"]/)
  assert.match(viteConfig, /plugins:\s*\[[^\]]*tailwindcss\(\)/s)
})

test('index.css imports tailwindcss', () => {
  const indexCss = readFileSync('src/index.css', 'utf8').trim()
  assert.equal(indexCss, '@import "tailwindcss";')
})

test('default Vite app css is removed', () => {
  const appTsx = readFileSync('src/App.tsx', 'utf8')

  assert.doesNotMatch(appTsx, /import ['"]\.\/App\.css['"]/)
  assert.equal(existsSync('src/App.css'), false)
})
