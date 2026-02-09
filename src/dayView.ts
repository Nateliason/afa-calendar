import type { DayPlan } from './data/curriculum'

const DEFAULT_BLOCK_DESCRIPTION = 'No additional details.'

export function getDayHeading(day: Pick<DayPlan, 'dayOfWeek' | 'dayNumber'>): string {
  return `${day.dayOfWeek} · Day ${day.dayNumber}`
}

export function getBlockDescription(description: string): string {
  const normalizedDescription = description.trim()
  return normalizedDescription.length > 0 ? normalizedDescription : DEFAULT_BLOCK_DESCRIPTION
}
