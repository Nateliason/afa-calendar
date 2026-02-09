import type { DayPlan } from './data/curriculum'

export type BlockType = DayPlan['blocks'][number]['type']

interface BlockTypePresentation {
  label: string
  shortLabel: string
  badgeClassName: string
}

const BLOCK_TYPES_IN_LEGEND_ORDER: BlockType[] = [
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
]

const BLOCK_TYPE_PRESENTATIONS: Record<BlockType, BlockTypePresentation> = {
  workshop: {
    label: 'Workshop',
    shortLabel: 'Work',
    badgeClassName: 'border-amber-200 bg-amber-100 text-amber-800',
  },
  business: {
    label: 'Business Work',
    shortLabel: 'Biz',
    badgeClassName: 'border-blue-200 bg-blue-100 text-blue-800',
  },
  media: {
    label: 'Media Discussion',
    shortLabel: 'Media',
    badgeClassName: 'border-green-200 bg-green-100 text-green-800',
  },
  roundtable: {
    label: 'Roundtable',
    shortLabel: 'Round',
    badgeClassName: 'border-violet-200 bg-violet-100 text-violet-800',
  },
  harkness: {
    label: 'Harkness Circle',
    shortLabel: 'Hark',
    badgeClassName: 'border-red-200 bg-red-100 text-red-800',
  },
  presentation: {
    label: 'Presentation',
    shortLabel: 'Pres',
    badgeClassName: 'border-orange-200 bg-orange-100 text-orange-800',
  },
  reflection: {
    label: 'Reflection',
    shortLabel: 'Reflect',
    badgeClassName: 'border-slate-200 bg-slate-100 text-slate-700',
  },
  fitness: {
    label: 'Fitness',
    shortLabel: 'Fit',
    badgeClassName: 'border-slate-200 bg-slate-100 text-slate-700',
  },
  academics: {
    label: 'Academics',
    shortLabel: 'Acad',
    badgeClassName: 'border-slate-200 bg-slate-100 text-slate-700',
  },
  awards: {
    label: 'Awards',
    shortLabel: 'Award',
    badgeClassName: 'border-yellow-200 bg-yellow-100 text-yellow-800',
  },
  other: {
    label: 'Other',
    shortLabel: 'Other',
    badgeClassName: 'border-zinc-200 bg-zinc-100 text-zinc-700',
  },
}

export function getDayBlockTypes(day: DayPlan): BlockType[] {
  const blockTypes: BlockType[] = []
  const seen = new Set<BlockType>()

  for (const block of day.blocks) {
    if (seen.has(block.type)) {
      continue
    }

    seen.add(block.type)
    blockTypes.push(block.type)
  }

  return blockTypes
}

export function getBlockTypePresentation(blockType: BlockType): BlockTypePresentation {
  return BLOCK_TYPE_PRESENTATIONS[blockType]
}

export function getBlockTypesInLegendOrder(): BlockType[] {
  return [...BLOCK_TYPES_IN_LEGEND_ORDER]
}
