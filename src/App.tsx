import { useMemo, useState } from 'react'
import { calendarEvents, sessions } from './data/curriculum'
import type { Session, TwoWeekChunk, WeekPlan, DayPlan } from './data/curriculum'
import { buildYearOverviewSegments } from './yearOverview'

type View =
  | { level: 'year' }
  | { level: 'session'; session: Session }
  | { level: 'chunk'; session: Session; chunk: TwoWeekChunk }
  | { level: 'week'; session: Session; chunk: TwoWeekChunk; week: WeekPlan }
  | { level: 'day'; session: Session; chunk: TwoWeekChunk; week: WeekPlan; day: DayPlan }

const blockColors: Record<string, { bg: string; text: string; dot: string }> = {
  workshop:     { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', dot: 'bg-amber-400' },
  business:     { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', dot: 'bg-blue-400' },
  media:        { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  roundtable:   { bg: 'bg-violet-50 border-violet-200', text: 'text-violet-700', dot: 'bg-violet-400' },
  harkness:     { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', dot: 'bg-rose-400' },
  presentation: { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', dot: 'bg-orange-400' },
  reflection:   { bg: 'bg-slate-50 border-slate-200', text: 'text-slate-600', dot: 'bg-slate-400' },
  fitness:      { bg: 'bg-slate-50/50 border-slate-100', text: 'text-slate-400', dot: 'bg-slate-300' },
  academics:    { bg: 'bg-slate-50/50 border-slate-100', text: 'text-slate-400', dot: 'bg-slate-300' },
  awards:       { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', dot: 'bg-yellow-400' },
  other:        { bg: 'bg-slate-50 border-slate-200', text: 'text-slate-600', dot: 'bg-slate-400' },
}

const blockLabels: Record<string, string> = {
  workshop: 'Workshop', business: 'Business Work', media: 'Media Discussion',
  roundtable: 'Roundtable', harkness: 'Harkness Circle', presentation: 'Presentation',
  reflection: 'Reflection', fitness: 'Fitness', academics: 'Academics',
  awards: 'Awards', other: 'Other',
}

function App() {
  const [view, setView] = useState<View>({ level: 'year' })
  const segments = useMemo(() => buildYearOverviewSegments(calendarEvents), [])

  const goBack = () => {
    if (view.level === 'day') setView({ level: 'week', session: view.session, chunk: view.chunk, week: view.week })
    else if (view.level === 'week') setView({ level: 'chunk', session: view.session, chunk: view.chunk })
    else if (view.level === 'chunk') setView({ level: 'session', session: view.session })
    else if (view.level === 'session') setView({ level: 'year' })
  }

  const breadcrumbs: { label: string; action: () => void }[] = [
    { label: '2026–27', action: () => setView({ level: 'year' }) },
  ]
  if (view.level !== 'year') {
    const s = view.session
    breadcrumbs.push({ label: `Session ${s.number}`, action: () => setView({ level: 'session', session: s }) })
    if (view.level !== 'session') {
      const c = view.chunk
      breadcrumbs.push({ label: c.title, action: () => setView({ level: 'chunk', session: s, chunk: c }) })
      if (view.level !== 'chunk') {
        const w = view.week
        breadcrumbs.push({ label: `Week ${w.weekNumber}`, action: () => setView({ level: 'week', session: s, chunk: c, week: w }) })
        if (view.level === 'day') {
          breadcrumbs.push({ label: `Day ${view.day.dayNumber}`, action: () => {} })
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">Alpha Founders Academy</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">2026–27 Freshman Year</h1>
        </div>
      </header>

      {/* Breadcrumbs + Back */}
      {view.level !== 'year' && (
        <div className="border-b border-stone-100 bg-white px-6 py-2.5 sm:px-8">
          <div className="mx-auto flex max-w-6xl items-center gap-3">
            <button onClick={goBack} className="mr-1 rounded-md p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <nav className="flex items-center gap-1 text-sm">
              {breadcrumbs.map((bc, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-stone-300">/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <button onClick={bc.action} className="text-stone-500 hover:text-stone-800 hover:underline">{bc.label}</button>
                  ) : (
                    <span className="font-medium text-stone-800">{bc.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8 sm:px-8">
        {view.level === 'year' && <YearView segments={segments} onSelectSession={(id) => {
          const s = sessions.find(s => s.id === id)
          if (s) setView({ level: 'session', session: s })
        }} />}

        {view.level === 'session' && <SessionView session={view.session} onSelectChunk={(c) => setView({ level: 'chunk', session: view.session, chunk: c })} />}

        {view.level === 'chunk' && <ChunkView session={view.session} chunk={view.chunk} onSelectWeek={(w) => setView({ level: 'week', session: view.session, chunk: view.chunk, week: w })} />}

        {view.level === 'week' && <WeekView week={view.week} onSelectDay={(d) => setView({ level: 'day', session: view.session, chunk: view.chunk, week: view.week, day: d })} />}

        {view.level === 'day' && <DayView day={view.day} />}
      </main>
    </div>
  )
}

/* ============================================
   YEAR VIEW
   ============================================ */

function YearView({ segments, onSelectSession }: { segments: ReturnType<typeof buildYearOverviewSegments>; onSelectSession: (id: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Timeline */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-400">Full Year Timeline</h2>
        <div className="flex h-20 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm sm:h-24">
          {segments.map((seg) => (
            seg.isSession ? (
              <button
                key={seg.id}
                onClick={() => onSelectSession(seg.id)}
                className="group relative flex items-end overflow-hidden border-r border-white/20 px-3 py-2.5 text-left text-white transition-all hover:brightness-110"
                style={{ width: `${seg.widthPercent}%`, backgroundColor: seg.color }}
              >
                <div className="relative z-10">
                  <p className="text-[10px] font-medium uppercase tracking-wider opacity-80">{seg.durationDays} days</p>
                  <p className="mt-0.5 truncate text-xs font-semibold sm:text-sm">{seg.title}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
              </button>
            ) : (
              <div
                key={seg.id}
                className="flex items-end border-r border-white/20 bg-stone-200 px-2 py-2.5"
                style={{ width: `${seg.widthPercent}%` }}
              >
                <p className="truncate text-[10px] font-medium text-stone-500">{seg.title}</p>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Session Cards */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-400">Sessions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSession(s.id)}
              className="group rounded-xl border border-stone-200 bg-white p-5 text-left shadow-sm transition hover:border-stone-300 hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Session {s.number}</p>
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-stone-700">{s.title}</h3>
              <p className="mt-1 text-sm italic text-stone-500">{s.theme}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-stone-400">
                <span>{s.durationWeeks} weeks</span>
                {s.revenueTarget && <><span>·</span><span>{s.revenueTarget}</span></>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <Legend />
    </div>
  )
}

/* ============================================
   SESSION VIEW
   ============================================ */

function SessionView({ session, onSelectChunk }: { session: Session; onSelectChunk: (c: TwoWeekChunk) => void }) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: session.color }} />
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Session {session.number}</p>
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{session.title}</h2>
        <p className="mt-1 text-base italic text-stone-500">{session.theme}</p>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">{session.description}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-stone-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Duration</p>
            <p className="mt-1 text-sm font-semibold">{session.durationWeeks} weeks</p>
          </div>
          {session.revenueTarget && (
            <div className="rounded-lg bg-stone-50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Revenue Target</p>
              <p className="mt-1 text-sm font-semibold">{session.revenueTarget}</p>
            </div>
          )}
          {session.firstBook && (
            <div className="rounded-lg bg-stone-50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Book</p>
              <p className="mt-1 text-sm font-semibold">{session.firstBook}</p>
            </div>
          )}
        </div>
      </div>

      {/* Daily Structure */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-400">Daily Structure</h3>
        <div className="mt-3 space-y-1">
          {session.dailyStructure.map((row, i) => (
            <div key={i} className="flex items-center gap-4 rounded-lg px-3 py-2 even:bg-stone-50">
              <span className="w-28 text-sm font-medium text-stone-500">{row.time}</span>
              <span className="text-sm font-medium text-stone-800">{row.block}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chunks */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-400">Two-Week Blocks</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {session.chunks.map((chunk) => {
            const workshopTopics = chunk.weeks.flatMap(w =>
              w.days.flatMap(d => d.blocks.filter(b => b.type === 'workshop').map(b => b.title))
            ).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4)

            return (
              <button
                key={chunk.id}
                onClick={() => onSelectChunk(chunk)}
                className="group rounded-xl border border-stone-200 bg-white p-5 text-left shadow-sm transition hover:border-stone-300 hover:shadow-md"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">{chunk.title}</p>
                <h4 className="mt-1.5 text-lg font-semibold tracking-tight">{chunk.subtitle}</h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {workshopTopics.map((topic) => (
                    <span key={topic} className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 border border-amber-100">{topic}</span>
                  ))}
                </div>
                {chunk.endNote && <p className="mt-3 text-xs italic text-stone-400 line-clamp-2">{chunk.endNote}</p>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ============================================
   CHUNK VIEW (Two-Week)
   ============================================ */

function ChunkView({ session, chunk, onSelectWeek }: { session: Session; chunk: TwoWeekChunk; onSelectWeek: (w: WeekPlan) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Session {session.number} · {chunk.title}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{chunk.subtitle}</h2>
      </div>

      {chunk.designPrinciples && chunk.designPrinciples.length > 0 && (
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Design Principles</h3>
          <ul className="mt-2 space-y-1.5">
            {chunk.designPrinciples.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-stone-600">
                <span className="mt-0.5 text-stone-300">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {chunk.weeks.map((week) => (
          <button
            key={week.weekNumber}
            onClick={() => onSelectWeek(week)}
            className="group rounded-xl border border-stone-200 bg-white p-5 text-left shadow-sm transition hover:border-stone-300 hover:shadow-md"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Week {week.weekNumber}</p>
            <h4 className="mt-1 text-lg font-semibold tracking-tight">{week.title}</h4>

            <div className="mt-4 space-y-1.5">
              {week.days.map((day) => {
                const importantBlocks = day.blocks.filter(b => !['academics', 'fitness'].includes(b.type))
                return (
                  <div key={day.dayNumber} className="flex items-start gap-3 rounded-lg px-2 py-1.5 transition group-hover:bg-stone-50">
                    <div className="flex w-16 shrink-0 items-center gap-1.5">
                      <span className="text-xs font-bold text-stone-800">{day.dayOfWeek}</span>
                      <span className="text-[10px] text-stone-400">D{day.dayNumber}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {importantBlocks.map((block, i) => {
                        const c = blockColors[block.type] || blockColors.other
                        return (
                          <span key={i} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${c.bg} ${c.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                            {block.title.length > 25 ? block.title.slice(0, 25) + '…' : block.title}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </button>
        ))}
      </div>

      {chunk.endNote && (
        <p className="rounded-lg bg-stone-100 px-4 py-3 text-sm italic text-stone-600">{chunk.endNote}</p>
      )}
    </div>
  )
}

/* ============================================
   WEEK VIEW
   ============================================ */

function WeekView({ week, onSelectDay }: { week: WeekPlan; onSelectDay: (d: DayPlan) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Week {week.weekNumber}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{week.title}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {week.days.map((day) => {
          const importantBlocks = day.blocks.filter(b => !['academics', 'fitness'].includes(b.type))
          return (
            <button
              key={day.dayNumber}
              onClick={() => onSelectDay(day)}
              className="group rounded-xl border border-stone-200 bg-white p-4 text-left shadow-sm transition hover:border-stone-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-800">
                  {day.dayOfWeek} <span className="font-normal text-stone-400">· Day {day.dayNumber}</span>
                </h3>
                {day.date && <span className="text-[10px] text-stone-400">{day.date}</span>}
              </div>

              <div className="mt-3 space-y-2">
                {importantBlocks.map((block, i) => {
                  const c = blockColors[block.type] || blockColors.other
                  return (
                    <div key={i} className={`rounded-lg border px-3 py-2 ${c.bg}`}>
                      <div className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                        <span className={`text-[10px] font-medium ${c.text}`}>{block.time}</span>
                      </div>
                      <p className="mt-0.5 text-xs font-semibold text-stone-800">{block.title}</p>
                      {block.description && (
                        <p className="mt-0.5 text-[11px] text-stone-500 line-clamp-2">{block.description}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ============================================
   DAY VIEW
   ============================================ */

function DayView({ day }: { day: DayPlan }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Day {day.dayNumber}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{day.dayOfWeek}</h2>
        {day.date && <p className="mt-1 text-sm text-stone-400">{day.date}</p>}
      </div>

      <div className="space-y-3">
        {day.blocks.map((block, i) => {
          const c = blockColors[block.type] || blockColors.other
          const isMuted = ['academics', 'fitness'].includes(block.type)

          return (
            <div
              key={i}
              className={`rounded-xl border p-4 ${isMuted ? 'border-stone-100 bg-stone-50/50' : `${c.bg} shadow-sm`}`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${isMuted ? 'text-stone-400' : c.text}`}>
                  {blockLabels[block.type] || block.type}
                </span>
                <span className="ml-auto text-xs text-stone-400">{block.time}</span>
              </div>
              <h3 className={`mt-2 font-semibold ${isMuted ? 'text-sm text-stone-400' : 'text-base text-stone-800'}`}>{block.title}</h3>
              {block.description && !isMuted && (
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{block.description}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ============================================
   LEGEND
   ============================================ */

function Legend() {
  const legendItems = ['workshop', 'business', 'media', 'roundtable', 'harkness', 'presentation', 'reflection', 'awards']
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      {legendItems.map((type) => {
        const c = blockColors[type] || blockColors.other
        return (
          <div key={type} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${c.dot}`} />
            <span className="text-[11px] text-stone-500">{blockLabels[type]}</span>
          </div>
        )
      })}
    </div>
  )
}

export default App
