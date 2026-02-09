import type { CalendarEvent } from './data/curriculum'

const MS_PER_DAY = 24 * 60 * 60 * 1000

export interface YearOverviewSegment extends CalendarEvent {
  durationDays: number
  widthPercent: number
  isSession: boolean
  isBreak: boolean
}

function toUtcTimestamp(date: string): number {
  const [year, month, day] = date.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

export function getInclusiveDurationDays(startDate: string, endDate: string): number {
  const start = toUtcTimestamp(startDate)
  const end = toUtcTimestamp(endDate)
  const durationDays = Math.floor((end - start) / MS_PER_DAY) + 1

  if (durationDays < 1) {
    throw new Error(`Invalid date range: ${startDate} to ${endDate}`)
  }

  return durationDays
}

export function buildYearOverviewSegments(events: CalendarEvent[]): YearOverviewSegment[] {
  const segments = events.map((event) => ({
    ...event,
    durationDays: getInclusiveDurationDays(event.startDate, event.endDate),
  }))
  const totalDays = segments.reduce((sum, segment) => sum + segment.durationDays, 0)

  return segments.map((segment) => ({
    ...segment,
    widthPercent: (segment.durationDays / totalDays) * 100,
    isSession: segment.type === 'session',
    isBreak: segment.type === 'break',
  }))
}
