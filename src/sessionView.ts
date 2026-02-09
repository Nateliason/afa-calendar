import type { TwoWeekChunk, WeekPlan } from './data/curriculum'

function normalizeLimit(limit: number): number {
  if (!Number.isFinite(limit) || limit < 1) {
    return 1
  }

  return Math.floor(limit)
}

export function getWeekWorkshopTopics(week: WeekPlan, maxTopics = 4): string[] {
  const normalizedLimit = normalizeLimit(maxTopics)
  const seen = new Set<string>()
  const topics: string[] = []

  for (const day of week.days) {
    for (const block of day.blocks) {
      if (block.type !== 'workshop') {
        continue
      }

      const topic = block.title.trim()
      if (!topic || seen.has(topic)) {
        continue
      }

      seen.add(topic)
      topics.push(topic)

      if (topics.length >= normalizedLimit) {
        return topics
      }
    }
  }

  return topics
}

export function getChunkWorkshopTopics(chunk: TwoWeekChunk, maxTopics = 3): string[] {
  const normalizedLimit = normalizeLimit(maxTopics)
  const seen = new Set<string>()
  const topics: string[] = []

  for (const week of chunk.weeks) {
    for (const topic of getWeekWorkshopTopics(week, normalizedLimit)) {
      if (seen.has(topic)) {
        continue
      }

      seen.add(topic)
      topics.push(topic)

      if (topics.length >= normalizedLimit) {
        return topics
      }
    }
  }

  return topics
}

export function buildChunkPreview(chunk: TwoWeekChunk, maxTopics = 3): string {
  const topics = getChunkWorkshopTopics(chunk, maxTopics)

  if (topics.length > 0) {
    return `Key topics: ${topics.join(' | ')}`
  }

  const weekTitles = chunk.weeks
    .map((week) => week.title.trim())
    .filter((weekTitle) => weekTitle.length > 0)
    .slice(0, 2)

  return weekTitles.length > 0 ? `Focus: ${weekTitles.join(' | ')}` : 'Focus: Core execution and reflection work'
}
