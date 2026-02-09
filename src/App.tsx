import { useMemo, useState } from 'react'
import { calendarEvents, sessions } from './data/curriculum'
import { getBlockTypePresentation, getBlockTypesInLegendOrder, getDayBlockTypes } from './chunkView'
import { getBlockDescription, getDayHeading } from './dayView'
import { buildChunkPreview } from './sessionView'
import { getBlockCardClassName, truncateBlockDescription } from './weekView'
import { buildYearOverviewSegments } from './yearOverview'

type ZoomLevel = 'year' | 'session' | 'chunk' | 'week' | 'day'

type BreadcrumbItem = {
  label: string
  level: ZoomLevel
}

function App() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [selectedChunkId, setSelectedChunkId] = useState<string | null>(null)
  const [selectedWeekNumber, setSelectedWeekNumber] = useState<number | null>(null)
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null)

  const segments = useMemo(() => buildYearOverviewSegments(calendarEvents), [])
  const blockTypeLegend = useMemo(
    () =>
      getBlockTypesInLegendOrder().map((blockType) => ({
        blockType,
        presentation: getBlockTypePresentation(blockType),
      })),
    [],
  )
  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === selectedSessionId) ?? null,
    [selectedSessionId],
  )
  const selectedChunk = useMemo(
    () => selectedSession?.chunks.find((chunk) => chunk.id === selectedChunkId) ?? null,
    [selectedChunkId, selectedSession],
  )
  const selectedWeek = useMemo(
    () => selectedChunk?.weeks.find((week) => week.weekNumber === selectedWeekNumber) ?? null,
    [selectedChunk, selectedWeekNumber],
  )
  const selectedDay = useMemo(
    () => selectedWeek?.days.find((day) => day.dayNumber === selectedDayNumber) ?? null,
    [selectedDayNumber, selectedWeek],
  )

  const currentZoomLevel: ZoomLevel = selectedDay
    ? 'day'
    : selectedWeek
      ? 'week'
      : selectedChunk
        ? 'chunk'
        : selectedSession
          ? 'session'
          : 'year'

  const zoomTransitionKey = `${selectedSessionId ?? 'year'}:${selectedChunkId ?? 'chunk'}:${selectedWeekNumber ?? 'week'}:${selectedDayNumber ?? 'day'}`

  const goToZoomLevel = (level: ZoomLevel) => {
    if (level === 'year') {
      setSelectedSessionId(null)
      setSelectedChunkId(null)
      setSelectedWeekNumber(null)
      setSelectedDayNumber(null)
      return
    }

    if (level === 'session') {
      setSelectedChunkId(null)
      setSelectedWeekNumber(null)
      setSelectedDayNumber(null)
      return
    }

    if (level === 'chunk') {
      setSelectedWeekNumber(null)
      setSelectedDayNumber(null)
      return
    }

    if (level === 'week') {
      setSelectedDayNumber(null)
    }
  }

  const goBackOneLevel = () => {
    if (currentZoomLevel === 'day') {
      goToZoomLevel('week')
      return
    }

    if (currentZoomLevel === 'week') {
      goToZoomLevel('chunk')
      return
    }

    if (currentZoomLevel === 'chunk') {
      goToZoomLevel('session')
      return
    }

    if (currentZoomLevel === 'session') {
      goToZoomLevel('year')
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Year', level: 'year' },
    ...(selectedSession ? [{ label: `Session ${selectedSession.number}`, level: 'session' as const }] : []),
    ...(selectedChunk ? [{ label: selectedChunk.title, level: 'chunk' as const }] : []),
    ...(selectedWeek ? [{ label: `Week ${selectedWeek.weekNumber}`, level: 'week' as const }] : []),
    ...(selectedDay ? [{ label: `Day ${selectedDay.dayNumber}`, level: 'day' as const }] : []),
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">AFA</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Alpha Founders Academy — 2026-27 Freshman Year
        </h1>
      </header>

      <main className="px-6 py-6">
        <style>
          {`@keyframes zoomLayerIn {
            from {
              opacity: 0;
              transform: translateY(0.25rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }`}
        </style>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Current zoom level">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              {breadcrumbs.map((crumb, index) => {
                const isCurrentLevel = index === breadcrumbs.length - 1

                return (
                  <li key={`${crumb.level}-${crumb.label}`} className="flex items-center gap-2">
                    {index > 0 ? <span aria-hidden="true">&gt;</span> : null}
                    {isCurrentLevel ? (
                      <span>{crumb.label}</span>
                    ) : (
                      <button
                        type="button"
                        className="rounded-sm text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
                        onClick={() => goToZoomLevel(crumb.level)}
                      >
                        {crumb.label}
                      </button>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          <button
            type="button"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={goBackOneLevel}
            disabled={currentZoomLevel === 'year'}
          >
            Back
          </button>
        </div>

        <section aria-label="Block type legend" className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Block Type Legend</p>
            {blockTypeLegend.map(({ blockType, presentation }) => (
              <span
                key={blockType}
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${presentation.badgeClassName}`}
              >
                {presentation.label}
              </span>
            ))}
          </div>
        </section>

        <section aria-label="Year overview timeline" className="mt-8 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Year Overview</h2>
            <p className="text-sm text-slate-600">Click a session block to zoom in</p>
          </div>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {segments.map((segment) => {
              const commonClasses =
                'group relative flex min-h-24 items-end border-r border-white px-2 py-2 text-left text-xs font-medium transition hover:brightness-95 last:border-r-0'

              if (segment.isSession) {
                return (
                  <button
                    key={segment.id}
                    type="button"
                    className={`${commonClasses} cursor-pointer text-white`}
                    style={{
                      width: `${segment.widthPercent}%`,
                      backgroundColor: segment.color,
                    }}
                    onClick={() => {
                      setSelectedSessionId(segment.id)
                      setSelectedChunkId(null)
                      setSelectedWeekNumber(null)
                      setSelectedDayNumber(null)
                    }}
                    aria-pressed={selectedSessionId === segment.id}
                  >
                    <span className="w-full truncate">{segment.title}</span>
                  </button>
                )
              }

              return (
                <div
                  key={segment.id}
                  className={`${commonClasses} ${
                    segment.isBreak ? 'bg-slate-300 text-slate-700' : 'text-white'
                  }`}
                  style={{
                    width: `${segment.widthPercent}%`,
                    ...(segment.isBreak ? {} : { backgroundColor: segment.color }),
                  }}
                >
                  <span className="w-full truncate">{segment.title}</span>
                </div>
              )
            })}
          </div>
        </section>

        <div
          key={zoomTransitionKey}
          className="mt-8 space-y-8 motion-reduce:animate-none"
          style={{ animation: 'zoomLayerIn 200ms ease-out' }}
        >
          {selectedSession ? (
            <section aria-label="Session view" className="rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight">
                Session {selectedSession.number}: {selectedSession.title}
              </h3>
              <button
                type="button"
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => goToZoomLevel('year')}
              >
                Back to Year
              </button>
            </div>

            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">Theme</p>
            <p className="mt-1 text-base font-medium text-slate-800">{selectedSession.theme}</p>
            <p className="mt-3 text-sm text-slate-700">{selectedSession.description}</p>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Revenue Target
                </h4>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {selectedSession.revenueTarget ?? 'TBD'}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Daily Structure
                </h4>
                <table className="mt-2 w-full border-collapse overflow-hidden rounded-lg border border-slate-200 text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Time</th>
                      <th className="px-3 py-2 font-semibold">Block</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSession.dailyStructure.map((row) => (
                      <tr key={`${row.time}-${row.block}`} className="border-t border-slate-200">
                        <td className="px-3 py-2 text-slate-700">{row.time}</td>
                        <td className="px-3 py-2 text-slate-900">{row.block}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <h4 className="text-base font-semibold tracking-tight">Two-Week Chunks</h4>
                <p className="text-sm text-slate-600">Click a chunk card to zoom in</p>
              </div>

              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {selectedSession.chunks.map((chunk) => (
                  <button
                    key={chunk.id}
                    type="button"
                    className={`rounded-xl border p-4 text-left transition hover:border-slate-400 hover:bg-slate-50 ${
                      selectedChunkId === chunk.id ? 'border-slate-900 bg-slate-50' : 'border-slate-200'
                    }`}
                    onClick={() => {
                      setSelectedChunkId(chunk.id)
                      setSelectedWeekNumber(null)
                      setSelectedDayNumber(null)
                    }}
                    aria-pressed={selectedChunkId === chunk.id}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{chunk.title}</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{chunk.subtitle}</p>
                    <p className="mt-2 text-sm text-slate-700">{buildChunkPreview(chunk)}</p>
                  </button>
                ))}
              </div>
            </div>
            </section>
          ) : null}

          {selectedChunk ? (
            <section aria-label="Selected two-week chunk" className="rounded-xl border border-slate-300 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-semibold tracking-tight">{selectedChunk.title}</h4>
                <p className="mt-1 text-sm text-slate-700">{selectedChunk.subtitle}</p>
              </div>
              <button
                type="button"
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => goToZoomLevel('session')}
              >
                Back to Session
              </button>
            </div>

            {selectedChunk.designPrinciples && selectedChunk.designPrinciples.length > 0 ? (
              <div className="mt-4">
                <h5 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Design Principles
                </h5>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {selectedChunk.designPrinciples.map((principle) => (
                    <li key={principle}>{principle}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-5 flex items-end justify-between gap-4">
              <h5 className="text-base font-semibold tracking-tight">Two-Week Schedule</h5>
              <p className="text-sm text-slate-600">Click a week card to zoom in</p>
            </div>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {selectedChunk.weeks.map((week) => (
                <button
                  key={week.weekNumber}
                  type="button"
                  className={`rounded-lg border p-4 text-left transition hover:border-slate-400 hover:bg-slate-50 ${
                    selectedWeekNumber === week.weekNumber ? 'border-slate-900 bg-slate-50' : 'border-slate-200'
                  }`}
                  onClick={() => {
                    setSelectedWeekNumber(week.weekNumber)
                    setSelectedDayNumber(null)
                  }}
                  aria-pressed={selectedWeekNumber === week.weekNumber}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Week {week.weekNumber}
                  </p>
                  <h5 className="mt-1 text-sm font-semibold text-slate-900">{week.title}</h5>

                  <div className="mt-3 space-y-2">
                    {week.days.map((day) => (
                      <div key={day.dayNumber} className="grid grid-cols-[auto_auto_1fr] items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-900">{day.dayNumber}</span>
                        <span className="text-slate-600">{day.dayOfWeek}</span>
                        <div className="flex flex-wrap items-center gap-1">
                          {getDayBlockTypes(day).map((blockType) => {
                            const presentation = getBlockTypePresentation(blockType)
                            return (
                              <span
                                key={`${day.dayNumber}-${blockType}`}
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${presentation.badgeClassName}`}
                                title={presentation.label}
                                aria-label={presentation.label}
                              >
                                {presentation.shortLabel}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {selectedWeek ? (
              <>
                <p className="mt-4 text-sm text-slate-700">
                  Zoomed to Week {selectedWeek.weekNumber}: {selectedWeek.title}
                </p>

                <section aria-label="Week view" className="mt-4 rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Week View</p>
                      <h6 className="mt-1 text-base font-semibold text-slate-900">
                        Week {selectedWeek.weekNumber}: {selectedWeek.title}
                      </h6>
                    </div>

                    {selectedDay ? (
                      <button
                        type="button"
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        onClick={() => goToZoomLevel('week')}
                      >
                        Back to Week
                      </button>
                    ) : null}
                  </div>

                  <p className="mt-2 text-sm text-slate-600">Click a day card to zoom into the full day view.</p>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {selectedWeek.days.map((day) => (
                      <button
                        key={day.dayNumber}
                        type="button"
                        className={`rounded-lg border p-4 text-left transition hover:border-slate-400 hover:bg-slate-50 ${
                          selectedDayNumber === day.dayNumber ? 'border-slate-900 bg-slate-50' : 'border-slate-200'
                        }`}
                        onClick={() => setSelectedDayNumber(day.dayNumber)}
                        aria-pressed={selectedDayNumber === day.dayNumber}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h6 className="text-sm font-semibold text-slate-900">
                            {day.dayOfWeek} · Day {day.dayNumber}
                          </h6>
                          {day.date ? (
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{day.date}</p>
                          ) : null}
                        </div>

                        <div className="mt-4 space-y-3">
                          {day.blocks.map((block, index) => {
                            const presentation = getBlockTypePresentation(block.type)
                            return (
                              <div key={`${day.dayNumber}-${block.time}-${block.title}`} className="grid grid-cols-[auto_1fr] gap-3">
                                <div className="flex flex-col items-center">
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full border ${presentation.badgeClassName}`}
                                    aria-hidden="true"
                                  />
                                  {index < day.blocks.length - 1 ? (
                                    <span className="mt-1 h-full w-px bg-slate-200" aria-hidden="true" />
                                  ) : null}
                                </div>

                                <article className={`rounded-md border p-3 ${getBlockCardClassName(block.type)}`}>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    {block.time}
                                  </p>
                                  <p className="mt-1 text-sm font-semibold text-slate-900">{block.title}</p>
                                  <p className="mt-1 text-xs text-slate-700">
                                    {truncateBlockDescription(block.description)}
                                  </p>
                                </article>
                              </div>
                            )
                          })}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {selectedDay ? (
                  <section
                    aria-label="Day view"
                    className="mt-4 overflow-hidden rounded-lg border border-slate-300 bg-white"
                  >
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Day View · Leaf Node
                      </p>
                      <h6 className="mt-1 text-lg font-semibold leading-tight text-slate-900">
                        {getDayHeading(selectedDay)}
                      </h6>
                      {selectedDay.date ? (
                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                          {selectedDay.date}
                        </p>
                      ) : null}
                    </div>

                    <div className="divide-y divide-slate-200">
                      {selectedDay.blocks.map((block) => {
                        const presentation = getBlockTypePresentation(block.type)

                        return (
                          <article
                            key={`${selectedDay.dayNumber}-${block.time}-${block.title}`}
                            className={`grid gap-4 px-4 py-4 md:grid-cols-[9.5rem_1fr] ${getBlockCardClassName(block.type)}`}
                          >
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                Time Range
                              </p>
                              <p className="mt-1 text-sm font-semibold text-slate-900">{block.time}</p>
                            </div>

                            <div>
                              <span
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${presentation.badgeClassName}`}
                              >
                                {presentation.label}
                              </span>
                              <p className="mt-2 text-sm font-semibold text-slate-900">{block.title}</p>
                              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                                {getBlockDescription(block.description)}
                              </p>
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  </section>
                ) : null}
              </>
            ) : null}

            {selectedChunk.endNote ? <p className="mt-4 text-sm text-slate-700">{selectedChunk.endNote}</p> : null}
            </section>
          ) : null}
        </div>
      </main>
    </div>
  )
}

export default App
